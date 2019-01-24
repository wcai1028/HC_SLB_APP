import { getNS, IHTTPRequestOptions } from 'a10-gui-framework'

import { httpClient } from 'src/libraries/httpClient'
import { getItem, ALL_TEMPLATES } from 'src/libraries/storage'

const HCCAPI_PREFIX = '/hccapi/v3'
const getProvider = () => getItem('PROVIDER') || 'root'

export const getServiceGroupList = (tenant: string, search: string): IHTTPRequestOptions => {
    const getTemplate = (data: IObject) => {
        const templateList: IObject[] = []
        if (data) {
            Object.keys(ALL_TEMPLATES.servicegroup).forEach((key: string) => {
                // const extKey = `template-${key}`
                if (data.hasOwnProperty(key)) {
                    templateList.push({
                        name: data[key].name,
                        type: key,
                    })
                }
            })
        }
        return templateList
    }
    return {
        namespace: getNS('SERVICE_GROUP_LIST'),
        request: async (epicDependence: IObject) => {
            try {
                const provider = getProvider()
                const apiPrefix = `${HCCAPI_PREFIX}/provider/${provider}/tenant/${tenant}/shared-object`
                let actionURL = apiPrefix + '/slb/service-group?detail=true'
                if (search !== '') {
                    actionURL += `&name=${search}`
                }
                const { data: Res } = await httpClient.get(actionURL)
                const globalServiceGroupList = Res['service-group-list'] || []
                if (globalServiceGroupList) {
                    globalServiceGroupList.forEach((data: any) => {
                        data.tmplList = getTemplate(data)
                        data.tmplCount = data.tmplList.length
                        data['server-count'] = data['member-list'] ? data['member-list'].length : 0
                        data.svcName = data['app-svc']
                    })
                }
                return globalServiceGroupList
            } catch (err) {
                // tslint:disable-next-line:no-console
                console.error(err)
            }
            return []
        },
    }
}
