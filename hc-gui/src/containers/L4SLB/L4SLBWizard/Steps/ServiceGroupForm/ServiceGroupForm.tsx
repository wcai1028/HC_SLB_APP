import React from 'react'
import { Link } from 'react-router-dom'

import {
  A10Button,
  A10Form,
  A10Icon,
  A10Input,
  A10Row,
  A10Col,
  A10Select,
  A10Switch,
  A10InputNumber,
} from 'a10-gui-widgets'

import A10Panel from 'src/components/shared/A10Panel'
import A10IconTextGroup from 'src/components/shared/A10IconTextGroup'
import AbstractStep, {
  IAbstractStepProps,
} from 'src/components/shared/Wizard/AbstractStep'

import { IWizardData, LBMethod } from '../../interface'

import './styles/index.less'

interface IServiceGroupFormProps extends IAbstractStepProps {
  data?: IWizardData
}

export default class ServiceGroupForm extends AbstractStep<
  IServiceGroupFormProps
> {
  onPrev = (event: React.SyntheticEvent) => {
    event.preventDefault()
    event.stopPropagation()
    this.props.onPrev()
  }

  onNext = () => {
    this.props.onNext()
  }

  onChangeLBMethod = (method: LBMethod) => {
    const data = { ...this.props.data }
    data['service-group']['lb-method'] = method
    this.props.onChange(data)
  }

  onChangePersistence = (isChecked: boolean) => {
    const data = { ...this.props.data }
    data['service-group'].persistence = isChecked
    this.props.onChange(data)
  }

  onChangeHealthMonitor = (isChecked: boolean) => {
    const data = { ...this.props.data }
    data['service-group']['health-check'] = isChecked
    this.props.onChange(data)
  }

  onChangeServerIPAddress = (index: number) => (
    event: React.SyntheticEvent<HTMLInputElement>,
  ) => {
    const data = { ...this.props.data }
    data.servers[index].host = event.currentTarget.value
    this.props.onChange(data)
  }

  onChangeServerPort = (index: number) => (port: number) => {
    const data = { ...this.props.data }
    data.servers[index]['port-list'][0]['port-number'] = port
    this.props.onChange(data)
  }

  onClickAddServer = () => {
    const data = { ...this.props.data }
    data.servers.push({
      name: null,
      host: null,
      'port-list': [
        {
          'port-number': null,
        },
      ],
    })
    this.props.onChange(data)
  }

  onClickRemoveServer = (index: number) => () => {
    const data = { ...this.props.data }
    data.servers.splice(index, 1)
    this.props.onChange(data)
  }

  renderServers() {
    const { data } = this.props
    const { servers } = data
    const rows = servers.map((server, index: number) => {
      return (
        <div key={index}>
          <A10Row gutter={16} type="flex" align="top">
            <A10Col span={12}>
              <A10Input
                placeholder="IP address of application server"
                value={server.host}
                onChange={this.onChangeServerIPAddress(index)}
              />
            </A10Col>
            <A10Col span={4}>
              <div style={{ textAlign: 'right' }}>Port</div>
            </A10Col>
            <A10Col span={6}>
              <A10InputNumber
                value={server['port-list'][0]['port-number']}
                onChange={this.onChangeServerPort(index)}
              />
            </A10Col>
            <A10Col span={2}>
              <A10Button
                size="default"
                shape="circle"
                icon="minus"
                onClick={this.onClickRemoveServer(index)}
              />
            </A10Col>
          </A10Row>
        </div>
      )
    })

    return (
      <React.Fragment>
        {rows}
        <div>
          <span
            className="a10-configlist__addlink"
            onClick={this.onClickAddServer}
          >
            <A10Button
              className="a10-configlist__add"
              size="default"
              shape="circle"
              icon="plus"
            />
            <span>Add another Server</span>
          </span>
        </div>
      </React.Fragment>
    )
  }

  render() {
    const { data } = this.props
    return (
      <div className="l4slb-wizard--service-group">
        <A10Panel
          title={
            <A10IconTextGroup
              text="Provide Service Group info.."
              icon={<A10Icon type="desktop" />}
            />
          }
        >
          <A10Row>
            <A10Col lg={18}>
              <A10Form>
                <A10Form.Item label="LB Method" {...this.formItemLayout}>
                  <A10Select
                    value={data['service-group']['lb-method']}
                    onChange={this.onChangeLBMethod}
                  >
                    <A10Select.Option value="least-connection">
                      least-connection
                    </A10Select.Option>
                    <A10Select.Option value="round-robin">
                      round-robin
                    </A10Select.Option>
                    <A10Select.Option value="src-ip-only-hash">
                      src-ip-only-hash
                    </A10Select.Option>
                    <A10Select.Option value="service-least-connection">
                      service-least-connection
                    </A10Select.Option>
                    <A10Select.Option value="fastest-response">
                      fastest-response
                    </A10Select.Option>
                  </A10Select>
                </A10Form.Item>
                <A10Form.Item label="Persistence" {...this.formItemLayout}>
                  <A10Switch
                    checked={data['service-group'].persistence}
                    onChange={this.onChangePersistence}
                  />
                </A10Form.Item>
                <A10Form.Item label="Health Monitor" {...this.formItemLayout}>
                  <A10Switch
                    checked={data['service-group']['health-check']}
                    onChange={this.onChangeHealthMonitor}
                  />
                </A10Form.Item>
                <A10Form.Item label="Servers" {...this.formItemLayout}>
                  {this.renderServers()}
                </A10Form.Item>
              </A10Form>
            </A10Col>
          </A10Row>
        </A10Panel>
        <div className="footer">
          <a href="" className="btn-back" onClick={this.onPrev}>
            « Back
          </a>
          <A10Button className="btn-next" type="primary" onClick={this.onNext}>
            Next
          </A10Button>
          <A10Button className="btn-action">
            <Link to="/configuration">Skip Wizard to configuration</Link>
          </A10Button>
        </div>
      </div>
    )
  }
}
