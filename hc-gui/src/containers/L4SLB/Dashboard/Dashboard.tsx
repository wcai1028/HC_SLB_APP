import * as React from 'react'
import {
  A10Container,
  setupA10Container,
  IA10ContainerDefaultProps,
} from 'a10-gui-framework'
import { config } from 'src/constants/DashboardConfig'
import { Viz } from 'a10-gui-dgp-viz'

const { GridLayout } = Viz

export interface IDashboardProps extends IA10ContainerDefaultProps {
}
export interface IDashboardState {
}

class Dashboard extends A10Container<IDashboardProps, IDashboardState> {

  render() {
    const { dashboards } = config
    const { tops, charts } = dashboards[0]
    return (
      <div>
        <GridLayout {...tops} styles={{'padding-top': '20px'}}/>
        <GridLayout {...charts} />
      </div>
    )
  }
}

export default setupA10Container(Dashboard)
