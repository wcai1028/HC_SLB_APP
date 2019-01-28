import * as React from 'react'
import {
  A10Container,
  setupA10Container,
  IA10ContainerDefaultProps,
} from 'a10-gui-framework'
import {
  A10Row,
  A10Col,
  A10Button,
  A10Popover,
  A10Icon
} from 'a10-gui-widgets'

import { InfrastructureService } from 'src/services/InfrastructureService/InfrastructureService'
import { DashboardService } from 'src/services/DashboardService/DashboardService'
import { IDefaultMethods } from 'src/containers/L4SLB'
import * as config from 'src/constants/AppDashboards/AppDashboards.json'
import {Row} from 'src/components/shared/Row'
import parameters from 'parameters'
//import { window } from 'd3';

export interface IDashboardProps extends IA10ContainerDefaultProps {
  defaultMethods: IDefaultMethods
  dashboardIndex : number
  appService : any
  appServices : any
  onChangeOfAppService : any
  onUpdate : any
  dashboard : any
  vizCount : number
  setSchedule : any
  updates : any
  updateDrillDown: any
  defaultView: any
}
export interface IDashboardState {
  dashboard: any
  dashboardIndex : number
  selectedInfographics : any
  updates : any
}

class Dashboard extends A10Container<IDashboardProps, IDashboardState> {
  InfrastructureService = new InfrastructureService()
  DashboardService = new DashboardService()
  pageLength = 5
  state = {
    dashboard : this.props.dashboard,
    dashboardIndex : this.props.dashboardIndex,
    selectedInfographics : 'all',
    updates : this.props.updates
  }
  

  receiveUpdate = () => {
    // this.dataLoaded = false
    // this.setState({
    //  // devicesUpdated: true,
    // })
  }

  componentWillMount() {
    if(JSON.stringify(this.props.dashboard) !== JSON.stringify(this.state.dashboard) )
   
    this.setState({
      dashboard : this.props.dashboard,
      dashboardIndex : this.props.dashboardIndex,
      updates : this.props.updates
    })

  }

  componentDidUpdate() {
 //   console.log('Dashboard Update is called', this.state.dashboardIndex , this.props.dashboardIndex,  new Date(), new Date().getMilliseconds())
   // console.log('Is Dashboard State = Dashboard Props ?', JSON.stringify(this.props.dashboard) === JSON.stringify(this.state.dashboard))
    if(JSON.stringify(this.props.dashboard) !== JSON.stringify(this.state.dashboard) || (this.props.updates !== this.state.updates))
   // console.log('Dashboard is updated')
      this.setState({
        dashboard : this.props.dashboard,
        dashboardIndex : this.props.dashboardIndex,
        updates : this.props.updates
      })
  
  }

  defaultView (){
    this.props.defaultView()
  }


  addInfoGraphics(){
    let stateDashboard : any= {...this.state.dashboard}
    let infographicsRow = {...config.DefaultInfoGraphicsRow}
    let newRow :any = {
      "name" : "",
      "cols" : [
      ],
      "rowHeight" : "1",
      "numofCols" : 0,
      "key" : 3,
      "modifyHeight" : false,
      "infographics" : "all",
      "modifyInfoGraphics" : false,
      "dragabble" : false,
      "infoGraphicsRow": infographicsRow
  }
   stateDashboard.rows.splice(2, 0, newRow)
    
    // Change Key Value from 3 to dashboard.rows.length
    for (let i = 3; i < stateDashboard.rows.length; i++) {
      stateDashboard.rows[i].key = i + 1
    }
    let StoredDashBoards = JSON.parse(window.sessionStorage.getItem('DASHBOARDS'))
    StoredDashBoards[this.state.dashboardIndex] = stateDashboard
    window.sessionStorage.setItem('DASHBOARDS',JSON.stringify(StoredDashBoards))
    // this.props.onUpdate()
    const that = this
    this.setState({
      dashboard: {
        rows:  stateDashboard.rows
      }
    },()=>{
      that.props.onUpdate()
    })
  }

 
  addNewRow (){

    let dashboard : any= {...this.state.dashboard}
    let newRow :any = {
                  "name" : "",
                  "cols" : [
                  ],
                  "rowHeight" : "1",
                  "numofCols" : 0,
                  "key" : dashboard.rows.length +1,
                  "modifyHeight" : true,
                  "infographics" : "all",
                  "modifyInfoGraphics" : true,
                  "dragabble" : true
              }
    dashboard.rows.push(newRow)
    let StoredDashBoards = JSON.parse(window.sessionStorage.getItem('DASHBOARDS'))
    StoredDashBoards[this.state.dashboardIndex] = dashboard
    window.sessionStorage.setItem('DASHBOARDS',JSON.stringify(StoredDashBoards))
    // this.setState({
    //   dashboard : dashboard
    // })
    this.props.onUpdate()
  }

  getAnnotationComponent (annotation : string){
    return annotation
  }

  render() {
    const mode = parameters.MODE
   // console.log('Dashboard called', this.state.dashboardIndex , this.props.dashboardIndex,  new Date(), new Date().getMilliseconds())
    if(this.state.dashboardIndex !== this.props.dashboardIndex){
      return <></>
    }
    return (
     
      <>
      <A10Row>
         <A10Col span={24}>{mode === 'DEVELOPMENT' ? 
          
          // <A10Button type="primary" onClick ={() => this.addNewRow()}>Add Row</A10Button>
          // : null}</A10Col>
          (
            <div>
              <div>{
                this.state.dashboard.drillDownID && this.state.dashboard.drillDownName ?
                (
                <div className="col-md-12 margintop20 breadcrumbs">
                  <span  className="handCursor">
                    <span href="" onClick={()=> {this.defaultView()}}> {this.state.dashboard.drillDownName} </span>
                    </span> &gt; <span> Dashboard </span>
                  </div>
                )
                : null
              }</div>
              <A10Button className="action-button pull-right" onClick ={() => this.addNewRow()}>
                                  <A10Icon type="plus" className="action-icon" />
                                  Add Row {this.props.vizCount}
              </A10Button>
              { !(this.state.dashboard.rows && this.state.dashboard.rows[2] && this.state.dashboard.rows[2].infoGraphicsRow) ? 
                <A10Button className="action-button pull-right" onClick ={() => this.addInfoGraphics()}>
                <A10Icon type="plus" className="action-icon" />
                Add InfoGraphics
                </A10Button>
                : null
              }
              
            </div>
          
          
          ): null}</A10Col>
          </A10Row>
        {this.state.dashboard && this.state.dashboard.gridLayout === 'Dashbaord'  ? 
        (
          this.state.dashboard.rows.map((row : any,index : any) => {
            if(
              (row.infographics === 'all' || this.state.dashboard.selectedInfoGraphic === row.infographics) || !(this.state.dashboard.rows[2] && this.state.dashboard.rows[2].infoGraphicsRow)){
              // console.log('calling Row', index)
              return (<Row 
                        row={row}
                        appServices={this.props.appServices}
                        appService={this.props.appService}
                        onChangeOfAppService= {this.props.onChangeOfAppService}
                        dashboardIndex= {this.state.dashboardIndex}
                        rowIndex={index}
                        dashboard={this.state.dashboard}
                        onUpdate={this.props.onUpdate}
                        updateDrillDown= {this.props.updateDrillDown}
                        setSchedule={this.props.setSchedule}
                        key={index}
                        updates={this.state.updates}
                     />)
            }
          })
             
        ): null}
      </>
    )
  }
}
export default setupA10Container(Dashboard)
