import { getNS, IHTTPRequestOptions } from 'a10-gui-framework'

import { httpClient } from 'src/libraries/httpClient'
import { getItem } from 'src/libraries/storage'

const HCCAPI_PREFIX = '/hccapi/v3'
const getProvider = () => getItem('PROVIDER') || 'root'

export const getAflexList = (
  tenant: string,
  search: string,
): IHTTPRequestOptions => {
  return {
    namespace: getNS('AFLEX_LIST'),
    request: async (epicDependence: IObject) => {
      try {
        const provider = getProvider()
        let actionURL = `${HCCAPI_PREFIX}/provider/${provider}/tenant/${tenant}/shared-object/aflex`
        if (search) {
          actionURL += `?name=${search}`
        }
        const { data: res } = await httpClient.get(actionURL)
        const aflexList = res['aflex-list'] || []
        for (const aflex of aflexList) {
          try {
            const { data: resp } = await httpClient.get(
              encodeURI(
                `/hrcapi/v3/provider/${getItem(
                  'PROVIDER',
                )}/tenant/${tenant}/shared-object/aflex/${aflex.name}`,
              ),
            )
            const referredList = resp['referrer-list'] || []
            aflex.object_count = referredList.length
          } catch (err) {
            console.log(err)
          }
        }
        return aflexList
      } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err)
      }
      return []
    },
  }
}
