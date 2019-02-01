export type DeploymentType = 'INLINE' | 'SOURCE-NAT' | 'DSR'

export interface IWizardData {
  'app-svc': {
    name: string
  }
  'virtual-server': {
    name: string
    'ip-address': string
    'port-list': [
      {
        'port-number': number
        protocol: string
        'service-group'?: string
        'template-persist-source-ip': string
        'sampling-enable'?: Array<{ counters1: string }>
        auto?: boolean
        'no-dest-nat'?: boolean
      }
    ]
  }
  'service-group': {
    name: string
    'lb-method': LBMethod
    'health-check': boolean
  }
  servers: IServer[]
  'health.monitor': {
    name: string
    uuid?: string
  }
  template: {
    persist: {
      'source-ip': {
        name: string
        uuid?: string
      }
    }
  }
  'logical-cluster': {
    name: string
    'physical-cluster-list': [
      {
        cluster: string
        partition: string
      }
    ]
    uuid?: string
  }
  deployment: DeploymentType
  persistence: boolean
  enableHealthCheck: boolean
  notEditableServers: { [key: string]: { name: string } }
}

export interface IServerObject {
  server: IServer
}

export interface IServer {
  name: string
  host: string
  'port-list'?: IServerPort[]
}

export interface IServerPort {
  protocol: string
  'port-number': number
  'health-check'?: string
  'sampling-enable'?: Array<{ counters1: string }>
}
