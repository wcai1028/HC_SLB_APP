import React from 'react'
import { RouteComponentProps } from 'react-router'

import { _, A10Container } from 'a10-gui-framework'
import { Wizard } from 'src/components/shared'
import {
  VirtualServerForm,
  ServiceGroupForm,
  DeploymentForm,
  Review,
} from './Steps'
import './styles/L4SLBWizard.less'
import { IWizardData } from './interface'
import {
  IAppServiceObject,
  IVirtualServerObject,
  ILogicalClusterObject,
  IServiceGroupObject,
  IServiceGroupMember,
} from '../interface'
import { A10Button } from 'a10-gui-widgets'
import { Link } from 'react-router-dom'
import { getItem } from 'src/libraries/storage'
import { httpClient } from 'src/libraries/httpClient'
interface IStep {
  title: string
  content: JSX.Element
}
interface IL4SLBWizardProps extends RouteComponentProps {}
interface IL4SLBWizardState {
  isUpdate: boolean
  appServiceName: string
  current: number
  data: IWizardData
}

class L4SLBWizard extends A10Container<IL4SLBWizardProps, IL4SLBWizardState> {
  private steps: IStep[]

  constructor(props: IL4SLBWizardProps) {
    super(props)
    const {
      match: { params },
    } = this.props
    const { appServiceName } = params as IObject
    this.state = {
      isUpdate: _.isString(appServiceName),
      appServiceName,
      current: 0,
      data: {
        'app-svc': {
          name: null,
        },
        'virtual-server': {
          name: null,
          'ip-address': null,
          port: [
            {
              'port-number': null,
              protocol: 'tcp',
            },
          ],
        },
        'service-group': {
          name: null,
          persistence: false,
          'lb-method': 'least-connection',
          'health-check': false,
        },
        servers: [
          {
            name: null,
            host: null,
            'port-list': [
              {
                'port-number': null,
              },
            ],
          },
        ],
        template: {
          persist: {
            'source-ip': {
              name: null,
            },
          },
        },
        'health.monitor': {
          name: null,
        },
        'logical-cluster': {
          name: null,
          'physical-cluster-list': [
            {
              cluster: null,
              partition: null,
            },
          ],
        },
        deployment: 'INLINE',
      },
    }
    this.init()
  }

  onChange = (data: IWizardData) => {
    this.setState({ data })
  }

  getData = () => {
    const { appServiceName } = this.state
    const data = { ...this.state.data }
    this.getAppService(appServiceName)
      .then(({ 'app-svc': appService }) => {
        const virtualServerName = _.get(
          appService,
          'vip.obj-references[0].name',
          null,
        )
        const logicalClusterName = _.get(appService, 'logical-cluster', null)

        data['app-svc'].name = appService.name

        return Promise.all([
          this.getVirtualServer(data, appServiceName, virtualServerName),
          this.getPhysicalCluster(data, logicalClusterName),
        ])
      })
      .then(results => {
        const serviceGroupName = results[0]
        return this.getServiceGroup(data, appServiceName, serviceGroupName)
      })
      .then(() => {
        console.log('done')
        console.log(data)
        this.setState({ data })
      })
  }

  getAppService = (appServiceName: string) => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')
    return httpClient
      .get<IAppServiceObject>(
        `/hccapi/v3/provider/${provider}/tenant/${tenant}/app-svc/${appServiceName}`,
      )
      .then(({ data }) => data)
  }

  getVirtualServer = (
    data: IWizardData,
    appServiceName: string,
    virtualServerName: string = null,
  ) => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')

    if (!virtualServerName) {
      return Promise.resolve()
    }

    return httpClient
      .get<IVirtualServerObject>(
        `/hccapi/v3/provider/${provider}/tenant/${tenant}/app-svc/${appServiceName}/slb/virtual-server/${virtualServerName}`,
      )
      .then(response => {
        const { 'virtual-server': virtualServer } = response.data
        data['virtual-server'].name = virtualServer.name
        data['virtual-server']['ip-address'] = virtualServer['ip-address']
        data['virtual-server'].port = [
          {
            protocol: _.get(virtualServer, 'port-list[0].protocol', null),
            'port-number': _.get(
              virtualServer,
              'port-list[0].port-number',
              null,
            ),
          },
        ]

        data.template.persist['source-ip'].name = _.get(
          virtualServer,
          'port-list[0].template-persist-source-ip',
          null,
        )

        if (_.get(virtualServer, 'port-list[0].no-dest-nat')) {
          data.deployment = 'DSR'
        } else if (_.get(virtualServer, 'port-list[0].auto')) {
          data.deployment = 'SOURCE-NAT'
        } else {
          data.deployment = 'INLINE'
        }

        data['service-group'].persistence = !!data.template.persist['source-ip']
          .name

        return _.get(virtualServer, 'port-list[0].service-group', null)
      })
  }

  getPhysicalCluster = (
    data: IWizardData,
    logicalClusterName: string = null,
  ) => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')

    if (!logicalClusterName) {
      return Promise.resolve()
    }

    return httpClient
      .get<ILogicalClusterObject>(
        `/hccapi/v3/provider/${provider}/tenant/${tenant}/logical-cluster/${logicalClusterName}?detail=true`,
      )
      .then(response => {
        const { 'logical-cluster': logicalCluster } = response.data
        const partition = _.get(
          logicalCluster,
          'physical-cluster-list[0].partition',
          null,
        )
        const cluster = _.get(
          logicalCluster,
          'physical-cluster-list[0].cluster',
          null,
        )
        data['logical-cluster'] = {
          name: logicalCluster.name,
          'physical-cluster-list': [
            {
              cluster,
              partition,
            },
          ],
        }

        return null
      })
  }

  getServiceGroup = (
    data: IWizardData,
    appServiceName: string,
    serviceGroupName: string = null,
  ) => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')

    if (!serviceGroupName) {
      return Promise.resolve()
    }

    return httpClient
      .get<IServiceGroupObject>(
        `/hccapi/v3/provider/${provider}/tenant/${tenant}/app-svc/${appServiceName}/slb/service-group/${serviceGroupName}`,
      )
      .then(response => {
        const { 'service-group': serviceGroup } = response.data
        data['health.monitor'].name = serviceGroup['health-check']
        data['service-group']['health-check'] = !!data['health.monitor'].name
        data['service-group']['lb-method'] = serviceGroup['lb-method']

        data.servers = (_.get(
          serviceGroup,
          'member-list',
          [],
        ) as IServiceGroupMember[]).map(member => {
          const host = member.name
            .split('_')
            .slice(1, 5)
            .join('.')
          return {
            name: member.name,
            host,
            'port-list': [
              {
                'port-number': member.port,
              },
            ],
          }
        })
      })
  }

  componentDidMount() {
    const { isUpdate } = this.state

    if (isUpdate) {
      this.getData()
    }
  }

  render() {
    const { data, isUpdate, appServiceName } = this.state
    let editUrl = '/configuration'
    if (isUpdate) {
      editUrl = `${editUrl}/${appServiceName}`
    }
    return (
      <div className="l4slb-wizard">
        <Wizard title="SLB Wizard" steps={this.steps} data={data} />
        <A10Button className="pull-right btn-action">
          <Link to={editUrl}>Skip Wizard to configuration</Link>
        </A10Button>
      </div>
    )
  }

  private init() {
    this.steps = [
      {
        title: 'Virtual Server',
        content: <VirtualServerForm onChange={this.onChange} />,
      },
      {
        title: 'Service Group',
        content: <ServiceGroupForm onChange={this.onChange} />,
      },
      {
        title: 'Deployment Association',
        content: <DeploymentForm onChange={this.onChange} />,
      },
      {
        title: 'Review',
        content: <Review />,
      },
    ]
  }
}

export default L4SLBWizard
