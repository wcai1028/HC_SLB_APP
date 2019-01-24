export class InfraConfigs {
  CLUSTER_STATS = {
    thunderAdcClusterCpuMemory: {
      fields: [
        'avg_control_cpu_usage',
        'max_control_cpu_usage',
        'avg_data_cpu_usage',
        'max_data_cpu_usage',
        'avg_vthunder_cpu_usage',
        'max_vthunder_cpu_usage',
        'free_memory_ratio',
        'free_session_ratio',
      ],
      aggregation: 'avg',
      sort: 'asc',
      rangeby: {
        start: 1529225725359,
        end: 1529226025359,
        field: 'ts',
      },
      filterby: {
        and: {
          cluster_id: 'A5E7E21DED3F75E7E4AFD2805F19B1CE1E768C36',
        },
      },
    },
    all_cpu_usage: {
      fields: ['cpu_usage_overall'],
      rangeby: {
        start: 1529225725359,
        end: 1529226025359,
        field: 'ts',
      },
      filterby: {
        and: {
          cluster_id: 'A5E7E21DED3F75E7E4AFD2805F19B1CE1E768C36',
        },
      },
    },
  }
  DEVICE_STATS = {
    thunderAdcDeviceCpuMemory: {
      fields: [
        'avg_control_cpu_usage',
        'max_control_cpu_usage',
        'avg_data_cpu_usage',
        'max_data_cpu_usage',
        'avg_vthunder_cpu_usage',
        'max_vthunder_cpu_usage',
        'free_memory_ratio',
        'free_session_ratio',
      ],
      aggregation: 'avg',
      sort: 'asc',
      rangeby: {
        start: 9808,
        end: 909,
        field: 'ts',
      },
      filterby: {
        and: {
          device_uuid: '',
        },
      },
    },
    cluster_vcs_state: {
      fields: ['cluster_vcs_state', 'cluster_type', 'ts'],
      sort: 'desc',
      size: 1,
      rangeby: {
        start: 98798,
        end: 79879,
        field: 'ts',
      },
      filterby: {
        and: {
          device_uuid: '',
        },
      },
    },
    all_cpu_usage: {
      fields: ['cpu_usage_overall'],
      rangeby: {
        start: 89,
        end: 78978,
        field: 'ts',
      },
      filterby: {
        and: {
          device_uuid: '',
        },
      },
    },
  }
  PARTITION_STAT = {
    partitionCpu: {
      fields: ['avg_data_cpu_usage', 'max_data_cpu_usage'],
      aggregation: 'avg',
      sort: 'asc',
      rangeby: {
        start: 1529344421722,
        end: 1529344721722,
        field: 'ts',
      },
      filterby: {
        and: {
          device_uuid: '3790CAF73D24CF63E183901ACD9DFC90B01EFE6A',
          p_id: '0',
        },
      },
    },
  }
  TENANT_BANDWIDTH = {
    tenantAvgBandwidth: {
      fields: ['total_fwd_bytes_out', 'total_rev_bytes_out'],
      aggregation: 'sum',
      sort: 'desc',
      rangeby: {
        start: 1530005728432,
        end: 1530006028432,
        field: 'ts',
      },
      histogram: {
        field: 'ts',
        interval: 60000,
      },
    },
  }
  TENANT_REQUESTS = {
    tenantTotalRequests: {
      fields: ['total_requests'],
      sort: 'desc',
      aggregation: 'sum',
      rangeby: {
        start: 1530005728432,
        end: 1530006028432,
        field: 'ts',
      },
      histogram: {
        field: 'ts',
        interval: 60000,
      },
    },
  }
}
export default InfraConfigs
