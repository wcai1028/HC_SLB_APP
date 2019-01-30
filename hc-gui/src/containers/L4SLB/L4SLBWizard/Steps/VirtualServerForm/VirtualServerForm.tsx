import React from 'react'
import { Link } from 'react-router-dom'

import {
  A10Button,
  A10Form,
  A10Icon,
  A10Input,
  A10InputNumber,
  A10Row,
  A10Col,
  A10Select,
} from 'a10-gui-widgets'

import A10Panel from 'src/components/shared/A10Panel'
import A10IconTextGroup from 'src/components/shared/A10IconTextGroup'
import AbstractStep, {
  IAbstractStepProps,
} from 'src/components/shared/Wizard/AbstractStep'
import { IWizardData } from '../../interface'

interface IVirtualServerFormProps extends IAbstractStepProps {
  data?: IWizardData
}

export default class VirtualServerForm extends AbstractStep<
  IVirtualServerFormProps
> {
  fieldKeys = {
    address: 'address',
  }

  onNext = () => {
    this.props.onNext()
  }

  onChangeAppServiceName = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const data = { ...this.props.data }
    data['app-svc'].name = event.currentTarget.value
    this.props.onChange(data)
  }

  onChangeVIP = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const data = { ...this.props.data }
    data['virtual-server']['ip-address'] = event.currentTarget.value
    this.props.onChange(data)
  }

  onChangeVPort = (port: number) => {
    const data = { ...this.props.data }
    data['virtual-server'].port[0]['port-number'] = port
    this.props.onChange(data)
  }

  onChangeProtocol = (protocol: string) => {
    const data = { ...this.props.data }
    data['virtual-server'].port[0].protocol = protocol
    this.props.onChange(data)
  }

  render() {
    const { data } = this.props
    return (
      <React.Fragment>
        <A10Panel
          title={
            <A10IconTextGroup
              text="Put virtual server info.."
              icon={<A10Icon type="desktop" />}
            />
          }
        >
          <A10Row>
            <A10Col lg={18}>
              <A10Form>
                <A10Form.Item label="App Service Name" {...this.formItemLayout}>
                  <A10Input
                    onChange={this.onChangeAppServiceName}
                    value={data['app-svc'].name}
                  />
                </A10Form.Item>
                <A10Form.Item label="VIP" {...this.formItemLayout}>
                  <A10Input
                    placeholder="Enter IP Address"
                    onChange={this.onChangeVIP}
                    value={data['virtual-server']['ip-address']}
                  />
                </A10Form.Item>
                <A10Form.Item label="Virtual Port" {...this.formItemLayout}>
                  <A10InputNumber
                    onChange={this.onChangeVPort}
                    value={data['virtual-server'].port[0]['port-number']}
                  />
                </A10Form.Item>
                <A10Form.Item label="Protocol" {...this.formItemLayout}>
                  <A10Select
                    onChange={this.onChangeProtocol}
                    value={data['virtual-server'].port[0].protocol}
                  >
                    <A10Select.Option value="tcp">TCP</A10Select.Option>
                    <A10Select.Option value="udp">UDP</A10Select.Option>
                  </A10Select>
                </A10Form.Item>
              </A10Form>
            </A10Col>
          </A10Row>
        </A10Panel>
        <div className="footer">
          <Link to="/appservice" className="btn-back">
            « Back
          </Link>
          <A10Button className="btn-next" type="primary" onClick={this.onNext}>
            Next
          </A10Button>
          <A10Button className="btn-action">
            <Link to="/configuration">Skip Wizard to configuration</Link>
          </A10Button>
        </div>
      </React.Fragment>
    )
  }
}
