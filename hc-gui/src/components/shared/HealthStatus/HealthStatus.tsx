import React from 'react'

import { A10Tooltip } from 'a10-gui-widgets'

import './styles/index.less'

export interface IHealthStatusProps {
  type: 'ongoing' | 'stopped'
  tooltip: string
  text: string
  description?: string
}

export default (props: IHealthStatusProps) => {
  const { type, text, tooltip, description } = props
  return (
    <A10Tooltip title={tooltip}>
      <span className="health-status">
        <span className={`health-status--icon ${type}`}>{text}</span>
        <span className="health-status--description">{description}</span>
      </span>
    </A10Tooltip>
  )
}
