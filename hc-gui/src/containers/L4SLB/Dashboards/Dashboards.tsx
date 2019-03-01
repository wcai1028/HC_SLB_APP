import * as React from 'react'
import {
  A10Container,
  setupA10Container,
  IA10ContainerDefaultProps,
  _,
} from 'a10-gui-framework'

import 'src/styles/clusters.scss'
import { ApplicationConfigs } from 'src/constants/ApplicationConfigs'
import { Analytics } from './Analytics/index'
import { AppRoot } from 'src/settings/appRoot'
import { IDefaultMethods } from 'src/containers/L4SLB'
import { Utilities } from 'src/services'

export interface IDashboardsProps extends IA10ContainerDefaultProps {
  defaultMethods: IDefaultMethods
  tenantToggled: boolean
}
export interface IDashboardsState {
  application: object
  selectedApp: string
  tenantToggled: boolean
}

class Dashboards extends A10Container<
  IDashboardsProps,
  IDashboardsState
  > {
  state = {
    application: {
      subApps: [],
      name: '',
    },
    selectedApp: '',
    tenantToggled: false,
  }
  ApplicationConfigs = new ApplicationConfigs()
  AppRoot = new AppRoot()
  Utilities = new Utilities
  dataLoaded = false

  updateState() {
    const applications = this.ApplicationConfigs.getAvailableApps()
    const applicationIndex = applications.findIndex(key => {
      return key.name === 'Dashboards'
    })
    this.dataLoaded = true
    this.setState({
      application: applications[applicationIndex],
      selectedApp: applications[applicationIndex].subApps[0].name,
      tenantToggled: this.props.tenantToggled,
    })
    // window.sessionStorage.removeItem('TENANT')
    // window.sessionStorage.removeItem('CURRENT_TENANT')
    window.sessionStorage.setItem('DRILL_LEVEL', 'provider')
    window.sessionStorage.setItem('CURRENT_STATE', 'Dashboards')
    this.AppRoot.setRootScopeElement('currentDrillLevel', 'provider')
    this.AppRoot.setRootScopeElement('currentState', 'Dashboards')
  }

  componentDidMount() {
    if (
      !this.dataLoaded ||
      this.state.tenantToggled !== this.props.tenantToggled
    ) {
      this.updateState()
    }
  }
  componentDidUpdate() {
    if (
      !this.dataLoaded ||
      this.state.tenantToggled !== this.props.tenantToggled
    ) {
      this.updateState()
    }
  }
  updateSelectedApp = (appName: any) => {
    const subAppIndex = this.state.application.subApps.findIndex((key: any) => {
      return key.name === appName
    })
    const subApp = this.state.application.subApps[subAppIndex] || {
      isExternal: false,
    }
    const allowedRoles =
      this.ApplicationConfigs.getAllowedRolesSubApps(
        this.state.application.name,
        appName,
      ) || []
    const adminLevel = window.sessionStorage.getItem('ADMIN_LEVEL')
    const allowedIndex = allowedRoles.findIndex((key: any) => {
      return key === adminLevel
    })
    if (allowedIndex >= 0) {
      if (!subApp.isExternal) {
        this.setState({
          selectedApp: appName,
        })
      } else {
        console.log(
          'something to think about dirceting this module to external place',
        )
      }
    } else {
      this.Utilities.showMessage('INSUFFICENT_PRIVILAGE', 0, true)
    }
  }

  render() {
    return (
      <div>
        {/* <SubHeader
          subApps={this.state.application.subApps}
          click={this.updateSelectedApp}
          defaultMethods={this.props.defaultMethods}
          reLoadApps={true}
        /> */}
        <Analytics />
      </div>
    )
  }
}

export default setupA10Container(Dashboards)
