import parameters from 'parameters'

export class AppContext {
  Parameters = parameters

  DEFAULT_SERVICE_NAME = 'default-service'
  DEFAULT_HOST_NAME = 'deault-host'
  CLOUD_ACCOUNT_ID = this.Parameters.CLOUD_ACCOUNT_ID
  SESSION_IDLE_PERIOD = 60 //minutes
}
export default AppContext
