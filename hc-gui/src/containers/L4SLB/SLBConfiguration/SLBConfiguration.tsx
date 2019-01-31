import * as React from 'react'
import { Map, List } from 'immutable'
import {
  _,
  A10Container,
  setupA10Container,
  IA10ContainerDefaultProps,
  validations,
  IValidationResult,
} from 'a10-gui-framework'
import {
  A10Row,
  A10Col,
  A10InputNumber,
  A10Icon,
  A10Form,
  A10Input,
  A10Switch,
  A10Collapse,
  A10Select,
  A10CompoundConfigList,
  A10Button,
} from 'a10-gui-widgets'
import './styles/SLBConfig.less'
import { L4SLBUtilitis } from '../Utilities'
import A10Panel from 'src/components/shared/A10Panel'
import A10IconTextGroup from 'src/components/shared/A10IconTextGroup'
import FormatForm from 'src/components/shared/FormatForm'
import { IVirtualService, IVport, IMember } from './interface'
import { getItem } from 'src/libraries/storage'
import { httpClient } from 'src/libraries/httpClient'

export interface ISLBConfigurationFormProps {}
export interface ISLBConfigurationFormState {
  VirtualService: IVirtualService
  Vports: IVport[]
  clusterList: string[]
  partitionList: string[]
  aflexList: string[]
  formValidations?: Map<string, IValidationResult>
  timestamp?: number
}

class SLBConfigurationForm extends A10Container<
  ISLBConfigurationFormProps,
  ISLBConfigurationFormState
> {
  configList: IObject[]
  L4SLBUtilitis = new L4SLBUtilitis()
  defaultValidationResult: IValidationResult = {
    validateStatus: 'success',
    help: '',
  }
  constructor(props: any) {
    super(props)
    this.state = {
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
      formValidations: Map<string, IValidationResult>(),
      clusterList: [],
      partitionList: [],
      aflexList: [],
      timestamp: Date.now(),
    }
    this.configList = [
      {
        key: 'member-ip',
        defaultValue: null,
        label: 'IP Address',
        span: 10,
        offset: 0,
        renderer: this.renderMemberIP,
        conditionConfig: null,
      },
      {
        key: 'member-port',
        defaultValue: null,
        label: 'Port',
        span: 10,
        offset: 0,
        renderer: this.renderMemberPort,
        conditionConfig: null,
      },
    ]
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
          this.setState({
            aflexList: response.data['aflex-list']
              .map(({ name }: { name: string }) => name)
              .concat('None'),
          })
        }
      })
  }

  getProviderCluster = () => {
    const provider = getItem('PROVIDER')
    httpClient.get(`/hccapi/v3/provider/${provider}/cluster`).then(response => {
      if (response.data && response.data['cluster-list']) {
        this.setState({
          clusterList: response.data['cluster-list'].map(
            ({ name }: { name: string }) => name,
          ),
        })
      }
    })
  }

  getPartitionListByCluster = (cluster: string) => {
    const provider = getItem('PROVIDER')
    httpClient
      .get(
        `/hccapi/v3/provider/${provider}/device?cluster=${cluster}&detail=true`,
      )
      .then(response => {
        if (response.data && response.data['device-list']) {
          let partitionList: string[] = []
          response.data['device-list'].forEach((device: IObject) => {
            const devicePartitionList = device['partition-list'] || []
            partitionList = partitionList.concat(
              devicePartitionList.map(({ name }: { name: string }) => name),
            )
          })

          this.setState({
            partitionList,
          })
        }
      })
  }

  componentDidMount() {
    this.getProviderCluster()
    this.getAflex()
  }

  onChangeCluster = (cluster: string) => {
    const { VirtualService } = this.state
    VirtualService.cluster = cluster
    this.setState({ VirtualService })
    this.getPartitionListByCluster(cluster)
  }

  onChangePartition = (partition: string) => {
    const { VirtualService } = this.state
    VirtualService.partition = partition
    this.setState({ VirtualService })
  }

  onConfigListDataChange = (index: number, currentList: any[]) => {
    const { Vports } = this.state
    Vports[index].members = currentList
    this.setState({ Vports })
    // console.log('index', index, 'state', this.state.Vports)
  }
  onChangeValue = (updateFunc: any, value: any) => {
    if (_.isUndefined(value)) {
      return
    }
    if (_.isNumber(value)) {
      updateFunc(value)
    } else if (_.isString(value.target.value)) {
      updateFunc(value.target.value)
    }
  }
  renderMemberIP = (props: IObject) => {
    const { value, labelElement, updateValue } = props
    return (
      <div>
        {labelElement}
        <A10Input
          value={value}
          onChange={this.onChangeValue.bind(this, updateValue)}
          style={{ display: 'block', width: '80%' }}
        />
      </div>
    )
  }

  renderMemberPort = (props: IObject) => {
    const { value, labelElement, updateValue } = props
    return (
      <div>
        {labelElement}
        <A10InputNumber
          min={0}
          max={255}
          value={value}
          onChange={this.onChangeValue.bind(this, updateValue)}
          style={{ display: 'block', width: '80%' }}
        />
      </div>
    )
  }

  handleSwitchChange = (switchName: string, index: number, e: any) => {
    const { VirtualService, Vports, timestamp } = this.state
    const currentVport = Vports[index]
    if (switchName === 'hm') {
      if (e === true) {
        Vports[
          index
        ].healthMonitorName = this.L4SLBUtilitis.generateHealthMonitorName(
          currentVport.portNumber,
          'hm',
          timestamp,
        )
        Vports[index].healthMonitor = true
      } else {
        Vports[index].healthMonitorName = ''
        Vports[index].healthMonitor = false
      }
    }
    if (switchName === 'persist') {
      if (e === true) {
        Vports[
          index
        ].persistenceTemplateName = this.L4SLBUtilitis.generatePersistTemplateName(
          VirtualService.vip,
          currentVport.portNumber,
          'persis',
          timestamp,
        )
        Vports[index].persistence = true
      } else {
        Vports[index].persistenceTemplateName = ''
        Vports[index].persistence = false
      }
    }
    if (
      switchName === 'vPortConnectionLimit' ||
      switchName === 'vPortConnectionRateLimit'
    ) {
      if (e !== true) {
        // uncheck == undisable
        Vports[
          index
        ].virtualPortTemplateName = this.L4SLBUtilitis.generateVirtualPortTemplateName(
          VirtualService.vip,
          currentVport.portNumber,
          'vPortTmp',
          timestamp,
        )
        switchName === 'vPortConnectionLimit'
          ? (Vports[index].vPortConnectionLimit = true)
          : (Vports[index].vPortConnectionRateLimit = true)
      } else {
        Vports[index].virtualPortTemplateName = ''
        switchName === 'vPortConnectionLimit'
          ? (Vports[index].vPortConnectionLimit = false)
          : (Vports[index].vPortConnectionRateLimit = false)
      }
    }
    if (switchName === 'vPortIdleTimeout') {
      if (e !== true) {
        if (Vports[index].protocol === 'tcp') {
          Vports[
            index
          ].tcpTemplateName = this.L4SLBUtilitis.generateTcpORUdpTemplateName(
            VirtualService.vip,
            currentVport.portNumber,
            'tcp',
            'Tmp',
            timestamp,
          )
        } else {
          Vports[index].tcpTemplateName = ''
        }
        if (Vports[index].protocol === 'udp') {
          Vports[
            index
          ].udpTemplateName = this.L4SLBUtilitis.generateTcpORUdpTemplateName(
            VirtualService.vip,
            currentVport.portNumber,
            'udp',
            'Tmp',
            timestamp,
          )
        } else {
          Vports[index].udpTemplateName = ''
        }
        Vports[index].vPortIdleTimeout = true
      } else {
        Vports[index].tcpTemplateName = ''
        Vports[index].udpTemplateName = ''
        Vports[index].vPortIdleTimeout = false
      }
    }
    this.setState({ Vports })
  }

  onVportInputFiledsChange = (index: number, type: string, value: any) => {
    const { Vports } = this.state
    switch (type) {
      case 'vPortNumber': {
        Vports[index].portNumber = value
        break
      }
      case 'vPortProtocol': {
        Vports[index].protocol = value
        break
      }
      case 'vPortDeployment': {
        Vports[index].deployment = value
        break
      }
      case 'vPortLbMethod': {
        Vports[index].lbMethod = value
        break
      }
      case 'vPortMaxOpenSession': {
        Vports[index].vPortMaxOpenSession = value
        break
      }
      case 'vPortConnectionLimitThreshold': {
        Vports[index].vPortConnectionLimitThreshold = value
        break
      }
      case 'vPortConnectionRateLimitThreshold': {
        Vports[index].vPortConnectionRateLimitThreshold = value
        break
      }

      case 'vPortIdleTimeoutValue': {
        Vports[index].vPortIdleTimeoutValue = value
        break
      }
      case 'vPortAflex': {
        Vports[index].aflex = value
        break
      }
    }
    this.setState({ Vports })
  }

  renderVportPanel = (formItemLayout: IObject, Vports: IVport[]) => {
    return Vports.map((Vport: IVport, index: number) => {
      return (
        <>
          {Vports.length > 1 ? (
            <div
              className="pull-right add-another-link no-margin"
              onClick={this.removeVPort.bind(this, index)}
            >
              <span className="a10-icon remove" style={{ marginTop: '20px' }} />
              Remove vPort
            </div>
          ) : null}

          <A10Panel
            className="l4slb-wizard-config--panel"
            key={`vPort-${index}`}
            title={
              <A10IconTextGroup
                text={`vPort ${index + 1}`}
                icon={<A10Icon type="desktop" />}
              />
            }
          >
            <A10Form.Item {...formItemLayout} label="Virtual Port">
              <A10InputNumber
                min={0}
                max={255}
                value={Vport.portNumber}
                style={{ display: 'block', width: '100%' }}
                defaultValue={Vport.portNumber}
                onChange={this.onVportInputFiledsChange.bind(
                  this,
                  index,
                  'vPortNumber',
                )}
              />
            </A10Form.Item>
            <A10Form.Item {...formItemLayout} label="Protocol">
              <A10Select
                disabled={!Vport.portNumber}
                value={Vport.protocol}
                onChange={this.onVportInputFiledsChange.bind(
                  this,
                  index,
                  'vPortProtocol',
                )}
              >
                <A10Select.Option value="tcp">TCP</A10Select.Option>
                <A10Select.Option value="udp">UDP</A10Select.Option>
              </A10Select>
            </A10Form.Item>
            <A10Form.Item {...formItemLayout} label="Deployment">
              <A10Select
                value={Vport.deployment}
                onChange={this.onVportInputFiledsChange.bind(
                  this,
                  index,
                  'vPortDeployment',
                )}
              >
                <A10Select.Option value="inline">Inline</A10Select.Option>
                <A10Select.Option value="source-nat-auto">
                  Source Nat Auto
                </A10Select.Option>
                <A10Select.Option value="dsr">DSR</A10Select.Option>
              </A10Select>
            </A10Form.Item>
            <A10Form.Item {...formItemLayout} label="LB Method">
              <A10Select
                value={Vport.lbMethod}
                onChange={this.onVportInputFiledsChange.bind(
                  this,
                  index,
                  'vPortLbMethod',
                )}
              >
                <A10Select.Option value="least-connection">
                  Least Connection
                </A10Select.Option>
                <A10Select.Option value="round-robin">
                  Round Robin
                </A10Select.Option>
                <A10Select.Option value="src-ip-only-hash">
                  Source Ip Only Hash
                </A10Select.Option>
                <A10Select.Option value="service-least-connection">
                  Service Least Connection
                </A10Select.Option>
                <A10Select.Option value="fastest-response">
                  Fastest Response
                </A10Select.Option>
              </A10Select>
            </A10Form.Item>
            <A10Form.Item {...formItemLayout} label="Persistence">
              <A10Switch
                onChange={this.handleSwitchChange.bind(this, 'persist', index)}
              />
            </A10Form.Item>
            <A10Form.Item {...formItemLayout} label="Health Monitor">
              <A10Switch
                onChange={this.handleSwitchChange.bind(this, 'hm', index)}
              />
            </A10Form.Item>
            <A10Form.Item {...formItemLayout} label="Members">
              <A10CompoundConfigList
                dataList={Vport.members}
                configList={this.configList}
                onDataChange={this.onConfigListDataChange.bind(this, index)}
                deleteLabel={''}
                deleteSpan={3}
                equalHeight={true}
                createLabel="Add another member"
              />
            </A10Form.Item>
            {this.renderVPortAdvanceFiled(formItemLayout, Vport, index)}
          </A10Panel>
        </>
      )
    })
  }

  renderVPortAdvanceFiled = (
    formItemLayout: IObject,
    Vport: IVport,
    index: number,
  ) => {
    const { aflexList } = this.state
    return (
      <A10Collapse bordered={false}>
        <A10Collapse.Panel
          header={
            <>
              <div className="l4slb-wizard-config--collapse">Advance</div>
            </>
          }
          key="1"
          className="no-border"
        >
          <A10Form.Item {...formItemLayout} label="aFlex">
            <A10Select
              value={Vport.aflex}
              onChange={this.onVportInputFiledsChange.bind(
                this,
                index,
                'vPortAflex',
              )}
            >
              {aflexList.map(aflex => {
                return (
                  <A10Select.Option key={aflex} value={aflex}>
                    {aflex}
                  </A10Select.Option>
                )
              })}
            </A10Select>
          </A10Form.Item>

          <A10Form.Item {...formItemLayout} label="Connection Limit">
            <A10InputNumber
              disabled={!Vport.vPortConnectionLimit}
              className="col-sm-8 "
              onChange={this.onVportInputFiledsChange.bind(
                this,
                index,
                'vPortConnectionLimitThreshold',
              )}
            />
            <A10Switch
              checked={!Vport.vPortConnectionLimit}
              onChange={this.handleSwitchChange.bind(
                this,
                'vPortConnectionLimit',
                index,
              )}
              style={{ marginLeft: '40px' }}
            />
            <span style={{ marginLeft: '10px' }}>Disabled</span>
          </A10Form.Item>

          <A10Form.Item {...formItemLayout} label="Connection Rate Limit">
            <A10InputNumber
              disabled={!Vport.vPortConnectionRateLimit}
              className="col-sm-8 "
              onChange={this.onVportInputFiledsChange.bind(
                this,
                index,
                'vPortConnectionRateLimitThreshold',
              )}
            />
            <A10Switch
              checked={!Vport.vPortConnectionRateLimit}
              onChange={this.handleSwitchChange.bind(
                this,
                'vPortConnectionRateLimit',
                index,
              )}
              style={{ marginLeft: '40px' }}
            />
            <span style={{ marginLeft: '10px' }}>Disabled</span>
          </A10Form.Item>

          <A10Form.Item {...formItemLayout} label="Idle Timeout">
            <A10InputNumber
              disabled={!Vport.vPortIdleTimeout}
              className="col-sm-8 "
              onChange={this.onVportInputFiledsChange.bind(
                this,
                index,
                'vPortIdleTimeoutValue',
              )}
            />
            <A10Switch
              checked={!Vport.vPortIdleTimeout}
              onChange={this.handleSwitchChange.bind(
                this,
                'vPortIdleTimeout',
                index,
              )}
              style={{ marginLeft: '40px' }}
            />
            <span style={{ marginLeft: '10px' }}>Disabled</span>
          </A10Form.Item>
          <A10Form.Item {...formItemLayout} label="Max. Open Sessions">
            <A10InputNumber
              className="col-sm-8 "
              value={Vport.vPortMaxOpenSession}
              onChange={this.onVportInputFiledsChange.bind(
                this,
                index,
                'vPortMaxOpenSession',
              )}
            />
          </A10Form.Item>
        </A10Collapse.Panel>
      </A10Collapse>
    )
  }

  addVPort = () => {
    const { Vports } = this.state
    Vports.push({
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
    })
    this.setState({
      Vports,
    })
  }

  removeVPort = (index: number) => {
    const { Vports } = this.state
    Vports.splice(index, 1)
    this.setState({
      Vports,
    })
  }

  onAppServiceNameChange = (e: any) => {
    const { VirtualService } = this.state
    VirtualService.appServiceName = e.target.value
    this.setState({ VirtualService })
  }

  onConnectionLimitChange = (type: string, e: any) => {
    const { VirtualService } = this.state
    switch (type) {
      case 'connectionLimit': {
        if (_.isBoolean(e)) {
          // switch
          if (e === true) {
            VirtualService.connectionLimit = true
          } else {
            VirtualService.connectionLimit = false
          }
        } else if (e.target && e.target.value && _.isString(e.target.value)) {
          VirtualService.connectionLimitThreshold = e.target.value
        }
        break
      }
      case 'connectionRateLimit': {
        if (_.isBoolean(e)) {
          // switch
          if (e === true) {
            VirtualService.connectionRateLimit = true
          } else {
            VirtualService.connectionRateLimit = false
          }
        } else if (e.target && e.target.value && _.isString(e.target.value)) {
          VirtualService.connectionRateLimitThreshold = e.target.value
        }
        break
      }
    }
    this.setState({ VirtualService })
  }

  onAppIpChange = (e: any) => {
    // need to add ip check funciton here
    const ipAddress = e.target.value
    let validateStatus = 'success'
    let help: string | React.ReactElement<any> = null
    let { formValidations } = this.state
    let validationResult: IValidationResult = { validateStatus, help }
    if (ipAddress.length > 0 && !validations.ipv4Address.validate(ipAddress)) {
      validateStatus = 'error'
      help = validations.ipv4Address.messages.error
      validationResult = {
        validateStatus,
        help,
      }
      formValidations = formValidations.set('vip', validationResult)
      this.setState({ formValidations })
      return
    }

    formValidations = formValidations.set('vip', validationResult)
    this.setState({ formValidations })
    const { VirtualService, timestamp } = this.state

    VirtualService.vipName = this.L4SLBUtilitis.generateNameByIP(
      ipAddress,
      'vip',
      null,
      timestamp,
    )
    VirtualService.vip = ipAddress
    VirtualService.logicalClusterName = this.L4SLBUtilitis.generateNameByIP(
      ipAddress,
      'logical-cluster',
      null,
      timestamp,
    )
    this.setState({ VirtualService })
  }

  formatVirtualService = () => {
    const { Vports } = this.state
    const healthMonitorList: string[] = []
    const persistTempList: string[] = []
    const serverList: IMember[] = []
    this.formatVport(Vports, healthMonitorList, persistTempList, serverList)
    const promises: Array<Promise<any>> = [
      this.createLogicalCluster(),
      this.createServers(serverList),
      this.createHealthMonitor(healthMonitorList),
      this.createPersistSourceIP(persistTempList),
    ]

    Promise.all(promises)
      .then(this.createServerPorts.bind(this, serverList))
      .then(this.createAppService)
      .then(this.createServiceGroup)
      .then(this.createVirtualServer)
      .then(this.createVirtualPort)

  }

  formatVport = (
    Vports: IVport[],
    healthMonitorList: string[],
    persistTempList: string[],
    serverList: IMember[],
  ) => {
    Vports.map((Vport: IVport, index: number) => {
      const { VirtualService, timestamp } = this.state
      const { vip } = VirtualService
      const serviceGroupName = this.L4SLBUtilitis.generateServiceGroupName(
        vip,
        Vport.portNumber,
        Vport.protocol,
        'sg',
        timestamp,
      )
      Vport.serviceGroupName = serviceGroupName
      if (Vport.healthMonitor === true && !_.isEmpty(Vport.healthMonitorName)) {
        healthMonitorList.push(Vport.healthMonitorName)
      }
      if (
        Vport.persistence === true &&
        !_.isEmpty(Vport.persistenceTemplateName)
      ) {
        persistTempList.push(Vport.persistenceTemplateName)
      }
      this.formatVportMember(Vport, serverList)
    })
    this.setState({ Vports })
  }

  formatVportMember = (Vport: IVport, serverList: any) => {
    const { members, protocol } = Vport
    const { timestamp } = this.state

    if (members.length > 0) {
      members.map((member: IObject, index: number) => {
        if (member['member-ip'] && member['member-port']) {
          const serverName = this.L4SLBUtilitis.generateServerName(
            member['member-ip'],
            'srv',
            timestamp,
          )
          member.serverName = serverName
          member.protocol = protocol
          serverList.push(member)
        }
        return member
      })
    }
    Vport.members = members
  }

  createLogicalCluster = () => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')
    const { VirtualService } = this.state
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
    const { VirtualService } = this.state
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
    const { Vports, VirtualService } = this.state
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
    const { VirtualService } = this.state
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
    const { VirtualService, Vports } = this.state
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

  onRequestClose = () => {
    console.log('request close')
  }
  submit = () => {
    this.formatVirtualService()
    console.log('final service', this.state)
    // 1. create servers, logical-cluster
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 13 },
    }
    const {
      Vports,
      formValidations,
      clusterList,
      partitionList,
      VirtualService,
    } = this.state

    return (
      <div className="l4slb-wizard-config">
        <FormatForm
          title={'SLB Configuration'}
          description=""
          onRequestClose={this.onRequestClose}
          onRequestOk={this.submit}
        >
          <A10Form hideRequiredMark={true} layout="horizontal">
            <A10Panel
              className="l4slb-wizard-config--panel"
              title={
                <A10IconTextGroup
                  text="Virtual Server"
                  icon={<A10Icon type="desktop" />}
                />
              }
            >
              <A10Form.Item {...formItemLayout} label="App Service Name">
                <A10Input
                  value={VirtualService.appServiceName}
                  onChange={this.onAppServiceNameChange}
                />
              </A10Form.Item>
              <A10Form.Item
                {...formItemLayout}
                label="VIP"
                validateStatus={
                  formValidations.get('vip', this.defaultValidationResult)
                    .validateStatus
                }
                help={
                  formValidations.get('vip', this.defaultValidationResult).help
                }
              >
                <A10Input onChange={this.onAppIpChange} />
              </A10Form.Item>

              <A10Collapse bordered={false}>
                <A10Collapse.Panel
                  header={
                    <>
                      <div className="l4slb-wizard-config--collapse">
                        Advance
                      </div>
                    </>
                  }
                  key="1"
                  className="no-border"
                >
                  <A10Form.Item {...formItemLayout} label="Connection Limit">
                    <A10Switch
                      checked={VirtualService.connectionLimit}
                      onChange={this.onConnectionLimitChange.bind(
                        this,
                        'connectionLimit',
                      )}
                    />
                  </A10Form.Item>

                  <A10Form.Item {...formItemLayout} label="Thredshold">
                    <A10Input
                      disabled={!VirtualService.connectionLimit}
                      onChange={this.onConnectionLimitChange.bind(
                        this,
                        'connectionLimit',
                      )}
                    />
                  </A10Form.Item>

                  <A10Form.Item
                    {...formItemLayout}
                    label="Connection Rate Limit"
                  >
                    <A10Switch
                      checked={VirtualService.connectionRateLimit}
                      onChange={this.onConnectionLimitChange.bind(
                        this,
                        'connectionRateLimit',
                      )}
                    />
                  </A10Form.Item>

                  <A10Form.Item {...formItemLayout} label="Thredshold">
                    <A10Input
                      disabled={!VirtualService.connectionRateLimit}
                      onChange={this.onConnectionLimitChange.bind(
                        this,
                        'connectionRateLimit',
                      )}
                    />
                  </A10Form.Item>
                  <A10Form.Item {...formItemLayout} label="Cluster">
                    <A10Select
                      value={VirtualService.cluster}
                      onChange={this.onChangeCluster}
                    >
                      {clusterList.map(providerCluster => {
                        return (
                          <A10Select.Option
                            key={providerCluster}
                            value={providerCluster}
                          >
                            {providerCluster}
                          </A10Select.Option>
                        )
                      })}
                    </A10Select>
                  </A10Form.Item>
                  <A10Form.Item {...formItemLayout} label="Partition">
                    <A10Select
                      value={VirtualService.partition}
                      onChange={this.onChangePartition}
                    >
                      {partitionList.map(devicePartition => {
                        return (
                          <A10Select.Option
                            key={devicePartition}
                            value={devicePartition}
                          >
                            {devicePartition}
                          </A10Select.Option>
                        )
                      })}
                    </A10Select>
                  </A10Form.Item>
                </A10Collapse.Panel>
              </A10Collapse>
            </A10Panel>
            {this.renderVportPanel(formItemLayout, Vports)}
            <A10Button
              onClick={this.addVPort}
              className="ant-btn action-button ant-btn-lg"
            >
              <A10Icon app="global" type="add-another" />
              <span style={{ marginLeft: '10px' }}>Add another vPort</span>
            </A10Button>
          </A10Form>
        </FormatForm>
      </div>
    )
  }
}

export default SLBConfigurationForm
