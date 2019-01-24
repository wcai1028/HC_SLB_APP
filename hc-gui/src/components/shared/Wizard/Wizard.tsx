import React from 'react'
import { A10Component } from 'a10-gui-framework'
import { A10Steps } from 'a10-gui-widgets'

import { IAbstractStepProps } from '../../AbstractStep'

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

  render() {
    const { title } = this.props
    const { stepsForRendering, current } = this.state
    const { Step } = A10Steps
    return (
      <React.Fragment>
        <h1>{title}</h1>
        <A10Steps current={current}>
          {stepsForRendering.map(step => (
            <Step key={step.title} title={step.title} />
          ))}
        </A10Steps>
        <div>{stepsForRendering[current].content}</div>
      </React.Fragment>
    )
  }
}

export default Wizard
