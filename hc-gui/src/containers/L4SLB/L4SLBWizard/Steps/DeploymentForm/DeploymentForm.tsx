import React from 'react'

import {
  A10Button,
  A10Form,
  A10Icon,
  A10Row,
  A10Col,
  A10Select,
} from 'a10-gui-widgets'

import AbstractStep, { IAbstractStepProps } from '../../../AbstractStep'

import A10IconTextGroup from 'src/components/shared/A10IconTextGroup'
import { A10Panel } from 'src/components/shared/A10Panel'

import './styles/index.less'

export type DeploymentType = 'INLINE' | 'SOURCE-NAT' | 'DSR'

const deploymentTypes = [
  { deploymentType: 'INLINE', topology: 'inline' },
  {
    deploymentType: 'SOURCE-NAT',
    topology: 'source-nat',
  },
  { deploymentType: 'DSR', topology: 'dsr' },
]

interface IDeploymentFormProps extends IAbstractStepProps {}

interface IDeploymentFormState {
  currentDeploymentType: DeploymentType
}

export default class DeploymentForm extends AbstractStep<
  IDeploymentFormProps,
  IDeploymentFormState
> {
  constructor(props: IDeploymentFormProps) {
    super(props)
    this.state = {
      currentDeploymentType: 'INLINE',
    }
  }

  shouldComponentUpdate(
    nextProps: Readonly<IDeploymentFormProps>,
    nextState: Readonly<IDeploymentFormState>,
  ) {
    return nextState.currentDeploymentType !== this.state.currentDeploymentType
  }

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
    const { currentDeploymentType } = this.state
    return (
      <React.Fragment>
        <A10Panel
          title={
            <A10IconTextGroup
              text="Select a deployment choice…"
              icon={<A10Icon type="desktop" />}
            />
          }
          shouldShowTitle={true}
          isFormContent={true}
        >
          <A10Row
            type="flex"
            justify="space-around"
            gutter={16}
            className="slb-wizard--deployment-list"
          >
            {deploymentTypes.map(({ deploymentType, topology }) => {
              return (
                <A10Col span={8} key={deploymentType}>
                  <div
                    className={`slb-wizard--deployment-type ${
                      currentDeploymentType === deploymentType
                        ? 'selected'
                        : null
                    }`}
                  >
                    <div>
                      <span>{deploymentType}</span>
                      {currentDeploymentType === deploymentType ? (
                        <A10Icon app="global" type="success-green" />
                      ) : null}
                    </div>
                    <div
                      className={`slb-wizard--deployment-topology ${topology}`}
                    />
                  </div>
                </A10Col>
              )
            })}
          </A10Row>
        </A10Panel>
        <A10Panel
          title={
            <A10IconTextGroup
              text="Associate Cluster & Partition…"
              icon={<A10Icon type="desktop" />}
            />
          }
          shouldShowTitle={true}
          isFormContent={true}
        >
          <A10Row>
            <A10Col span={12}>
              <A10Form>
                <A10Form.Item label="Cluster" {...this.formItemLayout}>
                  <A10Select />
                </A10Form.Item>
                <A10Form.Item label="Partition" {...this.formItemLayout}>
                  <A10Select />
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
