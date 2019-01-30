import { _, validations, IValidationResult } from 'a10-gui-framework'

export class L4SLBUtilitis {
  prepopulateVipName = (virtualServer: IObject, prefix: any) => {
    try {
      const ipAdd = virtualServer.ip.replace(/[.]/g, '_')

      if (!_.isUndefined(ipAdd) && !_.isEmpty(ipAdd)) {
        const defaultAppName = prefix + '_' + ipAdd
        virtualServer.name = defaultAppName
      }
    } catch (err) {
      //$log.debug("prepopulate appname error.");
    }
  }

  generateHealthMonitorName = (vPortNumber: number, prefix: any) => {
    // example {prefix}+_+vPortNumber:  'hm_88'  timestamp will be applied
    // at the end of save
    let hmName = ''
    try {
      if (!_.isUndefined(vPortNumber)) {
        const defaultHmName = prefix + '_' + vPortNumber
        hmName = defaultHmName
      }
    } catch (err) {
      //$log.debug("prepopulate appname error.");
    }
    return hmName
  }

  generateServerName = (memberIp: string, prefix: any) => {
    // example {prefix}+_+memberIp:  'srv_1_1_1_1'  timestamp will be applied
    // at the end of save
    let serverName = ''
    try {
      const ipAdd = memberIp.replace(/[.]/g, '_')
      if (!_.isUndefined(ipAdd) && !_.isEmpty(ipAdd)) {
        const defaultServerName = prefix + '_' + ipAdd
        serverName = defaultServerName
      }
    } catch (err) {
      //$log.debug("prepopulate appname error.");
    }
    return serverName
  }

  generateServiceGroupName = (
    vip: string,
    vPortNumber: string,
    protocol: string,
    prefix: any,
  ) => {
    // example {prefix}+_+memberIp:  'sg_1_1_1_1_88_tcp'  timestamp will be applied
    // at the end of save
    let serviceGroupName = ''
    try {
      const ipAdd = vip.replace(/[.]/g, '_')
      if (
        !_.isUndefined(ipAdd) &&
        !_.isEmpty(ipAdd) &&
        !_.isUndefined(vPortNumber)

      ) {
        const defaultServiceGroupName =
          prefix + '_' + ipAdd + '_' + vPortNumber + '_' + protocol
        serviceGroupName = defaultServiceGroupName
      }
    } catch (err) {
      //$log.debug("prepopulate appname error.");
    }
    return serviceGroupName
  }

  generatePersistTemplateName = (
    vip: string,
    vPortNumber: number,
    prefix: any,
  ) => {
    // example {prefix}+_+memberIp:  'persis_1_1_1_1_88'  timestamp will be applied
    // at the end of save
    let persistTemplateName = ''
    try {
      const ipAdd = vip.replace(/[.]/g, '_')
      if (
        !_.isUndefined(ipAdd) &&
        !_.isEmpty(ipAdd) &&
        !_.isUndefined(vPortNumber)
      ) {
        const defaultpersistTemplateName =
          prefix + '_' + ipAdd + '_' + vPortNumber
        persistTemplateName = defaultpersistTemplateName
      }
    } catch (err) {
      //$log.debug("prepopulate appname error.");
    }
    return persistTemplateName
  }

  generateVirtualPortTemplateName = (
    vip: string,
    vPortNumber: number,
    prefix: any,
  ) => {
    // example {prefix}+_+memberIp:  'vPortTmp_1_1_1_1_88'  timestamp will be applied
    // at the end of save
    let virtualPortTemplate = ''
    try {
      const ipAdd = vip.replace(/[.]/g, '_')
      if (
        !_.isUndefined(ipAdd) &&
        !_.isEmpty(ipAdd) &&
        !_.isUndefined(vPortNumber)

      ) {
        const defaultvirtualPortTemplate =
          prefix + '_' + ipAdd + '_' + vPortNumber
        virtualPortTemplate = defaultvirtualPortTemplate
      }
    } catch (err) {
      //$log.debug("prepopulate appname error.");
    }
    return virtualPortTemplate
  }

  generateTcpORUdpTemplateName = (
    vip: string,
    vPortNumber: number,
    protocol: string,
    prefix: any,
  ) => {
    // example {prefix}+_+memberIp:  '{tcp/udp}Tmp_1_1_1_1_88'  timestamp will be applied
    // at the end of save
    let templateName = ''
    try {
      const ipAdd = vip.replace(/[.]/g, '_')
      if (
        !_.isUndefined(ipAdd) &&
        !_.isEmpty(ipAdd) &&
        !_.isUndefined(vPortNumber) &&
        !_.isUndefined(protocol) &&
        !_.isEmpty(protocol)
      ) {
        const defaultvirtualPortTemplate =
          protocol + prefix + '_' + ipAdd + '_' + vPortNumber
        templateName = defaultvirtualPortTemplate
      }
    } catch (err) {
      //$log.debug("prepopulate appname error.");
    }
    return templateName
  }
}

export default L4SLBUtilitis

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
