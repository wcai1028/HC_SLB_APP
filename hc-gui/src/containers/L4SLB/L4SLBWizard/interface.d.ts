export type LBMethod =
  | 'least-connection'
  | 'round-robin'
  | 'src-ip-only-hash'
  | 'service-least-connection'
  | 'fastest-response'

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
  deployment: DeploymentType 
  cluster: string
  partition: string
}

export interface IServer {
  name: string
  host: string
  port: IServerPort[]
}

export interface IServerPort {
  'port-number': number
}
