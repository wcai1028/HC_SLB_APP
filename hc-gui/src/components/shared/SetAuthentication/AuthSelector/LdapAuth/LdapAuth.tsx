import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import {
  A10Icon,
  A10Form,
  A10Input,
  A10Radio,
  A10Button
} from 'a10-gui-widgets'

import { Messages } from 'src/locale/en/Messages'
import { UrlService, Utilities } from 'src/services/index'

export interface ILdapAuthProps {
  provider: string
  user: string
  token: string
  inheritableAuthType: string
  setAuthType(payload: any): void
}
export interface ILdapAuthState {
  ldapHosts: string
  authorizationScheme: string
  userDNList: Array<string>
  searchDNList: Array<string>
  loginAttrList: Array<string>
  adminDN: string
  adminPassword: string
  user: string
  password: string
}

class LdapAuth extends A10Component<ILdapAuthProps, ILdapAuthState> {
  Messages = new Messages()
  UrlService = new UrlService()
  Utilities = new Utilities()
  state = {
    ldapHosts: '',
    authorizationScheme: 'userDN',
    userDNList: [''],
    searchDNList: [''],
    loginAttrList: [''],
    adminDN: '',
    adminPassword: '',
    user: '',
    password: ''

  }

  getValidatedList = (list: Array<string>, type: string): any => {
    let validatedList = [] as Array<string>;
    list.forEach((element: string): any => {
      if (element.trim() === '') {
        this.Utilities.showMessage('Please enter a valid ' + type + ' pattern', 0, false)
        return false;
      }
      if (validatedList.indexOf(element) > -1) {
        this.Utilities.showMessage('Duplicate ' + type + ' pattern detected', 0, false)
        return false;
      }
      validatedList.push(element);
    });
    return validatedList;
  }
  setAuth = (): any => {
    console.log('clicked')

    const inheritable = 'optional';
    const { ldapHosts, authorizationScheme, userDNList, searchDNList, loginAttrList,
      adminDN, adminPassword, user, password } = this.state;
    let allDns = [] as Array<string>;
    let allLoginAttributes = [] as Array<string>;
    let allSearchDNs = [] as Array<string>;


    if (ldapHosts.trim() === '') {
      this.Utilities.showMessage('Please enter ldap servers in format ldap://ldapserverName:LdapPort', 0, false)
      return false;
    }

    let allUrls = ldapHosts.trim().split(',');

    let initialProtocol = this.UrlService.getProtocol(allUrls[0]);

    for (let i = 0; i < allUrls.length; i++) {
      allUrls[i] = allUrls[i].replace(/\s/g, "");
      let thisProtocol = this.UrlService.getProtocol(allUrls[i]);
      if (thisProtocol !== initialProtocol) {
        this.Utilities.showMessage('All ldap servers must have same protocol', 0, false)
        return false;
      }
      if (allUrls[i] === '') {
        this.Utilities.showMessage('Please enter ldap servers in format ldap://ldapserverName:LdapPort', 0, false)
        return false;
      }
    }

    if (authorizationScheme === 'userDN') {
      console.log("userDN");
      allDns = this.getValidatedList(userDNList, 'User DN');
      // Break the process on failed validation
      if (!allDns) {
        return;
      }
    } else {
      console.log("searchDN");

      allSearchDNs = this.getValidatedList(searchDNList, 'Search DN');
      allLoginAttributes = this.getValidatedList(loginAttrList, 'Login Attribute');

      // Break process on failed validation
      if (!allSearchDNs || !allLoginAttributes) {
        return;
      }
      // searchDNList.forEach((searchDN: string): any => {
      //   if (searchDN.trim() === '') {
      //     this.Utilities.showMessage('Please enter a valid Search DN pattern', 0, false);
      //     return false;
      //   }
      //   if (allSearchDNs.indexOf(searchDN) > -1) {
      //     this.Utilities.showMessage('Duplicate Search DN pattern detected', 0, false);
      //     return false;
      //   }
      //   allSearchDNs.push(searchDN);
      // });

      if (adminDN.trim() === '') {
        this.Utilities.showMessage('Please enter a valid Admin DN', 0, false)
        return false;
      }
      if (adminPassword.trim() === '') {
        this.Utilities.showMessage('Please enter a valid Admin Password', 0, false)
        return false;
      }
    }
    if (user.trim() === '') {
      this.Utilities.showMessage('Please enter a valid LDAP User ID', 0, false)
      return false;
    }
    if (password.trim() === '') {
      this.Utilities.showMessage('Please enter a valid LDAP Password', 0, false)
      return false;
    }

    let payload: any = {
      "type": "ldap",
      "scheme": authorizationScheme,
      "urls": allUrls,
      "userDNPattern": allDns,
      "loginAttribute": allLoginAttributes,
      "searchDN": allSearchDNs,
      "adminDN": adminDN,
      "adminPWD": adminPassword,
      "url": "",
      "user": user,
      "password": password
    };
    payload.inheritable = inheritable;
    this.props.setAuthType(payload);
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

  addMoreSearchDN = () => {
    let searchDNList = this.state.searchDNList;
    searchDNList.push('');
    this.setState({
      searchDNList: searchDNList
    })
  }

  deleteSearchDN = (index: number) => {
    let searchDNList = this.state.searchDNList;
    searchDNList.splice(index, 1);
    this.setState({
      searchDNList: searchDNList
    })
  }

  addMoreLoginAttr = () => {
    let loginAttrList = this.state.loginAttrList;
    loginAttrList.push('');
    this.setState({
      loginAttrList: loginAttrList
    })
  }

  deleteLoginAttr = (index: number) => {
    let loginAttrList = this.state.loginAttrList;
    loginAttrList.splice(index, 1);
    this.setState({
      loginAttrList: loginAttrList
    })
  }

  addMoreUserDN = () => {
    let userDNList = this.state.userDNList;
    userDNList.push('');
    this.setState({
      userDNList: userDNList
    })
  }

  deleteUserDN = (index: number) => {
    let userDNList = this.state.userDNList;
    userDNList.splice(index, 1);
    this.setState({
      userDNList: userDNList
    })
  }

  render() {

    const formItemLayout = {
      wrapperCol: { span: 24 }
    }

    const { ldapHosts, authorizationScheme, userDNList, searchDNList,
      loginAttrList, adminDN, adminPassword, user, password } = this.state

    return (
      <div className="width100">
        <A10Form.Item {...formItemLayout}>
          <A10Input
            type="text"
            placeholder={this.Messages.LDAP_HOSTS_PH}
            defaultValue={ldapHosts}
            onChange={this.handleChange.bind(this, 'ldapHosts')}
          />
        </A10Form.Item>
        <A10Form.Item {...formItemLayout} >
          <A10Radio.Group name="authorizationScheme" defaultValue={'userDN'} onChange={this.handleChange.bind(this, 'authorizationScheme')}>
            <A10Radio value="userDN">Use User DN</A10Radio>
            <A10Radio value="searchDN">Search User DN</A10Radio>
          </A10Radio.Group>
        </A10Form.Item>
        {
          authorizationScheme === 'userDN' ?
            <div>
              <div>
                {
                  userDNList.map((key: any, index: number) => {
                    return (
                      <A10Form.Item {...formItemLayout} key={'user-' + index}>
                        <A10Input
                          className={userDNList.length > 1 ? "col-sm-10" : "col-sm-12"}
                          type="text"
                          placeholder={this.Messages.USER_DN}
                          value={key}
                          onChange={(e: any) => this.handleChange('userDNList', e, index)}
                        />
                        {
                          userDNList.length > 1 ?
                            <A10Icon
                              className="col-sm-2"
                              type={'delete'}
                              onClick={() => this.deleteUserDN(index)}>
                            </A10Icon>
                            : null
                        }
                        {
                          (index == userDNList.length - 1) ?
                            <A10Icon type={'plus'} onClick={() => this.addMoreUserDN()}></A10Icon>
                            :
                            null
                        }
                      </A10Form.Item>
                    )
                  })
                }
              </div>
            </div>
            : authorizationScheme === 'searchDN' ?
              <div>
                <div>
                  {
                    searchDNList.map((key: any, index: number) => {
                      return (
                        <A10Form.Item {...formItemLayout} key={'search-' + index}>
                          <A10Input
                            className={searchDNList.length > 1 ? "col-sm-10" : "col-sm-12"}
                            type="text"
                            placeholder={this.Messages.SEARCH_DN}
                            value={key}
                            onChange={(e: any) => this.handleChange('searchDNList', e, index)}
                          />
                          {
                            searchDNList.length > 1 ?
                              <A10Icon
                                className="col-sm-2"
                                type={'delete'}
                                onClick={() => this.deleteSearchDN(index)}>
                              </A10Icon>
                              : null
                          }
                          {
                            (index == searchDNList.length - 1) ?
                              <A10Icon type={'plus'} onClick={() => this.addMoreSearchDN()}></A10Icon>
                              :
                              null
                          }
                        </A10Form.Item>
                      )
                    })
                  }
                </div>

                <div>
                  {
                    loginAttrList.map((key: any, index: number) => {
                      return (
                        <A10Form.Item {...formItemLayout} key={'login-' + index}>

                          <A10Input
                            className={loginAttrList.length > 1 ? "col-sm-10" : "col-sm-12"}
                            type="text"
                            placeholder={this.Messages.LOGIN_ATTR}
                            value={key}
                            onChange={(e: any) => this.handleChange('loginAttrList', e, index)}
                          />
                          {
                            loginAttrList.length > 1 ?
                              <A10Icon className="col-sm-2"
                                type={'delete'}
                                onClick={() => this.deleteLoginAttr(index)}>
                              </A10Icon>
                              : null
                          }
                          {
                            (index == loginAttrList.length - 1) ?
                              <A10Icon type={'plus'} onClick={() => this.addMoreLoginAttr()}></A10Icon>
                              :
                              null
                          }
                        </A10Form.Item>
                      )
                    })
                  }
                </div>

                <A10Form.Item {...formItemLayout}>
                  <A10Input
                    type="text"
                    placeholder={this.Messages.ADMIN_DN}
                    defaultValue={adminDN}
                    onChange={this.handleChange.bind(this, 'adminDN')}
                  />
                  <span className="input-group-addon pull-right glyphicon glyphicon-question-sign editIcon" tooltip-placement="right" tooltip="The distinguish name(DN) of ldap administrator."></span>
                </A10Form.Item>
                <A10Form.Item {...formItemLayout}>
                  <A10Input
                    type="text"
                    placeholder={this.Messages.ADMIN_PASSWORD}
                    defaultValue={adminPassword}
                    onChange={this.handleChange.bind(this, 'adminPassword')}
                  />
                  <span className="input-group-addon pull-right glyphicon glyphicon-question-sign editIcon" tooltip-placement="right" tooltip="Password of the ldap administrator."></span>
                </A10Form.Item>
              </div>
              :
              null
        }
        <A10Form.Item {...formItemLayout}>
          <A10Input
            className="col-lg-24"
            type="text"
            placeholder={this.Messages.LDAP_USERID_PH}
            defaultValue={user}
            onChange={this.handleChange.bind(this, 'user')}
          />
          <span className="input-group-addon glyphicon pull-right glyphicon-question-sign editIcon" tooltip-placement="right"></span>
        </A10Form.Item>
        <A10Form.Item {...formItemLayout}>
          <A10Input
            className="col-lg-24"
            type="password"
            placeholder={this.Messages.LDAP_PASSWORD_PH}
            defaultValue={password}
            onChange={this.handleChange.bind(this, 'password')}
          />
          <span className="input-group-addon glyphicon pull-right glyphicon-question-sign editIcon" tooltip-placement="right"></span>
        </A10Form.Item>
        <A10Button type="primary"
          size="large"
          onClick={this.setAuth}>
          Set Authentication
        </A10Button>
      </div>
    )
  }
}
export default LdapAuth
