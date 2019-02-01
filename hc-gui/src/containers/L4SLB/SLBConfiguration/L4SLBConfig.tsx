import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { _, A10Container } from 'a10-gui-framework'
import { IVirtualService, IVport, IMember } from './interface'
import { SLBConfigurationForm } from './VirtualServer'
import { httpClient } from 'src/libraries/httpClient'
import { getItem } from 'src/libraries/storage'
import { IAppServiceObject, IVirtualServerObject } from '../interface'

export interface IConfigData {
  VirtualService: IVirtualService
  Vports: IVport[]
  clusterList: string[]
  partitionList: string[]
  aflexList: string[]
  timestamp?: number
}
export interface IL4SLBConfigProps extends RouteComponentProps {}
export interface IL4SLBConfigState {
  data: IConfigData
  isUpdate: boolean
}

class L4SLBConfig extends A10Container<IL4SLBConfigProps, IL4SLBConfigState> {
  constructor(props: any) {
    super(props)
    const {
      match: { params },
    } = this.props
    const { appServiceName } = params as IObject
    console.log('if edit', appServiceName)
    this.state = {
      isUpdate: _.isString(appServiceName),
      data: {
        VirtualService: {
          appServiceName: '',
          vip: '',
          vipName: '',
          connectionLimit: false,
          connectionLimitThreshold: null,
          connectionRateLimit: false,
          connectionRateLimitThreshold: null,
          cluster: '',
          partition: '',
          logicalClusterName: '',
        },
        Vports: [
          {
            portNumber: null,
            protocol: 'tcp',
            deployment: 'inline',
            lbMethod: 'round-robin',
            serviceGroupName: '',
            persistence: false,
            healthMonitor: false,
            members: [{ 'member-ip': '', 'member-port': null }],
            aflex: '',
            vPortConnectionLimit: false,
            vPortConnectionLimitThreshold: null,
            vPortConnectionRateLimit: false,
            vPortConnectionRateLimitThreshold: null,
            vPortIdleTimeout: false,
            vPortIdleTimeoutValue: null,
            vPortMaxOpenSession: null,
          },
        ],
        clusterList: [],
        partitionList: [],
        aflexList: [],
        timestamp: Date.now(),
      },
    }
  }
  componentDidMount() {
    this.getAflex()
    this.getProviderCluster()
  }

  getAflex = () => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')
    httpClient
      .get(
        `/hccapi/v3/provider/${provider}/tenant/${tenant}/shared-object/aflex`,
      )
      .then(response => {
        if (response.data && response.data['aflex-list']) {
          const { data } = this.state
          data.aflexList = response.data['aflex-list']
            .map(({ name }: { name: string }) => name)
            .concat('None')
          this.setState({ data })
        }
      })
  }

  getProviderCluster = () => {
    const provider = getItem('PROVIDER')
    httpClient.get(`/hccapi/v3/provider/${provider}/cluster`).then(response => {
      if (response.data && response.data['cluster-list']) {
        const { data } = this.state
        data.clusterList = response.data['cluster-list'].map(
          ({ name }: { name: string }) => name,
        )
        this.setState({ data })
      }
    })
  }
  onCreationProcess = (ObjectList: IObject) => {
    const promises: Array<Promise<any>> = [
      this.createLogicalCluster(),
      this.createServers(ObjectList.serverList),
      this.createHealthMonitor(ObjectList.healthMonitorList),
      this.createPersistSourceIP(ObjectList.persistTempList),
    ]
    Promise.all(promises)
      .then(this.createServerPorts.bind(this, ObjectList.serverList))
      .then(this.createAppService)
      .then(this.createServiceGroup)
      .then(this.createVirtualServer)
      .then(this.createVirtualPort)
  }

  onSubmit = (data: any, ObjectList: IObject) => {
    this.onCreationProcess(ObjectList)
  }
  createLogicalCluster = () => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')
    const {
      data: { VirtualService },
    } = this.state
    const { partition, cluster, logicalClusterName } = VirtualService

    return httpClient.post(
      `/hccapi/v3/provider/${provider}/tenant/${tenant}/logical-cluster`,
      {
        'logical-cluster': {
          name: logicalClusterName,
          'physical-cluster-list': [
            {
              cluster,
              partition,
            },
          ],
        },
      },
    )
  }

  createAppService = () => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')
    const {
      data: { VirtualService },
    } = this.state
    const { appServiceName, logicalClusterName } = VirtualService
    return httpClient.post(
      `/hccapi/v3/provider/${provider}/tenant/${tenant}/app-svc`,
      {
        'app-svc': {
          name: appServiceName,
          'app-svc-type': 'adc',
          'logical-cluster': logicalClusterName,
        },
      },
    )
  }

  createServers = (serverList: IMember[]) => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')

    const promises: Array<Promise<any>> = serverList.map(server => {
      const name = server.serverName
      const host = server['member-ip']
      return httpClient.post(
        `/hccapi/v3/provider/${provider}/tenant/${tenant}/shared-object/slb/server`,
        {
          server: {
            name,
            host,
          },
        },
      )
    })

    return Promise.all(promises)
  }

  createServerPorts = (serverList: IMember[]) => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')

    const promises: Array<Promise<any>> = serverList.map(server => {
      return httpClient.post(
        `/hccapi/v3/provider/${provider}/tenant/${tenant}/shared-object/slb/server/${
          server.serverName
        }/port`,
        {
          port: {
            'port-number': server['member-port'],
            protocol: server.protocol,
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
        },
      )
    })

    return Promise.all(promises)
  }

  createHealthMonitor = (healthMonitorList: string[]) => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')

    const promises: Array<Promise<any>> = healthMonitorList.map(monitorName => {
      return httpClient.post(
        `/hccapi/v3/provider/${provider}/tenant/${tenant}/health/monitor`,
        {
          monitor: {
            name: monitorName,
          },
        },
      )
    })

    return Promise.all(promises)
  }

  createPersistSourceIP = (persistTempList: string[]) => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')

    const promises: Array<Promise<any>> = persistTempList.map(templateName => {
      return httpClient.post(
        `/hccapi/v3/provider/${provider}/tenant/${tenant}/shared-object/slb/template/persist/source-ip`,
        {
          'source-ip': {
            name: templateName,
          },
        },
      )
    })
    return Promise.all(promises)
  }

  createServiceGroup = () => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')
    const {
      data: { VirtualService, Vports },
    } = this.state
    const promises: Array<Promise<any>> = Vports.map(vport => {
      const { healthMonitorName, serviceGroupName, protocol, members } = vport

      const memberList = members.map(member => {
        return {
          name: member.serverName,
          port: member['member-port'],
        }
      })

      return httpClient.post(
        `/hccapi/v3/provider/${provider}/tenant/${tenant}/app-svc/${
          VirtualService.appServiceName
        }/slb/service-group/`,
        {
          'service-group': {
            name: serviceGroupName,
            protocol,
            'health-check': healthMonitorName,
            'member-list': memberList,
          },
        },
      )
    })

    return Promise.all(promises)
  }

  createVirtualServer = () => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')
    const {
      data: { VirtualService },
    } = this.state
    const { vip, appServiceName, vipName } = VirtualService
    const virtualServerPayload: IObject = {
      'virtual-server': {
        name: vipName,
        'ip-address': vip,
      },
    }

    return httpClient.post(
      `/hccapi/v3/provider/${provider}/tenant/${tenant}/app-svc/${appServiceName}/slb/virtual-server/`,
      virtualServerPayload,
    )
  }

  createVirtualPort = () => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')
    const {
      data: { VirtualService, Vports },
    } = this.state
    const { appServiceName, vipName } = VirtualService

    const promises: Array<Promise<any>> = Vports.map(vport => {
      const {
        persistenceTemplateName,
        portNumber,
        protocol,
        serviceGroupName,
        deployment,
      } = vport
      const virtualPortPayload: IObject = {
        port: {
          'port-number': portNumber,
          protocol,
          'service-group': serviceGroupName,
          'template-persist-source-ip': persistenceTemplateName,
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
      }
      switch (deployment) {
        case 'source-nat-auto':
          virtualPortPayload.port.auto = 1
          break
        case 'dsr':
          virtualPortPayload.port['no-dest-nat'] = 1
          break
      }

      return httpClient.post(
        `/hccapi/v3/provider/${provider}/tenant/${tenant}/app-svc/${appServiceName}/slb/virtual-server/${vipName}/port`,
        virtualPortPayload,
      )
    })
    return Promise.all(promises)
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
    data: IConfigData,
    appServiceName: string,
    virtualServerName: string = null,
  ) => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')

    if (!virtualServerName) {
      return Promise.resolve()
    }

    return httpClient
      .get(
        `/hccapi/v3/provider/${provider}/tenant/${tenant}/app-svc/${appServiceName}/slb/virtual-server/${virtualServerName}`,
      )
      .then(response => {
        const { 'virtual-server': virtualServer } = response.data
        data.VirtualService.vipName = virtualServer.name
        data.VirtualService.vip = virtualServer['ip-address']
        data.Vports = _.get(virtualServer, 'port-list').map((port:IVport) => {
          let deployment = 'inline'
          if (_.get(port, 'no-dest-nat')) {
            deployment = 'dsr'
          } else if (_.get(virtualServer, 'auto')) {
            deployment = 'source-nat-auto'
          }
          const singleVPort:IVport={
            portNumber: port['port-number'],
            protocol: port.protocol,
            deployment,
            lbMethod: 'round-robin',
            serviceGroupName: _.get(port, 'service-group', ''),
            persistence: !!_.get(port, 'template-persist-source-ip', null),
            healthMonitor: false,
            members: [{ 'member-ip': '', 'member-port': null }],
            aflex: '',
            vPortConnectionLimit: false,
            vPortConnectionLimitThreshold: null,
            vPortConnectionRateLimit: false,
            vPortConnectionRateLimitThreshold: null,
            vPortIdleTimeout: false,
            vPortIdleTimeoutValue: null,
            vPortMaxOpenSession: null,
          }
          return singleVPort
        })
      })
  }

  render() {
    const { data } = this.state
    return (
      <div>
        <SLBConfigurationForm data={data} onSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default L4SLBConfig
