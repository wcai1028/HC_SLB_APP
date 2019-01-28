import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import parameters from 'parameters'

import { A10Component, IA10ContainerDefaultProps } from 'a10-gui-framework'
import { A10Spin, A10Alert } from 'a10-gui-widgets'
import { AuthenticationService } from 'src/services/AuthenticationService'
import { DashboardService } from 'src/services/DashboardService'
import { AcceptTerms } from './AcceptTerms'
import { AuthSelector } from './AuthSelector'
import SetPassword from '../SetPassword/index'

export interface ISetAuthenticationParams {
  user: string
  token: string
}
export interface ISetAuthenticationProps
  extends IA10ContainerDefaultProps,
  RouteComponentProps<ISetAuthenticationParams> {
}
export interface ISetAuthenticationState {
  user: string
  token: string
  provider: string
  areTermsAcceptedChecked: boolean
  termsAccepted: boolean
  inheritableAuthTypeSet: boolean
  authType: string
  alertProps: any
}

export interface IDefaultMethods { }

class SetAuthentication extends A10Component<
  ISetAuthenticationProps,
  ISetAuthenticationState
  > {
  constructor(props: any) {
    super(props)

    this.setAuthType = this.setAuthType.bind(this)
  }

  authType: string = ''
  allowInheritance: any = ''
  inheritableAuthType: any = ''

  AuthenticationService = new AuthenticationService()
  DashboardService = new DashboardService()
  defaultMethods: IDefaultMethods

  state = {
    user: this.props.match.params.user,
    token: this.props.match.params.token,
    provider: this.props.location.search.split('=')[1],
    areTermsAcceptedChecked: false,
    termsAccepted: false,
    inheritableAuthTypeSet: false,
    authType: '',
    alertProps: {
      isMessage: 0,
      messageKey: '',
      messageType: '',
      isKey: 0,
      readMore: 0,
    }
  }

  checkTermsAccepted = () => {
    let authHeader = {
      token: this.state.token,
      'Content-Type': 'application/json',
    }

    const isTermsAccepted = this.AuthenticationService.isTermsAccepted(
      authHeader,
      null,
      [this.state.user],
    )
    isTermsAccepted.then((resp: any) => {
      if (resp.data.terms == true) {
        this.setState({
          areTermsAcceptedChecked: true,
          termsAccepted: true,
        })
      } else {
        this.setState({
          areTermsAcceptedChecked: true,
          termsAccepted: false,
        })
      }
    })
    return (
      <A10Spin>
        <A10Alert
          message="User Details"
          description="Loading A10 Terms and Conditions."
          type="info"
        />
      </A10Spin>
    )
  }

  setAuthType = (payload: any, hidemessage?: boolean) => {

    this.setState({
      authType: payload.type
    })
    const authType = payload.type


    let authSetHeader: any = {
      "token": this.state.token,
      'Content-Type': 'application/json'
    };

    if (authType === 'ldap' || this.inheritableAuthType === 'ldap') {
      authSetHeader.user = payload.user;
      authSetHeader.password = payload.password;
    }
    if (authType === 'gcp') {
      authSetHeader.user = payload.user;
      authSetHeader.oauth_token = payload.access_token;
      delete payload.access_token;
    }
    if (authType === 'inherit' && this.inheritableAuthType === 'oauth') {
      authSetHeader.user = this.state.user;
      authSetHeader.oauth_token = payload.access_token;
      delete payload.access_token;
    }

    delete payload.user;
    delete payload.password;

    let authSet = this.AuthenticationService.setAuth(authSetHeader, payload, [this.state.user]);
    authSet
      .then((resp: any) => {
        this.getAuthType();
      })
      .catch((error: any) => {
        console.log(error.response) // we need to create a centralised error handling
      })

  }
  getAuthType = () => {
    const authHeader = {
      token: this.state.token,
      Accept: 'text/plain',
    }

    const getAuthType = this.AuthenticationService.getAuthType(
      authHeader,
      null,
      [this.state.user],
    )
    getAuthType
      .then((resp: any) => {
        this.authType = resp.data
        this.setState({
          authType: this.authType
        })
        console.log(this.authType)
        if (
          this.authType === 'ldap' ||
          this.authType === 'oauth' ||
          this.authType === 'keystone'
        ) {
          let userData: any = {
            token: this.state.token,
          }

          userData = this.DashboardService.serializeData(userData)

          const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            charset: 'utf-8',
          }

          const activate = this.AuthenticationService.activateUser(
            headers,
            userData,
            [this.state.user],
          )
          activate
            .then(() => {
              if (this.authType === 'ldap') {
                //this.Utilities.showMessage('SUCCESS_ACCOUNT_ACTIVATION', 1, true)
              } else if (this.authType === 'oauth') {
                //   this.Utilities.showMessage('SUCCESS_ACCOUNT_ACTIVATION_GCP', 1, true)
              }
              window.location.href = '/login/' + this.state.provider

              /*  $state.go('login');*/
            })
            .catch(() => {
              //   this.Utilities.showMessage('EXPIRED_ACTIVATION_LINK', 0, true)
              //  $state.go('login');
            })
        } else if (!this.authType || this.authType === '' || this.authType === 'default') {
          if (parameters.DEPLOYMENT_TYPE === 'onprem') {
            const payload = { type: 'default', inheritable: 'optional' }
            this.setAuthType(payload, true)
          }

          const inheritableHeader = {
            token: this.state.token,
          }
          let userData: any = {
            token: this.state.token,
          }

          userData = this.DashboardService.serializeData(userData)
          const isInheriable = this.AuthenticationService.isInheriable(
            inheritableHeader,
            userData,
            [this.state.user],
          )

          isInheriable
            .then((resp: any) => {
              this.allowInheritance = resp.data
              var inheritableType = this.AuthenticationService.getInheritableType(
                inheritableHeader,
                userData,
                [this.state.user],
              )
              inheritableType.then((resp1: any) => {
                this.inheritableAuthType = resp1.data
                this.setState({
                  inheritableAuthTypeSet: true,
                })
              })

              /*  $state.go('login');*/
            })
            .catch((resp: any) => {
              //    do something
            })
        }
      })
      .catch((resp: any) => {
        //  this.Utilities.showMessage('EXPIRED_ACTIVATION_LINK', 0, true)
      })
    return (
      <A10Spin>
        <A10Alert
          message="Authentication"
          description="Retreiving Authentication information for provider."
          type="info"
        />
      </A10Spin>
    )
  }

  loadAuthScreen = () => {
    if (this.state.termsAccepted) {
      if (!this.state.inheritableAuthTypeSet) {
        return this.getAuthType()
      } else if (this.state.authType === 'default') {
        return (
          <>
            <SetPassword token={this.state.token}
              userID={this.state.user}
              provider={this.state.provider}></SetPassword>
          </>
        )

      } else {
        return (
          <AuthSelector
            provider={this.state.provider}
            user={this.state.user}
            token={this.state.token}
            inheritableAuthType={this.inheritableAuthType}
            setAuthType={this.setAuthType}
          />
        )
      }
    } else {
      return (
        <AcceptTerms
          provider={this.state.provider}
          user={this.state.user}
          token={this.state.token}
        />
      )
    }
  }
  render() {
    if (!this.state.areTermsAcceptedChecked) {
      return this.checkTermsAccepted()
    }
    return this.loadAuthScreen()
  }
}
export default SetAuthentication
