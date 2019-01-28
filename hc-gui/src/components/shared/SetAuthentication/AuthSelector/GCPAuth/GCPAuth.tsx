import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import {
  A10Icon,
  A10Form,
  A10Input,
  A10Button,
  A10Popover
} from 'a10-gui-widgets'
import { Messages } from 'src/locale/en/Messages'
import { Utilities } from 'src/services/index'

export interface IGCPAuthProps {
  provider: string
  user: string
  token: string
  inheritableAuthType: string
  setAuthType(payload: any): void
}
export interface IGCPAuthState {
  user: string
  oauthClientID: string
  showSteps: boolean
}

class GCPAuth extends A10Component<IGCPAuthProps, IGCPAuthState> {
  Messages = new Messages()
  Utilities = new Utilities()

  state = {
    user: this.props.user,
    oauthClientID: '',
    showSteps: false
  }
  setAuth = () => {
    console.log('clicked')

    const { user, oauthClientID } = this.state
    let inheritable = 'optional';
    let payload: any = {
      type: "default",
      inheritable: inheritable
    };

    if (user === '') {
      this.Utilities.showMessage('Please enter a valid Google user id', 0, false)
      return false;
    }
    if (oauthClientID === '') {
      this.Utilities.showMessage('Please enter a valid OAuth client Id', 0, false)
      return false;
    }

    this.validateGoogleUser(oauthClientID)

  }

  validateGoogleUser = (clientID: string) => {

    // $scope.token = 'NOT FOUND';

    let inheritable = 'optional';

    window.gapi.load('auth2', () => { //load in the auth2 api's, without it gapi.auth2 will be undefined
      //$rootScope.client_id = clientID;
      window.gapi.auth2.init({
        client_id: clientID
      });
      var GoogleAuth = window.gapi.auth2.getAuthInstance(); //get's a GoogleAuth instance with your client-id, needs to be called after gapi.auth2.init

      //   console.log(GoogleAuth.signIn());

      GoogleAuth.signIn().then((response: any) => { //request to sign in
        console.log(response);
        let payload = {
          type: "oauth",
          scheme: this.props.inheritableAuthType,
          clientID: this.state.oauthClientID,
          access_token: response.Zi.access_token,
          inheritable: inheritable,
          user: this.state.user
        };
        this.props.setAuthType(payload);

      });
      //  $scope.validateGoogleUser = $scope.validateGoogleUser;


    });

  }

  handleChange = (
    stateName: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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

  toggleHelp = () => {
    let showSteps = this.state.showSteps;
    this.setState({
      showSteps: !showSteps
    })
  }

  render() {
    const formItemLayout = {
      wrapperCol: { span: 24 }
    }
    const { user } = this.props
    const { oauthClientID, showSteps } = this.state
    const myLocation = window.location.origin

    return (
      <div className="width100">
        <div className="row margin-v-10">
          <div className="col-md-4">
            <b>User Email </b>
          </div>
          <div className="col-md-8 text-right">
            <b> {user} </b>
          </div>
        </div>
        <A10Form.Item {...formItemLayout}>
          <A10Input
            type="text"
            placeholder={this.Messages.OAUTH_CLIENT_ID}
            defaultValue={oauthClientID}
            onChange={this.handleChange.bind(this, 'oauthClientID')}
          />
        </A10Form.Item>
        <A10Button type="primary"
          size="large"
          onClick={this.setAuth}>
          Set Authentication
        </A10Button>

        <div className="input-group col-md-12 form-group no-padding margin-v-10">
          <span>
            {
              showSteps ?
                <a href="javascript:void(0);" onClick={this.toggleHelp}>
                  <A10Icon
                    onClick={this.toggleHelp}
                    type={'down-square-o'}>
                  </A10Icon>
                  View steps to Create Google Client Id
                </a>
                :
                <a href="javascript:void(0);" onClick={this.toggleHelp}>
                  <A10Icon
                    onClick={this.toggleHelp}
                    type={'right-square-o'}>
                  </A10Icon>
                  Hide steps Create Google Client ID
                </a>
            }
          </span>
        </div>

        {
          showSteps ?

            <div className="input-group col-md-12 no-padding form-group well">

              <div className="col-md-12 no-padding form-group">
                <h4 className="col-md-12">Create Google Client ID </h4>
                <ol className="pull-left">
                  <li> Click <a href="https://console.cloud.google.com/apis/credentials" target="_blank"> here </a>to log in to your GCP account using the google account credentials..</li>
                  <li>Select the appropriate project from the drop-down list on the top left corner.</li>
                  <li>Click <b>Create credentials</b> tab, and select <b> OAuth client ID </b> from the drop down list, the “Configure consent screen” option is displayed, when creating the client ID for the first time for a specific project.</li>
                  <li>In the Configure consent screen page, provide a Product name in the name field (For example, A10 Harmony Controller) or any user chosen name. The name you provide here is displayed at multiple places, like Google consent page and so on. Hence, choose an appropriate name and then click <b>Save</b>.</li>
                  <li>Select Application type as the <b>Web application</b> .</li>
                  <li>Provide a credential name in the name field (For example, A10 Harmony Controller). The name you provide here is displayed at multiple places, like Google consent page and so on. Hence, choose an appropriate name.</li>
                  <li>Enter <b> {myLocation} </b> in the both Authorized JavaScript origins and Authorized redirect URIs fields</li>
                  <li>Click the <b>Create</b> button.</li>
                  <li> Client ID is displayed on the screen.</li>
                </ol>
              </div>
            </div>
            :
            null
        }
      </div>
    )
  }
}
export default GCPAuth
