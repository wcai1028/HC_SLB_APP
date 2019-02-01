import * as React from 'react'
import { Map, List } from 'immutable'
import { Link } from 'react-router-dom'
import {
  _,
  A10Container,
  setupA10Container,
  IA10ContainerDefaultProps,
  validations,
  IValidationResult,
} from 'a10-gui-framework'
import {
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
import L4SLBUtilitis from '../../Utilities/index'
import A10Panel from 'src/components/shared/A10Panel'
import A10IconTextGroup from 'src/components/shared/A10IconTextGroup'
import FormatForm from 'src/components/shared/FormatForm'
import { IVirtualService, IVport, IMember } from '../interface'
import { getItem } from 'src/libraries/storage'
import { httpClient } from 'src/libraries/httpClient'

export interface ISLBConfigurationFormProps {
  data: {
    VirtualService: IVirtualService
    Vports: IVport[]
    clusterList: string[]
    partitionList: string[]
    aflexList: string[]
    timestamp?: number
  }
  onSubmit: (data: any, ObjectList: IObject) => void
}
export interface ISLBConfigurationFormState {
  data: {
    VirtualService: IVirtualService
    Vports: IVport[]
    clusterList: string[]
    partitionList: string[]
    aflexList: string[]
    timestamp?: number
  }
  formValidations?: Map<string, IValidationResult>
}

class SLBConfigurationForm extends A10Container<
  ISLBConfigurationFormProps,
  ISLBConfigurationFormState
> {
  configList: IObject[]
  defaultValidationResult: IValidationResult = {
    validateStatus: 'success',
    help: '',
  }
  constructor(props: any) {
    super(props)
    const { data } = props
    this.state = {
      data,
      formValidations: Map<string, IValidationResult>(),
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

  componentDidMount() {
    const { data } = this.props
    this.setState({ data })
  }
  getPartitionListByCluster = (cluster: string) => {
    const provider = getItem('PROVIDER')
    httpClient
      .get(
        `/hccapi/v3/provider/${provider}/device?cluster=${cluster}&detail=true`,
      )
      .then(response => {
        if (response.data && response.data['device-list']) {
          const { data } = this.state
          let partitionList: string[] = []
          response.data['device-list'].forEach((device: IObject) => {
            const devicePartitionList = device['partition-list'] || []
            partitionList = partitionList.concat(
              devicePartitionList.map(({ name }: { name: string }) => name),
            )
          })
          data.partitionList = partitionList

          this.setState({ data })
        }
      })
  }

  onChangeCluster = (cluster: string) => {
    const { data } = this.state
    data.VirtualService.cluster = cluster
    this.setState({ data })
    this.getPartitionListByCluster(cluster)
  }

  onChangePartition = (partition: string) => {
    const { data } = this.state
    data.VirtualService.partition = partition
    this.setState({ data })
  }

  onConfigListDataChange = (index: number, currentList: any[]) => {
    const { data } = this.state
    data.Vports[index].members = currentList
    this.setState({ data })
    // console.log('index', index, 'state', this.state.Vports)
  }
  onChangeValue = (updateFunc: any, value: any) => {
    if (_.isUndefined(value)) {
      return
    }
    if (_.isNumber(value)) {
      updateFunc(value)
    } else if (
      value.target &&
      value.target.value &&
      _.isString(value.target.value)
    ) {
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
    const { data } = this.state
    if (switchName === 'hm') {
      if (e === true) {
        data.Vports[index].healthMonitor = true
      } else {
        data.Vports[index].healthMonitor = false
      }
    }
    if (switchName === 'persist') {
      if (e === true) {
        data.Vports[index].persistence = true
      } else {
        data.Vports[index].persistence = false
      }
    }
    if (
      switchName === 'vPortConnectionLimit' ||
      switchName === 'vPortConnectionRateLimit'
    ) {
      if (e !== true) {
        // uncheck == undisable
        switchName === 'vPortConnectionLimit'
          ? (data.Vports[index].vPortConnectionLimit = true)
          : (data.Vports[index].vPortConnectionRateLimit = true)
      } else {
        switchName === 'vPortConnectionLimit'
          ? (data.Vports[index].vPortConnectionLimit = false)
          : (data.Vports[index].vPortConnectionRateLimit = false)
      }
    }
    if (switchName === 'vPortIdleTimeout') {
      if (e !== true) {
        data.Vports[index].vPortIdleTimeout = true
      } else {
        data.Vports[index].vPortIdleTimeout = false
      }
    }
    this.setState({ data })
  }

  onVportInputFiledsChange = (index: number, type: string, value: any) => {
    const { data } = this.state
    switch (type) {
      case 'vPortNumber': {
        data.Vports[index].portNumber = value
        break
      }
      case 'vPortProtocol': {
        data.Vports[index].protocol = value
        break
      }
      case 'vPortDeployment': {
        data.Vports[index].deployment = value
        break
      }
      case 'vPortLbMethod': {
        data.Vports[index].lbMethod = value
        break
      }
      case 'vPortMaxOpenSession': {
        data.Vports[index].vPortMaxOpenSession = value
        break
      }
      case 'vPortConnectionLimitThreshold': {
        data.Vports[index].vPortConnectionLimitThreshold = value
        break
      }
      case 'vPortConnectionRateLimitThreshold': {
        data.Vports[index].vPortConnectionRateLimitThreshold = value
        break
      }

      case 'vPortIdleTimeoutValue': {
        data.Vports[index].vPortIdleTimeoutValue = value
        break
      }
      case 'vPortAflex': {
        data.Vports[index].aflex = value
        break
      }
    }
    this.setState({ data })
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
    const { data } = this.state
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
              {data.aflexList.map(aflex => {
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
    const { data } = this.state
    data.Vports.push({
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
      data,
    })
  }

  removeVPort = (index: number) => {
    const { data } = this.state
    data.Vports.splice(index, 1)
    this.setState({
      data,
    })
  }

  onAppServiceNameChange = (e: any) => {
    const { data } = this.state
    data.VirtualService.appServiceName = e.target.value
    this.setState({ data })
  }

  onConnectionLimitChange = (type: string, e: any) => {
    const { data } = this.state
    switch (type) {
      case 'connectionLimit': {
        if (_.isBoolean(e)) {
          // switch
          if (e === true) {
            data.VirtualService.connectionLimit = true
          } else {
            data.VirtualService.connectionLimit = false
          }
        } else if (e.target && e.target.value && _.isString(e.target.value)) {
          data.VirtualService.connectionLimitThreshold = e.target.value
        }
        break
      }
      case 'connectionRateLimit': {
        if (_.isBoolean(e)) {
          // switch
          if (e === true) {
            data.VirtualService.connectionRateLimit = true
          } else {
            data.VirtualService.connectionRateLimit = false
          }
        } else if (e.target && e.target.value && _.isString(e.target.value)) {
          data.VirtualService.connectionRateLimitThreshold = e.target.value
        }
        break
      }
    }
    this.setState({ data })
  }

  onAppIpChange = (e: any) => {
    // need to add ip check funciton here
    const { data } = this.state
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
      data.VirtualService.vip = ipAddress
      this.setState({ formValidations })
      return
    }

    formValidations = formValidations.set('vip', validationResult)
    this.setState({ formValidations })
    data.VirtualService.vip = ipAddress
    this.setState({ data })
  }

  formatVirtualService = (ObjectList: IObject) => {
    const { data } = this.state
    // generate virtualServerName
    data.VirtualService.vipName = L4SLBUtilitis.generateVirtualServerName(
      data.VirtualService.vip,
      data.timestamp,
    )
    this.formatVport(
      data.Vports,
      ObjectList.healthMonitorList,
      ObjectList.persistTempList,
      ObjectList.serverList,
    )
  }

  formatVport = (
    Vports: IVport[],
    healthMonitorList: string[],
    persistTempList: string[],
    serverList: IMember[],
  ) => {
    const { data } = this.state
    Vports.map((Vport: IVport, index: number) => {
      const { vip } = data.VirtualService
      const serviceGroupName = L4SLBUtilitis.generateServiceGroupName(
        vip,
        Vport.portNumber,
        Vport.protocol,
        data.timestamp,
      )
      Vport.serviceGroupName = serviceGroupName
      if (Vport.healthMonitor === true) {
        Vport.healthMonitorName = L4SLBUtilitis.generateHealthMonitorName(
          vip,
          Vport.portNumber,
          data.timestamp,
        )
        healthMonitorList.push(Vport.healthMonitorName)
      }
      if (Vport.persistence === true) {
        Vport.persistenceTemplateName = L4SLBUtilitis.generatePersistSourceIPTemplateName(
          vip,
          Vport.portNumber,
          data.timestamp,
        )
        persistTempList.push(Vport.persistenceTemplateName)
      }
      this.formatVportMember(Vport, serverList)
    })
    data.Vports = Vports
    this.setState({ data })
  }

  formatVportMember = (Vport: IVport, serverList: any) => {
    const { members, protocol } = Vport
    const { data } = this.state

    if (members.length > 0) {
      members.map((member: IObject, index: number) => {
        if (member['member-ip'] && member['member-port']) {
          const serverName = L4SLBUtilitis.generateServerName(
            member['member-ip'],
            data.timestamp,
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

  onRequestClose = () => {
    console.log('close')
  }
  submit = () => {
    const { onSubmit } = this.props
    const healthMonitorList: string[] = []
    const persistTempList: string[] = []
    const serverList: IMember[] = []
    const ObjectList: IObject = {
      healthMonitorList,
      persistTempList,
      serverList,
    }

    this.formatVirtualService(ObjectList)
    //  console.log('final service', this.state)
    onSubmit(this.state, ObjectList)
    // 1. create servers, logical-cluster
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 13 },
    }
    const { data, formValidations } = this.state

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
                  value={data.VirtualService.appServiceName}
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
                <A10Input
                  value={data.VirtualService.vip}
                  onChange={this.onAppIpChange}
                />
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
                      checked={data.VirtualService.connectionLimit}
                      onChange={this.onConnectionLimitChange.bind(
                        this,
                        'connectionLimit',
                      )}
                    />
                  </A10Form.Item>

                  <A10Form.Item {...formItemLayout} label="Thredshold">
                    <A10Input
                      disabled={!data.VirtualService.connectionLimit}
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
                      checked={data.VirtualService.connectionRateLimit}
                      onChange={this.onConnectionLimitChange.bind(
                        this,
                        'connectionRateLimit',
                      )}
                    />
                  </A10Form.Item>

                  <A10Form.Item {...formItemLayout} label="Thredshold">
                    <A10Input
                      disabled={!data.VirtualService.connectionRateLimit}
                      onChange={this.onConnectionLimitChange.bind(
                        this,
                        'connectionRateLimit',
                      )}
                    />
                  </A10Form.Item>
                  <A10Form.Item {...formItemLayout} label="Cluster">
                    <A10Select
                      value={data.VirtualService.cluster}
                      onChange={this.onChangeCluster}
                    >
                      {data.clusterList.map(providerCluster => {
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
                      value={data.VirtualService.partition}
                      onChange={this.onChangePartition}
                    >
                      {data.partitionList.map(devicePartition => {
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
            {this.renderVportPanel(formItemLayout, data.Vports)}
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
