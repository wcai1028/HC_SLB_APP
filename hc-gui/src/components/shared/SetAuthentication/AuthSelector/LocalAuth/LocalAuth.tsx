import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import {
  A10Button
} from 'a10-gui-widgets'
import { AuthenticationService, Utilities } from 'src/services';

export interface ILocalAuthProps {
  provider: string
  user: string
  token: string
  setAuthType(payload: any): void
}
export interface ILocalAuthState { }

class LocalAuth extends A10Component<ILocalAuthProps, ILocalAuthState> {
  AuthenticationService = new AuthenticationService()
  Utilities = new Utilities()
  authType = 'NOTDEFINED'
  allowInheritance = 'yes'
  inheritableAuthType = 'default'

  setAuth = (showMessage?: boolean) => {
    console.log('clicked')

    let inheritable = 'optional'
    let payload: any = {
      type: "default",
      inheritable: inheritable
    }
    this.props.setAuthType(payload)
  }

  getAuthenticationType = () => {
    let authHeader = {
      "token": this.props.token,
      "Accept": 'text/plain'
    };

    var getAuthType = this.AuthenticationService.getAuthType(authHeader, null, [this.props.user]);
    getAuthType.then((resp: any) => {

      this.authType = resp;
      if (!this.authType) {


        var getAuthType = this.AuthenticationService.getAuthType(authHeader, null, [this.props.user]);
        getAuthType.then((resp: any) => {

          var inheritableHeader = {
            "token": this.props.token
          };

          let userData = {
            "token": this.props.token
          };

          var isInheriable = this.AuthenticationService.isInheriable(inheritableHeader, userData, [this.props.user]);

          isInheriable.success((resp: any) => {
            this.allowInheritance = resp;

            console.log("isInheriable", resp);
            var inheritableType = this.AuthenticationService.getInheritableType(inheritableHeader, userData, [this.props.user]);
            inheritableType.success((resp1: any) => {

              this.inheritableAuthType = resp1;
              // console.log(resp1);
            });

            /*  $state.go('login');*/
          }).error((error: any) => {
            //    this.Utilities.showMessage('The link that you are using for activation is either incorrect or has already been used. Please contact support at support@appcito.com', 0, false);
            //  $state.go('login');
          });
        }).error((error: any) => {
          console.log('EXPIRED_ACTIVATION_LINK');
        });
      }
    });
  }

  render() {
    return (
      <div className="form-group clearfix" >
        <A10Button type="primary"
          size="large"
          onClick={this.setAuth}>
          Set Authentication
        </A10Button>
      </div>
    )
  }
}
export default LocalAuth
