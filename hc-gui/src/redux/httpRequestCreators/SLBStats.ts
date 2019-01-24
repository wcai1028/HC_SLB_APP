import { httpClient } from 'src/libraries/httpClient'
import { getItem } from 'src/libraries/storage'

const analyticPrefix = '/analytics/thunder-adc/'

export const getVirtualServerPortStatus = (id: string, end: number) => {
  const provider = getItem('PROVIDER')
  const allTenants = JSON.parse(getItem('ALLTENANTS')) || []
  const tenant = getItem('tenant')
  const tenantObj = allTenants.filter((item: IObject) => item.name === tenant)
  const headers = {
    provider,
    // tenant,
    'X-Account': tenantObj[0].uuid,
    'Content-Type': 'application/json',
  }
  const url = analyticPrefix + 'slb_virtual_server_port'
  const query = {
    virtualServerPortStatus: {
      fields: ['o_oper_state'],
      sort: 'desc',
      size: 1,
      rangeby: {
        start: end - 3600000,
        end,
        field: 'ts',
      },
      regexp: {
        and: {
          o_uuid: id,
          // device_uuid: deviceId
        },
      },
    },
  }
  const promise = httpClient.post(url, query, {
    headers,
    absoluteBasePath: true,
  })
  return promise
}

export const getVirtualServerPortHealth = (id: string, end: number) => {
  const provider = getItem('PROVIDER')
  const allTenants = JSON.parse(getItem('ALLTENANTS')) || []
  const tenant = getItem('tenant')
  const tenantObj = allTenants.filter((item: IObject) => item.name === tenant)
  const headers = {
    provider,
    // tenant,
    'X-Account': tenantObj[0].uuid,
    'Content-Type': 'application/json',
  }
  const url = analyticPrefix + 'slb_virtual_server_port'
  const query = {
    vPortHealthStats: {
      fields: [
        'curr_conn',
        'total_req_succ',
        'total_req',
        'loc_deny',
        'total_conn',
        'in_latency',
        'es_total_failure_actions',
      ],
      aggregation: 'avg',
      sort: 'asc',
      rangeby: {
        start: end - 3600000,
        end,
        field: 'ts',
      },
      histogram: {
        field: 'ts',
        interval: 60000,
      },
      regexp: {
        and: {
          o_uuid: id,
          // device_uuid: deviceId
        },
      },
    },
  }
  const promise = httpClient.post(url, query, {
    headers,
    absoluteBasePath: true,
  })
  return promise
}

export const getServerHealth = (id: string, end: number) => {
  const provider = getItem('PROVIDER')
  const allTenants = JSON.parse(getItem('ALLTENANTS')) || []
  const tenant = getItem('tenant')
  const tenantObj = allTenants.filter((item: IObject) => item.name === tenant)
  const headers = {
    provider,
    // tenant,
    'X-Account': tenantObj[0].uuid,
    'Content-Type': 'application/json',
  }
  const url = analyticPrefix + 'slb_server'
  const query = {
    serverHealthStats: {
      fields: ['o_oper_state'],
      sort: 'desc',
      size: 1,
      rangeby: {
        start: end - 3600000,
        end,
        field: 'ts',
      },
      regexp: {
        and: {
          o_uuid: id,
          // device_uuid: deviceId
        },
      },
    },
  }
  const promise = httpClient.post(url, query, {
    headers,
    absoluteBasePath: true,
  })
  return promise
}

export const getServerPortStatus = (id: string, end: number) => {
  const provider = getItem('PROVIDER')
  const allTenants = JSON.parse(getItem('ALLTENANTS')) || []
  const tenant = getItem('tenant')
  const tenantObj = allTenants.filter((item: IObject) => item.name === tenant)
  const headers = {
    provider,
    // tenant,
    'X-Account': tenantObj[0].uuid,
    'Content-Type': 'application/json',
  }
  const url = analyticPrefix + 'slb_server_port'
  const query = {
    serverPortStatus: {
      fields: ['o_oper_state'],
      sort: 'desc',
      size: 1,
      rangeby: {
        start: end - 3600000,
        end,
        field: 'ts',
      },
      regexp: {
        and: {
          o_uuid: id,
          // device_uuid: deviceId
        },
      },
    },
  }
  const promise = httpClient.post(url, query, {
    headers,
    absoluteBasePath: true,
  })
  return promise
}

export const getServerPortHealth = (id: string, end: number) => {
  const provider = getItem('PROVIDER')
  const allTenants = JSON.parse(getItem('ALLTENANTS')) || []
  const tenant = getItem('tenant')
  const tenantObj = allTenants.filter((item: IObject) => item.name === tenant)
  const headers = {
    provider,
    // tenant,
    'X-Account': tenantObj[0].uuid,
    'Content-Type': 'application/json',
  }
  const url = analyticPrefix + 'slb_server_port'
  const query = {
    serverPortHealthStats: {
      fields: ['curr_conn', 'response_time'],
      aggregation: 'avg',
      sort: 'asc',
      rangeby: {
        start: end - 3600000,
        end,
        field: 'ts',
      },
      histogram: {
        field: 'ts',
        interval: 60000,
      },
      regexp: {
        and: {
          o_uuid: id,
          // device_uuid: deviceId
        },
      },
    },
  }
  const promise = httpClient.post(url, query, {
    headers,
    absoluteBasePath: true,
  })
  return promise
}

export const getServiceGroupStatus = (id: string, end: number) => {
  const provider = getItem('PROVIDER')
  const allTenants = JSON.parse(getItem('ALLTENANTS')) || []
  const tenant = getItem('tenant')
  const tenantObj = allTenants.filter((item: IObject) => item.name === tenant)
  const headers = {
    provider,
    // tenant,
    'X-Account': tenantObj[0].uuid,
    'Content-Type': 'application/json',
  }
  const url = analyticPrefix + 'slb_service_group'
  const query = {
    serviceGroupStatus: {
      fields: ['o_oper_state'],
      sort: 'desc',
      size: 1,
      rangeby: {
        start: end - 3600000,
        end,
        field: 'ts',
      },
      regexp: {
        and: {
          o_uuid: id,
          // device_uuid: deviceId
        },
      },
    },
  }
  const promise = httpClient.post(url, query, {
    headers,
    absoluteBasePath: true,
  })
  return promise
}

export const getServiceGroupHealth = (id: string, end: number) => {
  const provider = getItem('PROVIDER')
  const allTenants = JSON.parse(getItem('ALLTENANTS')) || []
  const tenant = getItem('tenant')
  const tenantObj = allTenants.filter((item: IObject) => item.name === tenant)
  const headers = {
    provider,
    // tenant,
    'X-Account': tenantObj[0].uuid,
    'Content-Type': 'application/json',
  }
  const url = analyticPrefix + 'slb_service_group'
  const query = {
    serviceGroupStats: {
      fields: ['service_healthy_host', 'service_unhealthy_host'],
      aggregation: 'sum',
      sort: 'asc',
      rangeby: {
        start: end - 3600000,
        end,
        field: 'ts',
      },
      histogram: {
        field: 'ts',
        interval: 60000,
      },
      regexp: {
        and: {
          o_uuid: id,
          // device_uuid: deviceId
        },
      },
    },
  }
  const promise = httpClient.post(url, query, {
    headers,
    absoluteBasePath: true,
  })
  return promise
}

export const serverPortHealthDataFormatting = (data: IObject) => {
  const healthIndexArray = new Array()
  if (Object.keys(data).length > 0) {
    const stats = data.serverPortHealthStats
    if (stats && stats.response_time_avg) {
      for (const key in stats.response_time_avg) {
        if (stats.response_time_avg.hasOwnProperty(key)) {
          let hIndex = 0
          if (stats.response_time_avg[key] < 1000) {
            hIndex = 1
          } else if (stats.response_time_avg[key] > 4000) {
            hIndex = 0
          } else {
            hIndex = 1 - (stats.response_time_avg[key] - 1000) / 3000
          }
          healthIndexArray.push([Number(key), hIndex])
        }
      }
    }
  }
  return healthIndexArray
}

export const serviceGroupHealthDataFormatting = (data: IObject) => {
  const healthIndexArray = new Array()
  if (Object.keys(data).length > 0) {
    const stats = data.serviceGroupStats
    if (stats && stats.service_healthy_host_sum) {
      for (const key in stats.service_healthy_host_sum) {
        if (stats.service_healthy_host_sum.hasOwnProperty(key)) {
          let healthIndex = -1
          const healthyHostCount = stats.service_healthy_host_sum[key] || 0
          const unhealthyHostCount = stats.service_unhealthy_host_sum[key] || 0
          const hostCount = healthyHostCount + unhealthyHostCount
          if (hostCount !== 0) {
            healthIndex =
              healthyHostCount / (healthyHostCount + unhealthyHostCount)
          }
          healthIndexArray.push([Number(key), healthIndex])
        }
      }
    }
  }
  return healthIndexArray
}

export const vportHealthDataFormatting = (data: IObject) => {
  const healthIndexArray = new Array()
  if (Object.keys(data).length > 0) {
    const stats = data.vPortHealthStats
    if (stats && stats.total_req_succ_avg) {
      for (const key in stats.total_req_succ_avg) {
        if (stats.total_req_succ_avg.hasOwnProperty(key)) {
          // es_total_failure_actions/total_conn
          const metric1 =
            stats.total_conn_avg[key] !== 0
              ? stats.es_total_failure_actions_avg[key] /
              stats.total_conn_avg[key]
              : 0
          // total_req_succ/total_req
          const metric2 =
            stats.total_req_avg[key] !== 0
              ? stats.total_req_succ_avg[key] / stats.total_req_avg[key]
              : 0
          // 1-loc_deny/total_conn
          const metric3 =
            stats.total_conn_avg[key] !== 0
              ? 1 - stats.loc_deny_avg[key] / stats.total_conn_avg[key]
              : 0
          // in_latency
          const metric4 =
            stats.in_latency_avg[key] <= 100
              ? 1
              : stats.in_latency_avg[key] > 1000
                ? 0
                : 1 - (stats.in_latency_avg[key] - 100) / 900
          const healthIndex = Math.min(metric1, metric2, metric3, metric4)
          healthIndexArray.push([Number(key), healthIndex])
        }
      }
    }
  }
  return healthIndexArray
}

// index 0: function to query analytic data, return a promise,
// index 1: the main key of the response data
// index 2: formatting function to transform data in dict format into an array
export const HealthStatSFuncMapping: IObject = {
  vportOperState: [getVirtualServerPortStatus, 'virtualServerPortStatus'],
  vportHealth: [
    getVirtualServerPortHealth,
    'vPortHealthStats',
    vportHealthDataFormatting,
  ],
  serverOperState: [getServerHealth, 'serverHealthStats'],
  serverPortOperState: [getServerPortStatus, 'serverPortStatus'],
  serverPortHealth: [
    getServerPortHealth,
    'serverPortHealthStats',
    serverPortHealthDataFormatting,
  ],
  serviceGroupOperState: [getServiceGroupStatus, 'serviceGroupStatus'],
  serviceGroupHealth: [
    getServiceGroupHealth,
    'serviceGroupHealth',
    serviceGroupHealthDataFormatting,
  ],
  // appServiceHealth: [, 'appServiceHealth']
}
