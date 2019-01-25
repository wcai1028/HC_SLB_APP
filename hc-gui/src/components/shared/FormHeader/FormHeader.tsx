import * as React from 'react'
import { A10Component } from 'a10-gui-framework'

export interface IFormHeaderProps {
  label: string
}
export interface IFormHeaderState {}

class FormHeader extends A10Component<IFormHeaderProps, IFormHeaderState> {
  render() {
    return <h3 className="formHeader ">{this.props.label}</h3>
  }
}
export default FormHeader
