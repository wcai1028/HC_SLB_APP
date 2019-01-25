import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { FormHeader } from 'src/components/shared/FormHeader'
import './styles/nonloggeninform.scss'
export interface INonLoggenInFormProps {
  label: string
  content: any
  onChange: any
  onSubmit: any
  submitLabel: any
  showBack: boolean
  showForgotPass: boolean
  showCancel: boolean
}
export interface INonLoggenInFormState {}

class NonLoggenInForm extends A10Component<
  INonLoggenInFormProps,
  INonLoggenInFormState
> {
  render() {
    let uri = '/login/' + window.sessionStorage.getItem('PROVIDER') || ''
    return (
      <div className="col-md-12 panel">
        <FormHeader label={this.props.label} />
        <form className="col-md-7 col-sm-8 centered login-form">
          {this.props.content.map((key: any) => {
            return (
              <div className="form-group flex" key={key.id}>
                <input
                  type={key.type}
                  value={key.value}
                  placeholder={key.placeholder}
                  required={key.required}
                  onChange={e => this.props.onChange(e)}
                  className="form-control"
                  name={key.name}
                />
                {key.cText ? (
                  <span className="condition">
                    I agree to the A10{' '}
                    <a
                      className="forgot-password-link underline"
                      href="https://www.a10networks.com/company/legal-notices/a10-networks-website-terms-useservice"
                      target="_blank"
                    >
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a
                      className="forgot-password-link underline"
                      href="https://www.a10networks.com/company/legal-notices/a10-networks-privacy-policy"
                      target="_blank"
                    >
                      Privacy Policy.
                    </a>
                  </span>
                ) : null}
              </div>
            )
          })}
          <div className="form-group clearfix">
            <input
              type="button"
              className="btn btn-primary col-md-6 login-btn"
              id="loginBtn"
              value={this.props.submitLabel}
              onClick={this.props.onSubmit}
              required={true}
            />
            {this.props.showBack ? (
              <a href="/controller/Services" className="backButton">
                {' '}
                Back
              </a>
            ) : null}
            {this.props.showForgotPass ? (
              <a href="/resetPassword" className="backButton">
                {' '}
                Forgot Password?
              </a>
            ) : null}
            {this.props.showCancel ? (
              <a href={uri} className="backButton">
                {' '}
                Cancel
              </a>
            ) : null}
            {/* <a data-ui-sref="resetPassword" className="pull-right link">Forgot Password?</a> */}
          </div>
          {/* <button  onClick={this.props.onSubmit}> Sign in</button> */}
        </form>
        {/* <div className="background" data-ng-if="clientIDExists" ><span>OR</span></div>
                    {/* <input type="button" value="G Login"  data-ng-click="gButtonClick()" className="g-signin2"> * /}
                    <div id="customBtn" className="customGoogle"  data-ng-if="clientIDExists" data-ng-click="gButtonClick()">
                        <span className="googleIcon"></span>
                        <span className="gbuttonText">Login Using Google</span>
                    </div> */}
      </div>
    )
  }
}
export default NonLoggenInForm
