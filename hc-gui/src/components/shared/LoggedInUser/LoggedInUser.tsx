import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import AppRoot from 'src/settings/appRoot'

export interface ILoggedInUserProps {}
export interface ILoggedInUserState {}

class LoggedInUser extends A10Component<
  ILoggedInUserProps,
  ILoggedInUserState
> {
  AppRoot = new AppRoot()

  showProfile = () => {
    // let sliderProps = {
    //     formElement: 'TenantAdd',
    //     formHeader: window.sessionStorage.getItem('PROVIDER')+' > Tenants > Add new Tenant',
    //     onTenantUpdate: 'this.receiveUpdate',
    //     tenants : []
    // }
    // let setSlider = this.AppRoot.getRootScopeElement('setSlider');
    // console.log(setSlider);
    // setSlider(sliderProps);
  }
  render() {
    return <div>{null}</div>
  }
}
export default LoggedInUser
