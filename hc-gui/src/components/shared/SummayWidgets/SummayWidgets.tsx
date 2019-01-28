import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { SummayWidget } from './SummayWidget'
import './styles/summaywidgets.scss'

export interface ISummayWidgetsProps {
  widgets: any
}
export interface ISummayWidgetsState {}

class SummayWidgets extends A10Component<
  ISummayWidgetsProps,
  ISummayWidgetsState
> {
  render() {
    return this.props.widgets ? (
      <div className="display-inline widgetBackground">
        {this.props.widgets.map((key: any, index: number) => {
          return <SummayWidget widget={key} key={index} />
        })}
      </div>
    ) : null
  }
}
export default SummayWidgets
