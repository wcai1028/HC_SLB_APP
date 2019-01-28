import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import './styles/summaywidget.scss'

export interface ISummayWidgetProps {
  widget: any
}
export interface ISummayWidgetState {}

class SummayWidget extends A10Component<
  ISummayWidgetProps,
  ISummayWidgetState
> {
  render() {
    let className = this.props.widget.level + ' widgetData'
    return (
      <div className="summaryWidget">
        <h6 className={className}>
          {this.props.widget.data}
          <span className="widgetUnit"> {this.props.widget.unit}</span>
        </h6>
        <span className="widgetName"> {this.props.widget.name}</span>
      </div>
    )
  }
}
export default SummayWidget
