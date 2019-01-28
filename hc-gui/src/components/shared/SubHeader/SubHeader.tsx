import * as React from 'react'
import { A10Component } from 'a10-gui-framework'

import { Subapps } from '../Subapps'
import { ProviderTenantMenu } from '../ProviderTenantMenu'

export interface ISubHeaderProps {
  defaultMethods: any
  subApps: any
  reLoadApps: boolean
  click(appName: string): void
}
export interface ISubHeaderState {
  username: string
  selectedMenu: string
}

class Usermenu extends A10Component<ISubHeaderProps, ISubHeaderState> {
  constructor(props: any) {
    super(props)
    this.state = {
      username: '',
      selectedMenu: '',
    }
  }
  isSelectedMenu = (key: any, index: number) => {
    const { selectedMenu } = this.state
    if (!selectedMenu && index === 0) {
      return true
    } else {
      return selectedMenu === key.name
    }
  }

  clickMenu = (menu: string) => {
    this.setState({ selectedMenu: menu })
    this.props.click(menu)
  }

  render() {
    return (
      <div className="row navbar subHeader">
        <div className="col-md-12 inline">
          <div className="auto-margin">
            {this.props.subApps.map((key: any, index: number) => {
              let showByRole = false
              const adminLevel = window.sessionStorage.getItem('ADMIN_LEVEL')
              const drillLevel = window.sessionStorage.getItem('DRILL_LEVEL')
              if (key.allowedRoles.indexOf(adminLevel) > -1) {
                showByRole = true
              }
              if (key.allowedLevels) {
                showByRole = false
                if (key.allowedLevels.indexOf(drillLevel) > -1) {
                  showByRole = true
                }
              }
              if (!key.noShow && showByRole) {
                return (
                  <div key={index} className="inline">
                    {key.separator ? (
                      <div className="separator margin-v-10" />
                    ) : null}
                    <Subapps
                      isSelected={this.isSelectedMenu(key, index)}
                      value={key}
                      key={key.id}
                      click={this.clickMenu}
                    />
                  </div>
                )
              }
              return false
            })}
          </div>
        </div>
        {/* <div className="col-md-4">
          <ProviderTenantMenu
            tenantChange={this.props.tenantChange}
            defaultMethods={this.props.defaultMethods}
          />
        </div> */}
      </div>
    )
  }
}

export default Usermenu
