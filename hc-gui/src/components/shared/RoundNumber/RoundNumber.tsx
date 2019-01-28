import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import './styles/roundnumber.scss'

export interface IRoundNumberProps {
  number: number
}
export interface IRoundNumberState {}

class RoundNumber extends A10Component<IRoundNumberProps, IRoundNumberState> {
  render() {
    return <span className="roundNumber"> {this.props.number} </span>
  }
}
export default RoundNumber
