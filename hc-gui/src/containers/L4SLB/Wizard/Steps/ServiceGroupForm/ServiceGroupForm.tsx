import React from 'react'

import { A10Button, A10Icon } from 'a10-gui-widgets'

import AbstractStep from '../../../AbstractStep'

export default class ServiceGroupForm extends AbstractStep {
  onPrev = () => {
    console.log('Service Group Form onPrev')
    this.props.onPrev()
  }

  onNext = () => {
    console.log('Service Group Form onNext')
    this.props.onNext()
  }

  render() {
    return (
      <div>
        Service Group Form
        <div>
          <a style={{ marginRight: 50 }} onClick={this.onPrev}>
            <A10Icon type="double-left" />
            Back
          </a>
          <A10Button type="primary" onClick={this.onNext}>
            Next
          </A10Button>
        </div>
      </div>
    )
  }
}
