import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { FormHeader } from 'src/components/shared/FormHeader'
import { Logo } from 'src/components/shared/Logo'
import { InheritAuth } from './InheritAuth'
import { LocalAuth } from './LocalAuth'
import { GCPAuth } from './GCPAuth'
import { LdapAuth } from './LdapAuth'
import './styles/authselector.scss'
import {
  // A10Form,
  // A10Input,
  A10Select,
  // A10Icon,
  // A10Table,
  // A10Radio,
} from 'a10-gui-widgets'
export interface IAuthSelectorProps {
  provider: string
  user: string
  token: string
  inheritableAuthType: string
  setAuthType?(payload: any): void
}
export interface IAuthSelectorState {
  authType: any
}

type StateNameKeys = keyof IAuthSelectorState

class AuthSelector extends A10Component<
  IAuthSelectorProps,
  IAuthSelectorState
  > {
  state = {
    authType: this.props.provider !== 'root' ? 'inherit' : 'default',
  }

  handleChange = (
    stateName: StateNameKeys,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.target) {
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
    } else {
      this.setState({
        [stateName]: e,
      })
    }
  }
  render() {
    return (
      <div className="row">
        <div className="login-view login-default col-md-12 background-polygons">
          <div className="col-md-12 col-sm-8 centered col-md-offset-3">
            <div className="col-md-6 col-sm-8 centered brand">
              <div className="col-md-12 a10-globe" />
              <Logo />
            </div>
            <div className="col-md-6 col-sm-8 centered">
              <div className="col-md-12 panel">
                <FormHeader label="Select Authentication Mode" />
                <form className="col-md-7 col-sm-8 centered login-form block">
                  <div
                    className="form-group flex width100"
                    key="authTypeSelector"
                  >
                    <A10Select
                      onChange={this.handleChange.bind(this, 'authType')}
                      value={this.state.authType}
                    >
                      {this.props.provider !== 'root' ? (
                        <A10Select.Option value="inherit" key="inherit">
                          Inherit from Parent
                        </A10Select.Option>
                      ) : null}
                      <A10Select.Option value="default" key="default">
                        Local Authentication
                      </A10Select.Option>
                      <A10Select.Option value="ldap" key="ldap">
                        LDAP (Only for Harmony Controller Login)
                      </A10Select.Option>
                      <A10Select.Option value="gcp" key="gcp">
                        Google Authentication (Only for Harmony Controller
                        Login)
                      </A10Select.Option>
                      {/* <A10Select.Option value="keystone" key="keystone">
                        OpenStack Keystone
                      </A10Select.Option> */}
                    </A10Select>
                  </div>
                  <div
                    className="form-group flex width100"
                    key="authTypeButton"
                  >
                    {this.state.authType === 'inherit' ? (
                      <InheritAuth
                        provider={this.props.provider}
                        user={this.props.user}
                        token={this.props.token}
                        inheritableAuthType={this.props.inheritableAuthType}
                        setAuthType={this.props.setAuthType}
                      />
                    ) : this.state.authType === 'default' ? (
                      <LocalAuth
                        provider={this.props.provider}
                        user={this.props.user}
                        token={this.props.token}
                        setAuthType={this.props.setAuthType}
                      />
                    ) : this.state.authType === 'ldap' ? (
                      <LdapAuth
                        provider={this.props.provider}
                        user={this.props.user}
                        token={this.props.token}
                        inheritableAuthType={this.props.inheritableAuthType}
                        setAuthType={this.props.setAuthType}
                      />
                    ) : this.state.authType === 'gcp' ? (
                      <GCPAuth
                        provider={this.props.provider}
                        user={this.props.user}
                        token={this.props.token}
                        inheritableAuthType={this.props.inheritableAuthType}
                        setAuthType={this.props.setAuthType}
                      />
                    ) : null}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default AuthSelector
