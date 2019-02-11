import * as React from 'react'
import { A10Container } from 'a10-gui-framework'

import A10IconTextGroup from 'src/components/shared/A10IconTextGroup'
import { A10Panel } from 'src/components/shared/A10Panel'
import TasksProcessChart from 'src/components/shared/TasksProcessChart'

class AppServiceAssociateDeployDone extends A10Container {
  render() {
    return (
      <A10Panel
        title={
          <A10IconTextGroup
            text="Deployment Status"
            icon={<span className="app-assoc-deploy-status-right" />}
          />
        }
        isFormContent={false}
      >
        <TasksProcessChart
          taskList={[
            {
              name: 'Device 1 Discovery',
              startTime: 1532676230673,
              endTime: 1532686230673,
              status: 'Completed',
              retryCount: 0,
            },
            {
              name: 'Device 1 Registration',
              startTime: 1532686230673,
              endTime: 1532696230673,
              status: 'Failed',
              retryCount: 2,
            },
            {
              name: 'Device 2 Discovery',
              startTime: 1532696230673,
              endTime: 1532706230673,
              status: 'In Progress',
              retryCount: 0,
            },
            {
              name: 'Device 2 Registration',
              startTime: 1532706230673,
              endTime: 1532706230673,
              status: 'Scheduled',
              retryCount: 0,
            },
            {
              name: 'Create Cluster',
              startTime: 1532716230673,
              endTime: 1532726230673,
              status: 'Cancelled',
              retryCount: 0,
            },
            {
              name: 'Register Cluster to Harmony',
              startTime: 1532726230673,
              endTime: 1532736230673,
              status: 'Scheduled',
              retryCount: 0,
            },
          ]}
        />
      </A10Panel>
    )
  }
}

export default AppServiceAssociateDeployDone
