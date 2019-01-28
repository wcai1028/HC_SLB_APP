import React from 'react'
import { Link } from 'react-router-dom'

import { A10Button, A10Form, A10Icon, A10Row, A10Col } from 'a10-gui-widgets'

import A10Panel from 'src/components/shared/A10Panel'
import A10IconTextGroup from 'src/components/shared/A10IconTextGroup'
import AbstractStep, {
  IAbstractStepProps,
} from 'src/components/shared/Wizard/AbstractStep'
import { IWizardData } from '../../interface'

import './styles/index.less'

interface IReviewProps extends IAbstractStepProps {
  data?: IWizardData
}

export default class Review extends AbstractStep<IReviewProps> {
  onPrev = (event: React.SyntheticEvent) => {
    event.preventDefault()
    event.stopPropagation()
    this.props.onPrev()
  }

  onNext = () => {
    this.props.onNext()
  }

  render() {
    const { data } = this.props
    const {
      'virtual-server': virtualServer,
      'service-group': serviceGroup,
      servers,
      partition,
    } = data

    return (
      <div className="l4slb-wizard--review">
        <A10Panel
          title={
            <A10IconTextGroup text="Review" icon={<A10Icon type="desktop" />} />
          }
        >
          <A10Row>
            <A10Col>
              <A10Form>
                <A10Form.Item
                  label="Deployment Choice"
                  {...this.formItemLayout}
                >
                  <span>{data.deployment}</span>
                </A10Form.Item>
                <A10Form.Item
                  className={`${partition ? '' : 'required'}`}
                  label="Partition"
                  {...this.formItemLayout}
                >
                  <span className={`${partition ? '' : 'no-data'}`}>
                    {`${partition ? partition : 'No partition was provided'}`}
                  </span>
                </A10Form.Item>
              </A10Form>
            </A10Col>
          </A10Row>
        </A10Panel>
        <A10Panel
          title={
            <A10IconTextGroup
              text="Virtual Server"
              icon={<A10Icon type="desktop" />}
            />
          }
        >
          <A10Row>
            <A10Col>
              <A10Form>
                <A10Form.Item
                  className={`${virtualServer['ip-address'] ? '' : 'required'}`}
                  label="IP Address"
                  {...this.formItemLayout}
                >
                  <span
                    className={`${
                      virtualServer['ip-address'] ? '' : 'no-data'
                    }`}
                  >
                    {`${
                      virtualServer['ip-address']
                        ? virtualServer['ip-address']
                        : 'No IP Address was provided'
                    }`}
                  </span>
                </A10Form.Item>
                <A10Form.Item label="Name" {...this.formItemLayout}>
                  <span>{virtualServer.name}</span>
                </A10Form.Item>
                <A10Form.Item
                  className={`${
                    virtualServer.port[0]['port-number'] ? '' : 'required'
                  }`}
                  label="Virtual Port"
                  {...this.formItemLayout}
                >
                  <span
                    className={`${
                      virtualServer.port[0]['port-number'] ? '' : 'no-data'
                    }`}
                  >
                    {`${
                      virtualServer.port[0]['port-number']
                        ? virtualServer.port[0]['port-number']
                        : 'No virtual port was added'
                    }`}
                  </span>
                </A10Form.Item>
                <A10Form.Item label="Protocol" {...this.formItemLayout}>
                  <span>{virtualServer.port[0].protocol}</span>
                </A10Form.Item>
              </A10Form>
            </A10Col>
          </A10Row>
        </A10Panel>
        <A10Panel
          title={
            <A10IconTextGroup text="Pool" icon={<A10Icon type="desktop" />} />
          }
        >
          <A10Row>
            <A10Col>
              <A10Form>
                <A10Form.Item label="LB Method" {...this.formItemLayout}>
                  <span>{serviceGroup['lb-method']}</span>
                </A10Form.Item>
                <A10Form.Item label="Persistence" {...this.formItemLayout}>
                  <span
                    className={`${
                      serviceGroup.persistence ? 'enable' : 'disable'
                    }`}
                  >
                    {serviceGroup.persistence ? 'On' : 'Off'}
                  </span>
                </A10Form.Item>
                <A10Form.Item label="Health Monitor" {...this.formItemLayout}>
                  <span
                    className={`${
                      serviceGroup['health-check'] ? 'enable' : 'disable'
                    }`}
                  >
                    {serviceGroup['health-check'] ? 'On' : 'Off'}
                  </span>
                </A10Form.Item>
                <A10Form.Item
                  label="Members"
                  className={`${
                    servers.length && servers[0].port.length ? '' : 'required'
                  }`}
                  {...this.formItemLayout}
                >
                  <span>
                    {servers.length && servers[0].port.length} Member(s) added
                  </span>
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
