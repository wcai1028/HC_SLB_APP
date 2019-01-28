import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { AuthenticationService, DashboardService, Utilities } from 'src/services/index'
import AppRoot from 'src/settings/appRoot'
import { Logo } from 'src/components/shared/Logo'
import { NonLoggenInForm } from 'src/components/shared/NonLoggenInForm'
import { Redirect } from 'react-router-dom'

export interface IDefaultMethods { }

export interface ISetPasswordProps {
  token: any
  userID: any
  provider: any
}
export interface ISetPasswordState {
  provider: any
  userObj: any
  redirect: boolean
}

class SetPassword extends A10Component<ISetPasswordProps, ISetPasswordState> {
  AppRoot = new AppRoot()
  AuthenticationService = new AuthenticationService()
  DashboardService = new DashboardService()
  Utilities = new Utilities()

  state = {
    provider: window.sessionStorage.getItem('PROVIDER') || '',
    userObj: [
      {
        name: 'newPassword',
        placeholder: 'New Password',
        type: 'password',
        required: true,
        value: '',
        id: 1,
      },
      {
        name: 'confirmPassword',
        placeholder: 'Confirm Password',
        type: 'password',
        required: true,
        value: '',
        id: 2,
      },
      {
        name: 'policy',
        type: 'checkbox',
        required: true,
        value: false,
        id: 3,
        cText: true,
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
    redirect: false
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
      this.Utilities.showMessage('Please enter new password', 0, false)
      return false
    }
    if (this.state.userObj[0].value !== this.state.userObj[1].value) {
      this.Utilities.showMessage('New password and confirm password do not match', 0, false)
      return false
    }
    if (!this.state.userObj[2].value) {
      //accept the certificate
      this.Utilities.showMessage('Please accept the policy', 0, false)
      return false
    }
    let userData: any = {
      password: this.state.userObj[0].value,
      token: this.props.token,
    }
    userData = this.DashboardService.serializeData(userData)
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      charset: 'utf-8',
    }
    var activate = this.AuthenticationService.activateUser(headers, userData, [
      this.props.userID,
    ])
    activate
      .then((response: any) => {
        this.Utilities.showMessage('SUCCESS_PASSWORD_UPDATION', 1, true)
        this.setState({
          redirect: true
        })
      })
      .catch((error: any) => {
        this.Utilities.showMessage('EXPIRED_ACTIVATION_LINK', 0, true)
      })

    return true
  }

  renderRedirect = (): any => {
    if (this.state.redirect) {
      return <Redirect to={'/login/' + this.props.provider} />
    }
  }

  render() {
    return (
      <>
        {
          this.state.redirect ?
            this.renderRedirect()
            :
            <div className="row">
              <div className="login-view login-default col-md-12 background-polygons">
                <div className="col-md-6 col-sm-8 centered col-md-offset-3">
                  <div className="col-md-12 col-sm-12 centered brand">
                    <div className="col-md-12 a10-globe" />

                    <Logo />
                  </div>
                  <NonLoggenInForm
                    content={this.state.userObj}
                    label="Set Password"
                    onSubmit={this.setPasswordHandler.bind(this)}
                    onChange={this.changeHandler}
                    submitLabel="Change"
                    showBack={false}
                    showForgotPass={false}
                    showCancel={false}
                  />
                </div>
              </div>
            </div>
        }
      </>
    )
  }
}
export default SetPassword
