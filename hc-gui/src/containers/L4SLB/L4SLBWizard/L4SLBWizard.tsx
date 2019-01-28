import React from 'react'
import { A10Container } from 'a10-gui-framework'
import { Wizard } from 'src/components/shared'
import {
  VirtualServerForm,
  ServiceGroupForm,
  DeploymentForm,
  Review,
} from './Steps'
import './styles/L4SLBWizard.less'
import { IWizardData } from './interface'
interface IStep {
  title: string
  content: JSX.Element
}
interface IL4SLBWizardProps {}
interface IL4SLBWizardState {
  current: number
  data: IWizardData
}

class L4SLBWizard extends A10Container<IL4SLBWizardProps, IL4SLBWizardState> {
  private steps: IStep[]

  constructor(props: any) {
    super(props)
    this.state = {
      current: 0,
      data: {
        'app-svc': {
          name: null,
        },
        'virtual-server': {
          name: null,
          'ip-address': null,
          port: [
            {
              'port-number': null,
              protocol: 'TCP',
            },
          ],
        },
        'service-group': {
          persistence: false,
          'lb-method': 'least-connection',
          'health-check': false,
        },
        servers: [
          {
            host: null,
            port: [
              {
                'port-number': null,
              },
            ],
          },
        ],
        deployment: 'INLINE',
        cluster: null,
        partition: null,
      },
    }
    this.init()
  }

  onChange = (data: IWizardData) => {
    this.setState({ data })
  }

  render() {
    const { data } = this.state
    return (
      <div className="l4slb-wizard">
        <Wizard title="SLB Wizard" steps={this.steps} data={data} />
      </div>
    )
  }

  private init() {
    this.steps = [
      {
        title: 'Virtual Server',
        content: <VirtualServerForm onChange={this.onChange} />,
      },
      {
        title: 'Service Group',
        content: <ServiceGroupForm onChange={this.onChange} />,
      },
      {
        title: 'Deployment Association',
        content: <DeploymentForm onChange={this.onChange} />,
      },
      {
        title: 'Review',
        content: <Review />,
      },
    ]
  }
}

export default L4SLBWizard
