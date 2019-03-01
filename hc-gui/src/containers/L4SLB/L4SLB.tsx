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
import { L4SLBConfig } from 'src/containers/L4SLB/SLBConfiguration'
import { L4SLBWizard } from 'src/containers/L4SLB/L4SLBWizard'
import { AppServiceList } from 'src/containers/L4SLB/AppServiceList'
// End importing applications

export interface IDefaultMethods {}

export interface IL4SLBParams {
  applicationName: string
}

export interface IL4SLBProps
  extends IA10ContainerDefaultProps,
    RouteComponentProps<IL4SLBParams> {}

export interface IL4SLBState {
  applicationName: string
  adminLevel: string | null
  tenants?: any
  setTenant: boolean
  tenantToggled: boolean
  updateController: boolean
  redirectUrl?: string
  changeApplicationTo: string
}

class L4SLB extends A10Container<IL4SLBProps, IL4SLBState> {
  static getDerivedStateFromProps(
    props: IL4SLBProps,
    state: IL4SLBState,
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
        setItem('CURRENT_TENANT', JSON.stringify({name: params.tenant}))
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

  constructor(props: IL4SLBProps) {
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
    console.log(this.state.applicationName)
    return (
      <A10Row>
        <A10Col span={24}>
          <div>
            <NavBar page={this.state.applicationName} />
            <Switch>
              <A10Route path="/dashboard" component={Dashboards} exact={true} />
              <A10Route
                path="/appservice"
                component={AppServiceList}
                exact={true}
              />
              <A10Route
                path="/wizard/:appServiceName?"
                component={L4SLBWizard}
                exact={true}
              />
              <A10Route
                path="/configuration/:appServiceName?"
                component={L4SLBConfig}
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
