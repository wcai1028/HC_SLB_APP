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
import { IVirtualService, IVport } from './interface'
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
      },
      Vports: [
        {
          portNumber: null,
          protocol: 'tcp',
          deployment: 'inline',
          lbMethod: 'round-robin',
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
            aflexList: response.data['aflex-list'].map(
              ({ name }: { name: string }) => name,
            ),
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
  onChangeAflex = (index: number, aflex: string) => {
    const { Vports } = this.state
    Vports[index].aflex = aflex
    this.setState({ Vports })
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
    const { VirtualService, Vports } = this.state
    const currentVport = Vports[index]
    if (switchName === 'hm') {
      if (e === true) {
        Vports[
          index
        ].healthMonitorName = this.L4SLBUtilitis.generateHealthMonitorName(
          currentVport.portNumber,
          'hm',
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
      if (e === true) {
        Vports[
          index
        ].virtualPortTemplateName = this.L4SLBUtilitis.generateVirtualPortTemplateName(
          VirtualService.vip,
          currentVport.portNumber,
          'vPortTmp',
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
      if (e === true) {
        if (Vports[index].protocol === 'tcp') {
          Vports[
            index
          ].tcpTemplateName = this.L4SLBUtilitis.generateTcpORUdpTemplateName(
            VirtualService.vip,
            currentVport.portNumber,
            'tcp',
            'Tmp',
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

  onVportNumberChange = (index: number, value: number) => {
    const { Vports } = this.state

    Vports[index].portNumber = value
    this.setState({ Vports })
  }

  onVportProtocolChange = (index: number, value: string) => {
    const { Vports } = this.state

    Vports[index].protocol = value
    this.setState({ Vports })
  }
  onVportDeploymentChange = (index: number, value: string) => {
    const { Vports } = this.state

    Vports[index].deployment = value
    this.setState({ Vports })
  }
  onVportLbMethodChange = (index: number, value: string) => {
    const { Vports } = this.state

    Vports[index].lbMethod = value
    this.setState({ Vports })
  }

  onVPortMaxOpenSessionChange = (index: number, value: number) => {
    const { Vports } = this.state
    Vports[index].vPortMaxOpenSession = value
    this.setState({ Vports })
  }
  onvPortConnectionLimitInputChange = (index: number, value: number) => {
    const { Vports } = this.state
    Vports[index].vPortConnectionLimitThreshold = value
    this.setState({ Vports })
  }

  onvPortConnectionRateLimitInputChange = (index: number, value: number) => {
    const { Vports } = this.state
    Vports[index].vPortConnectionRateLimitThreshold = value
    this.setState({ Vports })
  }
  onvPortIdleTimeoutInputChange = (index: number, value: number) => {
    const { Vports } = this.state
    Vports[index].vPortIdleTimeoutValue = value
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
                onChange={this.onVportNumberChange.bind(this, index)}
              />
            </A10Form.Item>
            <A10Form.Item {...formItemLayout} label="Protocol">
              <A10Select
                disabled={!Vport.portNumber}
                value={Vport.protocol}
                onChange={this.onVportProtocolChange.bind(this, index)}
              >
                <A10Select.Option value="tcp">TCP</A10Select.Option>
                <A10Select.Option value="udp">UDP</A10Select.Option>
              </A10Select>
            </A10Form.Item>
            <A10Form.Item {...formItemLayout} label="Deployment">
              <A10Select
                value={Vport.deployment}
                onChange={this.onVportDeploymentChange.bind(this, index)}
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
                onChange={this.onVportLbMethodChange.bind(this, index)}
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
              onChange={this.onChangeAflex.bind(this, index)}
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
              className="col-sm-8 "
              onChange={this.onvPortConnectionLimitInputChange.bind(
                this,
                index,
              )}
            />
            <A10Switch
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
              className="col-sm-8 "
              onChange={this.onvPortConnectionRateLimitInputChange.bind(
                this,
                index,
              )}
            />
            <A10Switch
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
              className="col-sm-8 "
              onChange={this.onvPortIdleTimeoutInputChange.bind(this, index)}
            />
            <A10Switch
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
              onChange={this.onVPortMaxOpenSessionChange.bind(this, index)}
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

  onConnectionLimitChange = (e: any) => {
    const { VirtualService } = this.state
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
    this.setState({ VirtualService })
  }

  onConnectionRateLimitChange = (e: any) => {
    const { VirtualService } = this.state
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
    const { VirtualService } = this.state
    const virtualServer = {
      name: VirtualService.vipName,
      ip: ipAddress,
    }
    this.L4SLBUtilitis.prepopulateVipName(virtualServer, 'vip')
    VirtualService.vipName = virtualServer.name
    VirtualService.vip = ipAddress
    this.setState({ VirtualService })
  }

  formatVport = () => {
    const { Vports } = this.state
    const healthMonitorList: any = []
    const persistTempList: any = []
    const serverList: any = []
    Vports.map((Vport: IVport, index: number) => {
      if (Vport.healthMonitor === true && !_.isEmpty(Vport.healthMonitorName)) {
        const hmObject = {
          monitor: {
            name: Vport.healthMonitorName,
          },
        }
        healthMonitorList.push(hmObject)
      }
      if (
        Vport.persistence === true &&
        !_.isEmpty(Vport.persistenceTemplateName)
      ) {
        const persistObject = {
          'source-ip': {
            name: Vport.persistenceTemplateName,
          },
        }
        persistTempList.push(persistObject)
      }

      this.formatVportMember(Vport, serverList)
    })
    this.setState({Vports})
    console.log(this.state)
  }

  formatVportMember = (Vport: IVport, serverList: any) => {
    const { members, protocol } = Vport
    if (members.length > 0) {
      members.map((member: IObject, index: number) => {
        if (member['member-ip'] && member['member-port']) {
          const serverName = this.L4SLBUtilitis.generateServerName(
            member['member-ip'],
            'srv',
          )
          member.serverName = serverName

          const serverObj = {
            server: {
              name: serverName,
              host: member['member-ip'],
              'port-list': [
                {
                  'port-number': member['member-port'],
                  protocol,
                  'health-check': 'ping',
                  'conn-limit': 6400000,
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
          }

          serverList.push(serverObj)
        }
        return member
      })
    }
    Vport.members = members
  }

  onRequestClose = () => {
    console.log('request close')
  }
  submit = () => {
    this.formatVport()
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
                    <A10Switch onChange={this.onConnectionLimitChange} />
                  </A10Form.Item>

                  <A10Form.Item {...formItemLayout} label="Thredshold">
                    <A10Input
                      disabled={!VirtualService.connectionLimit}
                      onChange={this.onConnectionLimitChange}
                    />
                  </A10Form.Item>

                  <A10Form.Item
                    {...formItemLayout}
                    label="Connection Rate Limit"
                  >
                    <A10Switch onChange={this.onConnectionRateLimitChange} />
                  </A10Form.Item>

                  <A10Form.Item {...formItemLayout} label="Thredshold">
                    <A10Input
                      disable={!VirtualService.connectionRateLimit}
                      onChange={this.onConnectionRateLimitChange}
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
