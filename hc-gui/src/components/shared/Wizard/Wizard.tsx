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
    this.state = {
      current: 0,
      stepsForRendering: this.initStepsForRendering(),
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

  initStepsForRendering = () => {
    const { steps, data, isUpdate, ...restProps } = this.props
    const defaultProps: IAbstractStepProps = {
      onPrev: this.prev,
      onNext: this.next,
      data,
      isUpdate,
      ...restProps,
    }
    const stepsForRendering = steps.map(({ title, content }) => {
      return {
        title,
        content: React.cloneElement(content, defaultProps),
      }
    })

    return stepsForRendering
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

  componentDidUpdate(prevProps: IWizardProps, prevState: IWizardState) {
    const isDataChanged = prevProps.data !== this.props.data

    if (isDataChanged) {
      this.setState({ stepsForRendering: this.initStepsForRendering() })
    }
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
