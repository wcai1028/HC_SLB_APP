import React from 'react'
import { Switch, RouteComponentProps } from 'react-router'
import {
  A10Route,
  A10Container,
  setupA10Container,
  IA10ContainerDefaultProps,
} from 'a10-gui-framework'
import { A10Row, A10Col } from 'a10-gui-widgets'

import { ApplicationConfigs } from 'src/constants/ApplicationConfigs'
import { NavBar } from 'src/components/shared/NavBar'
import { AppRoot } from 'src/settings/appRoot'
import { getItem, setItem } from 'src/libraries/storage'
import * as queryString from 'query-string'
import { Dashboards } from 'src/containers/L4SLB/Dashboards'
import { SLBConfig } from 'src/containers/L4SLB/SLBConfiguration'
import { L4SLBWizard } from 'src/containers/L4SLB/L4SLBWizard'
import { AppServiceList } from 'src/containers/L4SLB/AppServiceList'
// End importing applications

export interface IDefaultMethods {}

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
    if (props.location.search) {
      const params = queryString.parse(props.location.search)
      if (params.api_ep) {
        setItem('BASE_URL', params.api_ep)
      }
      if (params.provider) {
        setItem('PROVIDER', params.provider)
      }
      if (params.tenant) {
        setItem('tenant', params.tenant)
      }
      if (params.token) {
        setItem('ENCODED_SESSION_ID', `Session ${params.token}`)
      }
      if (params.user_id) {
        setItem('USER_ID', params.user_id)
      }
    }
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

  render() {
    return (
      <A10Row>
        <A10Col span={24}>
          <div>
            <NavBar page={this.state.applicationName} />
            <Switch>
              <A10Route
                path="/dashboard"
                render={() => <Dashboards />}
                exact={true}
              />
              <A10Route
                path="/appservice"
                render={() => <AppServiceList />}
                exact={true}
              />
              <A10Route
                path="/wizard"
                render={() => <L4SLBWizard />}
                exact={true}
              />
              <A10Route
                path="/configuration"
                render={() => <SLBConfig />}
                exact={true}
              />
            </Switch>
          </div>
        </A10Col>
      </A10Row>
    )
  }
}
export default setupA10Container(L4SLB)
