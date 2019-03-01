// tslint:disable-next-line:no-var-requires
import { UrlService, AjaxService } from 'src/services'
import { AppRoot } from 'src/settings/appRoot'
import { Data } from 'src/constants/Data/Data'
export class LogService {
  UrlService = new UrlService()
  AjaxService = new AjaxService()
  AppRoot = new AppRoot()
  Data = new Data()

  buildQuery=(logType: any, id : any,startDate : any, endDate : any, )=>{
    // for now we are supporting RE, in future any supoted datasource will have to be entered here
    switch(logType){
      case 'pr' : 
        return this.buildPRQuery(id,startDate,endDate)
      default:
        return  ({
          hello: 'noQuery'
        })
    }
   
  }

  buildPRQuery(id : any,startDate : any, endDate : any){
    if((startDate.toString().length  === 10) || (startDate.toString().indexOf('.') >-1)){
      startDate = startDate*1000
    }
    if((endDate.toString().length  === 10) || (endDate.toString().indexOf('.') >-1)){
      endDate = endDate*1000
    }

    const query = {
      logs: {
        rangeby :{start: startDate, end: endDate,field: 'timestamp'},
        from: 0,
        size: 100,
        filterby: {},
        rangequery: [],
        sort: 'desc',
      },
      totalLogs: {
        rangeby :{start: startDate, end: endDate,field: 'timestamp'},
        aggregation: 'count',
        fields : {},
        rangequery :[],
        filterby: {},
      }
    }
    return ({
      [id] : query
      })
  }
}

export default LogService
