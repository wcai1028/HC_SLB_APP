import { getNS, IHTTPRequestOptions } from 'a10-gui-framework'

import { httpClient } from 'src/libraries/httpClient'
import { getItem } from 'src/libraries/storage'

const HCCAPI_PREFIX = '/hccapi/v3'
// const getProvider = () => getItem('PROVIDER') || 'root'

export const getWorkflowList = (tenant: string): IHTTPRequestOptions => {
  return {
    namespace: getNS('WORKFLOW_LIST'),
    request: async (epicDependence: IObject) => {
      // try {
        // const { data: Res } = await httpClient.get(`${HCCAPI_PREFIX}`)

        return [
          {
            createTime: 1531334411973,
            endTime: 1531335415935,
            objectID: '180257d0-8535-11e8-932f-d6ebf673719d',
            object: 'Device 1',
            startTime: 1531334411973,
            status: 'Completed',
            tasks: [],
            numbers: 3,
            passed: 2,
            failed: 1,
            workflowId: '2d566f47-9891-466a-b3b4-4179425738e6',
            workflowType: 'Config Deployment',
          },
          {
            createTime: 1531334411973,
            endTime: 1531344415935,
            objectID: '180257d0-8535-11e8-932f-d6ebf673719d',
            object: 'Device 2',
            startTime: 1531334411973,
            status: 'In Progress',
            tasks: [],
            numbers: 3,
            passed: 2,
            failed: 1,
            workflowId: '2d566f47-9891-466a-b3b4-4179425738e6',
            workflowType: 'Backup',
          },
          {
            createTime: 1531334411973,
            endTime: 1531334615935,
            objectID: '180257d0-8535-11e8-932f-d6ebf673719d',
            object: 'Device 3',
            startTime: 1531334411973,
            status: 'Scheduled',
            tasks: [],
            numbers: 3,
            passed: 2,
            failed: 1,
            workflowId: '2d566f47-9891-466a-b3b4-4179425738e6',
            workflowType: 'Restore',
          },
          {
            createTime: 1531334411973,
            endTime: 1531334421973,
            objectID: '180257d0-8535-11e8-932f-d6ebf673719d',
            object: 'Device 4',
            startTime: 1531334411973,
            status: 'Failed',
            tasks: [],
            numbers: 3,
            passed: 2,
            failed: 1,
            workflowId: '2d566f47-9891-466a-b3b4-4179425738e6',
            workflowType: 'Registration',
          },
          {
            createTime: 1531334411973,
            endTime: 1531334451973,
            objectID: '180257d0-8535-11e8-932f-d6ebf673719d',
            object: 'Device 5',
            startTime: 1531334411973,
            status: 'Cancelled',
            tasks: [],
            numbers: 3,
            passed: 2,
            failed: 1,
            workflowId: '2d566f47-9891-466a-b3b4-4179425738e6',
            workflowType: 'Registration',
          },
        ]
      // } catch (err) {
      //   // tslint:disable-next-line:no-console
      //   console.error(err)
      // }
      // return []
    },
  }
}
