import React from 'react'

import { A10Button, A10Icon } from 'a10-gui-widgets'

import AbstractStep from '../../../AbstractStep'

export default class VirtualServerForm extends AbstractStep {
  onPrev = () => {
    console.log('Virtual Server Form onPrev')
    this.props.onPrev()
  }

  onNext = () => {
    console.log('Virtual Server Form onNext')
    this.props.onNext()
  }

  render() {
    return (
      <div>
        Virtual Server Form
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
