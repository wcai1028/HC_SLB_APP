import { getItem, vPortMapping, ALL_TEMPLATES } from '../libraries/storage'

/**
 * Slb Auto Form are sorted by alphabetical order
 * It's used to create a slb template form easily
 * @returns object
 * @author shuang
 */
const SlbAutoForm: IObject = {
  cache: {
    name: 'Cache Template',
    page: 'slb.template.cache',
  },
  cipher: {
    name: 'Cipher Template',
    page: 'slb.template.cipher',
  },
  'client-ssl': {
    name: 'Client SSL Template',
    page: 'slb.template.client-ssl',
  },
  'connection-reuse': {
    name: 'Connection-reuse Template',
    page: 'slb.template.connection-reuse',
  },
  'dns.class-list.lid': {
    name: 'DNS Class-list Lid Template',
    page: 'slb.template.dns.class-list.lid',
  },
  dns: {
    name: 'DNS Template',
    page: 'slb.template.dns',
  },
  'dynamic-service': {
    name: 'Dynamic-service Template',
    page: 'slb.template.dynamic-service',
  },
  http: {
    name: 'HTTP Template',
    page: 'slb.template.http',
  },
  'http-policy': {
    name: 'HTTP Policy Template',
    page: 'slb.template.http-policy',
  },
  monitor: {
    name: 'Monitor Template',
    page: 'slb.template.monitor',
  },
  logging: {
    name: 'Logging Template',
    page: 'slb.template.logging',
  },
  'persist.cookie': {
    name: 'Persist Cookie Template',
    page: 'slb.template.persist.cookie',
  },
  'persist.destination-ip': {
    name: 'Persist Destination-ip Template',
    page: 'slb.template.persist.destination-ip',
  },
  'persist.source-ip': {
    name: 'Persist Source-ip Template',
    page: 'slb.template.persist.source-ip',
  },
  'persist.ssl-sid': {
    name: 'Persist SSL-sid Template',
    page: 'slb.template.persist.ssl-sid',
  },
  policy: {
    name: 'Policy Template',
    page: 'slb.template.policy',
  },
  port: {
    name: 'Port Template',
    page: 'slb.template.port',
  },
  scaleout: {
    name: 'Scaleout Cluster Template',
    page: 'scaleout.cluster',
  },
  server: {
    name: 'Server Template',
    page: 'slb.template.server',
  },
  'server-ssl': {
    name: 'Server-SSL Template',
    page: 'slb.template.server-ssl',
  },
  'sevice-group': {
    name: 'Service Group',
    page: 'slb.service-group',
  },
  tcp: {
    name: 'TCP Template',
    page: 'slb.template.tcp',
  },
  'tcp-proxy': {
    name: 'TCP-proxy Template',
    page: 'slb.template.tcp-proxy',
  },
  udp: {
    name: 'UDP Template',
    page: 'slb.template.udp',
  },
  'virtual-port': {
    name: 'Virtual-port Template',
    page: 'slb.template.virtual-port',
  },
  'virtual-server': {
    name: 'Virtual Server Template',
    page: 'slb.template.virtual-server',
  },
}

export const SlbTemplateFormArray = Object.keys(SlbAutoForm).map(
  (key: string) => {
    if (!SlbAutoForm[key].apiURL) {
      SlbAutoForm[key].apiURL = `/hccapi/v3/provider/${getItem(
        'PROVIDER',
      )}/tenant/${getItem('tenant')}/shared-object/`
    }
    return SlbAutoForm[key]
  },
)

export const SlbTemplateForm = SlbAutoForm

const SlbTemplateOfProtocol = Object.keys(ALL_TEMPLATES.protocols).map(
  (key: string) => {
    return SlbTemplateForm[key]
  },
)

export const SlbTemplateByProtocol = Object.keys(vPortMapping).map(
  (key: string) => {
    const subgroup = vPortMapping[key]
    const subchildren = subgroup.map((subkey: string) => {
      return SlbTemplateForm[subkey]
    })
    return {
      name: key.toUpperCase(),
      children: subchildren,
    }
  },
)

const TypeADC = [
  SlbAutoForm['virtual-server'],
  SlbAutoForm['virtual-port'],
  SlbAutoForm.server,
  SlbAutoForm.port,
  SlbAutoForm.cache,
  SlbAutoForm['connection-reuse'],
  SlbAutoForm['dynamic-service'],
  SlbAutoForm['persist.cookie'],
  SlbAutoForm['persist.destination-ip'],
  SlbAutoForm['persist.source-ip'],
]

const TypeApps = [SlbAutoForm.http, SlbAutoForm['http-policy'], SlbAutoForm.dns]

const TypeSSL = [
  SlbAutoForm.cipher,
  SlbAutoForm['client-ssl'],
  SlbAutoForm['server-ssl'],
]

const TypeSSLi = [SlbAutoForm['tcp-proxy']]

const TypeSystem = [
  SlbAutoForm.logging,
  SlbAutoForm.monitor,
  SlbAutoForm.scaleout,
]

// const TypeProtocol = [SlbAutoForm.tcp, SlbAutoForm.udp]

const TypePolicy = [SlbAutoForm.policy]

// const AssoVirtualServer = [
//   SlbAutoForm['virtual-server'],
//   SlbAutoForm.logging,
//   SlbAutoForm.policy,
//   SlbAutoForm.scaleout,
// ]

// const AssoVPort = SlbTemplateByProtocol

// const AssoServiceGroup = [
//   SlbAutoForm.server,
//   SlbAutoForm.port,
//   SlbAutoForm.policy,
// ]

// const AssoServer = [SlbAutoForm.server]

export let SlbGeneralObject = [
  {
    name: 'ADC',
    active: true,
    toggled: true,
    children: TypeADC,
  },
  {
    name: 'Apps',
    children: TypeApps,
  },
  {
    name: 'Policy',
    children: TypePolicy,
  },
  {
    name: 'Protocol',
    children: SlbTemplateOfProtocol,
  },
  {
    name: 'SSL',
    children: TypeSSL,
  },
  {
    name: 'SSLi',
    children: TypeSSLi,
  },
  {
    name: 'System',
    children: TypeSystem,
  },
]

// SlbGeneralObject = AssoVPort

export const SlbTemplateByProtocolExist = Object.keys(vPortMapping).map(
  (key: string) => {
    const subgroup = vPortMapping[key]
    const subchildren = subgroup.map((subkey: string, index: number) => {
      return {
        name: key.toUpperCase() + '-SharedObject' + (index + 1),
        page: SlbTemplateForm[subkey].page,
      }
    })
    return {
      name: key.toUpperCase(),
      children: subchildren,
    }
  },
)

export const SlbGeneralObjectExist = [
  {
    name: 'Services (30)',
    active: false,
    toggled: false,
    children: [],
  },
  {
    name: 'Protocols (' + SlbTemplateByProtocol.length + ')',
    active: true,
    toggled: true,
    children: SlbTemplateByProtocolExist,
  },
  {
    name: 'Rules (30)',
    active: false,
    toggled: false,
    children: [],
  },
  {
    name: 'Others (30)',
    active: false,
    toggled: false,
    children: [],
  },
]

export default SlbTemplateForm
