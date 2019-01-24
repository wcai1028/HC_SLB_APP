import React from 'react'

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
import AbstractStep from '../../../AbstractStep'

export default class VirtualServerForm extends AbstractStep {
  onPrev = (event: React.SyntheticEvent) => {
    console.log('Virtual Server Form onPrev')
    event.preventDefault()
    event.stopPropagation()
    this.props.onPrev()
  }

  onNext = () => {
    console.log('Virtual Server Form onNext')
    this.props.onNext()
  }

  render() {
    return (
      <React.Fragment>
        <A10Panel
          title={
            <A10IconTextGroup
              text="Put virtual server info.."
              icon={<A10Icon style={{ fontSize: 48 }} type="desktop" />}
            />
          }
        >
          <A10Row>
            <A10Col span={12}>
              <A10Form>
                <A10Form.Item label="App Service Name" {...this.formItemLayout}>
                  <A10Input />
                </A10Form.Item>
                <A10Form.Item label="VIP" {...this.formItemLayout}>
                  <A10Input />
                </A10Form.Item>
                <A10Form.Item label="Virtual Port" {...this.formItemLayout}>
                  <A10InputNumber />
                </A10Form.Item>
                <A10Form.Item label="Protocol" {...this.formItemLayout}>
                  <A10Select>
                    <A10Select.Option value="tcp">TCP</A10Select.Option>
                    <A10Select.Option value="udp">UDP</A10Select.Option>
                  </A10Select>
                </A10Form.Item>
              </A10Form>
            </A10Col>
          </A10Row>
        </A10Panel>
        <div>
          <a href="" className="btn-back" onClick={this.onPrev}>
            <A10Icon type="double-left" />
            Back
          </a>
          <A10Button className="btn-next" type="primary" onClick={this.onNext}>
            Next
          </A10Button>
        </div>
      </React.Fragment>
    )
  }
}
