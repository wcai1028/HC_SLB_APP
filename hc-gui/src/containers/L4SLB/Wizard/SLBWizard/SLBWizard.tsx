import React from 'react'
import { A10Container } from 'a10-gui-framework'
import { A10Button, A10Icon, A10Steps } from 'a10-gui-widgets'

import {
  DeploymentChoice,
  DeploymentType,
  Review,
  ServiceGroup,
  VirtualServer,
} from './Steps'

interface IWizardProps {}
interface IWizardState {
  current: number
}

class SLBWizard extends A10Container<IWizardProps, IWizardState> {
  private steps = [
    {
      title: 'Deployment Choice',
      content: (
        <DeploymentChoice onChangeDeployment={this.onChangeDeployment} />
      ),
    },
    {
      title: 'Virtual Server',
      content: <VirtualServer />,
    },
    {
      title: 'Service Group',
      content: <ServiceGroup />,
    },
    {
      title: 'Review',
      content: <Review />,
    },
  ]

  constructor(props: any) {
    super(props)
    this.state = {
      current: 0,
    }
  }

  onChangeDeployment = (type: DeploymentType) => {
    console.log('onChangeDeployment')
    console.log(type)
  }

  next = () => {
    const current = this.state.current + 1
    this.setState({ current })
  }

  prev = () => {
    const current = this.state.current - 1
    this.setState({ current })
  }

  render() {
    const { current } = this.state
    const { Step } = A10Steps
    const lastStepIndex = this.steps.length - 1
    return (
      <React.Fragment>
        <h1>SLB Wizard</h1>
        <A10Steps current={current}>
          {this.steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </A10Steps>
        <div>{this.steps[current].content}</div>
        <div>
          {current > 0 && (
            <a style={{ marginRight: 50 }} onClick={this.prev}>
              <A10Icon type="double-left" />
              Back
            </a>
          )}
          {current < lastStepIndex && (
            <A10Button type="primary" onClick={() => this.next()}>
              Next
            </A10Button>
          )}
          {current === lastStepIndex && (
            <A10Button type="primary">Done</A10Button>
          )}
        </div>
      </React.Fragment>
    )
  }
}

export default SLBWizard
