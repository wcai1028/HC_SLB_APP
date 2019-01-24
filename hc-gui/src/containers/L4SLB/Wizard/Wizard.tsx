import React from 'react'
import { A10Container } from 'a10-gui-framework'

import { Wizard } from '../../../components/shared'
import { VirtualServerForm, ServiceGroupForm, DeploymentForm } from './Steps/index'

interface IStep {
  title: string
  content: JSX.Element
}
interface IL4SLBWizardProps {}
interface IL4SLBWizardState {
  current: number
}

class L4SLBWizard extends A10Container<IL4SLBWizardProps, IL4SLBWizardState> {
  private steps: IStep[]

  constructor(props: any) {
    super(props)
    this.state = {
      current: 0,
    }
    this.init()
  }

  render() {
    return <Wizard title="SLB Wizard" steps={this.steps} />
  }

  private init() {
    console.log('L4SLBWizard init')
    this.steps = [
      {
        title: 'Virtual Server',
        content: <VirtualServerForm />,
      },
      {
        title: 'Service Group',
        content: <ServiceGroupForm />,
      },
      {
        title: 'Deployment Association',
        content: <DeploymentForm />,
      },
    ]
  }
}

export default L4SLBWizard
