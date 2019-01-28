import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { PageIndex } from '../PageIndex'

export interface IPageIndexerProps {
  indexes: any
  click: any
  selectedIndex: number
}
export interface IPageIndexerState {
  indexes: any
}

class PageIndexer extends A10Component<IPageIndexerProps, IPageIndexerState> {
  state = {
    indexes: this.props.indexes,
  }
  componentWillReceiveProps(props: any) {
    this.setState({
      indexes: props.indexes,
    })
  }
  setFirst = () => {
    this.props.click(0)
  }
  setLast = () => {
    this.props.click(this.props.indexes[this.props.indexes.length - 1])
  }
  getShow = (key: any) => {
    if (this.props.indexes.length <= 3) {
      return true
    } else if (key === this.props.selectedIndex - 1) {
      return true
    } else if (key === this.props.selectedIndex + 1) {
      return true
    } else if (key === this.props.selectedIndex) {
      return true
    }
    if (
      this.props.selectedIndex === this.props.indexes[0] &&
      key === this.props.selectedIndex + 2
    ) {
      return true
    }
    if (
      this.props.selectedIndex ===
        this.props.indexes[this.props.indexes.length - 1] &&
      key === this.props.selectedIndex - 2
    ) {
      return true
    }
    return false
  }
  render() {
    return (
      <div className="pageIndexer">
        {this.props.selectedIndex > 2 ? (
          <span onClick={this.setFirst} className="pageIndex">
            {'<<'}First
          </span>
        ) : null}
        {this.props.indexes.length > 0
          ? this.props.indexes.map((key: any) => {
              return (
                <PageIndex
                  click={this.props.click}
                  key={key}
                  index={key}
                  selected={key === this.props.selectedIndex}
                  show={this.getShow(key)}
                />
              )
            })
          : null}
        {this.props.selectedIndex <
        this.props.indexes[this.props.indexes.length - 1] - 2 ? (
          <span onClick={this.setLast} className="pageIndex">
            Last{'>>'}
          </span>
        ) : null}
      </div>
    )
  }
}

export default PageIndexer
