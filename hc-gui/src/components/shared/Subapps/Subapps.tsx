import * as React from 'react'
import { A10Component } from 'a10-gui-framework'

import '../../../styles/base.css'

export interface ISubappsProps {
  value: any
  click: any
  isSelected?: boolean
}

class Subapps extends A10Component<ISubappsProps> {
  render() {
    const { isSelected } = this.props
    return (
      <div
        className={`sub-menu-item ${isSelected ? 'active' : ''}`}
        onClick={e => this.props.click(this.props.value.name)}
      >
        <div className={'icon menu-icon ' + this.props.value.icon} />
        <div className="menu-label">{this.props.value.name}</div>
      </div>
    )
  }
}

export default Subapps
