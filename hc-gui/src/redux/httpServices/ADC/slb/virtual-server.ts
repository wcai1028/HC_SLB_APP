import { getNS, IHTTPRequestOptions } from 'a10-gui-framework'

import { httpClient } from 'src/libraries/httpClient'
import { getItem, ALL_TEMPLATES } from 'src/libraries/storage'

const HCCAPI_PREFIX = '/hccapi/v3'
const getProvider = () => getItem('PROVIDER') || 'root'

export const getVIPList = (tenant: string, search: string): IHTTPRequestOptions => {
  const getTemplate = (data: IObject) => {
    const templateList: IObject[] = []
    if (data) {
      Object.keys(ALL_TEMPLATES.vip).forEach((key: string) => {
        // const extKey = `template-${key}`
        let tag = ''
        if (data.hasOwnProperty(key)) {
          if (key === 'logging') {
            tag = 'ip.nat.logging'
          } else {
            tag = key
          }
          templateList.push({
            name: data[key].name,
            type: tag,
          })
        }
      })
    }
    return templateList
  }
  return {
    namespace: getNS('VIP_LIST'),
    request: async () => {
      try {
        const provider = getProvider()
        const apiPrefix = `${HCCAPI_PREFIX}/provider/${provider}/tenant/${tenant}/shared-object`
        let actionURL = apiPrefix + '/slb/virtual-server?detail=true'
        if (search !== '') {
          actionURL += `&name=${search}`
        }
        const { data: vipData } = await httpClient.get(actionURL)
        const vipList = vipData['virtual-server-list'] || []
        if (vipList) {
          vipList.forEach((data: IObject) => {
            data.tmplList = getTemplate(data)
            data.tmplCount = data.tmplList.length
            data['app-count'] = 0
            if (data['port-list']) {
              data['vport-count'] = data['port-list'].length
              const appServiceList = data['port-list'].map(
                (item: IObject) => item['app-svc'],
              )
              const uniqueAppSvc = new Set(appServiceList)
              data['app-count'] = uniqueAppSvc.size
            }
            data['vport-count'] = data['port-list']
              ? data['port-list'].length
              : 0
            data.apiPrefix = apiPrefix
          })
        }
        return vipList
      } catch (err) {
        console.error(err)
      }
      return []
    },
  }
}
