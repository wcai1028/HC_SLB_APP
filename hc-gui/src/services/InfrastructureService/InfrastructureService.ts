import { UrlService, AjaxService } from 'src/services'
import Data from 'src/constants/Data/Data'
// import Parameters from '../constants/Parameters';

export class InfrastructureService {
  // Instantiating instances of imported services
  UrlService = new UrlService()
  AjaxService = new AjaxService()
  Data = new Data()

  getClusters = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_CLUSTERS')
    // const urlObj = this.UrlService.get('GET_CLUSTERS_O')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }

    // return new Promise((resolve, reject) => {
    //   resolve(this.Data.clusters)
    // })

    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
    )
  }

  getCluster = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_CLUSTER')
    // const urlObj = this.UrlService.get('GET_CLUSTERS_O')
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

  getClusterDevices = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_DEVICES')
    // const urlObj = this.UrlService.get('GET_DEVICES_O')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    // return new Promise((resolve, reject) => {
    //   resolve(this.Data.devices)
    // })
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
    )
  }

  getDevicePartitions = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_DEVICE_PARTITIONS')
    // const urlObj = this.UrlService.get('GET_DEVICES_O')
    if (urlObj.NEEDED_QUERYSTRING) {
      urlObj.URL = this.UrlService.formatURL(urlInput, urlObj.URL)
    }
    // return new Promise((resolve, reject) => {
    //   resolve(this.Data.devices)
    // })
    return this.AjaxService.promisingHttpRequest(
      urlObj.URL,
      urlObj.METHOD,
      headers,
      payload,
    )
  }
  addCluster = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('ADD_CLUSTER')
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

  updateCluster = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('UPDATE_CLUSTER')
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
  deleteCluster = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('DELETE_CLUSTER')
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
  getDeviceToken = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_JWT_TOKEN')
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
  getDevices = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_INDEPENDENT_DEVICES')
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
  addDevice = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('ADD_DEVICE')
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
  registerDevice = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('REGISTER_DEVICE')
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
  updateDevice = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('UPDATE_DEVICE')
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
  getDevice = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_DEVICE')
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
  deleteDevice = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('DELETE_DEVICE')
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
  getPartition = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('GET_PARTITION')
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
  addPartition = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('ADD_PARTITION')
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
  updatePartition = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('UPDATE_PARTITION')
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
  deletePartition = (headers: any, payload: any, urlInput: any) => {
    const urlObj = this.UrlService.get('DELETE_PARTITION')
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
}
export default InfrastructureService
