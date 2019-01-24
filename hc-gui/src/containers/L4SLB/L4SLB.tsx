import * as React from 'react'
import { Redirect, RouteComponentProps } from 'react-router'
import {
  A10Container,
  setupA10Container,
  IA10ContainerDefaultProps,
} from 'a10-gui-framework'
import { A10Row, A10Col } from 'a10-gui-widgets'

import { ApplicationConfigs } from 'src/constants/ApplicationConfigs'
import { NavBar } from 'src/components/shared/NavBar'
import { AppRoot } from 'src/settings/appRoot'
import { getItem } from 'src/libraries/storage'

import { Dashboard } from 'src/containers/L4SLB/Dashboard'
// import { SLBConfig } from 'src/containers/L4SLB/SLBConfiguration'
import { SLBWizard } from 'src/containers/L4SLB/Wizard'
import { } from 'src/containers/L4SLB/Wizard'
// End importing applications

export interface IControllerParams {
  applicationName: string
}

export interface IControllerProps
  extends IA10ContainerDefaultProps,
    RouteComponentProps<IControllerParams> {}

export interface IControllerState {
  applicationName: string
  adminLevel: string | null
  tenants?: any
  setTenant: boolean
  tenantToggled: boolean
  updateController: boolean
  redirectUrl?: string
  changeApplicationTo: string
}

class L4SLB extends A10Container<IControllerProps, IControllerState> {
  static getDerivedStateFromProps(
    props: IControllerProps,
    state: IControllerState,
  ) {
    if (props.match) {
      if (props.match.params.applicationName !== state.applicationName) {
        return {
          applicationName: props.match.params.applicationName,
          redirectUrl: '',
        }
      }
    }
    return null
  }
  ApplicationConfigs = new ApplicationConfigs()
  AppRoot = new AppRoot()
  isTenantSet = false

  constructor(props: IControllerProps) {
    super(props)
    this.state = {
      applicationName: this.props.match
        ? this.props.match.params.applicationName
        : '',
      tenantToggled: false,
      updateController: false,
      adminLevel: getItem('ADMIN_LEVEL'),
      setTenant: false,
      redirectUrl: null,
      changeApplicationTo: null,
    }
  }

  appTobeLoaded = () => {
    const { applicationName } = this.state
    if (applicationName === 'dashboard') {
      return (
        <Dashboard />
      )
    } else {
      return (
        <SLBWizard />
      )
    } 
  }
  renderRedirect = (url: string) => {
    return <Redirect to={url} />
  }

  render() {
      return (
        <A10Row>
          <A10Col span={24}>
            <div>
              <NavBar
                page={this.state.applicationName}
              />
              {this.appTobeLoaded()}
            </div>
          </A10Col>
        </A10Row>
      )
  }
}
export default setupA10Container(L4SLB)
