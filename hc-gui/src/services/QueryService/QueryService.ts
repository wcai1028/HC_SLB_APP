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

  

  buildQuery=(dataSource: any, rawQuery : any,startDate : any, endDate : any, isHistogram : boolean,id: any)=>{
    // for now we are supporting RE, in future any supoted datasource will have to be entered here
    switch(dataSource){
      case 'RPT' : 
        return this.buildREQuery(rawQuery,startDate,endDate,isHistogram,id)
      default:
        return  ({
          "hello" : "noQuery"
        })
    }
   
  }

  buildREQuery=(rawQuery : any,startDate : any, endDate : any, isHistogram : boolean,id: any)=>{
   let histogramField = endPoint['endPoints'][rawQuery['dataSource']][rawQuery['endPoint']][rawQuery['metrics']]['histogramField']
    if(isHistogram){

    }
    let query = {
      "rangeby":{"start": startDate, "end": endDate,"field":histogramField},
      "fields" : rawQuery['fields'],
      "aggregation" : rawQuery['aggregation'],

      }
      if(rawQuery['groupBy']){
        query['groupby'] = rawQuery['groupBy']
      }
      if(isHistogram){
       query['histogram'] = {
        "field" :histogramField,
          "interval" : 6000000 // this has to be dynamically calulated
       }
      }
    return ({
      [id] : query
      })
  }
}

export default QueryService
