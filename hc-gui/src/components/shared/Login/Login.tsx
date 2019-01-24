import * as React from 'react'
import { A10Component } from 'a10-gui-framework'

class Login extends A10Component<any> {
    render() {
      return (
        <div className="row">
        {/* <div className="background-polygons"></div> */}
        <div className="login-view login-default col-md-12 background-polygons">
          <div className="col-md-6 col-sm-8 centered col-md-offset-3">
            <div className="col-md-12 col-sm-12 centered brand">
              <div className="col-md-12 a10-globe" />
            </div>
          </div>
        </div>
      </div>
      )
    }
  }
  export default Login