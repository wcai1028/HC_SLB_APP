import { axios } from 'a10-gui-framework'
import parameters from 'parameters'

export class AjaxService {

  defaultHeaders: {
    [index: string]: string | null
  } = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    provider: window.sessionStorage.getItem('PROVIDER'),
    tenant: null,
    Authorization: null,
  }

  promisingHttpRequest = (
    url: string,
    method: string,
    headers: IObject | null,
    payload: IObject | string,
    contentType?: string,
    token?: any,
  ) => {
    const customURL = parameters.BASE_URL + url

    if (window.sessionStorage.getItem('CURRENT_TENANT')) {
      this.defaultHeaders.tenant =
        window.sessionStorage.getItem('CURRENT_TENANT') !== 'undefined'
          ? JSON.parse(window.sessionStorage.getItem('CURRENT_TENANT') || '{}')
              .name
          : ''
    }
    if (window.sessionStorage.getItem('ENCODED_SESSION_ID')) {
      this.defaultHeaders.Authorization = window.sessionStorage.getItem(
        'ENCODED_SESSION_ID',
      )
    }
    if (this.defaultHeaders.provider === null) {
      delete this.defaultHeaders.provider
    }

    const customHeaders = headers ? headers : this.defaultHeaders
    if (contentType && contentType === 'formdata') {
      customHeaders['Content-Type'] = 'multipart/form-data'
      customHeaders.Accept = '*/*'
    }
    let data = ''
    if (
      customHeaders &&
      (customHeaders['Content-Type'] === 'application/x-www-form-urlencoded' ||
        customHeaders['Content-Type'] === 'multipart/form-data')
    ) {
      data = payload as string
    } else {
      data = JSON.stringify(payload)
    }
    if (customHeaders.provider === null) {
      delete customHeaders.provider
    }
    if (customHeaders.tenant === null) {
      delete customHeaders.tenant
    }
    if (customHeaders.Authorization === null) {
      delete customHeaders.Authorization
    }

    // Cancel token used to cancel the http call when component gets unmounted
    const body: IObject = {
      method,
      url: customURL,
      headers: customHeaders,
      data: null,
      cancelToken: token,
    }
    if (payload) {
      body.data = data
    } else {
      delete body.data
    }

    return axios(body)
  }
}
export default AjaxService
