import { getNS, IHTTPRequestOptions } from 'a10-gui-framework'

import { httpClient } from 'src/libraries/httpClient'
import { getItem } from 'src/libraries/storage'

const HCCAPI_PREFIX = '/hccapi/v3'
const getProvider = () => getItem('PROVIDER') || 'root'

export const getLogicalClusterList = (tenant: string, search: string): IHTTPRequestOptions => {
    return {
        namespace: getNS('CLUSTER_LIST'),
        request: async (epicDependence: IObject) => {
            try {
                const provider = getProvider()
                const apiPrefix = `${HCCAPI_PREFIX}/provider/${provider}/tenant/${tenant}`
                let actionURL = apiPrefix + '/logical-cluster?detail=true'
                if (search !== '') {
                    actionURL += `&name=${search}`
                }
                const { data: Res } = await httpClient.get(actionURL)
                const clusterList = Res['logical-cluster-list'] || []
                for (const cluster of clusterList) {
                    let dirtyCount = 0
                    if (cluster['referrer-list']) {
                        for (const app of cluster['referrer-list']) {
                            const dirtyUri = app['a10-url'] + '/dirty'
                            try {
                                const { data: dirtyRes } = await httpClient.get(dirtyUri)
                                if (dirtyRes) {
                                    dirtyCount += 1
                                }
                            } catch (err) {
                                console.log(err)
                            }
                        }
                    }
                    cluster.dirtyCount = dirtyCount
                }
                console.log(clusterList)
                return clusterList
            } catch (err) {
                // tslint:disable-next-line:no-console
                console.error(err)
            }
            return []
        },
    }
}
