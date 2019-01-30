export interface IVirtualService {
  appServiceName: string
  vip: string
  vipName: string
  connectionLimit: boolean
  connectionLimitThreshold: number
  connectionRateLimit: boolean
  connectionRateLimitThreshold: number
  cluster: string
  partition: string
}
export interface IVport {
  portNumber: number
  protocol: string
  deployment: string
  lbMethod: string
  persistence: boolean
  healthMonitor: boolean
  members: IMember[]
  healthMonitorName?: string
  persistenceTemplateName?: string
  aflex:string
  vPortConnectionLimit:boolean
  vPortConnectionLimitThreshold:number
  vPortConnectionRateLimit:boolean
  vPortConnectionRateLimitThreshold:number
  vPortIdleTimeout:boolean
  vPortIdleTimeoutValue:number
  vPortMaxOpenSession:number
  virtualPortTemplateName?: string
  tcpTemplateName?: string
  udpTemplateName?: string

}
export interface IMember {
  'member-ip': string
  'member-port': number
  serverName?: string
}
