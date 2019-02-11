import React from 'react'
import { A10Component } from 'a10-gui-framework'
import { A10Steps, A10Icon } from 'a10-gui-widgets'

import { IAbstractStepProps } from './AbstractStep'

import './styles/index.less'

export interface IStep {
  title: string
  content: JSX.Element
}

interface IWizardProps {
  title: string
  steps: IStep[]
  data?: IObject
  isUpdate?: boolean
}
interface IWizardState {
  current: number
}

interface IDotOptions {
  index: number
  status: 'wait' | 'process' | 'finish' | 'error'
  title: string | undefined
  description: string | undefined
}

class Wizard extends A10Component<IWizardProps, IWizardState> {
  constructor(props: IWizardProps) {
    super(props)
    this.state = {
      current: 0,
    }
  }

  prev = () => {
    const current = this.state.current - 1
    this.setState({ current })
  }

  next = () => {
    const current = this.state.current + 1
    this.setState({ current })
  }

  renderProgressDot = (iconDot: JSX.Element, dotOptions: IDotOptions) => {
    return (
      <div className="step">
        <div className="icon">
          {dotOptions.status === 'finish' ? (
            <A10Icon type="check" />
          ) : (
            dotOptions.index + 1
          )}
        </div>
        <div className="title">{dotOptions.title}</div>
      </div>
    )
  }

  render() {
    const { title, steps, data, isUpdate, ...restProps } = this.props
    const { current } = this.state
    const Content = steps[current].content.type
    const contentProps = steps[current].content.props
    const { Step } = A10Steps
    return (
      <div className="app-wizard">
        <h1 className="app-wizard--title">{title}</h1>
        <A10Steps
          current={current}
          labelPlacement="vertical"
          // progressDot={this.renderProgressDot}
        >
          {steps.map(step => (
            <Step key={step.title} title={step.title} />
          ))}
        </A10Steps>
        <Content
          data={data}
          isUpdate={isUpdate}
          onPrev={this.prev}
          onNext={this.next}
          {...restProps}
          {...contentProps}
        />
      </div>
    )
  }
}

export default Wizard
