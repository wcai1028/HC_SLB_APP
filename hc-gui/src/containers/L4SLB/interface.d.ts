export interface IBasic {
  uuid: string
  'a10-url': string
}

export interface IAppServiceList {
  'app-svc-list': IAppService[]
}

export interface IAppService extends IBasic {
  'app-svc-type': 'adc'
  name: string
  'logical-cluster'?: string
  vip: IVIP
  vport: IVPort
}

export interface IVIP {
  'obj-class': 'slb.virtual-server'
  'obj-refcnt': number
  'obj-references': IVirtualServer[]
}

export interface IVirtualServer extends IBasic {
  name: string
}

export interface IVPort {
  'obj-class': 'slb.virtual-server.port'
  'obj-refcnt': 1
  'obj-references': IVirtualPort[]
}

export interface IVirtualPortList {
  'port-list': IVirtualPort[]
}

export interface IVirtualPort extends IBasic {
  'app-svc': string
  'port-number': number
  protocol: string
  'service-group'?: IServiceGroup
}

export interface IServiceGroup extends IBasic {
  name: 'sg1'
  protocol: 'tcp'
  'member-list': IServiceGroupMember[]
}

export interface IServiceGroupMember {
  name: string
  port: number
  'member-state': 'enable' | 'disable'
}

export interface ILogicalCluster extends IBasic {
  name: string
  'physical-cluster-list': IPhysicalCluster[]
  'referrer-list': ILogicalClusterReferer[]
}

export interface IPhysicalCluster {
  cluster: string
  partition: string
}

export interface ILogicalClusterReferer extends IBasic {
  name: string
  'obj-class': 'provider.tenant.app-svc'
}
