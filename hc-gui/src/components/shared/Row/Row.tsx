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
  A10Icon,
  A10InputNumber,
  A10Select
} from 'a10-gui-widgets'

import { IDefaultMethods } from 'src/containers/L4SLB'
import * as config from 'src/constants/AppRows/AppRows.json'
import {Col} from 'src/components/shared/Col'
import parameters from 'parameters'
import { InfoGraphics } from 'src/components/shared/InfoGraphics'
//import { window } from 'd3';

export interface IRowProps extends IA10ContainerDefaultProps {
  defaultMethods: IDefaultMethods
  rowIndex : number
  dashboardIndex : number
  appService : any
  appServices : any
  onChangeOfAppService : any
  onUpdate : any
  dashboard : any
  setSchedule : any
  updates : any
  row : any
  updateDrillDown: any
}
export interface IRowState {
  row: any,
  rowIndex : number,
  dashboardIndex : number
  dashboard : any
  updates : any
}

class Row extends A10Container<IRowProps, IRowState> {
  
  pageLength = 5

  state = {
    row :  this.props.dashboard['rows'][this.props.rowIndex],
    rowIndex : this.props.rowIndex,
    dashboardIndex : this.props.dashboardIndex,
    dashboard : this.props.dashboard,
    updates : this.props.updates
  }
  constructor(props: any) {
    super(props)
  }

  receiveUpdate = () => {
    // this.dataLoaded = false
    // this.setState({
    //  // devicesUpdated: true,
    // })
  }

  componentWillMount() {
    // console.log('Row mount is called')
    // console.log(this.props.row)
    if(JSON.stringify(this.props.dashboard) !== JSON.stringify(this.state.dashboard) ){
      this.setState({
        row :  this.props.dashboard['rows'][this.props.rowIndex],
        rowIndex : this.props.rowIndex,
        dashboardIndex : this.props.dashboardIndex,
        dashboard:this.props.dashboard,
        updates : this.props.updates
      })
    }

  }

  componentDidUpdate() {
    // console.log('Row update is called')
    // console.log(this.props.row)
    if(JSON.stringify(this.props.dashboard) !== JSON.stringify(this.state.dashboard)  || (this.props.updates !== this.state.updates)){
      this.setState({
        row :  this.props.dashboard['rows'][this.props.rowIndex],
        rowIndex : this.props.rowIndex,
        dashboardIndex : this.props.dashboardIndex,
        dashboard:this.props.dashboard,
        updates : this.props.updates
      })
    }
  }

  // loadRow (index : any){
  //   this.setState({
  //     focusedRow : index
  //   })
  // }

  // hide = () => {
  //   this.setState({
  //     visible: false,
  //   });
  // }
  // handleVisibleChange (visible : boolean) {
  //   this.setState({ visible  : visible});
  // }

  addNewCol (){

    let StoredDashBoards = JSON.parse(window.sessionStorage.getItem('DASHBOARDS'))

    let newCol :any =  {
                          "vizs" : [
                          ],
                          "width" : 2
                      }
    StoredDashBoards[this.props.dashboardIndex]['rows'][this.state.rowIndex]['cols'].push(newCol)
    window.sessionStorage.setItem('DASHBOARDS',JSON.stringify(StoredDashBoards))
    // this.setState({
    //   row : StoredDashBoards[this.props.dashboardIndex]['rows'][this.state.rowIndex]
    // })
    this.props.onUpdate()

  }
  updateRowHeight = ( value: any) => {
    let StoredDashBoards = JSON.parse(window.sessionStorage.getItem('DASHBOARDS'))
    StoredDashBoards[this.props.dashboardIndex]['rows'][this.state.rowIndex].rowHeight = value
    window.sessionStorage.setItem('DASHBOARDS',JSON.stringify(StoredDashBoards))
   
    // this.setState({
    //   row : StoredDashBoards[this.props.dashboardIndex]['rows'][this.state.rowIndex]
    // })
    this.props.onUpdate()
  }
  getAnnotationComponent (annotation : string){
    return annotation
  }

  handleInfoGraphicChange = (stateName: any, e: any) => {
    let StoredDashBoards = JSON.parse(window.sessionStorage.getItem('DASHBOARDS'))
    StoredDashBoards[this.props.dashboardIndex]['rows'][this.state.rowIndex].infographics = e
    window.sessionStorage.setItem('DASHBOARDS',JSON.stringify(StoredDashBoards))
    this.props.onUpdate()
  }

  onInfoGraphicUpdate = (name: string) => {
  //  console.log('onInfoGraphicUpdate', name)
    let StoredDashBoards = JSON.parse(window.sessionStorage.getItem('DASHBOARDS'))
    StoredDashBoards[this.props.dashboardIndex].selectedInfoGraphic = name
    window.sessionStorage.setItem('DASHBOARDS',JSON.stringify(StoredDashBoards))
    this.props.onUpdate()
  }

  onIGUpdate = (igVar: any) => {
    let StoredDashBoards = JSON.parse(window.sessionStorage.getItem('DASHBOARDS'))
    for(let i=0; i < igVar.option.length; i++) {
      StoredDashBoards[this.props.dashboardIndex].rows[2].infoGraphicsRow.infographics[igVar.igIndex][igVar.option[i]] = igVar.value[i]
    }
    
    window.sessionStorage.setItem('DASHBOARDS',JSON.stringify(StoredDashBoards))
    this.props.onUpdate()
  }

  render() {
  //  console.log('Row called', this.state.dashboardIndex + '_' + this.state.rowIndex,new Date(), new Date().getMilliseconds())
    const mode = parameters.MODE
    let height = 300*this.state.row.rowHeight
    const styles = {
      rowHeight: {
        minHeight: height,
        maxHeight : height,
        border: mode ==='DEVELOPMENT'  ? '0.2px solid #e6eae3' : '0px',
        marginTop: '6px',
        marginLeft: '6px',
        marginRight: '6px',
        overflow : 'auto',
        display: 'flex'
      }
    }

    return (
     
      <>
      <A10Row>
      {mode === 'DEVELOPMENT' ? 
      <A10Col span={24}>
        <A10Button className="action-button pull-right" onClick ={() => this.addNewCol()}>
          <A10Icon type="plus" className="action-icon" />
          Add Column
        </A10Button>
        <div className="pull-right">
          <A10InputNumber
            size="middle"
            min={0.1}
            max={10}
            step={0.1}
            disabled = {!this.state.row.modifyHeight}
            defaultValue={this.state.row.rowHeight}
            onChange= {this.updateRowHeight}
          />
          <A10Select
            placeholder={'Select InfoGraphic'}
            value={this.state.row.infographics}
            disabled = {!this.state.row.modifyInfoGraphics}
            onChange={this.handleInfoGraphicChange.bind(this, 'infographics')}
          >
            <A10Select.Option key={'all'} value={'all'}>All</A10Select.Option>
            {this.state.dashboard.rows[2] && this.state.dashboard.rows[2].infoGraphicsRow?
              this.state.dashboard.rows[2].infoGraphicsRow.infographics.map((igObj: any, index: any) => {
                return (
                  <A10Select.Option key={igObj.name} value={igObj.name}>{igObj.displayName}</A10Select.Option>
                )
              })
            : null}
          </A10Select>
        </div>
      </A10Col>
      : null
      }
      </A10Row>
      {typeof this.state.row.infoGraphicsRow === 'undefined'?
        (<div style={styles.rowHeight}>
        
          {this.state.row.cols.map((col : any,index : any)=>{
          return   (<Col 
              col={col}
              appServices={this.props.appServices}
              appService={this.props.appService}
              onChangeOfAppService= {this.props.onChangeOfAppService}
              dashboardIndex= {this.props.dashboardIndex}
              rowIndex={this.state.rowIndex}
              colIndex={index}
              dashboard={this.state.dashboard}
              onUpdate={this.props.onUpdate}
              updateDrillDown= {this.props.updateDrillDown}
              setSchedule={this.props.setSchedule}
              key={index}
              updates={this.state.updates}
            />)
          })}
        </div>)
         : 
         <InfoGraphics selectedInfoGraphicKey={this.state.dashboard.selectedInfoGraphic} 
                       onInfoGraphicUpdate={this.onInfoGraphicUpdate} 
                       rowDetails={this.state.row.infoGraphicsRow}
                       onIGUpdate={this.onIGUpdate}/>
      }
      </>
    )
  }
}
export default setupA10Container(Row)
