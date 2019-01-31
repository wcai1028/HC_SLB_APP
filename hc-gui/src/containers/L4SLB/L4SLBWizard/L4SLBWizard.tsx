import React from 'react'
import { RouteComponentProps } from 'react-router'

import { _, A10Container } from 'a10-gui-framework'
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
interface IL4SLBWizardProps extends RouteComponentProps {}
interface IL4SLBWizardState {
  isUpdate: boolean
  current: number
  data: IWizardData
}

class L4SLBWizard extends A10Container<IL4SLBWizardProps, IL4SLBWizardState> {
  private steps: IStep[]

  constructor(props: IL4SLBWizardProps) {
    super(props)
    const {
      match: { params },
    } = this.props
    const { appServiceName } = params as IObject
    this.state = {
      isUpdate: _.isString(appServiceName),
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
              protocol: 'tcp',
            },
          ],
        },
        'service-group': {
          name: null,
          persistence: false,
          'lb-method': 'least-connection',
          'health-check': false,
        },
        servers: [
          {
            name: null,
            host: null,
            'port-list': [
              {
                'port-number': null,
              },
            ],
          },
        ],
        template: {
          persist: {
            'source-ip': {
              name: null,
            },
          },
        },
        'health.monitor': {
          name: null,
        },
        'logical-cluster': {
          name: null,
          'physical-cluster-list': [
            {
              cluster: null,
              partition: null,
            },
          ],
        },
        deployment: 'INLINE',
      },
    }
    this.init()
  }

  onChange = (data: IWizardData) => {
    this.setState({ data })
  }

  render() {
    const { isUpdate } = this.state
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
