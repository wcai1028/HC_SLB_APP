const nextReg = /[^]*\/slb\/service-group\/(.*)\/member[^]*/
export const getServiceGroupNameByUrl = (a10Url: string) => {
  if (!a10Url) {
    return ''
  }
  return a10Url.replace(nextReg, '$1')
}

// template
const templateReg = /[^]*\/slb\/template\/(.*)\/(.*)[^]*/
const ipnatReg = /[^]*\/ip\/nat\/pool\/(.*)[^]*/
const ipnatGroupReg = /[^]*\/ip\/nat\/pool-group\/(.*)[^]*/
const ipv6natReg = /[^]*\/ipv6\/nat\/pool\/(.*)[^]*/
const ipv6natGroupReg = /[^]*\/ipv6\/nat\/pool-group\/(.*)[^]*/
const healthMonitorReg = /[^]*\/health\/monitor\/(.*)[^]*/
const ipnatLoggingReg = /[^]*\/ip\/nat\/template\/logging\/(.*)[^]*/
const vserverReg = /[^]*\/slb\/virtual-server\/(.*)[^]*/
const vportReg = /[^]*\/slb\/virtual-server\/(.*)\/port\/(.*)[^]*/
const serverReg = /[^]*\/slb\/server\/(.*)[^]*/
const serverPortReg = /[^]*\/slb\/server\/(.*)\/port\/(.*)[^]*/
const serviceGroupReg = /[^]*\/slb\/service-group\/(.*)[^]*/
const aflexReg = /[^]*\/aflex\/(.*)[^]*/
const certReg = /[^]*\/ssl-cert\/(.*)[^]*/
export const getObjectTypeByUrl = (a10Url: string) => {
  if (!a10Url) {
    return {}
  }
  if (a10Url.indexOf('/ip/nat/template/logging') !== -1) {
    const output = a10Url.match(ipnatLoggingReg)
    return { type: 'IP NAT Logging Template', name: output[1] }
  } else if (a10Url.indexOf('/health/monitor') !== -1) {
    const output = a10Url.match(healthMonitorReg)
    return { type: 'Health Monitor', name: output[1] }
  } else if (a10Url.indexOf('/ip/nat/pool/') !== -1) {
    const output = a10Url.match(ipnatReg)
    return { type: 'IP NAT Pool', name: output[1] }
  } else if (a10Url.indexOf('/ip/nat/pool-group') !== -1) {
    const output = a10Url.match(ipnatGroupReg)
    return { type: 'IP NAT Pool Group', name: output[1] }
  } else if (a10Url.indexOf('/ipv6/nat/pool/') !== -1) {
    const output = a10Url.match(ipv6natReg)
    return { type: 'IPv6 NAT Pool', name: output[1] }
  } else if (a10Url.indexOf('/ipv6/nat/pool-group') !== -1) {
    const output = a10Url.match(ipv6natGroupReg)
    return { type: 'IPv6 NAT Pool Group', name: output[1] }
  } else if (a10Url.indexOf('/slb/template') !== -1) {
    const output = a10Url.match(templateReg)
    const objType = output[1] + ' template'
    return { type: objType, name: output[2] }
  } else if (a10Url.indexOf('/slb/virtual-server/') !== -1) {
    if (a10Url.indexOf('/port/') !== -1) {
      const output = a10Url.match(vportReg)
      return { type: 'Virtual Port', name: output[2], vserver: output[1] }
    } else {
      const output = a10Url.match(vserverReg)
      return { type: 'Virtual Server', name: output[1] }
    }
  } else if (a10Url.indexOf('/slb/service-group/') !== -1) {
    const output = a10Url.match(serviceGroupReg)
    return { type: 'Service Group', name: output[1] }
  } else if (a10Url.indexOf('/slb/server/') !== -1) {
    if (a10Url.indexOf('/port/') !== -1) {
      const output = a10Url.match(serverPortReg)
      return { type: 'Server Port', name: output[2], vserver: output[1] }
    } else {
      const output = a10Url.match(serverReg)
      return { type: 'Server', name: output[1] }
    }
  } else if (a10Url.indexOf('/aflex/') !== -1) {
    const output = a10Url.match(aflexReg)
    return { type: 'aFleX', name: output[1] }
  } else if (a10Url.indexOf('/ssl-cert/') !== -1) {
    const output = a10Url.match(certReg)
    return { type: 'Certificate', name: output[1] }
  } else if (a10Url.indexOf('/app-svc/') !== -1) {
    return { type: 'App Service' }
  } else {
    return {}
  }
}

export const formatBytes = (bytes: number, simpleMode: boolean = false, seperateUnit: boolean = false) => {
  const standardSizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const simpleSizes = ['', 'K', 'M', 'G', 'T']
  let sizes = standardSizes
  if (bytes === 0) {
    if (simpleMode) {
      if (seperateUnit) {
        return {
          count: 0,
          unit: ''
        }
      }
      return '0'
    }
    if (seperateUnit) {
      return {
        count: 0,
        unit: 'Byte'
      }
    }
    return '0 Byte'
  }
  if (simpleMode) {
    sizes = simpleSizes
  }
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  const transformedCount = Math.round(bytes / Math.pow(1024, i))
  if (seperateUnit) {
    return {
      count: transformedCount,
      unit: sizes[i]
    }
  }
  return transformedCount + ' ' + sizes[i]
}