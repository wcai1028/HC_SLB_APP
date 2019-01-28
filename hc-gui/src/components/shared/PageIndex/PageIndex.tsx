import * as React from 'react'
import { A10Component } from 'a10-gui-framework'

export interface IPageIndexProps {
  index: number
  show: boolean
  click: any
  selected: any
}
export interface IPageIndexState {
  indexes: any
}

class PageIndex extends A10Component<IPageIndexProps, IPageIndexState> {
  setIndex = () => {
    this.props.click(this.props.index)
  }
  render() {
    if (!this.props.show) {
      return null
    }
    let classname = 'pageIndex'
    if (this.props.selected) {
      classname = 'pageIndexSelected'
    }
    return (
      <span onClick={this.setIndex} className={classname}>
        {this.props.index + 1}
      </span>
    )
  }
}

export default PageIndex
