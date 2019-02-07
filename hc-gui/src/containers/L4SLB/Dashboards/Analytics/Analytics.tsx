import * as React from 'react'
import {
  A10Container,
  setupA10Container,
  IA10ContainerDefaultProps,
  _,
} from 'a10-gui-framework'
import {
  A10Row,
  A10Col,
  A10Button,
  A10Popover,
  A10Icon,
  A10Input,
  A10Modal,
  A10Select,
  A10Divider,
  A10Spin,
  A10Alert
} from 'a10-gui-widgets'
import './styles/analytics.scss'
import { InfrastructureService } from 'src/services/InfrastructureService/InfrastructureService'
import { DashboardService } from 'src/services/DashboardService/DashboardService'
import { IDefaultMethods } from 'src/containers/L4SLB'
import {Dashboard} from './Dashboard'
import * as config from 'src/constants/AppDashboards/AppDashboards.json'
import * as dashBoardsConfig from 'src/constants/AppDashboards/DashboardsConfig.json'
import { AppRoot } from 'src/settings/appRoot'
import { QueryService } from 'src/services/QueryService'
import { ParserService } from 'src/services/ParserService'
import parameters from 'parameters'

/*
  This component will get all the app services for the tenant in question and pass on the appservices as props to other components
  This will also control the time duration and keep the dashboards in sync with the time selected globally
*/

export interface IAnalyticsProps extends IA10ContainerDefaultProps {
  defaultMethods: IDefaultMethods
}
export interface IAnalyticsState {
  dashboards: any
  focusedDashboard: number
  visible: boolean
  contextArray: any
  selectedContext: any
  updates: any
  vizCount: number
  topIndicatorCount : number
  drillDownDashboard: any
  startTime : number
  endTime : number
  ContextSetVisible : boolean
  contextSet : boolean
}

class Analytics extends A10Container<IAnalyticsProps, IAnalyticsState> {
  state = {
    dashboards: new Array(),
    focusedDashboard: parameters.MODDE!=='DEVELOPMENT' ? 0 : window.sessionStorage.getItem('DASHBOARDS') ? 0 : -1,
    visible: false,
    contextArray: [{name : 'OverAll', displayName : 'Over All'}],
    selectedContext: 'OverAll',
    updates: 0,
    vizCount: 0,
    startTime: Date.now() - 21600000,
    endTime: Date.now(),
    drillDownDashboard: {},
    ContextSetVisible : false,
    contextSet : false,
    topIndicatorCount : 0
  }

  InfrastructureService = new InfrastructureService()
  DashboardService = new DashboardService()
  QueryService = new QueryService()
  ParserService = new ParserService()
  pageLength = 5
  AppRoot = new AppRoot()
  scheduleJobs = {}
  scheduleJobsMap = {}
  vizdataRequests = 0
  dashboardName = ''
  dashboardContext =''
  processedVizs = {}
  dashboards = [...this.state.dashboards]
  dataProcessingStarted = {}
  scheduleJobs_topIndicators = {}
  scheduleJobsMap_topIndicators = {}
  processedVizs_topIndicators = {}
  dataProcessingStarted_topIndicators = {}
  timeOut : any=''
  receiveUpdate = () => {
    let updates = this.state.updates
    updates++
    window.sessionStorage.setItem('CALCULATED_VIZ', '0')
    this.scheduleJobs = {}
    this.scheduleJobsMap = {}
    this.scheduleJobs_topIndicators = {}
    this.scheduleJobsMap_topIndicators = {}
    let dashboards = window.sessionStorage.getItem('DASHBOARDS')
      ? JSON.parse(window.sessionStorage.getItem('DASHBOARDS'))
      : []
      if(parameters.MODE !=='DEVELOPMENT'){
        dashboards = dashBoardsConfig.dashboards
      }
    for (
      let i = 0;
      i < dashboards[this.state.focusedDashboard]['rows'].length;
      i++
    ) {
      if (dashboards[this.state.focusedDashboard]['rows'][i]['cols']) {
        for (
          let j = 0;
          j < dashboards[this.state.focusedDashboard]['rows'][i]['cols'].length;
          j++
        ) {
          for (
            let k = 0;
            k <
            dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j][
              'vizs'
            ].length;
            k++
          ) {
            if(dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j]['vizs'][k].displayProperties){
              if(dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j]['vizs'][k].displayProperties.annotation !== 'topindicators'){
                delete dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j]['vizs'][k].data
                delete dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j]['vizs'][k].dataSet
              }
            }
           
          }
        }
      }
    }
    window.sessionStorage.setItem('DASHBOARDS', JSON.stringify(dashboards))
    if (Object.keys(this.state.drillDownDashboard).length > 0) {
      const returnObj = this.updateDrillDownDashboard(
        this.state.drillDownDashboard.drillDownID,
        true,
      )
      this.setState({
        updates: updates,
        dashboards: dashboards,
        drillDownDashboard: returnObj.drillDownDashboard,
        focusedDashboard: returnObj.focusedDashboard,
      })
    }else{
      this.setState({
        updates: updates,
        dashboards: dashboards,
      })
    }
    
  }

  updateTimeRange = (startTime: number, endTime: number) => {
    
    if ((startTime !== this.state.startTime) || (endTime !== this.state.endTime)) {
      let updates = this.state.updates
      updates++
     
      window.sessionStorage.setItem('CALCULATED_VIZ', '0')
      this.scheduleJobs = {}
      this.scheduleJobsMap = {}
      let dashboards = [...this.state.dashboards]
      for (
        let i = 0;
        i < dashboards[this.state.focusedDashboard]['rows'].length;
        i++
      ) {
        if (dashboards[this.state.focusedDashboard]['rows'][i]['cols']) {
          for (
            let j = 0;
            j < dashboards[this.state.focusedDashboard]['rows'][i]['cols'].length;
            j++
          ) {
            for (
              let k = 0;
              k <
              dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j][
                'vizs'
              ].length;
              k++
            ) {
              if(dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j]['vizs'][k].displayProperties){
                if(dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j]['vizs'][k].displayProperties.annotation !== 'topindicators'){
                  delete dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j]['vizs'][k].data
                  delete dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j]['vizs'][k].dataSet
                }
              }
            }
          }
        }
      }
      window.sessionStorage.setItem('DASHBOARDS', JSON.stringify(dashboards))
      if (Object.keys(this.state.drillDownDashboard).length > 0) {
        const returnObj = this.updateDrillDownDashboard( this.state.drillDownDashboard.drillDownID,true,)
        this.setState({
          updates: updates,
          dashboards: dashboards,
          drillDownDashboard: returnObj.drillDownDashboard,
          focusedDashboard: returnObj.focusedDashboard,
          startTime : startTime,
          endTime : endTime
        })
      }else{
        this.setState({
          updates: updates,
          dashboards: dashboards,
          startTime : startTime,
          endTime : endTime
        })
      }
      
    }
  }

  componentWillMount() {
    let vizCount = 0
    let topIndicatorCount = 0
    window.sessionStorage.setItem('CALCULATED_VIZ', '0')
    window.sessionStorage.setItem('CALCULATED_VIZ_TOP_INDICATORS', '0')
    this.scheduleJobs = {}
    this.scheduleJobsMap = {}
    this.processedVizs = {}
    this.dataProcessingStarted = {}
    this.scheduleJobs_topIndicators = {}
    this.scheduleJobsMap_topIndicators = {}
    this.processedVizs_topIndicators = {}
    this.dataProcessingStarted_topIndicators = {}
    let dashboards = window.sessionStorage.getItem('DASHBOARDS')
      ? JSON.parse(window.sessionStorage.getItem('DASHBOARDS'))
      : []
    if(parameters.MODE !=='DEVELOPMENT'){
      dashboards = dashBoardsConfig.dashboards
    }
    if (dashboards[this.state.focusedDashboard]) {
      for (
        let i = 0;
        i < dashboards[this.state.focusedDashboard]['rows'].length;
        i++
      ) {
        if (dashboards[this.state.focusedDashboard]['rows'][i]['cols']) {
          for (
            let j = 0;
            j <
            dashboards[this.state.focusedDashboard]['rows'][i]['cols'].length;
            j++
          ) {
            if(dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j]['vizs'].length){
              if(dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j]['vizs'][0].displayProperties){

              
                if(dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j]['vizs'][0].displayProperties.annotation ==='topindicators'){
                  topIndicatorCount = topIndicatorCount +  dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j][
                    'vizs'
                  ].length
                }else{
                  vizCount =
                  vizCount +
                  dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j][
                    'vizs'
                  ].length
                }
              
                for (
                  let k = 0;
                  k <
                  dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j][
                    'vizs'
                  ].length;
                  k++
                ) {
                  delete dashboards[this.state.focusedDashboard]['rows'][i]['cols'][
                    j
                  ]['vizs'][k].data
                  delete dashboards[this.state.focusedDashboard]['rows'][i]['cols'][
                    j
                  ]['vizs'][k].dataSet
                }
              }
           }
          }
        }
      }
    }
    if (dashboards[this.state.focusedDashboard]) {
      let contextElements = this.DashboardService.getDashboardContextElements(dashboards[this.state.focusedDashboard].context)
      contextElements.then((response : any)=>{
       if(response['data']){
          let key = Object.keys(response['data'])[0]
          response = response['data'][key]
          let contextArray = new Array()
          if(response){
            contextArray = [...this.state.contextArray , ...response]
          }else{
            contextArray = [...this.state.contextArray]
          }
          
          window.sessionStorage.setItem('DASHBOARDS', JSON.stringify(dashboards))
          this.setState({
            vizCount: vizCount,
            topIndicatorCount : topIndicatorCount,
            dashboards: dashboards,
            contextSet : true,
            contextArray : contextArray
          })
        }else{
          window.sessionStorage.setItem('DASHBOARDS', JSON.stringify(dashboards))
          this.setState({
            vizCount: vizCount,
            topIndicatorCount : topIndicatorCount,
            dashboards: dashboards,
            contextSet : true
          })
        }
      })
    }
  
  }

  updateTopIndicators(){
    
    let topIndicatorCount = 0
    
    window.sessionStorage.setItem('CALCULATED_VIZ_TOP_INDICATORS', '0')
    this.scheduleJobs_topIndicators = {}
    this.scheduleJobsMap_topIndicators = {}
    this.processedVizs_topIndicators = {}
    this.dataProcessingStarted_topIndicators = {}
    let dashboards = [...this.state.dashboards]
    let updates = this.state.updates
    updates++
    if (dashboards[this.state.focusedDashboard]) {
      for (
        let i = 0;
        i < dashboards[this.state.focusedDashboard]['rows'].length;
        i++
      ) {
        if (dashboards[this.state.focusedDashboard]['rows'][i]['cols']) {
          for (
            let j = 0;
            j <
            dashboards[this.state.focusedDashboard]['rows'][i]['cols'].length;
            j++
          ) {
            if(dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j]['vizs'].length){
              if(dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j]['vizs'][0].displayProperties){

              
                if(dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j]['vizs'][0].displayProperties.annotation ==='topindicators'){
                  topIndicatorCount = topIndicatorCount +  dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j]['vizs'].length
                  for (
                    let k = 0;
                    k <
                    dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j]['vizs'
                    ].length;
                    k++
                  ) {
                    delete dashboards[this.state.focusedDashboard]['rows'][i]['cols'][
                      j
                    ]['vizs'][k].data
                    delete dashboards[this.state.focusedDashboard]['rows'][i]['cols'][
                      j
                    ]['vizs'][k].dataSet
                  }
                }
              
                
              }
            }
          }
        }
      }
    }
    clearTimeout(this.timeOut)
   // window.sessionStorage.setItem('DASHBOARDS', JSON.stringify(dashboards))
    this.setState({
      topIndicatorCount : topIndicatorCount,
      dashboards: dashboards,
      updates: updates
    })
  }

  setSchedule = (viz: any,dashboardIndex: number,rowIndex: number,colIndex: number,vizIndex: number,) => {
    if(viz.displayProperties.annotation === "topindicators"){
    //  console.log('for top indicators', this.state.topIndicatorCount)
      
      let CALCULATED_VIZ_TOP_INDICATORS = parseInt(
        window.sessionStorage.getItem('CALCULATED_VIZ_TOP_INDICATORS'),
      )
   //    console.log(CALCULATED_VIZ_TOP_INDICATORS,this.state.topIndicatorCount,viz.displayProperties.name,viz.displayProperties.annotation)
    
      if (CALCULATED_VIZ_TOP_INDICATORS >= this.state.topIndicatorCount) {
        return false
      }
      CALCULATED_VIZ_TOP_INDICATORS++
      let vizID =
        'SLB' +
        '.' +
        this.state.dashboards[dashboardIndex].name.replace(/\s/g, '') +
        this.state.dashboards[dashboardIndex].key +
        viz.displayProperties.name.replace(/\s/g, '')
  
      window.sessionStorage.setItem('CALCULATED_VIZ_TOP_INDICATORS', CALCULATED_VIZ_TOP_INDICATORS.toString())
      let translatedIndex =
        'viz' +
        '__' +
        dashboardIndex +
        '__' +
        rowIndex +
        '__' +
        colIndex +
        '__' +
        vizIndex
      if (this.processedVizs_topIndicators[translatedIndex]) {
        return false
      } else {
        this.processedVizs_topIndicators[translatedIndex] = true
        let isHistogram =
          viz.displayProperties.visualizationType === 'histograms' ? true : false
        this.scheduleJobsMap_topIndicators[translatedIndex] = new Array()
        //let scheduleJobs = this.AppRoot.getRootScopeElement('scheduleJobs')
        if (!this.scheduleJobs_topIndicators || this.scheduleJobs_topIndicators === undefined) {
          this.scheduleJobs_topIndicators = {}
        }
        let finalVizId = viz.queries[0].dataSource + '.' + vizID
        if (this.dataProcessingStarted_topIndicators[finalVizId]) {
          return false
        }
        for (let i = 0; i < viz.queries.length; i++) {
          // console.log(viz, this.scheduleJobs, this.dataProcessingStarted)
          this.dataProcessingStarted_topIndicators[finalVizId] = true
          let mapId =
            viz.queries[i].dataSource +
            '/' +
            viz.queries[i].endPoint +
            '/' +
            viz.queries[i].metrics
  
          let obj = this.QueryService.buildQuery(
            viz.queries[i].dataSource,
            viz.queries[i],
            Date.now() - 180000,
            Date.now(),
            isHistogram,
            finalVizId,
            this.state.contextArray,
            this.state.selectedContext,
            this.state.dashboards[this.state.focusedDashboard].context
          )
          let objKey = Object.keys(obj)
          let scheduleJobsKey = 0
          if (this.scheduleJobs_topIndicators[mapId]) {
            if (
              Object.keys(
                this.scheduleJobs_topIndicators[mapId][this.scheduleJobs_topIndicators[mapId].length - 1],
              ).length > 3
            ) {
              this.vizdataRequests++
              this.scheduleJobs_topIndicators[mapId][this.scheduleJobs_topIndicators[mapId].length] = {}
              this.scheduleJobsMap_topIndicators[translatedIndex].push(
                mapId +
                '__' +
                (this.scheduleJobs_topIndicators[mapId].length - 1) +
                '__' +
                objKey[0],
              )
              this.scheduleJobs_topIndicators[mapId][this.scheduleJobs_topIndicators[mapId].length - 1][
                objKey[0]
              ] = obj[objKey[0]]
              // this.scheduleJobs[mapId][this.scheduleJobs[mapId].length -1].push(this.QueryService.buildQuery(viz.queries[i].dataSource,viz.queries[i],this.state.startTime,this.state.endTime,isHistogram,finalVizId))
            } else {
              this.scheduleJobsMap_topIndicators[translatedIndex].push(
                mapId +
                '__' +
                (this.scheduleJobs_topIndicators[mapId].length - 1) +
                '__' +
                objKey[0],
              )
              this.scheduleJobs_topIndicators[mapId][this.scheduleJobs_topIndicators[mapId].length - 1][
                objKey[0]
              ] = obj[objKey[0]]
              // this.scheduleJobs[mapId][this.scheduleJobs[mapId].length -1].push(this.QueryService.buildQuery(viz.queries[i].dataSource,viz.queries[i],this.state.startTime,this.state.endTime,isHistogram,finalVizId))
            }
          } else {
            this.vizdataRequests++
            this.scheduleJobs_topIndicators[mapId] = []
            this.scheduleJobs_topIndicators[mapId][0] = {}
  
            this.scheduleJobs_topIndicators[mapId][0][objKey[0]] = obj[objKey[0]]
            this.scheduleJobsMap_topIndicators[translatedIndex].push(
              mapId + '__' + scheduleJobsKey + '__' + objKey[0],
            )
          }
        }
      }
  
      if (CALCULATED_VIZ_TOP_INDICATORS === this.state.topIndicatorCount) {
        this.scheduleJobs_topIndicators = this.DashboardService.getBatchAnalyticsData(
          this.scheduleJobs_topIndicators,
          this.scheduleJobsMap_topIndicators,
          this.updateScheduleJobs_topIndicator
        )
        this.timeOut = setTimeout(() => {
          this.updateTopIndicators()
        }, 60000);
       
      }
      //end of top indicator processing
    }else{
     
      let CALCULATED_VIZ = parseInt(
        window.sessionStorage.getItem('CALCULATED_VIZ'),
      )
      //console.log(CALCULATED_VIZ,this.state.vizCount,viz.displayProperties.name,viz.displayProperties.annotation)
      if (CALCULATED_VIZ >= this.state.vizCount) {
        return false
      }
      CALCULATED_VIZ++
      let vizID =
        'SLB' +
        '.' +
        this.state.dashboards[dashboardIndex].name.replace(/\s/g, '') +
        this.state.dashboards[dashboardIndex].key +
        viz.displayProperties.name.replace(/\s/g, '')
  
      window.sessionStorage.setItem('CALCULATED_VIZ', CALCULATED_VIZ.toString())
      let translatedIndex =
        'viz' +
        '__' +
        dashboardIndex +
        '__' +
        rowIndex +
        '__' +
        colIndex +
        '__' +
        vizIndex
      if (this.processedVizs[translatedIndex]) {
        return false
      } else {
        this.processedVizs[translatedIndex] = true
        let isHistogram =
          viz.displayProperties.visualizationType === 'histograms' ? true : false
        this.scheduleJobsMap[translatedIndex] = new Array()
        //let scheduleJobs = this.AppRoot.getRootScopeElement('scheduleJobs')
        if (!this.scheduleJobs || this.scheduleJobs === undefined) {
          this.scheduleJobs = {}
        }
        let finalVizId = viz.queries[0].dataSource + '.' + vizID
        if (this.dataProcessingStarted[finalVizId]) {
          return false
        }
        for (let i = 0; i < viz.queries.length; i++) {
          // console.log(viz, this.scheduleJobs, this.dataProcessingStarted)
          this.dataProcessingStarted[finalVizId] = true
          let mapId =
            viz.queries[i].dataSource +
            '/' +
            viz.queries[i].endPoint +
            '/' +
            viz.queries[i].metrics
  
          let obj = this.QueryService.buildQuery(
            viz.queries[i].dataSource,
            viz.queries[i],
            this.state.startTime,
            this.state.endTime,
            isHistogram,
            finalVizId,
            this.state.contextArray,
            this.state.selectedContext,
            this.state.dashboards[this.state.focusedDashboard].context
          )
          let objKey = Object.keys(obj)
          let scheduleJobsKey = 0
          if (this.scheduleJobs[mapId]) {
            if (
              Object.keys(
                this.scheduleJobs[mapId][this.scheduleJobs[mapId].length - 1],
              ).length > 3
            ) {
              this.vizdataRequests++
              this.scheduleJobs[mapId][this.scheduleJobs[mapId].length] = {}
              this.scheduleJobsMap[translatedIndex].push(
                mapId +
                '__' +
                (this.scheduleJobs[mapId].length - 1) +
                '__' +
                objKey[0],
              )
              this.scheduleJobs[mapId][this.scheduleJobs[mapId].length - 1][
                objKey[0]
              ] = obj[objKey[0]]
              // this.scheduleJobs[mapId][this.scheduleJobs[mapId].length -1].push(this.QueryService.buildQuery(viz.queries[i].dataSource,viz.queries[i],this.state.startTime,this.state.endTime,isHistogram,finalVizId))
            } else {
              this.scheduleJobsMap[translatedIndex].push(
                mapId +
                '__' +
                (this.scheduleJobs[mapId].length - 1) +
                '__' +
                objKey[0],
              )
              this.scheduleJobs[mapId][this.scheduleJobs[mapId].length - 1][
                objKey[0]
              ] = obj[objKey[0]]
              // this.scheduleJobs[mapId][this.scheduleJobs[mapId].length -1].push(this.QueryService.buildQuery(viz.queries[i].dataSource,viz.queries[i],this.state.startTime,this.state.endTime,isHistogram,finalVizId))
            }
          } else {
            this.vizdataRequests++
            this.scheduleJobs[mapId] = []
            this.scheduleJobs[mapId][0] = {}
  
            this.scheduleJobs[mapId][0][objKey[0]] = obj[objKey[0]]
            this.scheduleJobsMap[translatedIndex].push(
              mapId + '__' + scheduleJobsKey + '__' + objKey[0],
            )
          }
        }
      }
  
      if (CALCULATED_VIZ === this.state.vizCount) {
        this.scheduleJobs = this.DashboardService.getBatchAnalyticsData(
          this.scheduleJobs,
          this.scheduleJobsMap,
          this.updateScheduleJobs,
        )
       
      }
    }

  
  }

  updateScheduleJobs_topIndicator=()=>{
    let allVizMaps = Object.keys(this.scheduleJobsMap_topIndicators)
    let dashboards = [...this.state.dashboards]
    for (let k = 0; k < allVizMaps.length; k++) {
      let vizTracker = allVizMaps[k].split('__')
      if (!this.dataProcessingStarted_topIndicators[allVizMaps[k]]) {
        dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]][
          'vizs'
        ][vizTracker[4]].modifiedQuery = []
        dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]][
          'vizs'
        ][vizTracker[4]].responses = []
        this.dataProcessingStarted_topIndicators[allVizMaps[k]] = true
      }
      for (let l = 0; l < this.scheduleJobsMap_topIndicators[allVizMaps[k]].length; l++) {
        let map = this.scheduleJobsMap_topIndicators[allVizMaps[k]][l]
        map = map.split('__')
        if (this.scheduleJobs_topIndicators[map[0]][map[1]]['responses']) {
          dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][
            vizTracker[3]
          ]['vizs'][vizTracker[4]].modifiedQuery.push(
            this.scheduleJobs_topIndicators[map[0]][map[1]][map[2]],
          )

          dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][
            vizTracker[3]
          ]['vizs'][vizTracker[4]].responses.push(
            this.scheduleJobs_topIndicators[map[0]][map[1]]['responses'][map[2]],
          )
        }
      }
      // console.log('Processing' , allVizMaps[k] , dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]]['vizs'][vizTracker[4]]['responses'].length, dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]]['vizs'][vizTracker[4]]['modifiedQuery'].length)
      if (
        dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]][
          'vizs'
        ][vizTracker[4]]['responses'].length > 0 &&
        dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]][
          'vizs'
        ][vizTracker[4]]['responses'].length ===
        dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][
          vizTracker[3]
        ]['vizs'][vizTracker[4]]['modifiedQuery'].length
      ) {
        delete this.scheduleJobsMap_topIndicators[allVizMaps[k]]
        this.updateVisualization(allVizMaps[k], vizTracker, dashboards)
      }
    }
  }

  updateScheduleJobs = () => {
    let allVizMaps = Object.keys(this.scheduleJobsMap)
    let dashboards = [...this.state.dashboards]
    for (let k = 0; k < allVizMaps.length; k++) {
      let vizTracker = allVizMaps[k].split('__')
      if (!this.dataProcessingStarted[allVizMaps[k]]) {
        dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]][
          'vizs'
        ][vizTracker[4]].modifiedQuery = []
        dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]][
          'vizs'
        ][vizTracker[4]].responses = []
        this.dataProcessingStarted[allVizMaps[k]] = true
      }
      for (let l = 0; l < this.scheduleJobsMap[allVizMaps[k]].length; l++) {
        let map = this.scheduleJobsMap[allVizMaps[k]][l]
        map = map.split('__')
        if (this.scheduleJobs[map[0]][map[1]]['responses']) {
          dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][
            vizTracker[3]
          ]['vizs'][vizTracker[4]].modifiedQuery.push(
            this.scheduleJobs[map[0]][map[1]][map[2]],
          )

          dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][
            vizTracker[3]
          ]['vizs'][vizTracker[4]].responses.push(
            this.scheduleJobs[map[0]][map[1]]['responses'][map[2]],
          )
        }
      }
      // console.log('Processing' , allVizMaps[k] , dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]]['vizs'][vizTracker[4]]['responses'].length, dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]]['vizs'][vizTracker[4]]['modifiedQuery'].length)
      if (
        dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]][
          'vizs'
        ][vizTracker[4]]['responses'].length > 0 &&
        dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]][
          'vizs'
        ][vizTracker[4]]['responses'].length ===
        dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][
          vizTracker[3]
        ]['vizs'][vizTracker[4]]['modifiedQuery'].length
      ) {
        delete this.scheduleJobsMap[allVizMaps[k]]
        this.updateVisualization(allVizMaps[k], vizTracker, dashboards)
      }
    }
  }
  updateVisualization = (vizId: any, vizTracker: any, dashboards: any) => {
    let updates = this.state.updates
    updates++
    let viz =
      dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]][
      'vizs'
      ][vizTracker[4]]
    dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]][
      'vizs'
    ][vizTracker[4]] = this.ParserService.parseData(viz)

    dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]][
      'vizs'
    ][vizTracker[4]].dataSet = true
    this.setState({
      dashboards: dashboards,
      updates: updates,
    })
  }

  componentDidUpdate() {
    this.processedVizs = {}
    this.dataProcessingStarted = {}
    this.processedVizs_topIndicators={}
    this.dataProcessingStarted_topIndicators={}

    let dashboards = window.sessionStorage.getItem('DASHBOARDS')
      ? JSON.parse(window.sessionStorage.getItem('DASHBOARDS'))
      : []
      if(parameters.MODE !=='DEVELOPMENT'){
        dashboards = dashBoardsConfig.dashboards
      }
    if (dashboards[this.state.focusedDashboard] && !this.state.contextSet) {
      let contextElements = this.DashboardService.getDashboardContextElements(dashboards[this.state.focusedDashboard].context)
      contextElements.then((response : any)=>{
        if(response['data']){
          let key = Object.keys(response['data'])[0]
          response = response['data'][key]
          let contextArray = new Array()
          if(response){
            contextArray = [...this.state.contextArray , ...response]
          }else{
            contextArray = [...this.state.contextArray]
          }
          
          window.sessionStorage.setItem('DASHBOARDS', JSON.stringify(dashboards))
          this.setState({
            contextSet : true,
            contextArray : contextArray
          })
        }else{
          window.sessionStorage.setItem('DASHBOARDS', JSON.stringify(dashboards))
          this.setState({
            contextSet : true
          })
        }
      })
    }
  }
  onNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.dashboardName = e.currentTarget.value
  }

  editName = (index: number) => {
    let StoredDashBoards = JSON.parse(
      window.sessionStorage.getItem('DASHBOARDS'),
    )
    this.dashboardName = StoredDashBoards[index]['name']
    StoredDashBoards[index]['editable'] = true
    window.sessionStorage.setItem(
      'DASHBOARDS',
      JSON.stringify(StoredDashBoards),
    )
    this.receiveUpdate()
  }

  cancelName = (index: number) => {
    let StoredDashBoards = JSON.parse(
      window.sessionStorage.getItem('DASHBOARDS'),
    )
    StoredDashBoards[index]['editable'] = false
    window.sessionStorage.setItem(
      'DASHBOARDS',
      JSON.stringify(StoredDashBoards),
    )
    this.receiveUpdate()
  }

  changeName = (index: number) => {
    let StoredDashBoards = JSON.parse(
      window.sessionStorage.getItem('DASHBOARDS'),
    )
    StoredDashBoards[index]['editable'] = false
    StoredDashBoards[index]['name'] = this.dashboardName
    window.sessionStorage.setItem(
      'DASHBOARDS',
      JSON.stringify(StoredDashBoards),
    )
    this.receiveUpdate()
  }

  updateDrillDownDashboard = (key: any, isReturn = false) => {
    let StoredDashBoards = JSON.parse(
      window.sessionStorage.getItem('DASHBOARDS'),
    )
    let dashboardIndex = -1
    const dashboards = StoredDashBoards.filter((dashboard: any, index: any) => {
      if (dashboard.drillDownID === key) {
        dashboardIndex = index
        return dashboard
      }
    })
    if (dashboards) {
      if (isReturn) {
        return {
          drillDownDashboard: dashboards[0],
          focusedDashboard: dashboardIndex,
        }
      }
      this.setState({
        drillDownDashboard: dashboards[0],
        focusedDashboard: dashboardIndex,
      })
    }
  }

  loadDashboard(index: any) {
    clearInterval(this.timeOut)
    window.sessionStorage.setItem('CALCULATED_VIZ', '0')
    window.sessionStorage.setItem('CALCULATED_VIZ_TOP_INDICATORS', '0')
    this.scheduleJobs = {}
    this.scheduleJobsMap = {}
    this.processedVizs = {}
    this.dataProcessingStarted = {}
    this.scheduleJobs_topIndicators = {}
    this.scheduleJobsMap_topIndicators = {}
    this.processedVizs_topIndicators = {}
    this.dataProcessingStarted_topIndicators = {}
    let vizCount = 0
    let topIndicatorCount = 0
    let dashboards = window.sessionStorage.getItem('DASHBOARDS')
      ? JSON.parse(window.sessionStorage.getItem('DASHBOARDS'))
      : []
      if(parameters.MODE !=='DEVELOPMENT'){
        dashboards = dashBoardsConfig.dashboards
      }
    for (let i = 0; i < dashboards[index]['rows'].length; i++) {
      if (dashboards[index]['rows'][i]['cols']) {
        for (let j = 0; j < dashboards[index]['rows'][i]['cols'].length; j++) {
          if(dashboards[index]['rows'][i]['cols'][j]['vizs'].length){
            if(dashboards[index]['rows'][i]['cols'][j]['vizs'][0].displayProperties)
            {
              if(dashboards[index]['rows'][i]['cols'][j]['vizs'][0].displayProperties.annotation ==='topindicators'){
                topIndicatorCount = topIndicatorCount +  dashboards[index]['rows'][i]['cols'][j][
                  'vizs'
                ].length
              }else{
                vizCount =
                vizCount +
                dashboards[index]['rows'][i]['cols'][j][
                  'vizs'
                ].length
              }
              
              for (
                let k = 0;
                k < dashboards[index]['rows'][i]['cols'][j]['vizs'].length;
                k++
              ) {
                delete dashboards[index]['rows'][i]['cols'][j]['vizs'].data
                delete dashboards[index]['rows'][i]['cols'][j]['vizs'].dataSet
              }
            }
          }
        }
      }
    }

    this.setState({
      vizCount: vizCount,
      topIndicatorCount : topIndicatorCount,
      focusedDashboard: index,
      dashboards: dashboards,
      contextSet : false,
      contextArray: [{name : 'OverAll', displayName : 'Over All'}],
      selectedContext: 'OverAll',
    })
  }

  defaultView = () => {
    this.setState({
      drillDownDashboard: {},
      focusedDashboard: 0,
    })
  }

 
  addNewDashbaord() {
   
    this.toggleModal(true)
  }
  setDashboardContext(e : any){
    
    this.dashboardContext = e
  }
  setDashBoardName(e: any){
    this.dashboardName = e.target.value
  }
  onChangeOfContext=(e: any) =>{
    window.sessionStorage.setItem('CALCULATED_VIZ', '0')
    let updates = this.state.updates
    updates++
    window.sessionStorage.setItem('CALCULATED_VIZ_TOP_INDICATORS', '0')
    this.scheduleJobs = {}
    this.scheduleJobsMap = {}
    this.scheduleJobs_topIndicators={}
    this.scheduleJobsMap_topIndicators={}

    let dashboards = window.sessionStorage.getItem('DASHBOARDS')
      ? JSON.parse(window.sessionStorage.getItem('DASHBOARDS'))
      : []
      if(parameters.MODE !=='DEVELOPMENT'){
        dashboards = dashBoardsConfig.dashboards
      }
    for (
      let i = 0;
      i < dashboards[this.state.focusedDashboard]['rows'].length;
      i++
    ) {
      if (dashboards[this.state.focusedDashboard]['rows'][i]['cols']) {
        for (
          let j = 0;
          j < dashboards[this.state.focusedDashboard]['rows'][i]['cols'].length;
          j++
        ) {
          for (
            let k = 0;
            k <
            dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j][
              'vizs'
            ].length;
            k++
          ) {
            delete dashboards[this.state.focusedDashboard]['rows'][i]['cols'][
              j
            ]['vizs'][k].data
            delete dashboards[this.state.focusedDashboard]['rows'][i]['cols'][
              j
            ]['vizs'][k].dataSet
          }
        }
      }
    }
    // window.sessionStorage.setItem('DASHBOARDS', JSON.stringify(dashboards))
    if (Object.keys(this.state.drillDownDashboard).length > 0) {
      const returnObj = this.updateDrillDownDashboard( this.state.drillDownDashboard.drillDownID,true,)
      this.setState({
        updates: updates,
        dashboards: dashboards,
        drillDownDashboard: returnObj.drillDownDashboard,
        focusedDashboard: returnObj.focusedDashboard,
        selectedContext: e
      })
    }else{
      this.setState({
        updates: updates,
        dashboards: dashboards,
        selectedContext: e
      })
    }
    
  }
  toggleModal = (value: boolean) => {

    this.setState({
      ContextSetVisible: value,
    })
  }
  handleOk = (e: any) => {
    this.toggleModal(false)
    this.scheduleJobs = {}
    this.scheduleJobsMap = {}
    let dashboards: any = [...this.state.dashboards]
    let newDashboard = { ...config.DefaultLayout }
    newDashboard.key = dashboards.length + 1
    newDashboard.name=this.dashboardName
    newDashboard.context = this.dashboardContext  ? this.dashboardContext :  newDashboard.context
    dashboards.push(newDashboard)
    window.sessionStorage.setItem('DASHBOARDS', JSON.stringify(dashboards))
    this.setState({
      dashboards: JSON.parse(window.sessionStorage.getItem('DASHBOARDS')),
      focusedDashboard: dashboards.length - 1,
      contextSet : false,
      contextArray: [{name : 'OverAll', displayName : 'Over All'}],
    })
  }

  handleCancel = (e: any) => {
    this.toggleModal(false)
  }
 
  render() {
    const mode = parameters.MODE
    const style = {
      background: 'rgb(250, 250, 250)',
      border: '3px solid #e3e3e3',
      padding: '2px',
      margin: '5px',
      borderRadius: '10px',
    }
    return (
  
      <div style={style}>
        <A10Modal
                title="Set Dashboard Context"
                width = "500px"
                visible={this.state.ContextSetVisible}
                onOk={this.handleOk}
                destroyOnClose={true}
                onCancel={this.handleCancel}
              >
              <A10Input
                  type="text"
                  onChange={this.setDashBoardName.bind(this)}
                  placeholder='Dashboard Name (Defaults to "New Dashboard")'
                  style={{ width: 350 }}
                />
                <A10Divider />
                <A10Select defaultValue="appservices" style={{ width: 350 }} onChange={this.setDashboardContext.bind(this)}>
                    {/* <A10Select.Option value="provider" key="1">Provider</A10Select.Option> */}
                    <A10Select.Option value="tenant" key="2">Tenant</A10Select.Option>
                    <A10Select.Option value="cluster" key="3">Cluster</A10Select.Option>
                    <A10Select.Option value="device" key="4">Device</A10Select.Option>
                  <A10Select.Option value="appservices" key="5">App Service</A10Select.Option>
                  {/* <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>Disabled</Option>
                  <Option value="Yiminghe">yiminghe</Option> */}
                </A10Select>
          </A10Modal>
        <div>
          {Object.keys(this.state.drillDownDashboard).length === 0 ? (
            <>
              <A10Row>
                <A10Col span={20}>
                  {this.state.dashboards.map(
                    (dashboard: any, index: number) => {
                      if (dashboard.drillDownID === null) {
                        return dashboard.editable ? (
                          <div className="name-container" key={index}>
                            <A10Input
                              defaultValue={dashboard.name}
                              onChange={this.onNameChange}
                              className="width-200px"
                            />
                            <span
                              className="pad-h-5-i"
                              onClick={() => this.changeName(index)}
                            >
                              <A10Icon
                                app="global"
                                type="check"
                                className="action-icon"
                              />
                            </span>
                            <span
                              className="pad-h-5-i"
                              onClick={() => this.cancelName(index)}
                            >
                              <A10Icon
                                app="global"
                                type="close"
                                className="action-icon"
                              />
                            </span>
                          </div>
                        ) : (
                            <div className="name-container" key={index}>
                              <A10Button
                                className="width-200px border-none"
                                onClick={() => this.loadDashboard(index)}
                                key={index}
                              >
                                {dashboard.name}
                              </A10Button>
                              {mode === 'DEVELOPMENT' ? (
                                <span
                                  className="pad-h-5"
                                  onClick={() => this.editName(index)}
                                >
                                  <A10Icon
                                    app="global"
                                    type="edit"
                                    className="action-icon"
                                  />
                                </span>
                              ) : null}
                            </div>
                          )
                      }
                    },
                  )}
                </A10Col>
                <A10Col className="pull-right" span={4}>
                  {mode === 'DEVELOPMENT' ? (
                    // <A10Button type="primary" onClick ={() => this.addNewDashbaord()}>Add New Dashboard</A10Button>
                    <A10Button
                      className="action-button"
                      onClick={() => this.addNewDashbaord()}
                    >
                      <A10Icon type="plus" className="action-icon" />
                      Add New Dashboard
                    </A10Button>
                  ) : null}
                </A10Col>
              </A10Row>
              {this.state.dashboards.length ? (
                this.state.contextSet ?
                <Dashboard
                  selectedContext={this.state.selectedContext}
                  contextArray={this.state.contextArray}
                  onChangeOfContext={this.onChangeOfContext}
                  dashboardIndex={this.state.focusedDashboard}
                  dashboard={this.state.dashboards[this.state.focusedDashboard]}
                  onUpdate={this.receiveUpdate}
                  vizCount={this.state.vizCount}
                  topIndicatorCount = {this.state.topIndicatorCount}
                  setSchedule={this.setSchedule}
                  updates={this.state.updates}
                  updateDrillDown={this.updateDrillDownDashboard}
                  defaultView={this.defaultView}
                  updateTimeRange={this.updateTimeRange}
                /> : <A10Spin>
                <A10Alert
                  message={'Setting ' + this.state.dashboards[this.state.focusedDashboard].name + ' context'}
                  description={'This might take some time, hold on till then'}
                  type="info"
                />
                {/* {this.setContext()} */}
              </A10Spin>
                
              ) : null}
            </>
          ) : (
            this.state.contextSet ?
              <Dashboard
                selectedContext={this.state.selectedContext}
                contextArray={this.state.contextArray}
                onChangeOfAppService={this.onChangeOfContext}
                dashboardIndex={this.state.focusedDashboard}
                dashboard={this.state.drillDownDashboard}
                onUpdate={this.receiveUpdate}
                vizCount={this.state.vizCount}
                topIndicatorCount={this.state.topIndicatorCount}
                setSchedule={this.setSchedule}
                updates={this.state.updates}
                updateDrillDown={this.updateDrillDownDashboard}
                defaultView={this.defaultView}
                updateTimeRange={this.updateTimeRange}
              /> : <A10Spin>
              <A10Alert
                message={'Setting ' + this.state.dashboards[this.state.focusedDashboard].name + ' context'}
                description={'This might take some time, hold on till then'}
                type="info"
              />
               </A10Spin>
            )}
        </div>
      </div> 
    )
  }
}
export default setupA10Container(Analytics)
