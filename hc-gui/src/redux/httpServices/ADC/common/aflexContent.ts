import { getNS, IHTTPRequestOptions } from 'a10-gui-framework'

import { httpClient } from 'src/libraries/httpClient'
import { getItem } from 'src/libraries/storage'

const HCCAPI_PREFIX = '/hccapi/v3'
const getProvider = () => getItem('PROVIDER') || 'root'

export const getAflexContent = (
  tenant: string,
  name: string,
): IHTTPRequestOptions => {
  return {
    namespace: getNS('AFLEX_DETAIL', { name }),
    request: async (epicDependence: IObject) => {
      const provider = getProvider()
      const aflexDetailApi = `${HCCAPI_PREFIX}/provider/${provider}/tenant/${tenant}/shared-object/aflex/${name}`
      let response = ''
      try {
        const { data: res } = await httpClient.get(aflexDetailApi)
        if (typeof res === 'string') {
          response = res
        }
      } catch (err) {
        console.error(err)
      }
      return response
    }
  }
}
