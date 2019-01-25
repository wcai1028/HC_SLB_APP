import * as React from 'react'
import { A10Component } from 'a10-gui-framework'

export interface ILogoProps { }
export interface ILogoState { }

class Logo extends A10Component<ILogoProps, ILogoState> {
  render() {
    return (
      <div className="col-md-5 col-sm-5 centered">
        <div className="col-md-3 col-sm-3 a10-logo">Logo</div>
        <div className="col-md-9 col-sm-9 product-name">HARMONY</div>
      </div>
    )
  }
}
export default Logo
