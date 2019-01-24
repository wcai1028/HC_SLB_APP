import { _, getNS, IHTTPRequestOptions } from 'a10-gui-framework'

import { httpClient } from 'src/libraries/httpClient'
import { getItem } from 'src/libraries/storage'

const HCCAPI_PREFIX = '/hccapi/v3'
const getProvider = () => getItem('PROVIDER') || 'root'

export const getTenantList = (): IHTTPRequestOptions => {
  return {
    namespace: getNS('TENANT_LIST'),
    request: async () => {
      try {
        const provider = getProvider()
        const { data } = await httpClient.get(
          `${HCCAPI_PREFIX}/provider/${provider}/tenant`,
        )
        const tenantList = _.get(data, 'tenant-list', [])
        return tenantList
      } catch (err) {
        console.error(err)
      }
      return []
    },
  }
}
