import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { A10Tooltip } from 'a10-gui-widgets'

// tslint:disable-next-line:no-var-requires
const styles = require('./styles/index.module.less')

export interface IHealthStatusProps {
  text?: any
  type?: string
  default?: any
  tooltip?: string
  size?: number
}

export interface IHealthStatusStates {
  status: string
  default: string
}

class HealthStatus extends A10Component<
  IHealthStatusProps,
  IHealthStatusStates
  > {
  constructor(props: IHealthStatusProps) {
    super(props)
    this.state = {
      status: props.type || 'undefined',
      default: props.default || (props.type === 'number' ? '0' : ''),
    }
  }

  componentWillReceiveProps(nextProps: IObject) {
    if (nextProps && nextProps.type) {
      this.setState({ status: nextProps.type })
    }
  }

  render() {
    const defaultTip =
      this.props.type === 'number'
        ? this.props.text || this.state.default
        : this.state.status
    const sizeClass = 'size' + (this.props.size || 16)
    const tooltipProps = {
      title: this.props.tooltip || defaultTip,
      arrowPointAtCenter: true,
      placement: 'top',
      trigger: 'hover',
    }

    return (
      <A10Tooltip {...tooltipProps}>
        <span
          className={`${styles.statusCircleBg} ${styles[sizeClass]} ${
            styles['status-' + this.state.status]
            }`}
        >
          <span className={styles.text}>
            {this.props.text || this.state.default}
          </span>
        </span>
      </A10Tooltip>
    )
  }
}

export default HealthStatus
