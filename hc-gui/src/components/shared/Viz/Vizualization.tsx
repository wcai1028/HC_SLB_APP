import * as React from 'react'
import {
  A10Container,
  setupA10Container,
  IA10ContainerDefaultProps,
} from 'a10-gui-framework'
import {
  A10Spin,
  A10Alert,
  A10Form,
  A10Select
} from 'a10-gui-widgets'
//import { Viz } from 'a10-gui-dgp-viz'
const FormItem = A10Form.Item

import { IDefaultMethods } from 'src/containers/L4SLB'
import * as config from 'src/constants/AppRows/AppRows.json'
import * as endPoint from 'src/constants/AppDashboards/endpoints.json'

import parameters from 'parameters'
const styles = require('./styles/Vizualization.scss')
const ReactHighcharts = require('react-highcharts')
//import { window } from 'd3';

export interface IVizualizationProps extends IA10ContainerDefaultProps {
  defaultMethods: IDefaultMethods
  rowIndex : number
  colIndex : number
  dashboardIndex : number
  appService : any
  appServices : any
  onChangeOfAppService : any
  properties : any
  setSchedule : any
  vizIndex :number
  updates : any
  dashboard : any
  
} 
export interface IVizualizationState {
  data : any
  viz : any
  updates : any
  dashboard : any
  displayType : any
}

class Vizualization extends A10Container<IVizualizationProps, IVizualizationState> {
  pageLength = 5

  state = {
    data : 0,
    viz : this.props.properties,
    updates : this.props.updates,
    dashboard : this.props.dashboard,
    displayType : this.props.properties.displayProperties ? this.props.properties.displayProperties.chartType[0] : ''
  }


 

  

  componentWillMount() {
    if(JSON.stringify(this.props.dashboard) !== JSON.stringify(this.state.dashboard) ){
      this.setState({
        dashboard : this.props.dashboard,
        updates: this.props.updates,
        viz : this.props.properties
      })
    }

  }

  componentDidUpdate() {

    if(JSON.stringify(this.props.dashboard) !== JSON.stringify(this.state.dashboard)  || (this.props.updates !== this.state.updates)){
   //   console.log('Updated viz_', this.props.dashboardIndex,'_',this.props.rowIndex,'_',this.props.colIndex,'_',this.props.vizIndex)
      this.setState({
        dashboard : this.props.dashboard,
        updates: this.props.updates,
        viz : this.props.properties
      })
    }
  }

  getVizualizationData(vizIndex : any){
    let viz = {...this.state.viz}
   
    this.props.setSchedule(viz,this.props.dashboardIndex,this.props.rowIndex,this.props.colIndex,vizIndex)
    
  }

  renderServiceOptions(){
    const keys = this.props.appServices
    return keys.map((name: any) => {
      return (
        <A10Select.Option
          key={name}
        >
        {name}
        </A10Select.Option>
      )
    })
  }
  updateDisplayType (key : any){
    this.setState({
      displayType : key
    })
  }
  render() {
    console.log(this.state.viz)
  // const { MainChart } = Viz
    const mode = parameters.MODE
    //console.log('Viz called', this.props.dashboardIndex + '_' + this.props.rowIndex  + '_' +this.props.colIndex + '_' + this.props.vizIndex,new Date(), new Date().getMilliseconds())
    let vheight = '100%'
    let vwidth = '100%'
    if(this.state.viz.displayProperties){
      let widthHeight = this.state.viz.displayProperties.dimension
      widthHeight = widthHeight.split(',')
      if(widthHeight[0] === '0'){
        vwidth = '50%'
      }
      if(widthHeight[1] === '0'){
        vheight = '50%'
      }
    }
    const style = {
      // "headerStyle" : {
      //   border: '#9c9595 1px solid'
      // },
      "bodyStyle" : {
        borderRadius: '2px',
        color: 'gray',
        height: vheight,
        width: vwidth
      },
      // body : {
      //   background: '#b9b4b4',
      //   color: 'black'
      // }
    }
    const config = this.state.viz.dataSet ? 
                    { series : this.state.viz.displayProperties.seriesArr,
                      xAxis: {
                        type: this.state.viz.displayProperties.visualizationType === "nonHistograms" ?'' : 'datetime'
                      },
                      title : '',
                      chart: {
                        type: this.state.displayType
                      }
                    } : 
                    {}
  // const modalStyle = {
  //   height : '600px'
  // }

    return (<>
    
      {this.state.viz.vizAnnotaion === 'AppSelector' ? 
          <A10Select
           placeholder={'Select App-Service'}
           value={this.props.appService}
           onChange={this.props.onChangeOfAppService.bind(this)}
         >
          {this.renderServiceOptions()}
         </A10Select>
      : 
      this.state.viz.vizAnnotaion ==='TimeLine' 
      ? 
        <>{this.state.viz.vizAnnotaion} </>
      :
       this.state.viz.dataSet ? 
        this.state.viz.displayProperties.annotation === "mainchart" ? 
            <div className="mainChartContainer">
              <div className="mainChartHeader">
                <div className="mainChartName">
                  {/* Chart Header */}
                  {this.state.viz.displayProperties.name.toUpperCase()}
                </div>
                <div className="mainChartTypes">
                  {/* All Chart TYpes */}
                  {this.state.viz.displayProperties.chartType.length > 1 ? 
                    this.state.viz.displayProperties.chartType.map((key : any,index : any)=>{
                      return <span onClick={()=> this.updateDisplayType(key)} key={index}> {key.slice(0,2)} </span>
                    })
                    : 
                    null
                  }
                  
                </div>
                <div className="mainChartActions">
                  {/* Dedug and Info */}
                </div>
              </div>
              <div className="mainChartBody">
              
              <ReactHighcharts config={config}></ReactHighcharts>
              
              </div>
            </div>
        
        :
          <div >
            Top
          {JSON.stringify(this.state.viz.displayProperties.seriesArr)}
         </div>
        :
        <A10Spin>
          <A10Alert
            message="Fetching data"
            description={this.props.vizIndex}
            type="info"
          />
          { this.getVizualizationData(this.props.vizIndex)}
      </A10Spin>
        
      
      // <div className="graph-component" style={style.bodyStyle}>
        //   <div className="graph-header" style={style.headerStyle}> 
        //   {this.state.viz.displayProperties ? this.state.viz.displayProperties.name : null}
        //   </div>
        //   <div className="graph-body">
          
        
        //   </div>
        // </div>
        
      }
    </>)
  }
}
export default setupA10Container(Vizualization)
