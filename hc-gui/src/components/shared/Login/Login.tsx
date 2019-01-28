import * as React from 'react'
import { Redirect, RouteComponentProps } from 'react-router'
import { A10Component, IA10ContainerDefaultProps } from 'a10-gui-framework'
import parameters from 'parameters'

import {
  AuthenticationService,
  DashboardService,
  Utilities,
} from 'src/services/index'
import AppRoot from 'src/settings/appRoot'
import { Logo } from 'src/components/shared/Logo'
import { NonLoggenInForm } from 'src/components/shared/NonLoggenInForm'
import 'src/styles/login.scss'
import 'src/styles/base.scss'

import { IDefaultMethods } from 'src/containers/L4SLB'
export interface ILoginParams {
  provider: string
}

export interface ILoginProps
  extends IA10ContainerDefaultProps,
    RouteComponentProps<ILoginParams> {
  defaultMethods: IDefaultMethods
}
export interface ILoginState {
  userObj: any
  provider: string
  loggedIn: boolean
}

class Login extends A10Component<ILoginProps, ILoginState> {
  AppRoot = new AppRoot()
  //Instantiating instances of imported services
  AuthenticationService = new AuthenticationService()
  DashboardService = new DashboardService()
  Utilities = new Utilities()

  constructor(props: any) {
    super(props)
    if (!props.match.params) {
      //   <Redirect to="/login/root"/>
    }
    if (window.localStorage.getItem('LASTALERT')) {
      this.Utilities.showMessage('SESSION_INVALID', 0, true)
      window.localStorage.removeItem('LASTALERT')
    }
    window.sessionStorage.clear()
    window.sessionStorage.setItem('PROVIDER', this.props.match.params.provider)
  }

  availableTenants: any = []
  readTenants: any = []
  selectedTenants: string = ''
  appToBeLoaded = ''
  //Defining state.
  state = {
    userObj: [
      {
        name: 'userId',
        placeholder: 'User id',
        type: 'text',
        required: true,
        value: '',
        id: 1,
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password',
        required: true,
        value: '',
        id: 2,
      },
    ],
    provider: this.props.match.params.provider,
    loggedIn: false,
  }

  // storeDisplayName = (index) => {

  //     this.targetAPIurl = window.sessionStorage.getItem('TARGET_URL');
  //     let tenantDetails = this.DashboardService.listTenant(null, null, [this.targetAPIurl, this.AppRoot.getRootScopeElement('allTenants')[index]]);
  //     tenantDetails.then((resp, statusCode, fn, req, opts) => {
  //         resp = resp.data[0];
  //         let allTenantDisplayName = this.AppRoot.getRootScopeElement('allTenantDisplayName');
  //         allTenantDisplayName[index] = resp.displayName;
  //         this.AppRoot.setRootScopeElement('allTenantDisplayName', allTenantDisplayName);
  //         let allTenantID = this.AppRoot.getRootScopeElement('allTenantID');
  //         allTenantID[index] = resp.id;
  //         this.AppRoot.setRootScopeElement('allTenantID', allTenantID);
  //         window.sessionStorage.setItem('AVAILABLETENANTSDISPNAME', this.AppRoot.getRootScopeElement('allTenantDisplayName'));
  //         window.sessionStorage.setItem('AVAILABLETENANTSID', this.AppRoot.getRootScopeElement('allTenantID'));

  //     });

  // }
  changeHandler = (e: any) => {
    let objIndex = this.state.userObj.findIndex(ele => {
      return ele.name === e.target.name
    })
    let upadtedObject = [...this.state.userObj]
    upadtedObject[objIndex].value = e.target.value
    this.setState({
      userObj: upadtedObject,
    })
    e.target.value = this.state.userObj[objIndex].value
  }
  loginHandler = (e: any) => {
    const { showMessage } = this.Utilities
    let headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization:
        'Basic ' +
        new Buffer(
          this.state.userObj[0].value + ':' + this.state.userObj[1].value,
        ).toString('base64'),
      provider: this.state.provider,
    }
    let payload = {
      userId: this.state.userObj[0].value,
    }

    let loginRequest = this.AuthenticationService.createNewSession(
      headers,
      payload,
      null,
    )

    loginRequest
      .then((resp: any) => {
        let response = resp.data
        window.sessionStorage.setItem('USER_SESSION_ID', response.id)
        window.sessionStorage.setItem('USER_ID', response.userId)
        window.sessionStorage.setItem('PROVIDER', response.provider.name)
        window.sessionStorage.setItem('PROVIDER_ID', response.provider.id)
        if (response.authenticationProvider) {
          this.AppRoot.setRootScopeElement(
            'sessionAuthType',
            response.authenticationProvider.type,
          )
          window.sessionStorage.setItem(
            'USER_SESSION_AUTHTYPE',
            response.authenticationProvider.type,
          )
        }
        let targetAPIurl = '/providers/' + response.provider.name
        let providerPath = response.provider.name
        let i = 0
        let currentParent = response.provider
        while (i === 0) {
          if (currentParent.parent) {
            targetAPIurl =
              '/providers/' + currentParent.parent.name + targetAPIurl
            providerPath = currentParent.parent.name + '/' + providerPath
            currentParent = currentParent.parent
          } else {
            i = 1
          }
        }
        window.sessionStorage.setItem('TARGET_URL', targetAPIurl)
        window.sessionStorage.setItem('PROVIDER_PATH', providerPath)
        let session = response.id
        let userid = response.userId
        headers.Authorization = 'Session ' + session
        //Getting roles for the user
        let getRoles = this.AuthenticationService.getRoles(headers, null, null)
        getRoles
          .then((resp: any) => {
            // pocessing user response
            var roleResponse = resp.data
            let role: any = []
            for (let j = 0; j < roleResponse.length; j++) {
              role[roleResponse[j].id] = {}
              for (var key in roleResponse[j]) {
                if (key !== 'id' && key) {
                  role[roleResponse[j].id][key] = {}
                  role[roleResponse[j].id][key] = roleResponse[j][key]
                }
              }
            } // roles captured
            let userDetails = this.AuthenticationService.getAdminDetails(
              headers,
              null,
              [userid],
            )
            userDetails
              .then((resp: any) => {
                let userResponse = resp.data
                let userName =
                  (userResponse.firstName !== undefined
                    ? userResponse.firstName
                    : '') +
                  ' ' +
                  (userResponse.lastName !== undefined
                    ? userResponse.lastName
                    : '')
                window.sessionStorage.setItem('USER_NAME', userName)
                window.sessionStorage.setItem(
                  'USER_EMAIL_ID',
                  userResponse.emailId,
                )
                window.sessionStorage.setItem(
                  'LOCAL_USER',
                  userResponse.localUser,
                )
                window.sessionStorage.setItem(
                  'ENCODED_SESSION_ID',
                  'Session ' + session,
                )
                this.AppRoot.setRootScopeElement(
                  'localUser',
                  userResponse.localUser,
                )
                // $rootScope.$broadcast('userLoggedIn', resp);
                //here we have to set the main state , look what needs tp be done here

                for (let k = 0; k < userResponse.roles.length; k++) {
                  let scopedProvider = userResponse.roles[
                    k
                  ].scopes[0].providers.ids[0].split('/')
                  let roleName = userResponse.roles[k].role
                  let roleObject = userResponse.roles[k].scopes[0]

                  if (
                    scopedProvider[0] === '*' ||
                    scopedProvider[scopedProvider.length - 1] ===
                      window.sessionStorage.getItem('PROVIDER')
                  ) {
                    if (role[roleName].providers.actions.length) {
                      window.sessionStorage.setItem('ADMIN_LEVEL', 'provider')
                      break
                    } else {
                      if (role[roleName].providers.tenants) {
                        this.selectedTenants +=
                          roleObject.providers.tenants.ids[0]
                        if (k < userResponse.roles.length - 1) {
                          this.selectedTenants += ','
                        }
                        if (
                          role[roleName].providers.tenants.actions.length > 1 &&
                          role[roleName].users !== undefined
                        ) {
                          window.sessionStorage.setItem('ADMIN_LEVEL', 'tenant')
                          this.availableTenants.push(
                            roleObject.providers.tenants.ids[0],
                          )
                        } else {
                          this.readTenants.push(
                            roleObject.providers.tenants.ids[0],
                          )
                          if (!window.sessionStorage.getItem('ADMIN_LEVEL')) {
                            window.sessionStorage.setItem(
                              'ADMIN_LEVEL',
                              'appadmin',
                            )
                          }
                        }
                      } else {
                        window.sessionStorage.setItem('ADMIN_LEVEL', 'provider')
                        break
                      }
                    }
                  }
                }
                window.sessionStorage.setItem(
                  'AVAILABLETENANTS',
                  this.availableTenants,
                )
                this.AppRoot.setRootScopeElement(
                  'availableTenants',
                  this.availableTenants,
                )
                window.sessionStorage.setItem(
                  'SELECTEDTENANTS',
                  this.selectedTenants,
                )
                window.sessionStorage.setItem('READTENANTS', this.readTenants)
                this.AppRoot.setRootScopeElement(
                  'readTenants',
                  this.readTenants,
                )
                for (let k = 0; k < userResponse.roles.length; k++) {
                  let roleName = userResponse.roles[k].role
                  if (
                    role[roleName].helptexts &&
                    role[roleName].helptexts.actions.length
                  ) {
                    this.AppRoot.setRootScopeElement('isSuperUser', true)
                    window.sessionStorage.setItem('IS_SUPER_USER', 'true')
                    let helpTextsReq = this.AuthenticationService.getHelpTexts(
                      null,
                      null,
                      null,
                    )
                    helpTextsReq
                      .then((resp: any) => {
                        let helpTextMap = resp.data.map
                        window.sessionStorage.setItem(
                          'HELP_TEXTS',
                          JSON.stringify(helpTextMap),
                        )
                        this.AppRoot.setRootScopeElement(
                          'helpTexts',
                          resp.data.map,
                        )
                      })
                      .catch((error: any, statusCode: any) => {
                        if (statusCode === 404) {
                          this.AuthenticationService.createHelpTextRepo(
                            null,
                            {
                              namespace: 'AppcitoHelpTexts',
                              key: 'value',
                            },
                            null,
                          )

                          window.sessionStorage.setItem(
                            'HELP_TEXTS',
                            JSON.stringify({
                              key: 'value',
                            }),
                          )
                          this.AppRoot.setRootScopeElement('helpTexts', {
                            key: 'value',
                          })
                        }
                      })
                    break
                  }
                }

                let adminLevel = window.sessionStorage.getItem('ADMIN_LEVEL')

                if (adminLevel === 'provider') {
                  window.sessionStorage.setItem('DRILL_LEVEL', 'provider')
                  this.AppRoot.setRootScopeElement(
                    'currentDrillLevel',
                    'provider',
                  )
                  this.appToBeLoaded = 'infrastructure'
                  this.setState({
                    loggedIn: true,
                  })
                  console.log('provider APP to be loaded')
                } else {
                  window.sessionStorage.setItem('DRILL_LEVEL', 'tenant')
                  this.AppRoot.setRootScopeElement(
                    'currentDrillLevel',
                    'tenant',
                  )
                  this.appToBeLoaded = 'Services'
                  this.setState({
                    loggedIn: true,
                  })
                  console.log('Tenant APP to be loaded')
                }
              })
              .catch((error: any) => {})
          })
          .catch((error: any) => {})
      })
      .catch((error: any) => {
        if (error.response) {
          if (error.response.status === 401) {
            this.Utilities.showMessage('LOGIN_UNAUTHORISED', 0, true)
          }
        } else {
          const apiURL = parameters.BASE_URL
          showMessage(
            <>
              Certificate Error. <br />
              Please accept the certificate for{' '}
              <a target="_blank" href={apiURL}>
                url
              </a>
              , and try again. <br /> Ignore any error on accepting the
              certificate.
            </>,
            0,
            0,
          )
        }
      })
  }

  render() {
    const uri = '/tenantselect'
    return !this.state.loggedIn ? (
      <div className="row">
        {/* <div className="background-polygons"></div> */}
        <div className="login-view login-default col-md-12 background-polygons">
          <div className="col-md-6 col-sm-8 centered col-md-offset-3">
            <div className="col-md-12 col-sm-12 centered brand">
              <div className="col-md-12 a10-globe" />
              {/* <AppRoot /> */}
              <Logo />
            </div>
            <NonLoggenInForm
              content={this.state.userObj}
              label="Sign in"
              onSubmit={this.loginHandler}
              onChange={this.changeHandler}
              submitLabel="Sign In"
              showBack={false}
              showForgotPass={true}
              showCancel={false}
            />
          </div>
        </div>
      </div>
    ) : (
      <Redirect to={uri} />
    )
  }
}

export default Login
