import * as React from 'react'
import { A10Component } from 'a10-gui-framework'

import 'src/styles/base.scss'

export interface ILoadbalancerChartProps {
  chartInput: any
}

class LoadbalancerChart extends A10Component<ILoadbalancerChartProps> {
  render() {
    return (
      <div className="loadBalancerBox">
        <h6>{this.props.chartInput.name}</h6>
        <span> {this.props.chartInput.data[0]}%</span>
      </div>
    )
  }
}

export default LoadbalancerChart
