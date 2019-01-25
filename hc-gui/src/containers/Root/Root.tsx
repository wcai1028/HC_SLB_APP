import * as React from 'react'
import {
  A10Container,
  A10Router,
  A10Route,
  setupA10Container,
} from 'a10-gui-framework'
import { Switch } from 'react-router-dom'
// import * as Loadable from 'react-loadable'

import './styles/root.scss'
import { L4SLB } from 'src/containers/L4SLB'
import { Login } from 'src/components/shared/Login'
import { TenantSelect } from 'src/components/shared/TenantSelect'
import 'node_modules/pace-progress/themes/yellow/pace-theme-flash.css'
// import { AppContext } from '../../constants/index'
// tslint:disable-next-line
const pace = require('pace-progress')
// tslint:disable-next-line
const Highcharts = require('highcharts')

  // tslint:disable-next-line, For E2E test
;(window as any).Highcharts = Highcharts

class Root extends A10Container {
  constructor(props: any) {
    super(props)
    pace.start()
    Highcharts.setOptions({
      time: {
        useUTC: false,
      },
    })
  }

  render() {
    return (
      <A10Router.Browser>
        <div>
          <Switch>
            <A10Route path="/login/:provider" component={Login} />
            <A10Route path="/tenantselect" component={TenantSelect} />
            <A10Route
              path="/:applicationName"
              component={L4SLB}
            />
          </Switch>
        </div>
      </A10Router.Browser>
    )
  }
}

export default setupA10Container(Root)
