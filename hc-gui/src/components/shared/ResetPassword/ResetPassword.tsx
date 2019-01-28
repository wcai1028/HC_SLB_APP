import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { AuthenticationService, DashboardService, Utilities } from 'src/services/index'
import AppRoot from 'src/settings/appRoot'
import { Logo } from 'src/components/shared/Logo'
import { NonLoggenInForm } from 'src/components/shared/NonLoggenInForm'

export interface IResetPasswordProps { }
export interface IResetPasswordState { }

class ResetPassword extends A10Component<
  IResetPasswordProps,
  IResetPasswordState
  > {
  AppRoot = new AppRoot()
  AuthenticationService = new AuthenticationService()
  DashboardService = new DashboardService()
  Utilities = new Utilities()

  state = {
    provider: window.sessionStorage.getItem('PROVIDER') || '',
    userObj: [
      {
        name: 'provider',
        placeholder: 'Provider Name',
        type: 'text',
        required: true,
        value: '',
        id: 1,
      },
      {
        name: 'userid',
        placeholder: 'Email / User ID',
        type: 'text',
        required: true,
        value: '',
        id: 2,
      },
    ],
    passChanged: false,
    alertProps: {
      isMessage: 0,
      messageKey: '',
      messageType: '',
      isKey: 1,
      readMore: 0,
    },
  }

  changeHandler = (e: any) => {
    let objIndex = this.state.userObj.findIndex(ele => {
      return ele.name === e.target.name
    })
    let upadtedObject = [...this.state.userObj]
    if (e.target.type === 'checkbox') {
      // @ts-ignore
      upadtedObject[objIndex].value = e.target.checked
    } else {
      upadtedObject[objIndex].value = e.target.value
    }

    this.setState({
      userObj: upadtedObject,
    })
    e.target.value = this.state.userObj[objIndex].value
  }

  setPasswordHandler = () => {
    if (this.state.userObj[0].value === '') {
      // this.Utilities.showMessage(
      //   'Please enter your current password',
      //   0,
      //   false,
      //   '',
      // )
      return false
    }
    if (this.state.userObj[1].value === '') {
      // this.Utilities.showMessage(
      //   'New password and confirm password do not match',
      //   0,
      //   false,
      //   '',
      // )
      return false
    }

    let restPasswordReqModel = {
      user: this.state.userObj[1].value,
    }
    let promise = this.AuthenticationService.resetPassword(
      this.state.userObj[1].value,
      restPasswordReqModel,
    )
    promise
      .then((resp: any) => {
        if (resp.data.message) {
          let message =
            'Password change request has been accepted' +
            ' ' +
            resp.data.message
          this.Utilities.showMessage(message, 1, false)
          window.location.href = '/login/' + this.state.userObj[0].value
        } else {
          let message = 'Password has been sent to your email account'
          this.Utilities.showMessage(message, 1, false)
          window.location.href = '/login/' + this.state.userObj[0].value
        }
      })
      .catch((error: any) => {
        //need to handle
      })
    return true
  }

  render() {
    return (
      <div className="row">
        <div className="login-view login-default col-md-12 background-polygons">
          <div className="col-md-6 col-sm-8 centered col-md-offset-3">
            <div className="col-md-12 col-sm-12 centered brand">
              <div className="col-md-12 a10-globe" />

              <Logo />
            </div>
            <NonLoggenInForm
              content={this.state.userObj}
              label="Forgot Password"
              onSubmit={this.setPasswordHandler}
              onChange={this.changeHandler}
              submitLabel="Reset Password"
              showBack={false}
              showForgotPass={false}
              showCancel={true}
            />
          </div>
        </div>
      </div>
    )
  }
}
export default ResetPassword
