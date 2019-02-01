import { _, validations, IValidationResult } from 'a10-gui-framework'

// export class L4SLBUtilitis {
//   generateNameByIP = (
//     ip: string,
//     prefix: string,
//     suffix: string = null,
//     timestamp: number = null,
//   ) => {
//     let name = ''

//     if (!ip) {
//       return name
//     }

//     name = `${prefix}_${ip.replace(/[.]/g, '_')}`

//     if (suffix) {
//       name = `${name}_${suffix}`
//     }

//     if (timestamp) {
//       name = `${name}_${timestamp}`
//     }

//     return name
//   }

//   generateHealthMonitorName = (
//     vPortNumber: number,
//     prefix: any,
//     timestamp: number = null,
//   ) => {
//     // example {prefix}+_+vPortNumber:  'hm_88'  timestamp will be applied
//     // at the end of save
//     let hmName = ''
//     try {
//       if (!_.isUndefined(vPortNumber)) {
//         const defaultHmName = prefix + '_' + vPortNumber
//         hmName = defaultHmName
//         if (timestamp) {
//           hmName = hmName + '_' + timestamp
//         }
//       }
//     } catch (err) {
//       //$log.debug("prepopulate appname error.");
//     }
//     return hmName
//   }

//   generateServerName = (
//     memberIp: string,
//     prefix: any,
//     timestamp: number = null,
//   ) => {
//     // example {prefix}+_+memberIp:  'srv_1_1_1_1'  timestamp will be applied
//     // at the end of save
//     let serverName = ''
//     try {
//       const ipAdd = memberIp.replace(/[.]/g, '_')
//       if (!_.isUndefined(ipAdd) && !_.isEmpty(ipAdd)) {
//         const defaultServerName = prefix + '_' + ipAdd
//         serverName = defaultServerName
//         if (timestamp) {
//           serverName = serverName + '_' + timestamp
//         }
//       }
//     } catch (err) {
//       //$log.debug("prepopulate appname error.");
//     }
//     return serverName
//   }

//   generateServiceGroupName = (
//     vip: string,
//     vPortNumber: number,
//     protocol: string,
//     prefix: any,
//     timestamp: number = null,
//   ) => {
//     // example {prefix}+_+memberIp:  'sg_1_1_1_1_88_tcp'  timestamp will be applied
//     // at the end of save
//     let serviceGroupName = ''
//     try {
//       const ipAdd = vip.replace(/[.]/g, '_')
//       if (
//         !_.isUndefined(ipAdd) &&
//         !_.isEmpty(ipAdd) &&
//         !_.isUndefined(vPortNumber)
//       ) {
//         const defaultServiceGroupName =
//           prefix + '_' + ipAdd + '_' + vPortNumber + '_' + protocol
//         serviceGroupName = defaultServiceGroupName
//         if (timestamp) {
//           serviceGroupName = serviceGroupName + '_' + timestamp
//         }
//       }
//     } catch (err) {
//       //$log.debug("prepopulate appname error.");
//     }
//     return serviceGroupName
//   }

//   generatePersistTemplateName = (
//     vip: string,
//     vPortNumber: number,
//     prefix: any,
//     timestamp: number = null,
//   ) => {
//     // example {prefix}+_+memberIp:  'persis_1_1_1_1_88'  timestamp will be applied
//     // at the end of save
//     let persistTemplateName = ''
//     try {
//       const ipAdd = vip.replace(/[.]/g, '_')
//       if (
//         !_.isUndefined(ipAdd) &&
//         !_.isEmpty(ipAdd) &&
//         !_.isUndefined(vPortNumber)
//       ) {
//         const defaultpersistTemplateName =
//           prefix + '_' + ipAdd + '_' + vPortNumber
//         persistTemplateName = defaultpersistTemplateName
//         if (timestamp) {
//           persistTemplateName = persistTemplateName + '_' + timestamp
//         }
//       }
//     } catch (err) {
//       //$log.debug("prepopulate appname error.");
//     }
//     return persistTemplateName
//   }

//   generateVirtualPortTemplateName = (
//     vip: string,
//     vPortNumber: number,
//     prefix: any,
//     timestamp: number = null,
//   ) => {
//     // example {prefix}+_+memberIp:  'vPortTmp_1_1_1_1_88'  timestamp will be applied
//     // at the end of save
//     let virtualPortTemplate = ''
//     try {
//       const ipAdd = vip.replace(/[.]/g, '_')
//       if (
//         !_.isUndefined(ipAdd) &&
//         !_.isEmpty(ipAdd) &&
//         !_.isUndefined(vPortNumber)
//       ) {
//         const defaultvirtualPortTemplate =
//           prefix + '_' + ipAdd + '_' + vPortNumber
//         virtualPortTemplate = defaultvirtualPortTemplate
//         if (timestamp) {
//           virtualPortTemplate = virtualPortTemplate + '_' + timestamp
//         }
//       }
//     } catch (err) {
//       //$log.debug("prepopulate appname error.");
//     }
//     return virtualPortTemplate
//   }

//   generateTcpORUdpTemplateName = (
//     vip: string,
//     vPortNumber: number,
//     protocol: string,
//     prefix: any,
//     timestamp: number = null,
//   ) => {
//     // example {prefix}+_+memberIp:  '{tcp/udp}Tmp_1_1_1_1_88'  timestamp will be applied
//     // at the end of save
//     let templateName = ''
//     try {
//       const ipAdd = vip.replace(/[.]/g, '_')
//       if (
//         !_.isUndefined(ipAdd) &&
//         !_.isEmpty(ipAdd) &&
//         !_.isUndefined(vPortNumber) &&
//         !_.isUndefined(protocol) &&
//         !_.isEmpty(protocol)
//       ) {
//         const defaultvirtualPortTemplate =
//           protocol + prefix + '_' + ipAdd + '_' + vPortNumber
//         templateName = defaultvirtualPortTemplate
//         if (timestamp) {
//           templateName = templateName + '_' + timestamp
//         }
//       }
//     } catch (err) {
//       //$log.debug("prepopulate appname error.");
//     }
//     return templateName
//   }

//   appendTimeStamp = (name: string, timeStamp: number) => {
//     if (!name) {
//       return name
//     }
//     name = `${name}_${timeStamp}`
//     return name
//   }
// }

// export default L4SLBUtilitis

const L4SLBUtilities = {
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

export const generateNameByIP = (
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
}
