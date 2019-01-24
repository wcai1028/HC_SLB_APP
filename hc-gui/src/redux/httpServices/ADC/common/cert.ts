import { getNS, IHTTPRequestOptions } from 'a10-gui-framework'

import { httpClient } from 'src/libraries/httpClient'
import { getItem } from 'src/libraries/storage'
import { CertInfo } from 'src/libraries/certpem'

const HCCAPI_PREFIX = '/hccapi/v3'
const getProvider = () => getItem('PROVIDER') || 'root'

export const getCertList = (
  tenant: string,
  search: string,
): IHTTPRequestOptions => {
  return {
    namespace: getNS('CERT_LIST'),
    request: async (epicDependence: IObject) => {
      try {
        const provider = getProvider()
        let actionURL = `${HCCAPI_PREFIX}/provider/${provider}/tenant/${tenant}/shared-object/ssl-cert`
        if (search) {
          actionURL += `?name=${search}`
        }
        const { data: res } = await httpClient.get(actionURL)
        const certList = res['ssl-cert-list'] || []
        for (const cert of certList) {
          try {
            const certName = encodeURIComponent(cert.name)
            const { data: resp } = await httpClient.get(
              `/hrcapi/v3/provider/${getItem(
                'PROVIDER',
              )}/tenant/${tenant}/shared-object/ssl-cert/${certName}`,
            )
            const referredList = resp['referrer-list'] || []
            cert.object_count = referredList.length
            const certContent = await httpClient.get(
              `/hccapi/v3/provider/${getItem(
                'PROVIDER',
              )}/tenant/${tenant}/shared-object/ssl-cert/${certName}`,
            )
            if (!certContent) {
              cert.certContent = null
              continue
            }
            const certpem = new CertInfo()
            cert.certContent = certpem.getCertInfo(certContent.data)
          } catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err)
            cert.certContent = null
          }
        }
        return certList
      } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err)
      }
      return []
    },
  }
}
