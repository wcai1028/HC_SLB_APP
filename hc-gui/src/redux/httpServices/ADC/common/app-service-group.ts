import { getNS, IHTTPRequestOptions } from 'a10-gui-framework'

import { httpClient } from 'src/libraries/httpClient'
import { getItem } from 'src/libraries/storage'

const HCCAPI_PREFIX = '/hccapi/v3'
const getProvider = () => getItem('PROVIDER') || 'root'

export const getAppServiceGroupList = (tenant: string): IHTTPRequestOptions => {
  return {
    namespace: getNS('APP_SERVICE_GROUP_LIST'),
    request: async (epicDependence: IObject) => {
      try {
        const provider = getProvider()
        const { data: Res } = await httpClient.get(
          `${HCCAPI_PREFIX}/provider/${provider}/tenant/${tenant}/app-svc-group`,
        )
        const appServiceGroupList = Res['app-svc-group-list'] || []
        if (appServiceGroupList) {
          const logcialClusterSet = new Set()
          for (const appServiceGroup of appServiceGroupList) {
            try {
              const { data: asgCount } = await httpClient.get(
                `/hccapi/v3/uuid/${appServiceGroup.uuid}/counts`,
              )
              const vportReducer = (accumulator, currentValue) =>
                accumulator + (currentValue['port-count'] || 0)
              const logicalClusterReducer = (accumulator, currentValue) => {
                if (currentValue['app-svc-reference-count']) {
                  const currName = currentValue[
                    'app-svc-references'
                  ][0].uri.substring(
                    currentValue['app-svc-references'][0].uri.indexOf(
                      'logical-cluster',
                    ) + 16,
                  )
                  if (!logcialClusterSet.has(currName)) {
                    logcialClusterSet.add(currName)
                    return (
                      accumulator +
                      (currentValue['app-svc-reference-count'] || 0)
                    )
                  } else {
                    return accumulator
                  }
                } else {
                  return accumulator
                }
              }

              appServiceGroup['app-count'] =
                asgCount['app-svc-group-info'][0][
                'app-svc-group-reference-count'
                ] || 0
              appServiceGroup['vport-count'] = asgCount[
                'app-svc-group-info'
              ][0]['app-svc-group-references'].reduce(vportReducer, 0)
              appServiceGroup['cluster-count'] = asgCount[
                'app-svc-group-info'
              ][0]['app-svc-group-references'].reduce(logicalClusterReducer, 0)
            } catch (err) {
              appServiceGroup['vport-count'] = 'N/A'
              appServiceGroup['cluster-count'] = 'N/A'
            }
          }
        }
        return appServiceGroupList
      } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err)
      }
      return []
    },
  }
}
