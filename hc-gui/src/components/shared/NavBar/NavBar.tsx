import * as React from 'react'
import { A10Container, setupA10Container } from 'a10-gui-framework'
import {
  A10Row,
  A10Col,
  A10Icon,
  A10Avatar,
} from 'a10-gui-widgets'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getItem } from 'src/libraries/storage'
import { ApplicationConfigs } from 'src/constants/ApplicationConfigs'

// tslint:disable-next-line:no-var-requires
const styles = require('./styles/index.module.less')

export interface INavBarProps {
  page?: string
}

export interface INavBarState {
  page: string
  menuStatus: string
  helpModalState: boolean
}

class NavBar extends A10Container<any, INavBarState> {
  ApplicationConfigs = new ApplicationConfigs()
  constructor(props: any) {
    super(props)   
    this.state = {
      page: this.props.page? this.props.page : 'dashboard',
      menuStatus: 'menu-fold',
      helpModalState: false,
    }
  }

  handleChange = (state: string) => {
    this.setState({ page: state, menuStatus: 'menu-fold' })
  }

  renderRedirect = (url: string) => {
    return <Redirect to={url} />
  }

  toggleMenu = () => {
    this.setState(prevState => {
      return {
        menuStatus:
          prevState.menuStatus === 'menu-unfold' ? 'menu-fold' : 'menu-unfold',
      }
    })
  }

  showHelpModal = (isOpen: boolean) => {
    this.setState({ helpModalState: isOpen })
  }

  helpFunction = (func: string, e: any) => {
    window.open(func, '_blank')
  }

  render() {
    const { page, menuStatus } = this.state
    const applications = this.ApplicationConfigs.getAvailableApps()
    return (
      <>
        <A10Row type="flex" align="middle" className={styles.navBar}>
          <A10Col
            xs={24}
            sm={24}
            md={24}
            lg={5}
            className={styles.navLeftContainer}
          >
            <A10Row type="flex" align="middle">
              <A10Col xs={14} sm={12} md={10} lg={24}>
                <A10Col xs={10} sm={10} md={10} lg={10}>
                  <div id={styles.a10Icon} className={styles.logoBlock} />
                </A10Col>
                <A10Col xs={10} sm={10} md={10} lg={10}>
                  <div id={styles.slbIcon} className={styles.appBlock} />
                  <div className={styles.appTitle}>L4 SLB</div>
                </A10Col>
              </A10Col>
              <A10Col xs={6} sm={8} md={10} lg={0} />
              <A10Col xs={4} sm={4} md={4} lg={0}>
                <div className={styles.menuBox}>
                  <A10Icon type={menuStatus} onClick={this.toggleMenu} />
                </div>
              </A10Col>
            </A10Row>
          </A10Col>
          <A10Col
            xs={24}
            sm={24}
            md={24}
            lg={19}
            className={`${styles.navRightContainer} ${styles[menuStatus]}`}
          >
            <A10Row type="flex" align="middle">
              <A10Col xs={12} sm={12} md={12} lg={12}>
                {
                  applications.map(app => {
                    return (
                      <A10Col
                        key={app.id}
                        xs={8}
                        sm={8}
                        md={8}
                        lg={8}
                        className={`${
                          page === app.uri
                            ? styles.lbFuncSelectBlock
                            : styles.lbFuncBlock
                        } ${styles.leftBorder}`}
                        onClick={this.handleChange.bind(this, app.uri)}
                      >
                        <Link
                          to={app.uri}
                          className={styles.navLink}
                        >
                          <div
                            id={styles[app.icon]}
                            className={styles.lbFuncBtn}
                          />
                          <span className={styles.lbFuncLabel}>{app.name}</span>
                        </Link>
                      </A10Col>
                    )
                  })
                }
              </A10Col>
              <A10Col xs={12} sm={12} md={12} lg={12}>
                <A10Col className={styles.helpContainer}>
                  <div
                    className={styles.help}
                    onClick={this.showHelpModal.bind(this, true)}
                  >
                    ?
                  </div>
                </A10Col>
                <A10Col className={styles.userMenuContainer}>
                  <div>
                    <A10Avatar size="large" icon="user" />
                    <A10Icon type="down" />
                  </div>
                  <div className={styles.seperater} />
                </A10Col>
                <A10Col className={styles.tenantContainer}>
                  <div>
                    <span title={getItem('tenant')}>{getItem('tenant')}</span>
                  </div>
                </A10Col>
                <A10Col className={styles.deployContainer}>
                  <div id={styles.deployIcon} className={styles.lbFuncBtn} />
                </A10Col>
              </A10Col>
            </A10Row>
          </A10Col>
        </A10Row>
      </>
    )
  }
}

export default setupA10Container(NavBar)
