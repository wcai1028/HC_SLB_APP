import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { A10Row, A10Col } from 'a10-gui-widgets'

// tslint:disable:no-var-requires
const styles = require('./styles/index.module.less')

export interface IStatsBarProps {
  size?: string
}

class StatsBar extends A10Component<IStatsBarProps> {
  render() {
    const { size } = this.props
    const containerClassName =
      size && size === 'small' ? styles.smallStatsBar : styles.statsBar
    const unitClassName =
      size && size === 'small' ? styles.smallStatsUnit : styles.statsUnit
    return (
      <A10Row
        type="flex"
        justify="center"
        align="middle"
        className={containerClassName}
      >
        <A10Col span="4">
          <div>Average</div>
          <div>Health</div>
        </A10Col>
        <A10Col span="4">
          <div>
            3<span className={unitClassName}>Gpbs</span>
          </div>
          <div>Throughput</div>
        </A10Col>
        <A10Col span="4">
          <div>
            <div>
              20<span className={unitClassName}>K</span>
            </div>
            <div>Connections</div>
          </div>
        </A10Col>
        <A10Col span="4">
          <div>
            <div>
              121<span className={unitClassName}>K</span>
            </div>
            <div>Current Connections</div>
          </div>
        </A10Col>
        <A10Col span="4">
          <div>
            <div>
              1<span className={unitClassName}>K/S</span>
            </div>
            <div>Connection Rate</div>
          </div>
        </A10Col>
        <A10Col span="4">
          <div>
            <div>96</div>
            <div>Errors</div>
          </div>
        </A10Col>
      </A10Row>
    )
  }
}
export default StatsBar
