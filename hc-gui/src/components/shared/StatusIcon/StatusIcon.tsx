import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { A10Tooltip } from 'a10-gui-widgets'

import './styles/statusicon.scss'

export interface IStatusInfo {
  background: string
  borderWidth?: number
  borderColor?: string
  tooltip?: string
}

export interface IStatusIconProps {
  status?: string
  innerText?: string
  size?: number
  statusMap?: {[key: string]: IStatusInfo}
}

export interface IStatusIconStates {
}

class StatusIcon extends A10Component<
  IStatusIconProps,
  IStatusIconStates
> {
  static defaultProps = {
    status: 'Default',
    innerText: '',
    size: 16,
    statusMap: {
      Completed: {
        background: '#7ed321',
      },
      Failed: {
        background: '#ff2e48',
      },
      InNormalProgress: {
        background: 'url("../../../assets/images/svg/hc-icons/in-normal-progress.svg")',
      },
      InAbnormalProgress: {
        background: 'url("../../../assets/images/svg/hc-icons/in-abnormal-progress.svg")',
      },
      Cancelled: {
        background: '#f5a623',
      },
      Default: {
        background: '#777777',
      }
    },
  }
  constructor(props: IStatusIconProps) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { status, innerText, size, statusMap } = this.props
    const { background, borderWidth, borderColor, tooltip } = statusMap[status]

    const tooltipProps = {
      title: tooltip,
      arrowPointAtCenter: true,
      placement: 'top',
      trigger: 'hover',
    }
    const InnerText = () => {
      return (
        innerText ?
          <span className="inner-text">
            {innerText}
          </span> : null
      )
    }

    return (
      <span
        className={`status-icon status-icon-${size}`}
        style={{
          background,
          borderWidth: borderWidth + 'px',
          borderColor,
        }}
      >
        {
          tooltip ?
          <A10Tooltip {...tooltipProps}>
            <InnerText />
          </A10Tooltip> :
          <InnerText />
        }
      </span>
    )
  }
}

export default StatusIcon
