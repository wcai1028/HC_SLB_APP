import { UrlService, AjaxService } from 'src/services'

export class AuthenticationService {
  UrlService = new UrlService()
  AjaxService = new AjaxService()

  createNewSession = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('CREATE_NEW_SESSION')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
    )
  }
  getRoles = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_ROLES')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
    )
  }

  getAdminDetails = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_USER_DETAILS')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
    )
  }

  getHelpTexts = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_HELP_TEXTS')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
    )
  }

  createHelpTextRepo = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('CREATE_HELP_TEXT_REPO')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
    )
  }

  hashCode = (s: string) => {
    let h = 0
    for (let i = 0; i < s.length; h &= h) {
      h = 31 * h + s.charCodeAt(i++)
    }
    return h
  }
  userDetails = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_USER_DETAILS')
    if (urlObj['NEEDED_QUERYSTRING']) {
      urlObj['URL'] = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
    )
  }
  updatePassword = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('UPDATE_PASSWORD')
    if (urlObj['NEEDED_QUERYSTRING']) {
      urlObj['URL'] = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
    )
  }
  activateUser = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('ACTIVATE_DOMAIN_USER')
    if (urlObj['NEEDED_QUERYSTRING']) {
      urlObj['URL'] = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
    )
  }
  resetPassword = (urlInput: any, payload: any) => {
    const urlObj = this.UrlService.get('RESET_PASSWORD')
    if (urlObj['NEEDED_QUERYSTRING']) {
      urlObj['URL'] = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      null,
      payload,
    )
  }
  isTermsAccepted = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_TERMS_ACCEPTED')
    if (urlObj['NEEDED_QUERYSTRING']) {
      urlObj['URL'] = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
    )
  }
  setTermsAccepted = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('SET_TERMS_ACCEPTED')
    if (urlObj['NEEDED_QUERYSTRING']) {
      urlObj['URL'] = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
    )
  }
  getAuthType = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_AUTH_TYPE')
    if (urlObj['NEEDED_QUERYSTRING']) {
      urlObj['URL'] = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
    )
  }
  isInheriable = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_INHERITANCE')
    if (urlObj['NEEDED_QUERYSTRING']) {
      urlObj['URL'] = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
    )
  }
  getInheritableType = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_INHERITANCE_TYPE')
    if (urlObj['NEEDED_QUERYSTRING']) {
      urlObj['URL'] = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
    )
  }
  setAuth = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('SET_AUTH')
    if (urlObj['NEEDED_QUERYSTRING']) {
      urlObj['URL'] = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
    )
  }
  getParentClientId = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_PARENT_CLIENT_ID')
    if (urlObj['NEEDED_QUERYSTRING']) {
      urlObj['URL'] = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
    )
  }
}
export default AuthenticationService
