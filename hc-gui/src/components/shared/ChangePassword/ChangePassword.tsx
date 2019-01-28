import * as React from 'react'
import { Redirect } from 'react-router'
import { A10Component } from 'a10-gui-framework'

import { AuthenticationService, DashboardService, Utilities } from 'src/services/index'
import AppRoot from 'src/settings/appRoot'
import { Logo } from 'src/components/shared/Logo'
import { NonLoggenInForm } from 'src/components/shared/NonLoggenInForm'

export interface IChangePasswordProps { }
export interface IChangePasswordState {
  provider: string
  userObj: any
  passChanged: boolean
  alertProps: any
}

class ChangePassword extends A10Component<
  IChangePasswordProps,
  IChangePasswordState
  > {
  AppRoot = new AppRoot()
  AuthenticationService = new AuthenticationService()
  DashboardService = new DashboardService()
  Utilities = new Utilities()

  state = {
    provider: window.sessionStorage.getItem('PROVIDER') || '',
    userObj: [
      {
        name: 'currentPassword',
        placeholder: 'Current Password',
        type: 'password',
        required: true,
        value: '',
        id: 1,
      },
      {
        name: 'newPassword',
        placeholder: 'New Password',
        type: 'password',
        required: true,
        value: '',
        id: 2,
      },
      {
        name: 'confirmPassword',
        placeholder: 'Confirm Password',
        type: 'password',
        required: true,
        value: '',
        id: 3,
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
    upadtedObject[objIndex].value = e.target.value
    this.setState({
      userObj: upadtedObject,
    })
    e.target.value = this.state.userObj[objIndex].value
  }

  changePassHandler = () => {
    console.log(this.state)
    if (this.state.userObj[0].value === '') {
      this.Utilities.showMessage('Please enter your current password', 0, false)
      return false
    }
    if (this.state.userObj[1].value === '') {
      this.Utilities.showMessage('Please enter your new password', 0, false)
      return false
    }
    if (this.state.userObj[1].value !== this.state.userObj[2].value) {
      this.Utilities.showMessage('New password and confirm password do not match', 0, false)
      return false
    }
    const encodedSessionId = window.sessionStorage.getItem('ENCODED_SESSION_ID')
    const userId = window.sessionStorage.getItem('USER_ID')

    const headers = {
      Authorization:
        'Basic ' +
        new Buffer(userId + ':' + this.state.userObj[0].value).toString(
          'base64',
        ),
      provider: sessionStorage.getItem('PROVIDER'),
    }
    var userReq = this.AuthenticationService.userDetails(headers, null, userId)
    userReq
      .then((response: any) => {
        console.log('reaching here')
        let userData = response.data
        userData.password = this.state.userObj[1].value
        var userPass: any = {
          password: this.state.userObj[1].value,
        }
        var headersPass = {
          'Content-Type': 'application/x-www-form-urlencoded',
          charset: 'utf-8',
          provider: sessionStorage.getItem('PROVIDER'),
          Authorization: encodedSessionId,
        }

        userPass = this.DashboardService.serializeData(userPass)
        var updateUser = this.AuthenticationService.updatePassword(
          headersPass,
          userPass,
          userId,
        )
        updateUser
          .then((response: any) => {
            this.Utilities.showMessage('CHANGE_PASSWORD_SUCCESS', 1, true)
            setTimeout(function () {
              var provider = window.sessionStorage.getItem('PROVIDER')
              window.localStorage.clear()
              window.sessionStorage.clear()
              window.location.href = '/login/' + provider
            }, 3000)
            // window.localStorage.setItem('ENCODED_SESSION_ID', 'Basic ' + Base64.encode(userId + ':' + changePwdObj.newPwd));
          })
          .catch((error: any) => {
            this.Utilities.showMessage('CHANGE_PASSWORD_FAIL', 0, true)
          })
      })
      .catch((error: any) => {
        this.Utilities.showMessage('Incorrect current password', 0, false)
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
              label="Change Password"
              onSubmit={this.changePassHandler}
              onChange={this.changeHandler}
              submitLabel="Change"
              showBack={true}
              showForgotPass={false}
              showCancel={false}
            />
          </div>
        </div>
      </div>
    )
  }
}
export default ChangePassword
