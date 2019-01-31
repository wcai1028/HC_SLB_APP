import * as React from 'react'
import { Link } from 'react-router-dom'

import { _, A10Container } from 'a10-gui-framework'

import {
  A10Button,
  A10Badge,
  A10Table,
  A10DropdownMenu,
  A10Modal,
} from 'a10-gui-widgets'

import { HealthStatus } from 'src/components/shared'
import { getItem } from 'src/libraries/storage'
import { httpClient } from 'src/libraries/httpClient'

import './styles/index.less'
import {
  IAppServiceList,
  IAppService,
  IVirtualPortList,
  ILogicalCluster,
  IPhysicalCluster,
} from '../interface'

interface IDeployed {
  name: string
  physicalClusterList: IPhysicalCluster[]
}

export interface IAppServiceListProps {}

export interface IAppServiceState {
  data: any
}

export default class AppServiceList extends A10Container<
  IAppServiceListProps,
  IAppServiceState
> {
  private columns = [
    {
      title: 'App Service',
      dataIndex: 'name',
      key: 'name',
      className: 'link',
      render: (name: string) => <span className="link">{name}</span>,
    },
    {
      title: 'VIP',
      dataIndex: 'vip.obj-references[0].name',
      key: 'vip.obj-references[0].name',
    },
    {
      title: '# vPort',
      dataIndex: 'vport.obj-refcnt',
      key: 'vport.obj-refcnt',
    },
    {
      title: '# Servers',
      dataIndex: 'serverCount',
      key: 'serverCount',
    },
    {
      title: 'Deployed',
      dataIndex: 'deployed',
      key: 'deployed',
      render: (deployed: IPhysicalCluster[]) => {
        if (!Array.isArray(deployed) || deployed.length === 0) {
          return <span className="link">Deploy</span>
        }

        return deployed.map((deploy: IPhysicalCluster, index: number) => {
          const { cluster, partition } = deploy
          if (cluster && partition) {
            return (
              <div key={index}>
                <HealthStatus
                  type="ongoing"
                  tooltip="Cluster"
                  text="C"
                  description={deploy.cluster}
                />
                <HealthStatus
                  type="ongoing"
                  tooltip="Partition"
                  text="P"
                  description={deploy.partition}
                />
              </div>
            )
          }
          return null
        })
      },
    },
    {
      title: 'Current Conn.',
    },
    {
      title: 'Health',
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      className: 'action-list',
      render: (record: any) => {
        return (
          <A10DropdownMenu
            style={{ color: '#757575', marginBottom: '-15px' }}
            menu={[
              <div key="viewDashboard">View Dashboard</div>,
              <div key="edit">
                <Link to={`/wizard/${record.name}`}>Edit</Link>
              </div>,
              <div key="delete" onClick={this.onClickDelete(record.uuid)}>
                Delete
              </div>,
            ]}
            trigger="hover"
            placement="bottomRight"
            arrowPointAtCenter={true}
          />
        )
      },
    },
  ]

  constructor(props: IAppServiceListProps) {
    super(props)
    this.state = {
      data: [],
    }
  }

  onClickDelete = (uuid: string) => () => {
    A10Modal.confirm({
      title: 'Confirmation',
      content: 'Do you want to delete this Item?',
      okText: 'OK',
      cancelText: 'Cancel',
      onOk: this.onDelete(uuid),
    })
  }

  onDelete = (uuid: string) => () => {
    httpClient.delete(`/hccapi/v3/uuid/${uuid}`).then(this.getData)
  }

  getData = async () => {
    const response = await this.getAppServiceListData()
    const appServiceList = _.get(response, 'app-svc-list', []) as IAppService[]
    const vipNamesForQueryServers: string[] = []
    const appsWithLogicalCluster: { [key: string]: string } = {}

    appServiceList.forEach(appService => {
      // filter out app services which don't contain ant vport
      if (Array.isArray(_.get(appService, 'vport.obj-references'))) {
        // app service and virtual server is one to one mapping
        vipNamesForQueryServers.push(appService.vip['obj-references'][0].name)
      }

      if (_.isString(appService['logical-cluster'])) {
        appsWithLogicalCluster[appService.name] = appService['logical-cluster']
      }
    })

    const numberOfServers = await this.getNumberOfServersByVIPNames(
      vipNamesForQueryServers,
    )

    const deployedApps = await this.getDeployed(appsWithLogicalCluster)

    this.tidyRenderingData(appServiceList, numberOfServers, deployedApps)
  }

  getAppServiceListData = async () => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')
    return httpClient
      .get<IAppServiceList>(
        `/hccapi/v3/provider/${provider}/tenant/${tenant}/app-svc?detail=true`,
      )
      .then(({ data }) => data)
  }

  getNumberOfServersByVIPNames = async (vipNames: string[]) => {
    const promises: Array<Promise<IVirtualPortList>> = []

    vipNames.forEach(vipName => {
      promises.push(this.getVPortDetail(vipName))
    })

    const numberOfServers: { [key: string]: number } = {}
    await Promise.all(promises).then((results: IVirtualPortList[]) => {
      results.forEach(({ 'port-list': portList }) => {
        portList.forEach(port => {
          const appServiceName = port['app-svc']
          if (_.isUndefined(numberOfServers[appServiceName])) {
            numberOfServers[appServiceName] = 0
          }
          numberOfServers[appServiceName] =
            numberOfServers[appServiceName] +
            _.get(port, 'service-group.member-list', []).length
        })
      })
    })

    return numberOfServers
  }

  getVPortDetail = async (vipName: string) => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')

    return httpClient
      .get<IVirtualPortList>(
        `/hccapi/v3/provider/${provider}/tenant/${tenant}/app-svc/app1/slb/virtual-server/${vipName}/port?detail=true`,
      )
      .then(({ data }) => data)
  }

  getDeployed = async (appsWithLogicalCluster: { [key: string]: string }) => {
    const promises: Array<Promise<IDeployed>> = []
    const deployed: { [key: string]: IPhysicalCluster[] } = {}

    Object.keys(appsWithLogicalCluster).forEach(appName => {
      promises.push(
        this.getPhysicalClusterList(appName, appsWithLogicalCluster[appName]),
      )
    })

    await Promise.all(promises).then((results: IDeployed[]) => {
      results.forEach(({ name, physicalClusterList }) => {
        deployed[name] = physicalClusterList
      })
    })

    return deployed
  }

  getPhysicalClusterList = async (
    appServiceName: string,
    logicalClusterName: string,
  ) => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')

    return httpClient
      .get<ILogicalCluster>(
        `/hccapi/v3/provider/${provider}/tenant/${tenant}/logical-cluster/${logicalClusterName}?detail=true`,
      )
      .then(({ data }) => ({
        name: appServiceName,
        physicalClusterList: _.get(
          data,
          'logical-cluster.physical-cluster-list',
          [],
        ),
      }))
  }

  tidyRenderingData = (
    appServiceList: IAppService[],
    numberOfServers: { [key: string]: number },
    deployedApps: {
      [key: string]: IPhysicalCluster[]
    },
  ) => {
    const appServiceForRendering = appServiceList.map(appService => {
      const serverCount = numberOfServers[appService.name] || 0
      const deployed = deployedApps[appService.name] || []

      return { ...appService, serverCount, deployed }
    })
    this.setState({ data: appServiceForRendering })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { data } = this.state
    return (
      <div className="l4slb-app-service-list">
        <header>
          <h1>SLB App Services</h1>
          <A10Badge
            showZero={true}
            count={data.length}
            overflowCount={999999}
            title={data.length}
          />
          <div className="table-actions">
            <A10Button type="primary" icon="plus">
              <Link to="/wizard">Add App Service</Link>
            </A10Button>
          </div>
        </header>
        <A10Table
          columns={this.columns}
          dataSource={data}
          rowKey={(record: any) => record.name}
        />
      </div>
    )
  }
}
