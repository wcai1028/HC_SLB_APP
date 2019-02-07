// tslint:disable-next-line:no-var-requires
import * as queryString from 'query-string'

import { UrlService, AjaxService } from 'src/services'
import { AppRoot } from 'src/settings/appRoot'
import { Data } from 'src/constants/Data/Data'
import * as endPoint from 'src/constants/AppDashboards/endpoints.json'
export class QueryService {
  UrlService = new UrlService()
  AjaxService = new AjaxService()
  AppRoot = new AppRoot()
  Data = new Data()

  
 getInterval=(startDate : any, endDate : any)=>{

  return ((endDate - startDate)/100 ) > 60000 ?  ((endDate - startDate)/100 ) : 60000

 }

  buildQuery=(dataSource: any, rawQuery : any,startDate : any, endDate : any, isHistogram : boolean,id: any, contextArray : any, selectedContext : any, dashBoardContext : any)=>{
    // for now we are supporting RE, in future any supoted datasource will have to be entered here
    switch(dataSource){
      case 'RPT' : 
        return this.buildREQuery(rawQuery,startDate,endDate,isHistogram,id, contextArray, selectedContext, dashBoardContext)
      default:
        return  ({
          "hello" : "noQuery"
        })
    }
   
  }

  buildREQuery=(rawQuery : any,startDate : any, endDate : any, isHistogram : boolean,id: any, contextArray : any, selectedContext : any, dashBoardContext :any)=>{
  if((startDate.toString().length  === 10) || (startDate.toString().indexOf('.') >-1)){
    startDate = startDate*1000
  }
  if((endDate.toString().length  === 10) || (endDate.toString().indexOf('.') >-1)){
    endDate = endDate*1000
  }
  
    let histogramField = endPoint['endPoints'][rawQuery['dataSource']][rawQuery['endPoint']][rawQuery['metrics']]['histogramField']
    if(isHistogram){

    }
    let queryFilter = {}
    if(selectedContext !== 'OverAll'){
      let selectedArrayElement = contextArray.find((item : any)=>{
        return item.name === selectedContext
      })
      switch(dashBoardContext){
        case 'cluster' : 
          rawQuery['filters'].indexOf('clusterid') > -1 
            ? 
              queryFilter = {clusterid : selectedArrayElement.id}
            :  
              rawQuery['filters'].indexOf('cluster_id') > -1 
                ? 
                queryFilter = {cluster_id : selectedArrayElement.id}
                : 
                  console.log('')
        case 'appservices' : 
          rawQuery['filters'].indexOf('applicationid') > -1 
            ? 
              queryFilter = {applicationid : selectedArrayElement.name}
            :  
              rawQuery['filters'].indexOf('app_svc_id') > -1 
                ? 
                queryFilter = {app_svc_id : selectedArrayElement.uuid}
                : 
                  console.log('')
        case 'provider' : 
          rawQuery['filters'].indexOf('providerid') > -1 
            ? 
              queryFilter = {providerid : selectedArrayElement.id}
            :  
              console.log('')
        case 'tenant' : 
          rawQuery['filters'].indexOf('tenantid') > -1 
            ? 
              queryFilter = {tenantid : selectedArrayElement.id}
            :  
              rawQuery['filters'].indexOf('account_id') > -1 
                ? 
                queryFilter = {account_id : selectedArrayElement.id}
                : 
                  console.log('')
        case 'device' : 
          rawQuery['filters'].indexOf('deviceid') > -1 
            ? 
              queryFilter = {deviceid : selectedArrayElement.id}
            :  
              rawQuery['filters'].indexOf('device_uuid') > -1 
                ? 
                queryFilter = {device_uuid : selectedArrayElement.id}
                : 
                  console.log('')
      }
    }
    
    let query = {
      "rangeby":{"start": startDate, "end": endDate,"field":histogramField},
      "fields" : rawQuery['fields'],
      "aggregation" : rawQuery['aggregation']
      }
      if(rawQuery['groupBy']){
        query['groupby'] = rawQuery['groupBy']
      }
      if(isHistogram){
       query['histogram'] = {
        "field" :histogramField,
          "interval" : this.getInterval(startDate,endDate)// this has to be dynamically calulated
       }
      }
      if(Object.keys(queryFilter).length > 0 ){
        if(query['filterby']){
          query['filterby']['and'][Object.keys(queryFilter)[0]] = queryFilter[Object.keys(queryFilter)[0]]
        }else{
          query['filterby'] = {
            and : queryFilter
          }
        }
      }
    return ({
      [id] : query
      })
  }
}

export default QueryService
