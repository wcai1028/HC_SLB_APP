import { axios } from 'a10-gui-framework'
import parameters from 'parameters'

import { getItem } from './storage'

// const BASE_URL = (window as any).BASE_URL
axios.interceptors.request.use(
  (config: any) => {
    // for testing purpose
    const BASE_URL =
      process.env.NODE_ENV === 'production' ? parameters.BASE_URL : ''
    let { url } = config
    const { headers } = config
    const currentTenant = getItem('CURRENT_TENANT')
    if (url && !/\.json$/.test(url)) {
      if (!url.startsWith('/') && !url.startsWith('http')) {
        url = `/${url}`
      }
      if (!url.startsWith('http')) {
        config.url = `${BASE_URL}${url}`
      }
    }

    if (process.env.NODE_ENV === 'production') {
      config.url = config.url.replace('+', '%2B')
    }

    // headers
    if (headers.removeProvider) {
      delete headers.removeProvider
      config.headers = {
        'Content-Type': 'application/json',
        Authorization: getItem('ENCODED_SESSION_ID'),
        ...headers,
      }
    } else {
      config.headers = {
        'Content-Type': 'application/json',
        provider: getItem('PROVIDER'),
        Authorization: getItem('ENCODED_SESSION_ID'),
        ...headers,
      }
    }
    if (config.headers.tenant && config.url.indexOf('/analytics/') !== -1) {
      // x-account is the only supported edgeAccount.
      // tenant is unsupported
      delete config.headers.tenant
    }
    if (
      currentTenant &&
      !config.headers['x-account'] &&
      !config.headers['X-Account'] &&
      config.url.indexOf('/analytics/') !== -1
    ) {
      // auto add x-account
      config.headers['x-account'] = JSON.parse(
        currentTenant !== 'undefined' ? currentTenant : '{}',
      ).uuid
    }
    if (config.absoluteBasePath) {
      if (parameters) {
        config.url = `${parameters.BASE_URL}${url}`
      }
    }

    if (config.upload) {
      config.headers['Content-Type'] = 'multipart/form-data'
    }

    if (config.headers.provider === null) {
      delete config.headers.provider
    }
    if (
      config.headers.tenant === null ||
      config.headers['x-account'] ||
      config.headers['X-Account'] ||
      config.url.indexOf('/analytics/') === -1 // FIXME: remove this line when edge issue is fixed
    ) {
      delete config.headers.tenant
    }
    if (config.headers.Authorization === null) {
      delete config.headers.Authorization
    }

    config.data = config.data || '' // workaround for delete (https://github.com/axios/axios/issues/1083)
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  },
)

axios.interceptors.response.use(
  (response: any) => {
    return response
  },
  (error: any) => {
    try {
      const {
        config,
        response: { status },
      } = error
      if (status === 401 && config.url.indexOf('/sessions') === -1) {
        const provider = getItem('PROVIDER')
        sessionStorage.clear()
        window.localStorage.setItem('LASTALERT', 'true')
        if (provider !== null) {
          // tslint:disable-next-line:semicolon
          ; (window as any).location = '/login/' + provider
        } else {
          // tslint:disable-next-line:semicolon
          ; (window as any).location = '/login/root'
        }
      }
    } catch (err) {
      console.error(err)
    }
    return Promise.reject(error)
  },
)

export const httpClient = axios
export default httpClient
