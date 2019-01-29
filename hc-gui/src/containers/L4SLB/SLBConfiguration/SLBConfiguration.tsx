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

export interface IVirtualService {
  appServiceName: string
  vip: string
  vipName: string
  connectionLimit: boolean
  connectionLimitThreshold: number
  connectionRateLimit: boolean
  connectionRateLimitThreshold: number
  cluster: string
  partition: string
}
export interface IVport {
  portNumber: number
  protocol: string
  deployment: string
  lbMethod: string
  persistence: boolean
  healthMonitor: boolean
  members: any[]
  healthMonitorName?: string
  persistenceTemplateName?: string
}

export interface ISLBConfigurationFormProps {}
export interface ISLBConfigurationFormState {
  VirtualService: IVirtualService
  Vports: IVport[]
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
        connectionLimitThreshold: undefined,
        connectionRateLimit: false,
        connectionRateLimitThreshold: undefined,
        cluster: '',
        partition: '',
      },
      Vports: [
        {
          portNumber: undefined,
          protocol: 'tcp',
          deployment: 'inline',
          lbMethod: 'round-robin',
          persistence: false,
          healthMonitor: false,
          members: [],
        },
      ],
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

  onConfigListDataChange = (currentList: any[]) => {
    console.log('currentList', currentList)
  }
  onChangeValue = (updateFunc: any, newVal: any) => {
    updateFunc(newVal)
  }
  renderMemberIP = (props: IObject) => {
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
      if (e.target.checked) {
        Vports[
          index
        ].healthMonitorName = this.L4SLBUtilitis.generateHealthMonitorName(
          currentVport.portNumber,
          'hm',
        )
      } else {
        Vports[index].healthMonitorName = ''
      }
    }
    if (switchName === 'persist') {
      if (e.target.checked) {
        Vports[
          index
        ].persistenceTemplateName = this.L4SLBUtilitis.generatePersistTemplateName(
          VirtualService.vip,
          currentVport.portNumber,
          'persis',
        )
      } else {
        Vports[index].persistenceTemplateName = ''
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
              />
            </A10Form.Item>
            <A10Form.Item {...formItemLayout} label="Protocol">
              <A10Select value={Vport.protocol}>
                <A10Select.Option value="tcp">TCP</A10Select.Option>
                <A10Select.Option value="udp">UDP</A10Select.Option>
              </A10Select>
            </A10Form.Item>
            <A10Form.Item {...formItemLayout} label="Deployment">
              <A10Select value={Vport.deployment}>
                <A10Select.Option value="inline">Inline</A10Select.Option>
                <A10Select.Option value="source-nat-auto">
                  Source Nat Auto
                </A10Select.Option>
                <A10Select.Option value="dsr">DSR</A10Select.Option>
              </A10Select>
            </A10Form.Item>
            <A10Form.Item {...formItemLayout} label="LB Method">
              <A10Select value={Vport.lbMethod}>
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
                checked={Vport.persistence}
                onChange={this.handleSwitchChange.bind(this, 'persist', index)}
              />
            </A10Form.Item>
            <A10Form.Item {...formItemLayout} label="Health Monitor">
              <A10Switch
                checked={Vport.healthMonitor}
                onChange={this.handleSwitchChange.bind(this, 'hm', index)}
              />
            </A10Form.Item>
            <A10Form.Item {...formItemLayout} label="Members">
              <A10CompoundConfigList
                dataList={[{ 'member-ip': '', 'member-port': '' }]}
                configList={this.configList}
                onDataChange={this.onConfigListDataChange}
                deleteLabel={''}
                deleteSpan={3}
                equalHeight={true}
                createLabel="Add another member"
              />
            </A10Form.Item>
            {this.renderVPortAdvanceFiled(formItemLayout, Vport)}
          </A10Panel>
        </>
      )
    })
  }

  renderVPortAdvanceFiled = (formItemLayout: IObject, Vport: IVport) => {
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
            <A10Select />
          </A10Form.Item>

          <A10Form.Item {...formItemLayout} label="Connection Limit">
            <A10Input className="col-sm-8 " />
            <A10Switch defaultChecked style={{ marginLeft: '40px' }} />
            <span style={{ marginLeft: '10px' }}>Disabled</span>
          </A10Form.Item>

          <A10Form.Item {...formItemLayout} label="Connection Rate Limit">
            <A10Input className="col-sm-8 " />
            <A10Switch defaultChecked style={{ marginLeft: '40px' }} />
            <span style={{ marginLeft: '10px' }}>Disabled</span>
          </A10Form.Item>

          <A10Form.Item {...formItemLayout} label="Idle Timeout">
            <A10Input className="col-sm-8 " />
            <A10Switch defaultChecked style={{ marginLeft: '40px' }} />
            <span style={{ marginLeft: '10px' }}>Disabled</span>
          </A10Form.Item>
          <A10Form.Item {...formItemLayout} label="Max. Open Sessions">
            <A10Input className="col-sm-8 " />
          </A10Form.Item>
        </A10Collapse.Panel>
      </A10Collapse>
    )
  }

  addVPort = () => {
    const { Vports } = this.state
    Vports.push({
      portNumber: undefined,
      protocol: 'tcp',
      deployment: 'inline',
      lbMethod: 'round-robin',
      persistence: false,
      healthMonitor: false,
      members: [],
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
  onAddIpChange = (e: any) => {
    // need to add ip check funciton here
    const ipAddress = e.target.value
    let validateStatus = 'success'
    let help: string | React.ReactElement<any> = null
    if (ipAddress.length > 0 && !validations.ipv4Address.validate(ipAddress)) {
      validateStatus = 'error'
      help = validations.ipv4Address.messages.error
      const validationResult: IValidationResult = {
        validateStatus,
        help,
      }
      let { formValidations } = this.state
      formValidations = formValidations.set('vip', validationResult)
      this.setState({ formValidations })
      return
    }
    const { VirtualService } = this.state
    const virtualServer = {
      name: VirtualService.vipName,
      ip: ipAddress,
    }
    this.L4SLBUtilitis.prepopulateVipName(virtualServer, 'vip')
    VirtualService.vipName = virtualServer.name
    VirtualService.vip = ipAddress
    this.setState({ VirtualService })
    console.log('after', this.state)
  }

  formatVport = () => {
    const { Vports } = this.state
    const healthMonitorList: any = []
    const persistTempList: any = []
    const serverList: any = []
    Vports.map((Vport: IVport, index: number) => {
      debugger
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

      this.formatVportMember(Vport,serverList)
    })
  }

  formatVportMember = (Vport: IVport,serverList:any) => {
    const { members, protocol } = Vport

    if (members.length > 0) {
      members.map((member: IObject, index: number) => {
        debugger
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
          return member
        }
      })
    }
    Vport.members=members
  }

  onRequestClose=()=>{
    console.log('request close')
  }
  submit=()=>{
    this.formatVport()
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 13 },
    }
    const { Vports, formValidations } = this.state

    return (
      <div className="l4slb-wizard-config">
      <FormatForm
          title={'SLB Configuration'}
          description=""
          onRequestClose={this.onRequestClose}
          onRequestOk={this.submit}
        >
        <A10Form hideRequiredMark={true} layout="horizontal">
          <A10Row className="l4slb-wizard-config--header">
            <A10Col span={8}>
              <h1>SLB Configuration</h1>
            </A10Col>
          </A10Row>
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
                value={this.state.VirtualService.appServiceName}
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
              <A10Input onChange={this.onAddIpChange} />
            </A10Form.Item>

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
                <A10Form.Item {...formItemLayout} label="Connection Limit">
                  <A10Switch defaultChecked />
                </A10Form.Item>

                <A10Form.Item {...formItemLayout} label="Thredshold">
                  <A10Input />
                </A10Form.Item>

                <A10Form.Item {...formItemLayout} label="Connection Rate Limit">
                  <A10Switch defaultChecked />
                </A10Form.Item>

                <A10Form.Item {...formItemLayout} label="Thredshold">
                  <A10Input />
                </A10Form.Item>
                <A10Form.Item {...formItemLayout} label="Cluster">
                  <A10Select />
                </A10Form.Item>
                <A10Form.Item {...formItemLayout} label="Partition">
                  <A10Select />
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
