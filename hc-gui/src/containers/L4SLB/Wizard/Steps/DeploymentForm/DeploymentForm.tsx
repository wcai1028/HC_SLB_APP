import React from 'react'

import { A10Row, A10Col, A10Icon } from 'a10-gui-widgets'

import AbstractStep, { IAbstractStepProps } from '../../../AbstractStep'

import A10IconTextGroup from 'src/components/ADC/A10IconTextGroup'
import { A10Panel } from 'src/components/ADC/A10Panel'

import './styles/index.less'

export type DeploymentType = 'INLINE' | 'SOURCE-NAT' | 'DSR'

const titleStyle = { fontSize: 48 }
const title = (
  <A10IconTextGroup
    text="Select a deployment choice…"
    icon={<A10Icon style={titleStyle} type="desktop" />}
  />
)
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

  onPrev = () => {
    console.log('Deployment Form onPrev')
    this.props.onPrev()
  }

  onNext = () => {
    console.log('Deployment Form onNext')
    this.props.onNext()
  }

  render() {
    const { currentDeploymentType } = this.state
    return (
      <A10Panel title={title} shouldShowTitle={true} isFormContent={true}>
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
                    currentDeploymentType === deploymentType ? 'selected' : null
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
    )
  }
}
