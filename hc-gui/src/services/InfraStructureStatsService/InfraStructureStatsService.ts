import { UrlService, AjaxService } from 'src/services'
// import Parameters from '../constants/Parameters';

export class InfraStructureStatsService {
  // Instantiating instances of imported services
  UrlService = new UrlService()
  AjaxService = new AjaxService()

  getClusterStats = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_CLUSTER_STATS')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
    )
  }
  getPartitionStats = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_PARTITION_STATS')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
    )
  }
  getTenantBandwidthStats = (
    headers: any,
    payload: any,
    urlInput: any,
    cancelToken: any,
  ) => {
    const urlObj = this.UrlService.get('GET_TENANT_BANDWIDTH_STATS')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      '',
      cancelToken,
    )
  }
  getTenantResponseStats = (
    headers: any,
    payload: any,
    urlInput: any,
    cancelToken: any,
  ) => {
    const urlObj = this.UrlService.get('GET_TENANT_REQUESTS_STATS')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
      '',
      cancelToken,
    )
  }
}
export default InfraStructureStatsService
