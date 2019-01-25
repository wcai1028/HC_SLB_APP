import React from 'react'

import {
  A10Button,
  A10Form,
  A10Icon,
  A10Input,
  A10Row,
  A10Col,
  A10Select,
  A10Switch,
} from 'a10-gui-widgets'

import A10Panel from 'src/components/shared/A10Panel'
import A10IconTextGroup from 'src/components/shared/A10IconTextGroup'
import AbstractStep from '../../../AbstractStep'

export default class ServiceGroupForm extends AbstractStep {
  onPrev = (event: React.SyntheticEvent) => {
    event.preventDefault()
    event.stopPropagation()
    this.props.onPrev()
  }

  onNext = () => {
    this.props.onNext()
  }

  render() {
    const { actions } = this.props
    return (
      <React.Fragment>
        <A10Panel
          title={
            <A10IconTextGroup
              text="Provide Service Group info.."
              icon={<A10Icon type="desktop" />}
            />
          }
        >
          <A10Row>
            <A10Col span={12}>
              <A10Form>
                <A10Form.Item label="LB Method" {...this.formItemLayout}>
                  <A10Select>
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
                  <A10Switch />
                </A10Form.Item>
                <A10Form.Item label="Health Monitor" {...this.formItemLayout}>
                  <A10Switch />
                </A10Form.Item>
                <A10Form.Item label="Servers" {...this.formItemLayout}>
                  <A10Input />
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
          <A10Button className="btn-action" onClick={actions.skipToConfigClick}>
            Skip Wizard to configuration
          </A10Button>
        </div>
      </React.Fragment>
    )
  }
}
