import { URLConstants, AppContext } from 'src/constants'

export class UrlService {
  URLConstants = new URLConstants()
  AppContext = new AppContext()
  protocols = ['http', 'https', 'ftp']

  get = (key: any) => {
    const url = this.URLConstants.getURLS(key)
    if (url) {
      return { ...url }
    } else {
      return null
    }
  }
  formatURL = (urlInput: string[], unformattedURL: string) => {
    let formattedURL = unformattedURL
    if (urlInput instanceof Array) {
      for (const replaceString of urlInput) {
        if (unformattedURL.indexOf('~') !== -1) {
          formattedURL = formattedURL.replace('~', replaceString)
        }
      }
    } else {
      if (unformattedURL.indexOf('~') !== -1) {
        formattedURL = formattedURL.replace('~', urlInput)
      }
    }
    return formattedURL
  }
  getProtocol = (url: string) => {
    const arr = url.split('/')
    const proto = arr[0]
    return proto.substring(0, proto.indexOf(':'))
  }
  getPort = (url: string) => {
    const protocol = this.getProtocol(url)
    const arr = url.split(':')
    if (arr[2]) {
      const finalport = arr[2].split('/')
      return finalport[0]
    } else if (protocol === 'http') {
      return 80
    } else if (protocol === 'https') {
      return 443
    } else if (protocol === 'tcp' || protocol === 'udp') {
      return 0
    } else {
      return 80
    }
  }
  getHostName = (url: string) => {
    const arr = url.split('/')
    const host = arr[2]
    const count = url.split(':').length
    if (count === 2) {
      return host
    } else if (count === 3) {
      return host.substring(0, host.indexOf(':'))
    } else {
      return this.AppContext.DEFAULT_HOST_NAME
    }
  }
  getCondition = (url: string) => {
    const arr = url.split('/')
    let lastIndexOfHost: number
    let service: string

    if (arr.length > 3) {
      service = arr[3]
    } else {
      return '/'
    }
    lastIndexOfHost = url.indexOf(service) + service.length
    return url.substring(lastIndexOfHost, url.length)
  }
  getServiceName = (url: string) => {
    const arr = url.split('/')
    const serviceName = arr[3]

    if (serviceName) {
      return serviceName
    } else {
      return this.AppContext.DEFAULT_SERVICE_NAME
    }
  }
  getConditionPath = (condition: string) => {
    const validPaths = [
      'URL',
      'HDR',
      'PRM',
      'BPM',
      'MTH',
      'GEO',
      'SCH',
      'PRT',
      'COK',
      'NET',
      'cla',
      'device',
      'os',
      'name',
      'version',
    ]
    let reqPath = ''
    const conditionUrlPath = condition.split(':')[0]
    if (conditionUrlPath !== 'uag') {
      for (const path of validPaths) {
        if (path === conditionUrlPath) {
          reqPath = path
          break
        }
      }
    } else {
      const actualURL = condition.split(':')[2]
      for (const path of validPaths) {
        if (path === actualURL.replace(/"/g, '')) {
          reqPath = path
          break
        }
      }
    }

    return reqPath
  }
  getConditionOperator = (condition: string) => {
    const validOperators = [
      'equals',
      'ciEquals',
      'notEquals',
      'ciNotEquals',
      'exists',
      'ciExists',
      'notExists',
      'ciNotExists',
      'prefix',
      'ciPrefix',
      'suffix',
      'ciSuffix',
      'contains',
      'ciContains',
      'inSubnet',
      'notInSubnet',
    ]
    let reqOperator = ''
    const conditionOperator = condition.split(':')[1]
    for (const operator of validOperators) {
      if (conditionOperator === operator) {
        reqOperator = operator
        break
      }
    }
    return reqOperator
  }
  getConditionName = (condition: string) => {
    const path = this.getConditionPath(condition)
    if (
      path === 'HDR' ||
      path === 'PRM' ||
      path === 'BPM' ||
      path === 'COK' ||
      path === 'cla'
    ) {
      if (path === 'COK') {
        // TODO
      }
      let value = condition.split(':"')[1]
      value = value.substring(0, value.length - 1)
      return value
    }
    return ''
  }
  getConditionValue = (condition: string) => {
    const path = this.getConditionPath(condition)
    let value = ''
    if (
      path === 'PRT' ||
      path === 'SCH' ||
      path === 'MTH' ||
      path === 'URL' ||
      path === 'GEO' ||
      path === 'NET'
    ) {
      value = condition.split(':"')[1]
    } else {
      value = condition.split(':"')[2]
    }

    if (typeof value !== 'undefined' && value.indexOf('"') > -1) {
      value = value.substring(0, value.length - 1)
    }
    return value
  }
}

export default UrlService
