// tslint:disable-next-line:no-var-requires
import * as queryString from 'query-string'

import { UrlService, AjaxService, Utilities } from 'src/services'
import { AppRoot } from 'src/settings/appRoot'
import { Data } from 'src/constants/Data/Data'

export class DashboardService {
  UrlService = new UrlService()
  AjaxService = new AjaxService()
  Utilities = new Utilities( )
  AppRoot = new AppRoot()
  Data = new Data()

  listTenant = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('LIST_TENANT')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }

  listTenants = (headers: any, payload: any, urlInput: any) => {
    // const urlObj = this.UrlService.get('LIST_TENANTS_O')
    const urlObj = this.UrlService.get('LIST_TENANTS')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    // return new Promise((resolve: any, rej: any) => {
    //   resolve(this.Data.tenants)
    // })
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  listSelectedTenants = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('LIST_SELECTED_TENANTS')
    // const urlObj = this.UrlService.get('LIST_SELECTED_TENANTS_O')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }

  getApplications = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_APPLICATIONS')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  getLadcClusters = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_LADC_CLUSTERS')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  getCredentials = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_LADC_CREDENTIALS')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  getPaginatedItems = (itemsArray: any, pageLength: any) => {
    const indexes = [0]
    let currentIndex = 0
    const paginatedItems: any[] = []

    for (let i = 0; i < itemsArray.length; i++) {
      if (i > 0 && i % pageLength === 0) {
        currentIndex++
        indexes.push(currentIndex)
      }
      if (!paginatedItems[currentIndex]) {
        paginatedItems[currentIndex] = []
      }
      paginatedItems[currentIndex].push(itemsArray[i])
    }
    return [paginatedItems, indexes]
  }
  getProviders = (headers: any, payload: any) => {
    const urlObj = this.UrlService.get('GET_PROVIDERS')
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }

  getActivationUrl = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_PROVIDER_ACTIVATION_URL')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }

  updateProvider = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('UPDATE_PROVIDER')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  getTenants = (
    headers: any,
    payload: any,
    urlInput: any,
    cancelToken: any,
  ) => {
    const urlObj = this.UrlService.get('GET_TENANTS')
    // const urlObj = this.UrlService.get('LIST_TENANTS_O')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    // return new Promise((resolve: any, rej: any) => {
    //   resolve(this.Data.tenants)
    // })
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
      cancelToken,
    )
  }
  updateTenant = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('UPDATE_TENANT')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  getUsers = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_USERS')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  getTenantDisplayName = (tenantName: any) => {
    const tenants = this.AppRoot.getRootScopeElement('allTenants')
    const dispName = tenants.filter((key: any) => {
      if (key.name === tenantName) {
        return key
      }
      return false
    })

    if (dispName && dispName.length > 0) {
      return dispName[0].displayName
    } else {
      return tenantName
    }
  }
  getUserActivationMail = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_USER_ACTIVATION_LINK')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  addUser = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('ADD_USER')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  updateUser = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('UPDATE_USER')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  addProviders = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('ADD_PROVIDER')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  addSubProviderUser = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('ADD_SUB_PROVIDER_USER')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  addTenants = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('ADD_TENANT')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  getUser = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_USER_DETAILS')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  userProfile = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_PROVIDER_ADMIN_DETAILS')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  userAssign = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('ASSIGN_USER')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      null,
      payload,
      undefined,
    )
  }

  // Apps APIs
  getTenantActiveApps = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_HC_TENANT_APPS')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  getTenantActiveAppsAppAdmin = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_HC_TENANT_APPS_APP_ADMIN')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  getProviderAppRepo = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_HC_PROVIDER_APPS')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  getHCAppCatalog = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_HC_APP_CATALOG')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  getHCAppTenantCatalog = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_HC_TENANT_APP_CATALOG')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  saveHCApp = (headers: any, payload: any, urlInput: any, updateMode: any) => {
    const urlObj = this.UrlService.get(
      updateMode ? 'UPDATE_HC_APP' : 'UPLOAD_HC_APP',
    )
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      'formdata',
    )
    // var url = encodeURI(this.Parameters.BASE_URL + urlObj.URL);
    // return $.ajax({
    //     url: url,
    //     data: payload,
    //     headers: {
    //         'Authorization' : window.sessionStorage.getItem('ENCODED_SESSION_ID'),
    //         'provider' : window.sessionStorage.getItem('PROVIDER')
    //     },
    //     type: urlObj.METHOD,
    //     contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
    //     processData: false, // NEEDED, DON'T OMIT THIS
    // });
  }
  deleteHCApp = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('DELETE_HC_APP')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  subscribeHCApp = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('SUB_HC_PROVIDER_APP')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  unsubscribeHCApp = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('UNSUB_HC_PROVIDER_APP')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  enableHCApp = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('SUB_HC_PROVIDER_APP')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  enableHCTenantApp = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('SUB_HC_TENANT_APP')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  disableHCTenantApp = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('UNSUB_HC_TENANT_APP')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  getHCAppInfo = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_HC_APP_INFO')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  deleteTenant = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('DELETE_TENANT')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  deleteUser = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('DELETE_USER')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  deleteProvider = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('DELETE_PROVIDER')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  getObjectType = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_OBJECT_TYPE')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }

    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  getSchemaRegistry = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_SCHEMA_REGISTRY')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }

    const fields = {
      fields: [
        {
          type: 'number',
          name: 'count',
        },
      ],
    }

    let schema = {
      data: {
        schema: JSON.stringify(fields),
      },
    }

    return Promise.resolve(schema)

    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  getMetricType = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_METRIC_TYPE')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }

    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  getTriggers = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_TRIGGERS')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }

    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  getTrigger = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_TRIGGER')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }

    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  addTrigger = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('ADD_TRIGGER')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  updateTrigger = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('UPDATE_TRIGGER')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  deleteTrigger = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('DELETE_TRIGGER')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  getAlerts = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_ALERTS')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }

    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  addAlert = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('ADD_ALERT')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  updateAlert = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('UPDATE_ALERT')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  deleteAlert = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('DELETE_ALERT')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  getActions = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_ACTIONS')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  getAction = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_ACTION')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  addAction = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('ADD_ACTION')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  updateAction = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('UPDATE_ACTION')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  deleteAction = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('DELETE_ACTION')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  getHCEvents = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_HC_EVENTS')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }

    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  serializeData = (data: IObject) => {
    return queryString.stringify(data)
  }
  getLicenseInfo = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_LICENSE_INFO')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
    // const licenseObj = {
    //   allocDate: new Date().toUTCString(),
    //   expDate: new Date().toUTCString(),
    //   mbu: {
    //     totalValue: 6227702580,
    //     usedValue: 104857600,
    //   },
    //   mdu: {
    //     totalValue: 30,
    //     usedValue: 2,
    //   },
    //   mpu: {
    //     totalValue: 20,
    //     usedValue: 5,
    //   },
    // }
    // return Promise.resolve(licenseObj)
  }

  getLicenseRevokedActivations = (
    headers: any,
    payload: any,
    urlInput: any,
  ) => {
    // const urlObj = this.UrlService.get('GET_LICENSE_REVOKED_ACTIVATIONS')
    // if (urlObj.NEEDED_QUERYSTRING) {
    //   urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    // }
    // return this.AjaxService.promisingHttpRequest(
    //   urlObj.URL,
    //   urlObj.METHOD,
    //   headers,
    //   payload,
    //   undefined,
    // )
    const dummyRevokedActivations = {
      data: [
        {
          state: 'InActive',
          device: '00:0C:28:A8:DC:BC (4.1.3-P8, build 113 | VMware)',
          licenseInfo: '500 Mbps vThunder',
          activatedOn: 'Jul 15, 2018 10:53:58 AM UTC',
          lastContact: 'Jul 17, 2018 10:53:58 AM UTC',
        },
        {
          state: 'ACTIVE',
          device: '00:0C:29:A8:DC:BC (4.1.4-P8, build 114 | VMware)',
          licenseInfo: '500 Mbps vThunder',
          activatedOn: 'Aug 15, 2018 10:53:58 AM UTC',
          lastContact: 'Aug 17, 2018 10:53:58 AM UTC',
        },
      ],
    }
    return Promise.resolve(dummyRevokedActivations)
  }
  getLicenseUnrevokedActivations = (
    headers: any,
    payload: any,
    urlInput: any,
  ) => {
    // const urlObj = this.UrlService.get('GET_LICENSE_UNREVOKED_ACTIVATIONS')
    // if (urlObj.NEEDED_QUERYSTRING) {
    //   urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    // }
    // return this.AjaxService.promisingHttpRequest(
    //   urlObj.URL,
    //   urlObj.METHOD,
    //   headers,
    //   payload,
    //   undefined,
    // )
    const dummyUnrevokedActivations = {
      data: [
        {
          state: 'InActive',
          device: '00:0C:26:A8:DC:BC (4.1.1-P8, build 111 | VMware)',
          licenseInfo: '500 Mbps vThunder',
          activatedOn: 'Jul 15, 2018 10:53:58 AM UTC',
          lastContact: 'Jul 17, 2018 10:53:58 AM UTC',
        },
        {
          state: 'ACTIVE',
          device: '00:0C:27:A8:DC:BC (4.1.2-P8, build 112 | VMware)',
          licenseInfo: '500 Mbps vThunder',
          activatedOn: 'Aug 15, 2018 10:53:58 AM UTC',
          lastContact: 'Aug 17, 2018 10:53:58 AM UTC',
        },
      ],
    }
    return Promise.resolve(dummyUnrevokedActivations)
  }
  getLicenseAllocations = (headers: any, payload: any, urlInput: any) => {
    // const urlObj = this.UrlService.get('GET_LICENSE_ALLOCATIONS')
    // if (urlObj.NEEDED_QUERYSTRING) {
    //   urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    // }
    // return this.AjaxService.promisingHttpRequest(
    //   urlObj.URL,
    //   urlObj.METHOD,
    //   headers,
    //   payload,
    //   undefined,
    // )
    const dummyAllocations = {
      data: [
        {
          timestamp: 'Jun 15, 2018 10:53:58 AM UTC',
          reference: 'GLM',
          licenseType: 'MBU',
          details: 'License request made by <username> for <capacity>',
          result: 'Success',
        },
        {
          timestamp: 'Jul 15, 2018 10:53:58 AM UTC',
          reference: 'Thunder',
          licenseType: 'MBU',
          details: 'Device <name> with UUID: <UUID> consumed <capacity>',
          result: 'Success',
        },
        {
          timestamp: 'Aug 15, 2018 10:53:58 AM UTC',
          reference: 'Lightning ADC',
          licenseType: 'MPU',
          details: 'Registration denied. Reason: Capacity not available',
          result: 'Failure',
        },
      ],
    }
    return Promise.resolve(dummyAllocations)
  }
  updateLicense = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('ADD_LICENSE_INFO')
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
  deleteLicense = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('DEL_LICENSE_INFO')
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
  getRPTMetricsData= (headers: any, payload: any, urlInput: any) => {
    console.log(this.UrlService)
    const urlObj = this.UrlService.get('GET_METRICS')
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
  getRPTMetrics=(querySet : any,key : any, scheduleJobsMap : any,fn:any)=>{
 
    let keyPath = key.replace("RPT/","/analytics/")
    for(let i=0; i<querySet.length; i++){
      let payload = querySet[i];
      let data = this.getRPTMetricsData(null,payload,[keyPath])
      data.then((response : any)=>{
        querySet[i].responses = response.data
        fn(querySet[i],i,key)
      })
    }
    
    return querySet
  }
  getBatchAnalyticsData = (scheduleJobs : any, scheduleJobsMap : any,fn:any)=>{
    let keys = Object.keys(scheduleJobs)
    for(let i=0;i<keys.length;i++){
      let dataSource = keys[i].split('/')[0]
      switch(dataSource){
        case 'RPT' : 
        scheduleJobs[keys[i]] = this.getRPTMetrics(scheduleJobs[keys[i]],keys[i], scheduleJobsMap,fn)
        default :
          //return false
      }
    }
   
    return (scheduleJobs)
  }
  getClusters = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_CLUSTERS')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }

  getDevices = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_INDEPENDENT_DEVICES')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      undefined,
    )
  }
  getDashboardContextElements = (context : any)=>{
     switch(context){
       case 'provider' : 
        return this.getProviders(null,null)
       case 'tenant' : 
        return this.getTenants(null,null,[window.sessionStorage.getItem('PROVIDER')],false)
       case 'cluster' : 
        return this.getClusters(null,null,[window.sessionStorage.getItem('PROVIDER')])
       case 'device' : 
          return this.getDevices(null,null,[window.sessionStorage.getItem('PROVIDER')])
       case 'appservices' : 
       if(!JSON.parse(window.sessionStorage.getItem('CURRENT_TENANT'))){
          this.Utilities.showMessage('Failed to set dashboard context as no tennat is selected', 0, false) 
            return new Promise((resolve: any, rej: any) => {
              resolve([])
            })
       }
        return this.getApplications(null,null,[window.sessionStorage.getItem('PROVIDER'),JSON.parse(window.sessionStorage.getItem('CURRENT_TENANT')).name])
  
     }
    // return contextArray
   }
}

export default DashboardService
