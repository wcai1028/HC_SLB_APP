import { getNS, IHTTPRequestOptions } from 'a10-gui-framework'

import { httpClient } from 'src/libraries/httpClient'
import { getItem } from 'src/libraries/storage'

const HCCAPI_PREFIX = '/hccapi/v3'
const getProvider = () => getItem('PROVIDER') || 'root'

export const getVPortList = (
  tenant: string,
  search: string,
): IHTTPRequestOptions => {
  return {
    namespace: getNS('GLOBAL_VPORT_LIST'),
    request: async (epicDependence: IObject) => {
      try {
        const provider = getProvider()
        let globalVPortList = new Array()
        const actionURL = `${HCCAPI_PREFIX}/provider/${provider}/tenant/${tenant}/shared-object/slb/virtual-server?detail=true`
        const { data: vipRes } = await httpClient.get(actionURL)
        const vipList = vipRes['virtual-server-list']
        if (vipList) {
          vipList.forEach((data: any) => {
            if (data['port-list']) {
              if (search !== '') {
                data['port-list'] = data['port-list'].filter(port => port.name.indexOf(search) !== -1)
              }
              for (const port of data['port-list']) {
                port.vip = typeof data.name === 'object' ? data.name.name : data.name
                port.svcName = port['app-svc']
              }
              globalVPortList = globalVPortList.concat(data['port-list'] || [])
            }
          })
        }
        return globalVPortList
      } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err)
      }
      return []
    },
  }
}
