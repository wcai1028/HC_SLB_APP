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
import { IWizardData, IServerObject } from './interface'
import {
  IAppServiceObject,
  IVirtualServerObject,
  ILogicalClusterObject,
  IServiceGroupObject,
  IServiceGroupMember,
} from '../interface'
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
          'port-list': [
            {
              'port-number': null,
              protocol: 'tcp',
              'service-group': null,
              'template-persist-source-ip': null,
              'sampling-enable': [
                {
                  counters1: 'total_l4_conn',
                },
                {
                  counters1: 'total_fwd_bytes',
                },
                {
                  counters1: 'total_rev_bytes',
                },
              ],
            },
          ],
        },
        'service-group': {
          name: null,
          'lb-method': 'least-connection',
          'health-check': false,
        },
        servers: [
          {
            name: null,
            host: null,
            'port-list': [
              {
                protocol: null,
                'port-number': null,
                'health-check': 'ping',
                'sampling-enable': [
                  {
                    counters1: 'total_conn',
                  },
                  {
                    counters1: 'total_fwd_bytes',
                  },
                  {
                    counters1: 'total_rev_bytes',
                  },
                ],
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
        persistence: false,
        enableHealthCheck: false,
        notEditableServers: {},
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

        data['app-svc'] = _.merge(data['app-svc'], appService)

        return Promise.all([
          this.getVirtualServer(data, appServiceName, virtualServerName),
          this.getLogicalCluster(data, logicalClusterName),
        ])
      })
      .then(() => {
        const serviceGroupName = _.get(
          data['virtual-server'],
          'port-list[0].service-group',
          null,
        )
        const templatePersistSourceIPName = _.get(
          data['virtual-server'],
          'port-list[0].template-persist-source-ip',
          null,
        )
        return Promise.all([
          this.getTemplatePersistSourceIP(data, templatePersistSourceIPName),
          this.getServiceGroup(data, appServiceName, serviceGroupName),
        ])
      })
      .then(() => {
        return this.getServers(data)
      })
      .then(() => {
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

        data['virtual-server'] = _.merge(data['virtual-server'], virtualServer)
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

        data.persistence = !!data.template.persist['source-ip'].name
      })
  }

  getLogicalCluster = (
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
        `/hccapi/v3/provider/${provider}/tenant/${tenant}/logical-cluster/${logicalClusterName}`,
      )
      .then(response => {
        const { 'logical-cluster': logicalCluster } = response.data

        data['logical-cluster'] = _.merge(
          data['logical-cluster'],
          logicalCluster,
        )
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
        data['service-group'] = _.merge(data['service-group'], serviceGroup)
        data['health.monitor'].name = serviceGroup['health-check'] || null
        data.enableHealthCheck = !!serviceGroup['health-check']

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
          }
        })
      })
  }

  getServers = (data: IWizardData) => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')
    const promises = data.servers
      .filter(server => !!server.name)
      .map(server => {
        return httpClient.get<IServerObject>(
          `/hccapi/v3/provider/${provider}/tenant/${tenant}/shared-object/slb/server/${
            server.name
          }`,
        )
      })

    return Promise.all(promises).then(results => {
      data.servers = results.map(result => {
        const { server } = result.data

        if (Array.isArray(server['port-list'])) {
          data.notEditableServers[server.host] = { name: server.name }
        } else {
          server['port-list'] = [
            {
              protocol: null,
              'port-number': null,
              'health-check': 'ping',
              'sampling-enable': [
                {
                  counters1: 'total_conn',
                },
                {
                  counters1: 'total_fwd_bytes',
                },
                {
                  counters1: 'total_rev_bytes',
                },
              ],
            },
          ]
        }

        return server
      })
    })
  }

  getTemplatePersistSourceIP = (data: IWizardData, name: string) => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')

    if (!name) {
      return Promise.resolve()
    }

    return httpClient
      .get<IServiceGroupObject>(
        `/hccapi/v3/provider/${provider}/tenant/${tenant}/shared-object/slb/template/persist/source-ip/${name}`,
      )
      .then(response => {
        data.template.persist['source-ip'] = _.merge(
          data.template.persist['source-ip'],
          response.data['source-ip'],
        )
      })
  }

  componentDidMount() {
    const { isUpdate } = this.state

    if (isUpdate) {
      this.getData()
    }
  }

  render() {
    const { data, isUpdate } = this.state
    return (
      <div className="l4slb-wizard">
        <Wizard
          title="SLB Wizard"
          steps={this.steps}
          data={data}
          isUpdate={isUpdate}
        />
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
