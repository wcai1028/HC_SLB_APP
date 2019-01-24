import React from 'react'

import { A10Button, A10Form, A10Icon, A10Row, A10Col } from 'a10-gui-widgets'

import A10Panel from 'src/components/ADC/A10Panel'
import A10IconTextGroup from 'src/components/ADC/A10IconTextGroup'
import AbstractStep from '../../../AbstractStep'

export default class Review extends AbstractStep {
  onPrev = (event: React.SyntheticEvent) => {
    console.log('Review onPrev')
    event.preventDefault()
    event.stopPropagation()
    this.props.onPrev()
  }

  onNext = () => {
    console.log('Review onNext')
    this.props.onNext()
  }

  render() {
    return (
      <React.Fragment>
        <A10Panel
          title={
            <A10IconTextGroup
              text="Review"
              icon={<A10Icon style={{ fontSize: 48 }} type="desktop" />}
            />
          }
        >
          <A10Row>
            <A10Col span={12}>
              <A10Form>
                <A10Form.Item
                  label="Deployment Choice"
                  {...this.formItemLayout}
                >
                  <span>Inline</span>
                </A10Form.Item>
                <A10Form.Item label="Partition" {...this.formItemLayout}>
                  <span>Shared</span>
                </A10Form.Item>
              </A10Form>
            </A10Col>
          </A10Row>
        </A10Panel>
        <A10Panel
          title={
            <A10IconTextGroup
              text="Virtual Server"
              icon={<A10Icon style={{ fontSize: 48 }} type="desktop" />}
            />
          }
        >
          <A10Row>
            <A10Col span={12}>
              <A10Form>
                <A10Form.Item label="IP Address" {...this.formItemLayout}>
                  <span>No IP Address was provided</span>
                </A10Form.Item>
                <A10Form.Item label="Name" {...this.formItemLayout}>
                  <span>No name was provided</span>
                </A10Form.Item>
                <A10Form.Item label="Virtual Port" {...this.formItemLayout}>
                  <span>No virtual port was added</span>
                </A10Form.Item>
                <A10Form.Item label="Protocol" {...this.formItemLayout}>
                  <span>TCP</span>
                </A10Form.Item>
              </A10Form>
            </A10Col>
          </A10Row>
        </A10Panel>
        <A10Panel
          title={
            <A10IconTextGroup
              text="Virtual Server"
              icon={<A10Icon style={{ fontSize: 48 }} type="desktop" />}
            />
          }
        >
          <A10Row>
            <A10Col span={12}>
              <A10Form>
                <A10Form.Item label="IP Address" {...this.formItemLayout}>
                  <span>No IP Address was provided</span>
                </A10Form.Item>
                <A10Form.Item label="Name" {...this.formItemLayout}>
                  <span>No name was provided</span>
                </A10Form.Item>
                <A10Form.Item label="Virtual Port" {...this.formItemLayout}>
                  <span>No virtual port was added</span>
                </A10Form.Item>
                <A10Form.Item label="Protocol" {...this.formItemLayout}>
                  <span>TCP</span>
                </A10Form.Item>
              </A10Form>
            </A10Col>
          </A10Row>
        </A10Panel>
        <A10Panel
          title={
            <A10IconTextGroup
              text="Pool"
              icon={<A10Icon style={{ fontSize: 48 }} type="desktop" />}
            />
          }
        >
          <A10Row>
            <A10Col span={12}>
              <A10Form>
                <A10Form.Item label="LB Method" {...this.formItemLayout}>
                  <span>least-connections</span>
                </A10Form.Item>
                <A10Form.Item label="Persistence" {...this.formItemLayout}>
                  <span>On</span>
                </A10Form.Item>
                <A10Form.Item label="Health Monitor" {...this.formItemLayout}>
                  <span>Off</span>
                </A10Form.Item>
                <A10Form.Item label="Members" {...this.formItemLayout}>
                  <span>Please add member(s)</span>
                </A10Form.Item>
                <A10Form.Item label="Port" {...this.formItemLayout}>
                  <span>No port was added</span>
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
