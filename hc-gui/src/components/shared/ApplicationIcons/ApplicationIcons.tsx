import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { NavLink } from 'react-router-dom'

import './styles/applicationicons.scss'

export interface IAppIconsProps {
  name: string
  image: string
  state: string
  // onClicked: any
}

class ApplicationIcons extends A10Component<IAppIconsProps> {

  // handleIconClick = () => {
  //   this.props.onClicked(undefined, true)
  // }
  render() {
    const { name, image } = this.props
    const uri = `/L4SLB/${name}`
    return (
      <NavLink className="application-icon"
        activeClassName="is-active"
        to={uri}
        // onClick={this.handleIconClick.bind(this)}
      >
        <div className="menu-item">
          <div className={`icon item-icon ${image}`} />
          {name}
        </div>
      </NavLink>
    )
  }
}
export default ApplicationIcons
