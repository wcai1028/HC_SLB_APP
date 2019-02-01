import { _ } from 'a10-gui-framework'

const L4SLBUtilities = {
  getURLForConfiguration: (
    isUpdate: boolean = false,
    appServiceName: string = null,
  ) => {
    let url = '/configuration'
    if (isUpdate) {
      url = `${url}/${appServiceName}`
    }

    return url
  },
  generateVirtualServerName: (ip: string, timestamp: number = null) => {
    // example {prefix} + _ + {memberIp}: 'vip_1_1_1_1'  timestamp will be applied
    return L4SLBUtilities.generateNameByIP(ip, 'vip', null, timestamp)
  },
  generateServiceGroupName: (
    ip: string,
    port: number,
    protocol: string,
    timestamp: number = null,
  ) => {
    // example vip_+ {memberIp} + {protocol} + _sg: 'vip_9_9_9_9_99_udp_sg'  timestamp will be applied
    if (!_.isNumber(port) && !protocol) {
      return ''
    }
    return L4SLBUtilities.generateNameByIP(
      ip,
      'vip',
      `${port}_${protocol}_sg`,
      timestamp,
    )
  },
  generateServerName: (ip: string, timestamp: number = null) => {
    // example {prefix} + _ + {memberIp}: 'srv_1_1_1_1'  timestamp will be applied
    return L4SLBUtilities.generateNameByIP(ip, 'srv', null, timestamp)
  },
  generateHealthMonitorName: (
    ip: string,
    port: number,
    timestamp: number = null,
  ) => {
    // example {prefix} + _ + {memberIp} + _ + {vPortNumber}: 'hm_9_9_9_9_99'  timestamp will be applied
    return L4SLBUtilities.generateNameByIP(ip, 'hm', port.toString(), timestamp)
  },
  generatePersistSourceIPTemplateName: (
    ip: string,
    port: number,
    timestamp: number = null,
  ) => {
    // example vip_+ {memberIp} + _persist_template_ + {vPortNumber} : 'vip_9_9_9_9_persist_template_99'  timestamp will be applied
    return L4SLBUtilities.generateNameByIP(
      ip,
      'vip',
      `persist_template_${port}`,
      timestamp,
    )
  },
  generateLogicalClusterName: (ip: string, timestamp: number = null) => {
    // example {prefix} + _ + {memberIp}: 'logical-cluster_1_2_3_4'  timestamp will be applied
    return L4SLBUtilities.generateNameByIP(
      ip,
      'logical-cluster',
      null,
      timestamp,
    )
  },
  generateVirtualPortTemplateName: (
    ip: string,
    port: number,
    timestamp: number = null,
  ) => {
    // example {prefix} + _ + {memberIp} :  'vPortTmp_1_1_1_1_88'  timestamp will be applied
    return L4SLBUtilities.generateNameByIP(
      ip,
      'vPortTmp',
      port.toString(),
      timestamp,
    )
  },
  generateProtocolTemplateName: (
    ip: string,
    port: number,
    protocol: string,
    timestamp: number = null,
  ) => {
    // example {prefix} + _ + {memberIp} + _ + {port}:  '{tcp/udp}Tmp_1_1_1_1_88'  timestamp will be applied
    if (!_.isNumber(port) && !protocol) {
      return ''
    }
    return L4SLBUtilities.generateNameByIP(
      ip,
      `${protocol}Tmp`,
      port.toString(),
      timestamp,
    )
  },
  generateNameByIP: (
    ip: string,
    prefix: string,
    suffix: string = null,
    timestamp: number = null,
  ) => {
    let name = ''

    if (!ip) {
      return name
    }

    name = `${prefix}_${ip.replace(/[.]/g, '_')}`

    if (suffix) {
      name = `${name}_${suffix}`
    }

    if (timestamp) {
      name = `${name}_${timestamp}`
    }

    return name
  },
}

export default L4SLBUtilities
