import * as React from 'react'
import {
  A10Container,
  setupA10Container,
  IA10ContainerDefaultProps,
} from 'a10-gui-framework'

export interface IDashboardProps extends IA10ContainerDefaultProps {
}
export interface IDashboardState {
}

class Dashboard extends A10Container<IDashboardProps, IDashboardState> {

  render() {
    return (
      <div>
        Dashboard PlaceHolder
      </div>
    )
  }
}

export default setupA10Container(Dashboard)
