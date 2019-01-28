import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import {
  A10Button,
  A10Input,
  A10Form
} from 'a10-gui-widgets'
import { Messages } from 'src/locale/en/Messages'
import { AuthenticationService, Utilities } from 'src/services/index'

export interface IInheritAuthProps {
  provider: string
  user: string
  token: string
  inheritableAuthType: string
  setAuthType(payload: any): void
}
export interface IInheritAuthState {
  ldapUserID: string
  ldapPassword: string
}

class InheritAuth extends A10Component<IInheritAuthProps, IInheritAuthState> {
  Messages = new Messages();
  AuthenticationService = new AuthenticationService();
  Utilities = new Utilities()

  state = {
    ldapUserID: '',
    ldapPassword: ''
  }

  handleChange = (
    stateName: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    if (index !== undefined) {
      let valArr = this.state[stateName];
      valArr[index] = e.target.value;
      // @ts-ignore
      this.setState({
        [stateName]: valArr
      });
      return;
    }
    if (e.target.type === 'checkbox') {
      // @ts-ignore
      this.setState({
        [stateName]: (e.target as HTMLInputElement).checked,
      })
    } else {
      // @ts-ignore
      this.setState({
        [stateName]: e.target.value,
      })
    }
  }

  setAuth = (): any => {
    const { ldapUserID, ldapPassword } = this.state
    const { inheritableAuthType } = this.props

    let payload: any = {
      type: "inherit",
      inheritable: inheritableAuthType
    };

    if (this.props.inheritableAuthType === 'ldap') {
      if (ldapUserID === '') {
        this.Utilities.showMessage('Please enter a valid Ldap user id', 0, false)
        return false;
      }
      if (ldapPassword === '') {
        this.Utilities.showMessage('Please enter a valid Ldap password', 0, false)
        return false;
      }
    }

    if (this.props.inheritableAuthType === 'oauth') {
      var clientHeader = {
        "Accept": "text/plain"
      }
      var clientId = this.AuthenticationService.getParentClientId(clientHeader, null, this.props.provider);
      clientId.then((resp: any) => {
        var id = resp;
        window.gapi.load('auth2', () => { //load in the auth2 api's, without it gapi.auth2 will be undefined
          window.gapi.auth2.init({
            client_id: id
          });
          var GoogleAuth = window.gapi.auth2.getAuthInstance(); //get's a GoogleAuth instance with your client-id, needs to be called after gapi.auth2.init

          GoogleAuth.signIn().then((response: any) => { //request to sign in
            payload.access_token = response.Zi.access_token;
            payload.inheritable = inheritableAuthType;
            this.props.setAuthType(payload);
          });

        });

      }).error((resp: any) => {

        // body...
      });
    } else {
      payload.inheritable = inheritableAuthType;
      this.props.setAuthType(payload);
    }

    if (inheritableAuthType === 'ldap') {
      payload.user = ldapUserID
      payload.password = ldapPassword
    }
    this.props.setAuthType(payload);
  }
  render() {
    const formItemLayout = {
      wrapperCol: { span: 24 }
    }

    const { ldapUserID, ldapPassword } = this.state
    const { inheritableAuthType } = this.props

    return (
      <div className="form-group clearfix">
        {
          inheritableAuthType === 'ldap' ?
            <>
              <A10Form.Item {...formItemLayout}>
                <A10Input
                  className="col-lg-24"
                  type="text"
                  placeholder={this.Messages.LDAP_USERID_PH}
                  defaultValue={ldapUserID}
                  onChange={this.handleChange.bind(this, 'ldapUserID')}
                />
                <span className="input-group-addon glyphicon pull-right glyphicon-question-sign editIcon" tooltip-placement="right"></span>
              </A10Form.Item>
              <A10Form.Item {...formItemLayout}>
                <A10Input
                  className="col-lg-24"
                  type="password"
                  placeholder={this.Messages.LDAP_PASSWORD_PH}
                  defaultValue={ldapPassword}
                  onChange={this.handleChange.bind(this, 'ldapPassword')}
                />
                <span className="input-group-addon glyphicon pull-right glyphicon-question-sign editIcon" tooltip-placement="right"></span>
              </A10Form.Item>
            </>
            :
            null
        }
        <A10Button type="primary"
          size="large"
          onClick={this.setAuth}>
          Set Authentication
        </A10Button>
      </div>
    )
  }
}
export default InheritAuth
