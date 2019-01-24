import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { A10Icon, A10Menu, A10Dropdown } from 'a10-gui-widgets'
import { AppRoot } from 'src/settings/appRoot'
import { Utilities } from 'src/services/Utilities'
import { DashboardService } from 'src/services/DashboardService'

import 'src/styles/base.scss'
// tslint:disable-next-line:no-var-requires
const styles = require('./styles/index.module.less')

export interface IDropdownMenuProps {
  options: string[]
  defaultOption?: string
  onCurrentChange?: (key: string) => void
  hideText?: boolean
  selectedTenant: any
}

export interface IOption {
  key: string
  text: string
  versions?: boolean
}

export interface IDropdownMenuStates {
  optionList: IOption[]
  currentIndex: number
  showDropMenu: boolean
  appsLoaded: boolean
  selectedTenant: any
}

class DropdownMenu extends A10Component<
  IDropdownMenuProps,
  IDropdownMenuStates
> {
  static allOptions = [
    {
      key: 'thunder',
      text: 'Thunder ADC',
    },
    {
      key: 'lightning',
      text: 'Lightning ADC',
    },
    {
      key: 'ssli',
      text: 'SSLi',
      versions: true,
    },
    {
      key: 'cgn',
      text: 'CGN',
      versions: true,
    },
    {
      key: 'gifi',
      text: 'Gi FireWall',
      versions: true,
    },
    {
      key: 'controller',
      text: 'Controller',
    },
    {
      key: 'apps',
      text: 'Apps Center',
    },
  ]

  AppRoot = new AppRoot()
  Utilities = new Utilities()
  DashboardService = new DashboardService()

  allApps: Array<any> = []

  constructor(props: IDropdownMenuProps) {
    super(props)
    const optionList = DropdownMenu.allOptions.filter(item => {
      return props.options.some(option => {
        return option === item.key
      })
    })
    let defaultIndex = 0
    optionList.forEach((item, index) => {
      if (item.key === props.defaultOption) {
        defaultIndex = index
      }
    })
    this.state = {
      optionList,
      currentIndex: defaultIndex,
      showDropMenu: false,
      appsLoaded: false,
      selectedTenant: this.props.selectedTenant,
    }
  }

  loadMyApps = () => {
    let targetUrl = window.sessionStorage.getItem('TARGET_URL')
    const adminLevel = window.sessionStorage.getItem('ADMIN_LEVEL')
    let tenants = JSON.parse(
      window.sessionStorage.getItem('ALLTENANTS') || '[]',
    )
    if (!window.sessionStorage.getItem('CURRENT_TENANT')) {
      const tenants = this.AppRoot.getRootScopeElement('allTenants')
      window.sessionStorage.setItem(
        'CURRENT_TENANT',
        JSON.stringify(tenants[0]),
      )
      this.AppRoot.setRootScopeElement('currentTenant', tenants[0])
    }
    let currentTenant =
      window.sessionStorage.getItem('CURRENT_TENANT') !== 'undefined'
        ? JSON.parse(window.sessionStorage.getItem('CURRENT_TENANT') || '[]')
        : []

    let tenant = currentTenant ? currentTenant.name : tenants[0].name
    let myAppsResponse = null
    // if (adminLevel == 'appadmin') {
    //   myAppsResponse = this.DashboardService.getTenantActiveAppsAppAdmin(
    //     null,
    //     null,
    //     [targetUrl, tenant],
    //   )
    // } else {
    //   myAppsResponse = this.DashboardService.getTenantActiveApps(null, null, [
    //     targetUrl,
    //     tenant,
    //   ])
    // }

    // myAppsResponse
    //   .then((response: any) => {
    //     this.allApps = response.data
    //     this.setState({
    //       appsLoaded: true,
    //       selectedTenant: this.props.selectedTenant,
    //     })
    //   })
    //   .catch((error: any) => {
    //     console.log(error.response)
    //   })
  }
  loadCatalogApps() {
    const targetUrl = window.sessionStorage.getItem('TARGET_URL')
    const catalogAppsResponse = this.DashboardService.getHCAppCatalog(
      null,
      null,
      [targetUrl],
    )

    catalogAppsResponse
      .then((response: any) => {
        this.allApps = response.data
        this.setState({
          appsLoaded: true,
          selectedTenant: this.props.selectedTenant,
        })
      })
      .catch((error: any) => {
        /* istanbul ignore next */
        console.log(error.response)
      })
  }

  componentDidMount() {
    if (
      !this.state.appsLoaded ||
      this.state.selectedTenant !== this.props.selectedTenant
    ) {
      const drilllevel = window.sessionStorage.getItem('DRILL_LEVEL')
      if (drilllevel === 'provider') {
        this.loadCatalogApps()
      } else {
        this.loadMyApps()
      }
    }
  }
  componentDidUpdate() {
    if (
      !this.state.appsLoaded ||
      this.state.selectedTenant !== this.props.selectedTenant
    ) {
      const drilllevel = window.sessionStorage.getItem('DRILL_LEVEL')
      if (drilllevel === 'provider') {
        this.loadCatalogApps()
      } else {
        this.loadMyApps()
      }
    }
  }

  onClickOption = (key: string, index: number) => (event: any) => {
    return this.setState({ currentIndex: index }, () => {
      return this.props.onCurrentChange && this.props.onCurrentChange(key)
    })
  }
  onControlDropMenu = (show: boolean) => (event: any) => {
    return this.setState({ showDropMenu: show })
  }

  render() {
    // const onClickOption = (key: string, index: number) => {
    //   return this.setState({ currentIndex: index }, () => {
    //     return this.props.onCurrentChange && this.props.onCurrentChange(key)
    //   })
    // }

    // const onControlDropMenu = (show: boolean) => {
    //   return this.setState({ showDropMenu: show })
    // }

    const { hideText } = this.props
    const { showDropMenu } = this.state
    const currentKey = this.state.optionList[this.state.currentIndex].key
    const currentText = this.state.optionList[this.state.currentIndex].text
    return (
      <div className={styles.navSelector}>
        <div
          className={hideText ? styles.noTextBlock : styles.currentBlock}
          onClick={this.onControlDropMenu(!this.state.showDropMenu)}
        >
          <i
            className={`${styles.currentIcon} ${styles[currentKey + '-icon']}`}
          />
          {hideText ? null : (
            <span className={styles.currentText}>{currentText}</span>
          )}
          <A10Icon
            type={showDropMenu ? 'up' : 'down'}
            className={hideText ? styles.arrowNoText : styles.arrowWithText}
          />
          {showDropMenu ? (
            <ul
              className={styles.dropdownList}
              onMouseLeave={this.onControlDropMenu(false)}
            >
              {this.state.optionList.map((item, index) => {
                let filteredApps = this.allApps.filter((app: any) => {
                  return item.key === app.name
                })
                return (
                  <li
                    key={index}
                    data-option={item.key}
                    className={
                      styles.optionBlock + ' nav-selector version-dropdown'
                    }
                    onClick={
                      !item.versions
                        ? this.onClickOption(item.key, index) // onClickOption.bind(this, item.key, index)
                        : undefined
                    }
                  >
                    <div className={styles.innerBlock}>
                      {item.versions &&
                      filteredApps &&
                      filteredApps.length > 0 ? (
                        <>
                          {
                            <ul className="dropdown-list">
                              {filteredApps.map((app: any, i: number) => {
                                return (
                                  <li
                                    key={app.version + ' ' + i}
                                    onClick={this.Utilities.launchApp.bind(
                                      this,
                                      app,
                                    )}
                                  >
                                    {app.name} v{app.version}
                                  </li>
                                )
                              })}
                            </ul>
                          }
                        </>
                      ) : null}

                      <div className={styles.iconContainer}>
                        <i
                          className={`${styles.icon} ${
                            styles[item.key + '-icon']
                          }`}
                        />
                      </div>
                      <div className={styles.textContainer}>
                        <span className={styles.text}>{item.text}</span>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : null}
        </div>
      </div>
    )
  }
}

export default DropdownMenu
