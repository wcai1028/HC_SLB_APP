export type DeploymentType = 'INLINE' | 'SOURCE-NAT' | 'DSR'

export interface IWizardData {
  'app-svc': {
    name: string
  }
  'virtual-server': {
    name: string
    'ip-address': string
    port: [
      {
        'port-number': number
        protocol: string
      }
    ]
  }
  'service-group': {
    name: string
    persistence: boolean
    'lb-method': LBMethod
    'health-check': boolean
  }
  servers: IServer[]
  'health.monitor': {
    name: string
  }
  template: {
    persist: {
      'source-ip': {
        name: string
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
  }
  deployment: DeploymentType
}

export interface IServer {
  name: string
  host: string
  'port-list': IServerPort[]
}

export interface IServerPort {
  'port-number': number
}
