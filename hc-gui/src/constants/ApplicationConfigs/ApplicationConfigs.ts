export class ApplicationConfigs {
  APPLICATIONS = [
    {
      name: 'Dashboard',
      icon: 'analytics-icon',
      state: 'enabled',
      // allowedRoles: ['provider', 'tenant', 'appadmin'],
      id: 1,
      // providerMode: false
    },
    {
      name: 'AppService',
      icon: 'services-icon',
      state: 'enabled',
      // allowedRoles: ['provider', 'tenant', 'appadmin'],
      id: 2,
      // providerMode: false
    },
    // {
    //   name: 'Apps',
    //   icon: 'apps-icon',
    //   state: 'disabled',
    //   subApps: [
    //     {
    //       name: 'My Apps',
    //       icon: 'my-apps-icon',
    //       state: 'enabled',
    //       allowedRoles: ['tenant', 'appadmin'],
    //       allowedLevels: ['tenant'],
    //       selected: true,
    //       isExternal: false,
    //       id: 1,
    //     },
    //     {
    //       name: 'Installed Apps',
    //       icon: 'installed-apps-icon',
    //       state: 'enabled',
    //       allowedRoles: ['provider', 'tenant', 'appadmin'],
    //       allowedLevels: ['provider', 'tenant'],
    //       selected: false,
    //       isExternal: true,
    //       id: 2,
    //     },
    //     {
    //       name: 'App Catalog',
    //       icon: 'app-catalog-icon',
    //       state: 'enabled',
    //       allowedRoles: ['provider'],
    //       allowedLevels: ['provider'],
    //       selected: false,
    //       isExternal: true,
    //       id: 3,
    //       separator: true,
    //     },
    //   ],
    //   allowedRoles: ['provider', 'tenant', 'appadmin'],
    //   id: 6,
    //   providerMode: true
    // },
  ]
  getAllowedRoles = (appname: string) => {
    const appIndex = this.APPLICATIONS.findIndex((key: any) => {
      return key.name === appname
    })
    if (appIndex >= 0) {
      return this.APPLICATIONS[appIndex].allowedRoles
    } else {
      return null
    }
  }

  getAllowedRolesSubApps = (parentApp: any, subApp: any) => {
    const applications = this.APPLICATIONS
    const appIndex = applications.findIndex((key: any) => {
      return key.name === parentApp
    })
    const subApps: any = applications[appIndex].subApps
    const subAppIndex = subApps.findIndex((key: any) => {
      return key.name === subApp
    })
    if (subAppIndex >= 0) {
      return subApps[subAppIndex].allowedRoles
    } else {
      return null
    }
  }
  getAllowedLevelsSubApps = (parentApp: any, subApp: any) => {
    const applications = this.APPLICATIONS
    const appIndex = applications.findIndex((key: any) => {
      return key.name === parentApp
    })
    const subApps: any = applications[appIndex].subApps
    const subAppIndex = subApps.findIndex((key: any) => {
      return key.name === subApp
    })
    if (subAppIndex >= 0) {
      return subApps[subAppIndex].allowedLevels
    } else {
      return null
    }
  }
  getAvailableApps = () => {
    return this.APPLICATIONS
  }
}
export default ApplicationConfigs
