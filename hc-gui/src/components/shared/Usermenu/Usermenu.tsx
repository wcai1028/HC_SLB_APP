import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { A10Row, A10Col, A10Icon, A10Avatar, A10Message } from 'a10-gui-widgets'

import { LoggedInUser } from 'src/libraries/loggedInUser'
import { FormatSlidingPage } from 'src/components/ADC/FormatSlidingPage'
import { MyProfile } from 'src/components/shared/MyProfile'
import { getItem } from 'src/libraries/storage'
import './styles/Usermenu.scss'

export interface IUsermenuProps {
  defaultMethods(): void
}
export interface IUsermenuState {
  username: string
  menuOpen: boolean
  showSlidingPage: boolean
}

class Usermenu extends A10Component<IUsermenuProps, IUsermenuState> {
  LoggedInUser = new LoggedInUser()

  constructor(props: IUsermenuProps) {
    super(props)
    this.state = {
      username: getItem('USER_NAME') || '',
      menuOpen: false,
      showSlidingPage: false
    }
  }
  preventDefault(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
  }

  handleEdit() { }
  setSlidingPage = (isOpen: boolean) => {
    this.setState({ showSlidingPage: isOpen })
  }

  toggleMenu = () => {
    const menuOpen = this.state.menuOpen
    this.setState({
      menuOpen: !menuOpen
    })
  }

  hideMenu = () => {
    this.setState({
      menuOpen: false
    })
  }
  render() {
    const { username, showSlidingPage } = this.state
    return (
      // <ul className="nav navbar-nav navbar-right header" key="mainMenu">
      //   {/* <li className="dropdown dropdown-hover-menu" key="first">
      //     <a
      //       className="dropdown-toggle header-main-menu-item"
      //       onClick={this.preventDefault}
      //       key="username"
      //     >
      //       <span className="fa fa-user">&nbsp;</span>
      //       {username}
      //     </a>
      //     <ul
      //       className="dropdown-menu header-sub-menu-item sub-menu"
      //       role="menu"
      //       key="firstSub"
      //     >
      //       <li onClick={this.LoggedInUser.showProfile} key="profile">
      //         <a onClick={this.preventDefault}>
      //           <span className="fa fa-user" />&nbsp; My Profile
      //         </a>
      //       </li>

      //       <li id="changePasswordLink" key="changePassword">
      //         <a href="/changePassword">
      //           <span className="fa fa-exchange" />&nbsp; Change Password
      //         </a>
      //       </li>
      //       <li key="logout">
      //         <a onClick={this.LoggedInUser.logout}>
      //           <span className="fa fa-power-off" />&nbsp; Logout
      //         </a>
      //       </li>
      //     </ul>
      //   </li> */}
      //   {/* </li>
      //   <li className="dropdown dropdown-hover-menu" key="second">
      //     <a
      //       onClick={this.preventDefault}
      //       className="dropdown-toggle header-main-menu-item"
      //       data-toggle="dropdown"
      //     >
      //       <span className="fa fa-wrench userIcon header-main-menu-item">
      //         &nbsp;
      //       </span>
      //       <span className="header-main-menu-item">Support </span>
      //       <span className="header-main-menu-item caret" />
      //     </a>
      //     <ul
      //       className="dropdown-menu header-sub-menu-item support-menu sub-menu"
      //       role="menu"
      //     >
      //       <li id="helpLink" key="help">

      //         <a onClick={this.preventDefault}>
      //           <span className="fa fa-comment" />&nbsp; Product Support
      //         </a>
      //       </li>

      //       <li id="educationLink" key="education">

      //         <a onClick={this.preventDefault}>
      //           <span className="fa fa-book" />&nbsp; Education
      //         </a>
      //       </li>

      //       <li id="aboutLink" key="about">

      //         <a onClick={this.preventDefault}>
      //           <span className="fa fa-briefcase" />&nbsp; About
      //         </a>
      //       </li>
      //     </ul>
      //   </li> */}
      //   {/* <LoggedInUser /> */}
      // </ul>
      <div className="user-selector">
        <div onClick={this.toggleMenu} >
          <A10Avatar size="large" icon="user" />
          <A10Icon className="updown-icon" type={this.state.menuOpen ? 'up' : 'down'} />
          {!this.state.menuOpen ? null :
            <ul className="dropdown-list">

              <li onClick={this.setSlidingPage.bind(this, true)} key="profile" className="option-block">
                <div className="inner-block">
                  <a onClick={this.preventDefault}>
                    View My Profile
                </a>
                </div>
              </li>

              <li id="changePasswordLink" key="changePassword" className="option-block">
                <div className="inner-block">
                  <a href="/changePassword">
                    Change Password
                </a>
                </div>
              </li>
              <li key="logout" className="option-block">
                <div className="inner-block">
                  <a onClick={this.LoggedInUser.logout}>
                    Log out
                </a>
                </div>
              </li>
            </ul>}
        </div>
        <FormatSlidingPage
          isOpen={showSlidingPage}
          saveText="Edit"
          disableSave={true}
          onRequestOk={this.handleEdit}
          onRequestClose={this.setSlidingPage.bind(this, false)}
          title={'My Profile'}
          description="Showing your info..."
        >
          <MyProfile />
        </FormatSlidingPage>
      </div>
    )
  }
}

export default Usermenu
