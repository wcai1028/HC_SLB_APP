import * as React from 'react'
import {
  A10Container,
  setupA10Container,
  IA10ContainerDefaultProps,
} from 'a10-gui-framework'
import {
  // A10Row,
  // A10Col,
  A10InputNumber,
  A10Icon,
  A10Form,
  A10Input,
  A10Switch,
  A10Collapse,
  A10Label,
  A10Select,
  A10CompoundConfigList,
} from 'a10-gui-widgets'

import A10Panel from 'src/components/ADC/A10Panel'
import A10IconTextGroup from 'src/components/ADC/A10IconTextGroup'

export interface IVport {
  portNumber: number
  protocol: string
  deployment: string
  lbMethod: string
  persistence: boolean
  healthMonitor: boolean
  members: any[]
}

export interface ISLBConfigurationFormProps {}
export interface ISLBConfigurationFormState {
  Vports: IVport[]
}

class SLBConfigurationForm extends A10Container<
  ISLBConfigurationFormProps,
  ISLBConfigurationFormState
> {
  configList: IObject[]
  constructor(props: any) {
    super(props)
    this.state = {
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

  renderVportPanel = (formItemLayout: IObject, Vports: IVport[]) => {
    return Vports.map((Vport: IVport, index: number) => {
      return (
        <>
          {Vports.length > 1 ? (
            <div
              style={{ marginLeft: '10px' }}
              className="pull-right add-another-link no-margin"
              onClick={this.removeVPort.bind(this, index)}
            >
              <span className="a10-icon remove" />
            </div>
          ) : null}

          <A10Panel
            key={`vPort-${index}`}
            title={
              <A10IconTextGroup
                text={`vPort-${index + 1}`}
                icon={<A10Icon style={{ fontSize: 48 }} type="desktop" />}
              />
            }
          >
            <A10Form.Item {...formItemLayout} label="Virtual Port">
              <A10InputNumber defaultValue={Vport.portNumber} />
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
              <A10Switch checked={Vport.persistence} />
            </A10Form.Item>
            <A10Form.Item {...formItemLayout} label="Health Monitor">
              <A10Switch checked={Vport.healthMonitor} />
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
          </A10Panel>
        </>
      )
    })
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

  render() {
    const formItemLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 13 },
    }
    const { Vports } = this.state

    return (
      <A10Form hideRequiredMark={true} layout="horizontal">
        <A10Panel
          title={
            <A10IconTextGroup
              text="Virtual Server"
              icon={<A10Icon style={{ fontSize: 48 }} type="desktop" />}
            />
          }
        >
          <A10Form.Item {...formItemLayout} label="APP Service Name">
            <A10Input />
          </A10Form.Item>
          <A10Form.Item {...formItemLayout} label="VIP">
            <A10Input />
          </A10Form.Item>

          <A10Collapse bordered={false}>
            <A10Collapse.Panel
              header={
                <>
                  <A10Label htmlFor="advance">Advance</A10Label>
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
            </A10Collapse.Panel>
          </A10Collapse>
        </A10Panel>
        {this.renderVportPanel(formItemLayout, Vports)}
        <div className="row">
          <div className="col-md-12">
            <div
              className="col-md-6 add-another-link no-margin"
              onClick={this.addVPort}
            >
              <span className="a10-icon add-another" />
              <span className="label">Add another Vport</span>
            </div>
          </div>
        </div>
      </A10Form>
    )
  }
}

export default SLBConfigurationForm
