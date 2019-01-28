import * as React from 'react'
import {
  A10Container,
  setupA10Container,
  IA10ContainerDefaultProps,
  _
} from 'a10-gui-framework'
import {
  A10Row,
  A10Col,
  A10Button,
  A10Popover,
  A10Icon,
  A10Input
} from 'a10-gui-widgets'
import './styles/analytics.scss'
import { InfrastructureService } from 'src/services/InfrastructureService/InfrastructureService'
import { DashboardService } from 'src/services/DashboardService/DashboardService'
import { IDefaultMethods } from 'src/containers/L4SLB'
import {Dashboard} from './Dashboard'
import * as config from 'src/constants/AppDashboards/AppDashboards.json'
import { AppRoot } from 'src/settings/appRoot'
import {QueryService} from 'src/services/QueryService'
import {ParserService} from 'src/services/ParserService'

import parameters from 'parameters'

/*
  This component will get all the app services for the tenant in question and pass on the appservices as props to other components
  This will also control the time duration and keep the dashboards in sync with the time selected globally
*/

export interface IAnalyticsProps extends IA10ContainerDefaultProps {
  defaultMethods: IDefaultMethods
}
export interface IAnalyticsState {
  dashboards : any
  focusedDashboard : number
  visible: boolean
  appServices : any
  selectedAppService : any
  updates : any
  vizCount : number
  drillDownDashboard: any
}

class Analytics extends A10Container<IAnalyticsProps, IAnalyticsState> {
  
  state = {
    dashboards : new Array(),
    focusedDashboard :window.sessionStorage.getItem('DASHBOARDS') ? 0 : -1,
    visible: false,
    appServices : ['appService1','appService2'],
    selectedAppService : 'appService1',
    updates : 0,
    vizCount: 0,
    startTime : Date.now() - 21600000,
    endTime : Date.now(),
    drillDownDashboard: {}
  }

  InfrastructureService = new InfrastructureService()
  DashboardService = new DashboardService()
  QueryService = new QueryService()
  ParserService = new ParserService()
  pageLength = 5
  AppRoot = new AppRoot()
  scheduleJobs = {}
  scheduleJobsMap={}
  vizdataRequests = 0
  dashboardName=''
  processedVizs = {}
  dashboards = [...this.state.dashboards]
  dataProcessingStarted = {}

  receiveUpdate = () => {
    let updates = this.state.updates
    updates++
    window.sessionStorage.setItem('CALCULATED_VIZ','0')
    this.scheduleJobs={}
    this.scheduleJobsMap={}
    let dashboards = window.sessionStorage.getItem('DASHBOARDS') ? JSON.parse(window.sessionStorage.getItem('DASHBOARDS')) : []
    for(let i=0;i<dashboards[this.state.focusedDashboard]['rows'].length;i++){
      if(dashboards[this.state.focusedDashboard]['rows'][i]['cols']){
        for(let j=0;j<dashboards[this.state.focusedDashboard]['rows'][i]['cols'].length;j++ ){
          for(let k=0;k<dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j]['vizs'].length;k++){
            delete dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j]['vizs'].data
            delete dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j]['vizs'].dataSet
          }
        }
      }
    }
    window.sessionStorage.setItem('DASHBOARDS',JSON.stringify(dashboards))
    if(Object.keys(this.state.drillDownDashboard).length > 0){
      const returnObj = this.updateDrillDownDashboard(this.state.drillDownDashboard.drillDownID, true)
      this.setState({
        updates : updates,
        dashboards : dashboards,
        drillDownDashboard: returnObj.drillDownDashboard,
        focusedDashboard: returnObj.focusedDashboard
       })
       return
    }
    this.setState({
     updates : updates,
     dashboards : dashboards
    })
  }

  componentWillMount() {
    let vizCount =-2
    //window.sessionStorage.setItem('CALCULATED_VIZ','0')
    this.scheduleJobs={}
    this.scheduleJobsMap={}
    this.processedVizs={}
    this.dataProcessingStarted={}
    let dashboards = window.sessionStorage.getItem('DASHBOARDS') ? JSON.parse(window.sessionStorage.getItem('DASHBOARDS')) : []
   if(dashboards[this.state.focusedDashboard]){
      for(let i=0;i<dashboards[this.state.focusedDashboard]['rows'].length;i++){
        if(dashboards[this.state.focusedDashboard]['rows'][i]['cols']){
          for(let j=0;j<dashboards[this.state.focusedDashboard]['rows'][i]['cols'].length;j++ ){
            vizCount = vizCount + dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j]['vizs'].length
            for(let k=0;k<dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j]['vizs'].length;k++){
              delete dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j]['vizs'].data
              delete dashboards[this.state.focusedDashboard]['rows'][i]['cols'][j]['vizs'].dataSet
            }
          }
        }
      }
    }
    window.sessionStorage.setItem('DASHBOARDS',JSON.stringify(dashboards))
    this.setState({
      vizCount : vizCount,
      dashboards:  dashboards
    })
  }

 setSchedule = (viz: any,dashboardIndex : number,rowIndex : number,colIndex:number,vizIndex : number)=>{
  
  let CALCULATED_VIZ =  parseInt( window.sessionStorage.getItem('CALCULATED_VIZ'))
  if(CALCULATED_VIZ >= this.state.vizCount){
    return false
  }
  CALCULATED_VIZ++
  let vizID = 'SLB'+'.'+(this.state.dashboards[dashboardIndex].name).replace(/\s/g, '')+this.state.dashboards[dashboardIndex].key+(viz.displayProperties.name).replace(/\s/g, '')
 
  window.sessionStorage.setItem('CALCULATED_VIZ',CALCULATED_VIZ.toString())
  let translatedIndex = 'viz'+'__'+dashboardIndex+'__'+rowIndex+'__'+colIndex+'__'+vizIndex
  if(this.processedVizs[translatedIndex]){
    return false
  }else{
          this.processedVizs[translatedIndex] = true
          let isHistogram = viz.displayProperties.visualizationType === 'histograms' ? true : false
          this.scheduleJobsMap[translatedIndex] = new Array()
          //let scheduleJobs = this.AppRoot.getRootScopeElement('scheduleJobs')
            if(!this.scheduleJobs || this.scheduleJobs === undefined){
              this.scheduleJobs = {}
            }
          let finalVizId = viz.queries[0].dataSource + '.'+vizID
          if(this.dataProcessingStarted[finalVizId]){
              return false
          }
          for(let i=0;i<viz.queries.length;i++){
          // console.log(viz, this.scheduleJobs, this.dataProcessingStarted)
            this.dataProcessingStarted[finalVizId] = true
            let mapId = viz.queries[i].dataSource + '/'+ viz.queries[i].endPoint +'/' +viz.queries[i].metrics 
            
            
            let obj = (this.QueryService.buildQuery(viz.queries[i].dataSource,viz.queries[i],this.state.startTime,this.state.endTime,isHistogram,finalVizId))
            let objKey = Object.keys(obj)
            let scheduleJobsKey=0;
            if(this.scheduleJobs[mapId]){
              
              if(Object.keys(this.scheduleJobs[mapId][this.scheduleJobs[mapId].length -1]).length >3){
                this.vizdataRequests++
                this.scheduleJobs[mapId][this.scheduleJobs[mapId].length] = {}
                this.scheduleJobsMap[translatedIndex].push(mapId+'__'+(this.scheduleJobs[mapId].length -1)+'__'+(objKey[0]))
                this.scheduleJobs[mapId][this.scheduleJobs[mapId].length -1][objKey[0]] = obj[objKey[0]]
              // this.scheduleJobs[mapId][this.scheduleJobs[mapId].length -1].push(this.QueryService.buildQuery(viz.queries[i].dataSource,viz.queries[i],this.state.startTime,this.state.endTime,isHistogram,finalVizId))
                

              } else{
                this.scheduleJobsMap[translatedIndex].push(mapId+'__'+(this.scheduleJobs[mapId].length -1)+'__'+(objKey[0]))
                this.scheduleJobs[mapId][this.scheduleJobs[mapId].length -1][objKey[0]] = obj[objKey[0]]
              // this.scheduleJobs[mapId][this.scheduleJobs[mapId].length -1].push(this.QueryService.buildQuery(viz.queries[i].dataSource,viz.queries[i],this.state.startTime,this.state.endTime,isHistogram,finalVizId))

              }
            } else{
              this.vizdataRequests++
              this.scheduleJobs[mapId]=[]
              this.scheduleJobs[mapId][0] = {}
              
              this.scheduleJobs[mapId][0][objKey[0]] = obj[objKey[0]]
              this.scheduleJobsMap[translatedIndex].push(mapId+'__'+scheduleJobsKey+'__'+(objKey[0]))
            }
          
          }
  }
  
     if(CALCULATED_VIZ === this.state.vizCount){
      this.scheduleJobs = this.DashboardService.getBatchAnalyticsData(this.scheduleJobs, this.scheduleJobsMap,this.updateScheduleJobs)
     
    } 
 }

 updateScheduleJobs=()=>{
    let allVizMaps = Object.keys(this.scheduleJobsMap)
    let dashboards = [...this.state.dashboards]
      for(let k=0;k<allVizMaps.length;k++){
          
        let vizTracker = allVizMaps[k].split('__')
        if(!this.dataProcessingStarted[ allVizMaps[k]]){
          dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]]['vizs'][vizTracker[4]].modifiedQuery = []
          dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]]['vizs'][vizTracker[4]].responses = []
          this.dataProcessingStarted[ allVizMaps[k]] = true
        }
        for(let l=0;l<this.scheduleJobsMap[allVizMaps[k]].length;l++){
          let map = this.scheduleJobsMap[allVizMaps[k]][l]
          map = map.split('__')
          if(this.scheduleJobs[map[0]][map[1]]['responses']){
            dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]]['vizs'][vizTracker[4]].modifiedQuery.push(this.scheduleJobs[map[0]][map[1]][map[2]])
         
            dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]]['vizs'][vizTracker[4]].responses.push(this.scheduleJobs[map[0]][map[1]]['responses'][map[2]])
          }
        }
       // console.log('Processing' , allVizMaps[k] , dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]]['vizs'][vizTracker[4]]['responses'].length, dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]]['vizs'][vizTracker[4]]['modifiedQuery'].length)
          if( dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]]['vizs'][vizTracker[4]]['responses'].length > 0 && (dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]]['vizs'][vizTracker[4]]['responses'].length === dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]]['vizs'][vizTracker[4]]['modifiedQuery'].length)){

              delete this.scheduleJobsMap[allVizMaps[k]]
              this.updateVisualization(allVizMaps[k],vizTracker,dashboards)
          }
        
        
    }
  }
  updateVisualization = (vizId : any,vizTracker : any, dashboards : any) =>{
    
      let updates = this.state.updates
       updates++
       let viz = dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]]['vizs'][vizTracker[4]]
       dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]]['vizs'][vizTracker[4]] = this.ParserService.parseData(viz)

       dashboards[vizTracker[1]]['rows'][vizTracker[2]]['cols'][vizTracker[3]]['vizs'][vizTracker[4]].dataSet = true
      this.setState({
        dashboards : dashboards,
        updates : updates

      })
  }

  
  componentDidUpdate() {
    this.processedVizs = {}
    this.dataProcessingStarted={}
    //  if(this.state.dashboards !== JSON.parse(window.sessionStorage.getItem('DASHBOARDS')) && parseInt(window.sessionStorage.getItem('CALCULATED_VIZ')) !== 0){
    //    this.setState({
    //      dashboards : window.sessionStorage.getItem('DASHBOARDS') ? JSON.parse(window.sessionStorage.getItem('DASHBOARDS')) : []
    //    })
    //  }
  }
  onNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.dashboardName = e.currentTarget.value
  }

  editName = (index: number) => {
    let StoredDashBoards = JSON.parse(window.sessionStorage.getItem('DASHBOARDS'))
    this.dashboardName = StoredDashBoards[index]["name"]
    StoredDashBoards[index]['editable'] = true
    window.sessionStorage.setItem('DASHBOARDS',JSON.stringify(StoredDashBoards))
    this.receiveUpdate()
  }

  cancelName = (index: number) => {
    let StoredDashBoards = JSON.parse(window.sessionStorage.getItem('DASHBOARDS'))
    StoredDashBoards[index]['editable'] = false
    window.sessionStorage.setItem('DASHBOARDS',JSON.stringify(StoredDashBoards))
    this.receiveUpdate()
  }

  changeName = (index: number) => {
    let StoredDashBoards = JSON.parse(window.sessionStorage.getItem('DASHBOARDS'))
    StoredDashBoards[index]['editable'] = false
    StoredDashBoards[index]['name'] = this.dashboardName
    window.sessionStorage.setItem('DASHBOARDS',JSON.stringify(StoredDashBoards))
    this.receiveUpdate()
  }


   updateDrillDownDashboard =(key: any, isReturn = false) => {
    let StoredDashBoards = JSON.parse(window.sessionStorage.getItem('DASHBOARDS'))
    let dashboardIndex = -1
    const dashboards = StoredDashBoards.filter((dashboard:any, index: any) => 
        {
          if(dashboard.drillDownID === key){
            dashboardIndex = index
            return dashboard
          }
        })
    if(dashboards){
      if(isReturn){
        return {
          drillDownDashboard: dashboards[0],
          focusedDashboard: dashboardIndex
        }
      }
      this.setState({
        drillDownDashboard: dashboards[0],
        focusedDashboard: dashboardIndex
      })
    }
  }

  loadDashboard (index : any){
    window.sessionStorage.setItem('CALCULATED_VIZ','0')
    this.scheduleJobs={}
    this.scheduleJobsMap={}
    this.processedVizs={}
    this.dataProcessingStarted={}
    let vizCount =-2
    let dashboards = window.sessionStorage.getItem('DASHBOARDS') ? JSON.parse(window.sessionStorage.getItem('DASHBOARDS')) : []
    for(let i=0;i<dashboards[index]['rows'].length;i++){
      if(dashboards[index]['rows'][i]['cols']){
        for(let j=0;j<dashboards[index]['rows'][i]['cols'].length;j++ ){
          vizCount = vizCount + dashboards[index]['rows'][i]['cols'][j]['vizs'].length
          for(let k=0;k<dashboards[index]['rows'][i]['cols'][j]['vizs'].length;k++){
            delete dashboards[index]['rows'][i]['cols'][j]['vizs'].data
            delete dashboards[index]['rows'][i]['cols'][j]['vizs'].dataSet
          }
        }
      }
    }
    
    this.setState({
      vizCount : vizCount,
      focusedDashboard : index,
      dashboards : dashboards
    })
  }

  defaultView = ()=>{
    this.setState({
      drillDownDashboard: {},
      focusedDashboard: 0
    })
  }

  // hide = () => {
  //   this.setState({
  //     visible: false,
  //   });
  // }
  // handleVisibleChange (visible : boolean) {
  //   this.setState({ visible  : visible});
  // }

  addNewDashbaord (){
    //window.sessionStorage.setItem('CALCULATED_VIZ','0')
    this.scheduleJobs={}
    this.scheduleJobsMap={}
    let dashboards : any= [...this.state.dashboards]
    let newDashboard = {...config.DefaultLayout}
    newDashboard.key = dashboards.length + 1
    dashboards.push(newDashboard)
    window.sessionStorage.setItem('DASHBOARDS',JSON.stringify(dashboards))
    this.setState({
      dashboards : JSON.parse(window.sessionStorage.getItem('DASHBOARDS')),
      focusedDashboard : (dashboards.length-1)
    })

  }

  onChangeOfAppService(e : any){
    window.sessionStorage.setItem('CALCULATED_VIZ','0')
    this.scheduleJobs={}
    this.scheduleJobsMap={}
    let updates = this.state.updates
    updates++
    this.setState({
      updates : updates,
      selectedAppService : e
    })
  }

  render() {
  //  console.log('Analytics called', new Date() , new Date().getMilliseconds() , ' now calling ', this.state.focusedDashboard)
    const mode = parameters.MODE
    const style = {
      background : '#fafafa'
    }
    return (
      <div style={style}>
      <div>
        {
          Object.keys(this.state.drillDownDashboard).length === 0 ? 
          (<>
          
          <A10Row>
              <A10Col span={20}>
              {
                this.state.dashboards.map((dashboard : any,index : number) => {
                  if(dashboard.drillDownID === null){
                    return (
                      dashboard.editable ? (
                        <div className="name-container" key={index}>
                          <A10Input 
                          defaultValue={dashboard.name}
                          onChange={this.onNameChange}
                          className="width-200px"
                          />
                          <span className="pad-h-5-i" onClick={ () => this.changeName(index)}>
                            <A10Icon app="global" type="check" className="action-icon" />
                          </span>
                          <span className="pad-h-5-i" onClick={ () => this.cancelName(index)}>
                            <A10Icon app="global" type="close" className="action-icon" />
                          </span>
                        </div>
                      ) : (
                        <div className="name-container" key={index}>
                          <A10Button 
                          className="width-200px border-none"
                          onClick={ () => this.loadDashboard(index)} key={index}>
                            {dashboard.name} - {dashboard.key}
                          </A10Button>
                          { mode === 'DEVELOPMENT' ? 
                          <span className="pad-h-5" onClick={ () => this.editName(index)}>
                            <A10Icon app="global" type="edit" className="action-icon" />
                          </span> : null}
                        </div>
                      )
                    )
                  }
                })
              }
              </A10Col>
              <A10Col className="pull-right" span={4}>{mode === 'DEVELOPMENT' ? 
              
              // <A10Button type="primary" onClick ={() => this.addNewDashbaord()}>Add New Dashboard</A10Button>
              <A10Button className="action-button" onClick={ () => this.addNewDashbaord()}>
                        <A10Icon type="plus" className="action-icon" />
                        Add New Dashboard 
              </A10Button>
              : null}
              </A10Col>
          </A10Row>
            {this.state.dashboards.length ? 
              <Dashboard   
                  appService={this.state.selectedAppService}
                  appServices={this.state.appServices}
                  onChangeOfAppService= {this.onChangeOfAppService}
                  dashboardIndex={this.state.focusedDashboard}
                  dashboard={this.state.dashboards[this.state.focusedDashboard]}
                  onUpdate={this.receiveUpdate}
                  vizCount={this.state.vizCount}
                  setSchedule={this.setSchedule}
                  updates={this.state.updates}
                  updateDrillDown ={this.updateDrillDownDashboard}
                  defaultView = {this.defaultView}
              />
              :null}
              </>
          ): 
          <Dashboard   
            appService={this.state.selectedAppService}
            appServices={this.state.appServices}
            onChangeOfAppService= {this.onChangeOfAppService}
            dashboardIndex={this.state.focusedDashboard}
            dashboard={this.state.drillDownDashboard}
            onUpdate={this.receiveUpdate}
            vizCount={this.state.vizCount}
            setSchedule={this.setSchedule}
            updates={this.state.updates}
            updateDrillDown ={this.updateDrillDownDashboard}
            defaultView = {this.defaultView}
      />
        }
      </div>
        
      </div>
    )
  }
}
export default setupA10Container(Analytics)
