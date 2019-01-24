import { getNS, IHTTPRequestOptions } from 'a10-gui-framework'

import { httpClient } from 'src/libraries/httpClient'
import { getItem } from 'src/libraries/storage'

const HCCAPI_PREFIX = '/hccapi/v3'
const getProvider = () => getItem('PROVIDER') || 'root'

export const getServerList = (tenant: string, search: string): IHTTPRequestOptions => {
    const getServiceGroupCount = (server: IObject) => {
        let count = 0
        const serviceGroupSet = new Set()
        const serviceGroupReg = /[^]*\/slb\/service-group\/(.*)\/member\/(.*)[^]*/
        if ('referrer-list' in server) {
            for (const sPort of server['referrer-list']) {
                const output = sPort['a10-url'].match(serviceGroupReg)
                if (output && !serviceGroupSet.has(output[1])) {
                    serviceGroupSet.add(output[1])
                    count += 1
                }
            }
        }
        return count
    }
    return {
        namespace: getNS('GLOBAL_SERVER_LIST'),
        request: async (epicDependence: IObject) => {
            try {
                const provider = getProvider()
                const apiPrefix = `${HCCAPI_PREFIX}/provider/${provider}/tenant/${tenant}/shared-object`
                let actionURL = apiPrefix + '/slb/server?detail=true'
                if (search !== '') {
                    actionURL += `&name=${search}`
                }
                const { data: Res } = await httpClient.get(actionURL)
                const globalServerList = Res['server-list'] || []
                globalServerList.map((server: IObject) => {
                    server.service_group_count = getServiceGroupCount(server)
                })
                return globalServerList
            } catch (err) {
                // tslint:disable-next-line:no-console
                console.error(err)
            }
            return []
        },
    }
}
