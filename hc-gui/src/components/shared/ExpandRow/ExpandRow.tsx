import * as React from 'react'
import { _ } from 'a10-gui-framework'
import { A10Switch } from 'a10-gui-widgets'

import './styles/index.less'

export interface IExpandRowProps {
  title: string | React.ReactNode
  checkAll?: boolean
  supportToggle?: boolean
  toggleValue?: boolean
  onToggle?: (on: boolean) => void
  onExpand?: (on: boolean) => void
  disableToggle?: boolean
}

export interface IExpandRowState {
  expanded: boolean
}

class ExpandRow extends React.Component<IExpandRowProps, IExpandRowState> {
  static defaultProps = {
    supportToggle: false,
  }

  constructor(props: any) {
    super(props)
    this.state = {
      expanded: false,
    }
  }

  onExpand = () => {
    const { onExpand = _.noop } = this.props
    this.setState({ expanded: !this.state.expanded }, () => {
      onExpand(this.state.expanded)
    })
  }

  renderExpandContent = () => {
    return <div className="expand-row-content">{this.props.children}</div>
  }

  render() {
    const {
      title,
      checkAll,
      supportToggle,
      onToggle,
      toggleValue,
      disableToggle,
    } = this.props
    const { expanded } = this.state
    const expandIconClassNames = `expand-row-icon expand-row-${
      expanded ? 'expanded' : 'collapsed'
    }`
    return (
      <div className="expand-row">
        <div className="expand-row-header">
          {supportToggle ? (
            <A10Switch
              checked={toggleValue}
              onChange={onToggle}
              disabled={disableToggle}
              defaultChecked={toggleValue}
            />
          ) : null}
          <div className="expand-row-header-icon">
            <span className={expandIconClassNames} onClick={this.onExpand} />
          </div>
          <div
            className={`expand-row-header-title ${expanded ? 'actived' : ''}`}
            onClick={this.onExpand}
          >
            {title}
          </div>
        </div>
        {expanded ? this.renderExpandContent() : undefined}
      </div>
    )
  }
}

export default ExpandRow
