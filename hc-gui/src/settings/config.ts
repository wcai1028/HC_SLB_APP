import httpClient from '../libraries/httpClient'
import NS from 'src/redux/httpServices/namespaces'

export default {
  DEBUG: true,
  httpClient,
  EPIC_DEPENDENCIES: {
    httpClient,
  },
  REDUX_DATA_NS: NS,
  APP_ROUTE_PATH: '/l4slb',
}

export interface IPromise<T> {
  data: T
}
