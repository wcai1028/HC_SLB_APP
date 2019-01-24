import React from 'react'
import { A10Component } from 'a10-gui-framework'
import { A10Steps, A10Icon } from 'a10-gui-widgets'

import { IAbstractStepProps } from '../../AbstractStep'

import './styles/index.less'

export interface IStep {
  title: string
  content: JSX.Element
}

interface IWizardProps {
  title: string
  steps: IStep[]
}
interface IWizardState {
  current: number
  stepsForRendering: IStep[]
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

    const defaultProps: IAbstractStepProps = {
      onPrev: this.prev,
      onNext: this.next,
    }
    const stepsForRendering = props.steps.map(({ title, content }) => {
      return {
        title,
        content: React.cloneElement(content, defaultProps),
      }
    })

    this.state = {
      current: 0,
      stepsForRendering,
    }
  }

  prev = () => {
    console.log('Wizard prev')
    const current = this.state.current - 1
    this.setState({ current })
  }

  next = () => {
    console.log('Wizard next')
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
    const { title } = this.props
    const { stepsForRendering, current } = this.state
    const { Step } = A10Steps
    return (
      <div className="app-wizard">
        <h1 className="app-wizard--title">{title}</h1>
        <A10Steps
          current={current}
          labelPlacement="vertical"
          progressDot={this.renderProgressDot}
        >
          {stepsForRendering.map(step => (
            <Step key={step.title} title={step.title} />
          ))}
        </A10Steps>
        <div>{stepsForRendering[current].content}</div>
      </div>
    )
  }
}

export default Wizard
