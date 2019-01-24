export class AppRoot {
  state: any

  constructor() {
    this.state = {
      rootScope: {
        sessionAuthType: window.sessionStorage.getItem('USER_SESSION_AUTHTYPE')
          ? window.sessionStorage.getItem('USER_SESSION_AUTHTYPE')
          : '',
        availableTenants: window.sessionStorage.getItem('AVAILABLETENANTS')
          ? window.sessionStorage.getItem('AVAILABLETENANTS')
          : [],
        readTenants: window.sessionStorage.getItem('READTENANTS')
          ? window.sessionStorage.getItem('READTENANTS')
          : [],
        isSuperUser: window.sessionStorage.getItem('IS_SUPER_USER')
          ? window.sessionStorage.getItem('IS_SUPER_USER')
          : false,
        helpTexts: window.sessionStorage.getItem('HELP_TEXTS')
          ? window.sessionStorage.getItem('HELP_TEXTS')
          : { key: 'value' },
        currentDrillLevel: window.sessionStorage.getItem('DRILL_LEVEL')
          ? window.sessionStorage.getItem('DRILL_LEVEL')
          : false,
        allTenants: window.sessionStorage.getItem('ALLTENANTS')
          ? JSON.parse(window.sessionStorage.getItem('ALLTENANTS') || '[]')
          : [],
        currentTenant:
          window.sessionStorage.getItem('CURRENT_TENANT') &&
          window.sessionStorage.getItem('CURRENT_TENANT') !== 'undefined'
            ? JSON.parse(
                window.sessionStorage.getItem('CURRENT_TENANT') || '[]',
              )
            : [],
        tenant: window.sessionStorage.getItem('TENANT')
          ? window.sessionStorage.getItem('TENANT')
          : '',
        currentState: window.sessionStorage.getItem('CURRENT_STATE')
          ? window.sessionStorage.getItem('CURRENT_STATE')
          : '',
        appservices: window.sessionStorage.getItem('APP_SERVICES')
          ? JSON.parse(window.sessionStorage.getItem('APP_SERVICES') || '[]')
          : [],
        ladcClusters: window.sessionStorage.getItem('LADC_CLUSTERS')
          ? JSON.parse(window.sessionStorage.getItem('LADC_CLUSTERS') || '[]')
          : [],
        loadCredentials: window.sessionStorage.getItem('LADC_CREDENTIALS')
          ? JSON.parse(
              window.sessionStorage.getItem('LADC_CREDENTIALS') || '[]',
            )
          : [],
      },
    }
  }

  setRootScopeElement = (key: string, value: any) => {
    const rootScope = { ...this.state.rootScope }
    rootScope[key] = value
    this.state = {
      rootScope,
    }
  }
  getRootScopeElement = (key: string) => {
    return this.state.rootScope[key]
  }
  getRootScope = () => {
    return this.state.rootScope
  }
}

export default AppRoot
