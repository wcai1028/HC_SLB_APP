import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { A10Component } from 'a10-gui-framework'
import { A10Row, A10Col, A10Modal, A10Icon } from 'a10-gui-widgets'

import { ProviderTenantMenu } from 'src/components/shared/ProviderTenantMenu'
import { HelpSupport } from 'src/components/shared/HelpSupport'
import DropdownMenu from 'src/components/shared/DropdownMenu'
import { ApplicationConfigs } from 'src/constants/ApplicationConfigs'

import { ApplicationIcons } from '../ApplicationIcons'
import { Usermenu } from '../Usermenu'
import './styles/header.scss'

export interface IHeaderProps {
  defaultMethods: any
  applicationName: string
  tenantChange: any
}
// export interface ISubApplication {
//   name: string
//   icon: string
//   state: string
//   allowedRoles: string[]
//   id: number
//   selected?: boolean
//   isExternal?: boolean
//   noShow?: boolean
//   separator?: boolean
// }
// export interface IApplication extends ISubApplication {
//   subApps: ISubApplication[]
// }
export interface IHeaderState {
  redirectUrl: string
  applications: any
  tenantToggled: boolean
  helpModalState: boolean
  appContainer: JSX.Element
  hideAppButton: boolean
  menuStatus: string
}

class Header extends A10Component<IHeaderProps, IHeaderState> {
  ApplicationConfigs = new ApplicationConfigs()
  constructor(props: IHeaderProps) {
    super(props)
    this.state = {
      redirectUrl: null,
      tenantToggled: false,
      applications: this.ApplicationConfigs.APPLICATIONS,
      helpModalState: false,
      appContainer: {},
      hideAppButton: false,
      menuStatus: 'menu-fold',
    }
  }

  componentDidMount() {
    this.handleApplicationButton()
    window.onresize = this.handleApplicationButton
  }

  handleApplicationButton = () => {
    const { appContainer = {}, hideAppButton } = this.state
    const fixAppContainer: IObject = appContainer === null ? {} : appContainer
    if (fixAppContainer.offsetWidth < 666 && !hideAppButton) {
      this.setState({ hideAppButton: true })
    } else if (fixAppContainer.offsetWidth > 666 && hideAppButton) {
      this.setState({ hideAppButton: false })
    }
  }

  // getAllowedRoles = (appname: string) => {
  //   const appIndex = this.state.applications.findIndex((key: any) => {
  //     return key.name === appname
  //   })
  //   if (appIndex >= 0) {
  //     return this.state.applications[appIndex].allowedRoles
  //   } else {
  //     return null
  //   }
  // }
  // getAllowedRolesSubApps = (parentApp: string, subApp: string) => {
  //   const { applications } = this.state
  //   const appIndex = applications.findIndex((key: any) => {
  //     return key.name === parentApp
  //   })
  //   const { subApps } = applications[appIndex]
  //   const subAppIndex = subApps.findIndex((key: any) => {
  //     return key.name === subApp
  //   })
  //   if (subAppIndex >= 0) {
  //     return subApps[subAppIndex].allowedRoles
  //   } else {
  //     return null
  //   }
  // }
  // getAvailableApps = () => {
  //   return this.state.applications
  // }

  changeApp = (value: any) => {
    if (value === 'thunder') {
      this.setState({ redirectUrl: '/launchers/adc/app_service_group/list' })
    }
  }

  renderRedirect = (url: string) => {
    return <Redirect to={url} />
  }

  showHelpModal = (isOpen: boolean) => {
    this.setState({ helpModalState: isOpen })
  }
  helpFunction = (func: string, e: any) => {
    window.open(func, '_blank')
  }
  getSelectedTenant = () => {
    let tenantList: IObject[]
    try {
      tenantList = JSON.parse(window.sessionStorage.getItem('ALLTENANTS')) || []
    } catch {
      tenantList = []
    }
    const itemNames = tenantList.map((tenant: IObject) => {
      return tenant.name
    })
    const uri = window.location.href.toLowerCase()
    const isDashboardMode = uri.indexOf('/controller/dashboard/') > -1

    if (isDashboardMode) {
      const isDashboardTenantMode =
        uri.indexOf('/controller/dashboard/tenant/') > -1
      if (isDashboardTenantMode) {
        const uriTenantName = window.location.href
          .split('/tenant/')[1]
          .replace('/', '')
        const isWithinTenantList = itemNames.indexOf(itemNames)

        if (isWithinTenantList) {
          const currentTenant = tenantList.filter((tenant: IObject) => {
            return tenant.name === uriTenantName
          })[0]
          const currentTenantStr = JSON.stringify(currentTenant)
          return currentTenantStr
        }
      }
    }
    try {
      JSON.parse(window.sessionStorage.getItem('CURRENT_TENANT'))
      return window.sessionStorage.getItem('CURRENT_TENANT')
    } catch {
      return undefined
    }
  }

  toggleFoldBox = () => {
    this.setState(prevState => {
      return {
        menuStatus:
          prevState.menuStatus === 'menu-unfold' ? 'menu-fold' : 'menu-unfold',
      }
    })
  }

  render() {
    const { defaultMethods } = this.props
    const { applications, redirectUrl, hideAppButton, menuStatus } = this.state
    return (
      <>
        {redirectUrl ? this.renderRedirect(redirectUrl) : null}
        <A10Row className="header sticky-to-top">
          <A10Col xs={11} sm={11} md={11} lg={6} className="container-box">
            <A10Col xs={9} sm={9} md={9} lg={9}>
              <div className="logo">A10networks</div>
            </A10Col>
            <A10Col xs={15} sm={15} md={15} lg={15}>
              <div className="product-dropdown">
                <DropdownMenu
                  options={[
                    'thunder',
                    'lightning',
                    'ssli',
                    'cgn',
                    'gifi',
                    'controller',
                  ]}
                  onCurrentChange={this.changeApp}
                  defaultOption="controller"
                  selectedTenant={this.getSelectedTenant()}
                />
              </div>
            </A10Col>
          </A10Col>
          <A10Col xs={1} sm={1} md={1} lg={11} className="container-box">
            <div
              className="application-container"
              ref={(element: any) => {
                this.state.appContainer = element
              }}
            >
              {applications.map((keys: any) => {
                    return (
                      <ApplicationIcons
                        name={keys.name}
                        image={keys.icon}
                        state={keys.state}
                        key={keys.id}
                        onClicked={this.props.tenantChange.bind(
                          this,
                          null,
                          keys.providerMode,
                        )}
                      />
                    )
                  })}
            </div>
          </A10Col>
          <A10Col
            xs={12}
            sm={12}
            md={12}
            lg={7}
            className="container-box flex-box"
          >
        
            <ProviderTenantMenu
              tenantChange={this.props.tenantChange}
              defaultMethods={this.props.defaultMethods}
              tenants={window.sessionStorage.getItem('ALLTENANTS')}
              selectedTenant={this.getSelectedTenant()}
            />
            <Usermenu defaultMethods={defaultMethods} />
            <div
              className="help-container"
              onClick={this.showHelpModal.bind(this, true)}
            >
              <div className="help">?</div>
            </div>
          </A10Col>
          {menuStatus === 'menu-unfold' ? (
            <A10Col span={24} className="container-box fold-box">
              <div className="fold-app-container">
                {hideAppButton
                  ? applications.map((keys: any) => {
                      return (
                        <ApplicationIcons
                          name={keys.name}
                          image={keys.icon}
                          state={keys.state}
                          key={keys.id}
                          onClicked={this.props.tenantChange.bind(
                            this,
                            null,
                            keys.providerMode,
                          )}
                        />
                      )
                    })
                  : null}
              </div>
            </A10Col>
          ) : null}
        </A10Row>
        <A10Modal
          title="Help & Support"
          width={640}
          visible={this.state.helpModalState}
          footer={null}
          onCancel={this.showHelpModal.bind(this, false)}
        >
          <HelpSupport helpFunction={this.helpFunction} />
        </A10Modal>
      </>
    )
  }
}

export default Header
