import React from 'react'
import { A10Container } from 'a10-gui-framework'
import { A10Button ,A10Layout} from 'a10-gui-widgets'
import { Wizard } from 'src/components/shared'
import { SLBConfig } from '../SLBConfiguration'
import {
  VirtualServerForm,
  ServiceGroupForm,
  DeploymentForm,
  Review,
} from './Steps'
import './styles/L4SLBWizard.less'
interface IStep {
  title: string
  content: JSX.Element
}
interface IL4SLBWizardProps {}
interface IL4SLBWizardState {
  current: number
  isSkipToConfig: boolean
}

class L4SLBWizard extends A10Container<IL4SLBWizardProps, IL4SLBWizardState> {
  private steps: IStep[]

  constructor(props: any) {
    super(props)
    this.state = {
      current: 0,
      isSkipToConfig: false,
    }
    this.init()
  }

  skipToConfigClick = () => {
    this.setState({ isSkipToConfig: true })
  }

  render() {
    const { isSkipToConfig } = this.state
    const { Content } = A10Layout
    return (
      <A10Layout key="L4SLB-wizard">
        <Content className="l4slb-wizard">
          {isSkipToConfig ? (
            <SLBConfig />
          ) : (
            <>
              <Wizard title="SLB Wizard" steps={this.steps} />
              <A10Button
                className="pull-right"
                style={{ marginTop: '-50px', marginRight: '50px' }}
                onClick={this.skipToConfigClick}
              >
                Skip Wizard to configuration
              </A10Button>
            </>
          )}
        </Content>
      </A10Layout>
    )
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
      {
        title: 'Review',
        content: <Review />,
      },
    ]
  }
}

export default L4SLBWizard
