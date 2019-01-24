import { AppRoot } from '../settings/appRoot'

export class LoggedInUser {
  AppRoot = new AppRoot()
  state: any

  constructor() {
    this.state = {}
  }

  logout = () => {
    const provider = window.sessionStorage.getItem('PROVIDER')
    window.sessionStorage.clear()
    const location = '/login/' + provider
    window.location.href = location
  }
  showProfile = () => {
    // const sliderProps = {
    //   formElement: 'TenantAdd',
    //   formHeader:
    //     window.sessionStorage.getItem('PROVIDER') +
    //     ' > Tenants > Add new Tenant',
    //   onTenantUpdate: 'this.receiveUpdate',
    //   tenants: [],
    // }
    // const setSlider = this.AppRoot.getRootScopeElement('setSlider')
    // console.log(setSlider)
    // sliderProps.tenants.push({name : 'test'})
    // return sliderProps.tenants;
    // setSlider(sliderProps);
    return 'hello'
  }
}

export default LoggedInUser
