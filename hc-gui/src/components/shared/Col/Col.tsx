import * as React from 'react'
import {
  _,
  A10Container,
  setupA10Container,
  IA10ContainerDefaultProps,
} from 'a10-gui-framework'
import {
  A10Row,
  A10Col,
  A10InputNumber,
  A10Button,
  A10Modal,
  A10Icon,
  A10Form,
  A10Input,
  A10Select,
  A10Collapse,
  A10Radio,
  A10Tag,
  A10Tooltip,
} from 'a10-gui-widgets'
const FormItem = A10Form.Item

import { IDefaultMethods } from 'src/containers/L4SLB'
import * as config from 'src/constants/AppRows/AppRows.json'
import * as endPoint from 'src/constants/AppDashboards/endpoints.json'
import { Vizualization } from 'src/components/shared/Viz'
import parameters from 'parameters'
import { A10IconTextGroup } from 'src/components/shared/A10IconTextGroup'
import * as configDashboard from 'src/constants/AppDashboards/AppDashboards.json'
const styles = require('./styles/col.scss')
//import { window } from 'd3';

class SeriesForumula {
  name: string
  formula: string
  units: string

  constructor(series: string, formula: string, units: string) {
    this.name = series
    this.formula = formula
    this.units = units
  }
}

export interface IColProps extends IA10ContainerDefaultProps {
  defaultMethods: IDefaultMethods
  rowIndex: number
  colIndex: number
  dashboardIndex: number
  selectedContext : any
  contextArray : any
  onChangeOfContext : any
  onUpdate: any
  dashboard: any
  setSchedule: any
  updates: any
  col: any
  updateDrillDown: any
  draggable: any
  updateTimeRange  : any
  chartHeight: any
}
export interface IColState {
  col: any
  colIndex: number
  visible: boolean
  activeKey: any
  vizForm: any
  endPointForm: any
  rowIndex: number
  dashboardIndex: number
  dashboard: any
  updates: any
  dataSourceSelected: any
  endPointSelected: any
  metricSelected: any,
  isEditViz: boolean
  editVizInfo: any,
  dataSourceIndex: any
  disableChartOptions: boolean
}

class Col extends A10Container<IColProps, IColState> {
  pageLength = 5
  state = {
    col: this.props.dashboard['rows'][this.props.rowIndex]['cols'][
      this.props.colIndex
    ],
    colIndex: this.props.colIndex,
    visible: false,
    disableChartOptions : false,
    activeKey: ['2'],
    vizForm: {
      displayProperties: {
        name: '',
        annotation: 'topindicators',
        drillDown: false,
        drillDownID: 'dummmyDrillDownID' + Math.ceil(100 * Math.random()),
        description: '',
        xAxis: '',
        yAxis: '',
        labels: true,
        seriesName: '',
        seriesArr: new Array(),
        seriesFormula: '',
        visualizationType: 'histograms',
        chartType: new Array(),
        dimension: '1,1',
        threshold: '',
        prefix: '',
        divider: '',
        inverse: false,
      },
      queries: new Array(),
    },
    endPointForm: {
      dataSource: '',
      endPoint: '',
      metrics: '',
      filters: new Array(),
      fields: new Array(),
      aggregation: '',
      groupBy: '',
    },
    dataSourceSelected: '',
    endPointSelected: '',
    metricSelected: '',
    rowIndex: this.props.rowIndex,
    dashboardIndex: this.props.dashboardIndex,
    dashboard: this.props.dashboard,
    updates: this.props.updates,
    isEditViz: false,
    editVizInfo: {
      colIndex: -1,
      vizIndex: -1
    },
    dataSourceIndex: -1
    

  }
  isGroupBySelected = false

  formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }

  buttonItemLayout = {
    wrapperCol: { span: 14, offset: 4 },
  }

  receiveUpdate = () => {
    // this.dataLoaded = false
    // this.setState({
    //  // devicesUpdated: true,
    // })
  }

  componentWillMount() {
    if (
      JSON.stringify(this.props.dashboard) !==
      JSON.stringify(this.state.dashboard)
    ) {
      this.setState({
        col: this.props.dashboard['rows'][this.props.rowIndex]['cols'][
          this.props.colIndex
        ],
        colIndex: this.props.colIndex,
        rowIndex: this.props.rowIndex,
        dashboardIndex: this.props.dashboardIndex,
        dashboard: this.props.dashboard,
        updates: this.props.updates,
      })
    }
  }

  componentDidUpdate() {
    // console.log('col uodate is called')
    if (
      JSON.stringify(this.props.dashboard) !==
        JSON.stringify(this.state.dashboard) ||
      this.props.updates !== this.state.updates
    ) {
      this.setState({
        col: this.props.dashboard['rows'][this.props.rowIndex]['cols'][
          this.props.colIndex
        ],
        colIndex: this.props.colIndex,
        rowIndex: this.props.rowIndex,
        dashboardIndex: this.props.dashboardIndex,
        dashboard: this.props.dashboard,
        updates: this.props.updates,
      })
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
      isEditViz: false,
      editVizInfo: {
        colIndex: -1,
        vizIndex: -1
      }
    })
  }
  handleOk = (e: any) => {
    // isEditViz will differentiate from New Viz or Exisiting viz 
    if(this.state.isEditViz) {
      this.updateVizDetails(this.state.vizForm)

    } else {
      this.addVisualization(this.state.vizForm)
      if (this.state.vizForm.displayProperties.drillDown) {
        this.addNewDashbaord(this.state.vizForm.displayProperties)
      }
    }
    
    this.isGroupBySelected = false
    this.setState({
      visible: false,
      isEditViz: false,
      editVizInfo: {
        colIndex: -1,
        vizIndex: -1
      }

    })
  }

  handleCancel = (e: any) => {
    this.setState({
      visible: false,
      disableChartOptions : false,
      endPointForm: {
        dataSource: '',
        endPoint: '',
        metrics: '',
        filters: new Array(),
        fields: new Array(),
        aggregation: '',
        groupBy: '',
      },
      vizForm: {
        displayProperties: {
          name: '',
          annotation: 'topindicators',
          drillDown: false,
          drillDownID: '',
          description: '',
          xAxis: '',
          yAxis: '',
          labels: true,
          seriesName: '',
          seriesArr: new Array(),
          seriesFormula: '',
          visualizationType: 'histograms',
          chartType: new Array(),
          dimension: '1,1',
          threshold: '',
          prefix: '',
          divider: '',
          inverse: false,
        },
        queries: new Array(),
      },
      activeKey: ['2'],
      isEditViz: false
    })
  }
 

  // showEndPointModal = () => {
  //   this.setState({
  //     endPointVisible: true
  //   })
  // }

  setActiveKey = (key: string) => {
    if (key === '2' && this.isGroupBySelected && this.state.dataSourceIndex === -1) {
      return
    }
    this.setState({
      activeKey: [key],
    })
  }

  checkGroup(queries: any){
    const queriesArr = queries.filter((obj: any)=> obj.groupBy !== "")
    if(queriesArr.length > 0){
      this.isGroupBySelected = true
    }else{
      this.isGroupBySelected = false
    }
  }

  handleEndPointOk = (e: any) => {
    const tempState = this.state
    if(tempState.dataSourceIndex > -1 ) {
      tempState.vizForm.queries[tempState.dataSourceIndex] = this.state.endPointForm
    } else {
      tempState.vizForm.queries.push(this.state.endPointForm)
    }
    this.checkGroup(tempState.vizForm.queries)
  
    tempState.endPointForm = {
      dataSource: '',
      endPoint: '',
      metrics: '',
      filters: new Array(),
      fields: new Array(),
      aggregation: '',
      groupBy: '',
    }
    this.setState({
      vizForm: tempState.vizForm,
      endPointForm: tempState.endPointForm,
      activeKey: ['1'],
      dataSourceIndex: -1,
      dataSourceSelected: '',
      endPointSelected: '',
      metricSelected: ''
    })
  }
  handleEndPointCancel = (e: any) => {
    this.checkGroup(this.state.vizForm.queries)
    this.setState({
      endPointForm: {
        dataSource: '',
        endPoint: '',
        metrics: '',
        filters: new Array(),
        fields: new Array(),
        aggregation: '',
        groupBy: '',
      },
      dataSourceIndex: -1,
      dataSourceSelected: '',
      endPointSelected: '',
      metricSelected: ''
    })
  }

  deleteDataSource =  (e: any, sourceIndex: any) => {
    e.preventDefault()
    const vizFormTemp = this.state.vizForm
    vizFormTemp.queries = this.state.vizForm.queries.filter((obj,index)=> index !== sourceIndex)
    this.setState({
      vizForm: vizFormTemp,
    })
  }

  editDataSource =  (e: any, sourceIndex: any) => {
    e.preventDefault()
    let vizFormTemp = this.state.vizForm.queries
    vizFormTemp = this.state.vizForm.queries.filter((obj,index)=> index === sourceIndex)
    const dataSourceSelectedTemp = endPoint.endPoints[vizFormTemp[0].dataSource]
    const endPointSelectedTemp = dataSourceSelectedTemp[vizFormTemp[0].endPoint]
    const metricSelectedTemp = endPointSelectedTemp[vizFormTemp[0].metrics]
    this.isGroupBySelected = false
    this.setState({
      endPointForm: vizFormTemp[0],
      activeKey: ['2'],
      dataSourceIndex: sourceIndex,
      dataSourceSelected: dataSourceSelectedTemp,
      endPointSelected: endPointSelectedTemp,
      metricSelected: metricSelectedTemp
      
    })
  }
  getAnnotationComponent(annotation: string) {
    return annotation
  }

  addVisualization(visualization: any) {
    let StoredDashBoards = JSON.parse(
      window.sessionStorage.getItem('DASHBOARDS'),
    )
    StoredDashBoards[this.state.dashboardIndex]['rows'][this.state.rowIndex][
      'cols'
    ][this.state.colIndex].vizs.push(visualization)
    window.sessionStorage.setItem(
      'DASHBOARDS',
      JSON.stringify(StoredDashBoards),
    )

    // this.setState({
    //   col :  StoredDashBoards[this.props.dashboardIndex]['rows'][this.state.rowIndex]['cols'][this.state.colIndex]
    // })
    this.props.onUpdate()
  }

  updateColumnWidth = (value: any) => {
    let StoredDashBoards = JSON.parse(
      window.sessionStorage.getItem('DASHBOARDS'),
    )

    StoredDashBoards[this.state.dashboardIndex]['rows'][this.state.rowIndex][
      'cols'
    ][this.state.colIndex].width = value
    window.sessionStorage.setItem(
      'DASHBOARDS',
      JSON.stringify(StoredDashBoards),
    )

    // this.setState({
    //   col :  StoredDashBoards[this.props.dashboardIndex]['rows'][this.state.rowIndex]['cols'][this.state.colIndex]
    // })
    this.props.onUpdate()
  }

  handleSFChange = (name: any, index: any, e: any) => {
    let tempState = this.state
    tempState.vizForm.displayProperties.seriesArr[index][name] = e.target.value
    this.setState({
      vizForm: tempState.vizForm,
    })
  }

  addNewForumulaSeries() {
    let tempState = this.state
    tempState.vizForm.displayProperties.seriesArr.push(
      new SeriesForumula('', '', ''),
    )
    this.setState({
      vizForm: tempState.vizForm,
    })
  }

  handleChange = (stateName: any, e: any) => {
    const formObj = this.state.vizForm.displayProperties
    let disableChartOptionsTemp = false
    if (stateName !== 'chartType') {
      formObj[stateName] = e.target.value
    } else {
      formObj[stateName] = e
      if(e.indexOf('multi') > -1 || e.indexOf('donut') > -1){
        disableChartOptionsTemp = true
        if(e.indexOf('multi') > -1){
          formObj[stateName] = ['multi']
        }else{
          formObj[stateName] = ['donut']
        }
      }
    }
    if(stateName === 'visualizationType'){
      formObj.chartType = new Array()
    }
    if (stateName === 'annotation' && formObj[stateName] === 'mainchart') {
      formObj.drillDown = false
      formObj.threshold = ''
      formObj.prefix = ''
      formObj.divider = ''
      formObj.inverse = false
    }
    // @ts-ignore
    this.setState({
      [stateName]: formObj[stateName],
      disableChartOptions: disableChartOptionsTemp
    })
  }

  handleEndPointChange = (stateName: any, e: any) => {
    const tempState = this.state
    if (stateName === 'dataSource') {
      tempState.dataSourceSelected = endPoint.endPoints[e]
      tempState.endPointForm.dataSource = e
      tempState.endPointForm.endPoint = ''
      tempState.endPointForm.metrics = ''
      tempState.endPointForm.filters = new Array()
      tempState.endPointForm.fields = new Array()
      tempState.endPointForm.groupBy = ''
      // @ts-ignore
      this.setState({
        dataSourceSelected: tempState.dataSourceSelected,
        endPointForm: tempState.endPointForm,
      })
      return
    }
    if (stateName === 'endPoint') {
      tempState.endPointSelected = tempState.dataSourceSelected[e]
      tempState.endPointForm[stateName] = e
      tempState.endPointForm.metrics = ''
      tempState.endPointForm.filters = new Array()
      tempState.endPointForm.fields = new Array()
      tempState.endPointForm.groupBy = ''
      this.setState({
        endPointSelected: tempState.endPointSelected,
        endPointForm: tempState.endPointForm,
      })
      return
    }
    if (stateName === 'metrics') {
      tempState.metricSelected = tempState.endPointSelected[e]
      tempState.endPointForm[stateName] = e
      tempState.endPointForm.filters = new Array()
      tempState.endPointForm.fields = new Array()
      tempState.endPointForm.groupBy = ''
      this.setState({
        metricSelected: tempState.metricSelected,
        endPointForm: tempState.endPointForm,
      })
      return
    }
    tempState.endPointForm[stateName] = e
    this.setState({
      endPointForm: tempState.endPointForm,
    })
  }

  renderSourceOptions = () => {
    const keys = Object.keys(endPoint.endPoints)
    return keys.map((name: any, i: number) => {
      return (
        <A10Select.Option key={'dataSource' + i} value={name}>
          {name}
        </A10Select.Option>
      )
    })
  }

  renderChartTypes = () => {
    const keys =
      endPoint.vizTypes[this.state.vizForm.displayProperties.visualizationType]
    return keys.map((name: any) => {
      return <A10Select.Option key={name}>{name}</A10Select.Option>
    })
  }

  renderAggregationOptions = () => {
    const keys = endPoint.aggregations
    return keys.map((name: any) => {
      return <A10Select.Option key={name}>{name}</A10Select.Option>
    })
  }

  renderMetricsBasedOptions = (labelName: string, keyName?: string) => {
    let keys = []
    if (keyName && this.state.metricSelected) {
      keys = this.state.metricSelected[keyName]
    }
    return keys.map((name: any) => {
      return <A10Select.Option key={name}>{name}</A10Select.Option>
    })
  }

  renderSelectOptions = (stateName: string, labelName: string) => {
   
    const keys = Object.keys(this.state[stateName])
    return keys.map((name: any, i: number) => {
      return (
        <A10Select.Option key={labelName + i} value={name}>
          {name}
        </A10Select.Option>
      )
    })
  }

  viewDrillDashboard(viz: any) {
    this.props.updateDrillDown(viz.displayProperties.drillDownID)
  }

  addNewDashbaord(displayProperties: any) {
    const dashboards = JSON.parse(window.sessionStorage.getItem('DASHBOARDS'))
    const newDashboard = { ...configDashboard.DefaultLayout }
    newDashboard.key = dashboards.length + 1
    newDashboard.drillDownID = displayProperties.drillDownID
    newDashboard.drillDownName = displayProperties.name
    dashboards.push(newDashboard)
    window.sessionStorage.setItem('DASHBOARDS', JSON.stringify(dashboards))
    this.props.onUpdate()
  }

  renderDataSource() {
    return (
      <A10Form layout="horizontal">
        <FormItem label="End Point" {...this.formItemLayout}>
          <A10Select
            placeholder={'Select DataSource'}
            value={this.state.endPointForm.dataSource}
            onChange={this.handleEndPointChange.bind(this, 'dataSource')}
          >
            {this.renderSourceOptions()}
          </A10Select>
        </FormItem>
        <FormItem label="Data Source Point" {...this.formItemLayout}>
          <A10Select
            placeholder={'Select End Point'}
            value={this.state.endPointForm.endPoint}
            onChange={this.handleEndPointChange.bind(this, 'endPoint')}
          >
            {this.renderSelectOptions('dataSourceSelected', 'endPoint')}
          </A10Select>
        </FormItem>

        <FormItem label="Metrics" {...this.formItemLayout}>
          <A10Select
            placeholder={'Select Metric'}
            value={this.state.endPointForm.metrics}
            onChange={this.handleEndPointChange.bind(this, 'metrics')}
          >
            {this.renderSelectOptions('endPointSelected', 'metrics')}
          </A10Select>
        </FormItem>

        <FormItem label="Fields" {...this.formItemLayout}>
          <A10Select
            placeholder={'Select Fields'}
            mode="multiple"
            value={this.state.endPointForm.fields}
            onChange={this.handleEndPointChange.bind(this, 'fields')}
          >
            {this.renderMetricsBasedOptions('field', 'fields')}
          </A10Select>
        </FormItem>
        <FormItem label="Filters" {...this.formItemLayout}>
          <A10Select
            placeholder={'Select Filters'}
            mode="multiple"
            value={this.state.endPointForm.filters}
            onChange={this.handleEndPointChange.bind(this, 'filters')}
          >
            {this.renderMetricsBasedOptions('filter', 'filters')}
          </A10Select>
        </FormItem>

        <FormItem label="Group By" {...this.formItemLayout}>
          <A10Select
            placeholder={'Select Group By'}
            value={this.state.endPointForm.groupBy}
            onChange={this.handleEndPointChange.bind(this, 'groupBy')}
          >
            {this.renderMetricsBasedOptions('groupBy', 'groupBy')}
          </A10Select>
        </FormItem>

        <FormItem label="Aggregation" {...this.formItemLayout}>
          <A10Select
            placeholder={'Select Aggregation'}
            value={this.state.endPointForm.aggregation}
            onChange={this.handleEndPointChange.bind(this, 'aggregation')}
          >
            {this.renderAggregationOptions()}
          </A10Select>
        </FormItem>
        <FormItem {...this.buttonItemLayout}>
          <A10Button type="primary" onClick={this.handleEndPointOk}>
            Submit
          </A10Button>
          <A10Button type="default" onClick={this.handleEndPointCancel}>
            Cancel
          </A10Button>
        </FormItem>
      </A10Form>
    )
  }
  
  deleteViz = (colIndex: number, vizIndex: number) => {
    /* tslint:disable:no-string-literal */
    const StoredDashBoards = JSON.parse(window.sessionStorage.getItem('DASHBOARDS'))
    StoredDashBoards[this.state.dashboardIndex]['rows'][this.state.rowIndex]['cols'][colIndex].vizs.splice(vizIndex, 1)
    window.sessionStorage.setItem('DASHBOARDS', JSON.stringify(StoredDashBoards))
    this.props.onUpdate()
  }

  editViz = (colIndex: number, vizIndex: number) => {
    /* tslint:disable:no-string-literal */
    const StoredDashBoards = JSON.parse(window.sessionStorage.getItem('DASHBOARDS'))
    const currentVizForm = StoredDashBoards[this.props.dashboardIndex]['rows'][this.state.rowIndex]['cols'][colIndex]['vizs'][vizIndex]
    const tempEditVizInfo = {
      colIndex: colIndex,
      vizIndex: vizIndex
    }
    if(currentVizForm.displayProperties){
      this.setState({
        vizForm: currentVizForm,
        visible: true,
        isEditViz: true,
        activeKey: '1',
        editVizInfo: tempEditVizInfo
      })
    }
  }

  updateVizDetails = (visualization: any) => {
    const colIndex = this.state.editVizInfo.colIndex
    const vizIndex = this.state.editVizInfo.vizIndex
    const StoredDashBoards = JSON.parse(window.sessionStorage.getItem('DASHBOARDS'))
    StoredDashBoards[this.state.dashboardIndex]['rows'][this.state.rowIndex]['cols'][colIndex].vizs[vizIndex] = visualization
    window.sessionStorage.setItem('DASHBOARDS', JSON.stringify(StoredDashBoards))
    this.props.onUpdate()
  }

  updateViz = (isEdit: boolean, colIndex: number, vizIndex: number) => {
    /* tslint:disable:no-string-literal */
    if(isEdit){
      this.editViz(colIndex,vizIndex)
    }else {
      this.deleteViz(colIndex,vizIndex)
    }
  }

  render() {
    //  console.log('Column called', this.state.dashboardIndex + '_' + this.state.rowIndex  + '_' +this.state.colIndex,new Date(), new Date().getMilliseconds())
    const mode = parameters.MODE
    const cwidth = (100 * this.state.col.width) / 12 + '%'
    const styles = {
      colStyle: {
        width: `calc(${cwidth} - 13px)`,
        border: mode === 'DEVELOPMENT' ? '0.2px solid #e6eae3' : '0px',
        marginTop: '6px',
        marginLeft: '6px',
        marginRight: '6px',
        flex: 'none',
        WebkitFlex: 'none',
        height: this.props.chartHeight
      },
      chartHeight: {
        height: this.props.chartHeight
      }
    }

    const modalStyle = {
      width: '1080px',
    }

    return (
      <div className="column" data-key={this.props.col.key} style={styles.colStyle} draggable={this.props.draggable}>
        <div className="column-content" style={styles.chartHeight}>
          {mode === 'DEVELOPMENT' ? (
            <A10Row>
              <A10Col span={24}>
                <div className="pull-right">
                  {/* <A10Button type="primary" onClick={this.showModal}>Basic Modal</A10Button> */}
                  <A10Button
                    className="action-button pull-right"
                    onClick={this.showModal}
                  >
                    <A10Icon type="plus" className="action-icon" />
                  </A10Button>
                  <A10InputNumber
                    size="middle"
                    min={0.1}
                    max={12}
                    step={0.1}
                    defaultValue={this.state.col.width}
                    onChange={this.updateColumnWidth}
                  />
                </div>
              </A10Col>
            </A10Row>
          ) : null}
          <A10Modal
            title="Add Visualization"
            width="1080px"
            visible={this.state.visible}
            onOk={this.handleOk}
            destroyOnClose={true}
            onCancel={this.handleCancel}
            afterClose={this.handleCancel}
          >
            <A10Row>
              <A10Collapse
                bordered={true}
                className="marginTop20 marginBottom15"
                activeKey={this.state.activeKey}
              >
                <A10Collapse.Panel
                  header={
                    <div
                      className="col-md-12 productHeader inline"
                      onClick={() => {
                        this.setActiveKey('1')
                      }}
                    >
                      DataSources
                    </div>
                  }
                  key="1"
                  className="white"
                >
                  {this.state.vizForm.queries.map((viz: any, index: number) => {
                    return (
                      // <A10Tag key={index} closable onClose={()=> {this.deleteDataSource(event,index)}}>
                      //   {viz.dataSource}-{viz.endPoint}-{viz.metrics}
                      // </A10Tag>
                      <div className="ant-tag" key={index}  >
                        <span>
                        {viz.dataSource}-{viz.endPoint}-{viz.metrics}
                        <A10Icon onClick={()=> {this.editDataSource(event,index)}} 
                          style={{ width: '10px', height: '10px', lineHeight: '0', padding: '5px'  }}  app="global" type="edit" />
                        <A10Icon onClick={()=> {this.deleteDataSource(event,index)}} 
                          style={{ width: '10px', height: '10px', lineHeight: '0', padding: '5px' }}  app="global" type="close" />
                        
                        </span>
                      </div>
                    )
                  })}
                </A10Collapse.Panel>
                <A10Collapse.Panel
                  header={
                  <div className="col-md-12 productHeader inline"  onClick={()=>{this.setActiveKey('2')}}>
                    <A10Tooltip title={this.isGroupBySelected ? 'Disabled as group by selected' : 'Add Data Source'}>
                      Add DataSource
                    </A10Tooltip>
                  </div>
                  }
                  key="2"
                  disabled={this.isGroupBySelected}
                  className="white" >
                  {this.renderDataSource()}
                </A10Collapse.Panel>
              </A10Collapse>
            </A10Row>

            <A10Form layout="horizontal">
              <FormItem label="Name" {...this.formItemLayout}>
                <A10Input
                  type="text"
                  defaultValue={this.state.vizForm.displayProperties.name}
                  onChange={this.handleChange.bind(this, 'name')}
                />
              </FormItem>
              <FormItem
                label="Description"
                {...this.formItemLayout}
              >
                <A10Input
                  type="text"
                  defaultValue={this.state.vizForm.displayProperties.description}
                  onChange={this.handleChange.bind(this, 'description')}
                />
              </FormItem>
              <FormItem
                label="Annotation"
                {...this.formItemLayout}
              >
                <A10Radio.Group
                  defaultValue={this.state.vizForm.displayProperties.annotation}
                  onChange={this.handleChange.bind(this, 'annotation')}
                  value={this.state.vizForm.displayProperties.annotation}
                >
                  <A10Radio value={'topindicators'}>Top Indicators</A10Radio>
                  <A10Radio value={'mainchart'}>Main Chart</A10Radio>
                </A10Radio.Group>
              </FormItem>
              <FormItem
                label="DrillDown"
                {...this.formItemLayout}
              >
                <A10Radio.Group
                  disabled={
                    this.state.vizForm.displayProperties.annotation !==
                    'topindicators'
                  }
                  defaultValue={this.state.vizForm.displayProperties.drillDown}
                  onChange={this.handleChange.bind(this, 'drillDown')}
                  value={this.state.vizForm.displayProperties.drillDown}
                >
                  <A10Radio value={true}>Yes</A10Radio>
                  <A10Radio value={false}>NO</A10Radio>
                </A10Radio.Group>
              </FormItem>
              <FormItem
                label="Threshold Range"
                {...this.formItemLayout}
              >
                <A10Input
                  type="text"
                  defaultValue={this.state.vizForm.displayProperties.threshold}
                  onChange={this.handleChange.bind(this, 'threshold')}
                  disabled={
                    this.state.vizForm.displayProperties.annotation !==
                    'topindicators'
                  }
                />
              </FormItem>
              <FormItem
                label="Inversed Threshold"
                {...this.formItemLayout}
              >
                <A10Radio.Group
                  defaultValue={this.state.vizForm.displayProperties.inverse}
                  disabled={
                    this.state.vizForm.displayProperties.annotation !==
                    'topindicators'
                  }
                  onChange={this.handleChange.bind(this, 'inverse')}
                  value={this.state.vizForm.displayProperties.inverse}
                >
                  <A10Radio value={true}>Yes</A10Radio>
                  <A10Radio value={false}>NO</A10Radio>
                </A10Radio.Group>
              </FormItem>
              <FormItem
                label="Prefix"
                {...this.formItemLayout}
              >
                <A10Input
                  type="text"
                  defaultValue={this.state.vizForm.displayProperties.prefix}
                  onChange={this.handleChange.bind(this, 'prefix')}
                  disabled={
                    this.state.vizForm.displayProperties.annotation !==
                    'topindicators'
                  }
                />
              </FormItem>
              <FormItem
                label="Divider"
                {...this.formItemLayout}
              >
                <A10Input
                  type="text"
                  defaultValue={this.state.vizForm.displayProperties.divider}
                  onChange={this.handleChange.bind(this, 'divider')}
                  disabled={
                    this.state.vizForm.displayProperties.annotation !==
                    'topindicators'
                  }
                />
              </FormItem>
              <FormItem
                label="Filter Labels"
                {...this.formItemLayout}
              >
                <A10Radio.Group
                  defaultValue={this.state.vizForm.displayProperties.labels}
                  onChange={this.handleChange.bind(this, 'labels')}
                  value={this.state.vizForm.displayProperties.labels}
                >
                  <A10Radio value={true}>True</A10Radio>
                  <A10Radio value={false}>False</A10Radio>
                </A10Radio.Group>
              </FormItem>
              <FormItem label="Time Series" {...this.formItemLayout}>
                <A10Radio.Group
                  onChange={this.handleChange.bind(this, 'visualizationType')}
                  value={this.state.vizForm.displayProperties.visualizationType}
                >
                  <A10Radio value={'histograms'}>Yes</A10Radio>
                  <A10Radio value={'nonHistograms'}>No</A10Radio>
                </A10Radio.Group>
              </FormItem>
              <FormItem
                label="Series"
                {...this.formItemLayout}
              >
                <div className="ant-table-body">
                  <table className="c-table">
                    <thead className="ant-table-thead">
                      <tr className="ant-table-thead">
                        <th>Name</th>
                        <th>Formula</th>
                        <th>Units</th>
                      </tr>
                    </thead>
                    <tbody className="ant-table-tbody">
                    {this.state.vizForm.displayProperties.seriesArr.map(
                       (object, i) => (
                      <tr className="ant-table-row" key={'row' + i}>
                        <td key={'series' + i}>
                          <A10Input
                            type="text"
                            placeholder="Name"
                            key={'series' + i}
                            className="sf-input"
                            defaultValue={this.state.vizForm.displayProperties.seriesArr[i].name}
                            onChange={this.handleSFChange.bind(this, 'name', i)}
                          />
                        </td>
                        <td  key={'formula' + i}>
                          <A10Input
                            type="text"
                            placeholder="Formula"
                            key={'formula' + i}
                            className="sf-input"
                            defaultValue={this.state.vizForm.displayProperties.seriesArr[i].formula}
                            onChange={this.handleSFChange.bind(
                              this,
                              'formula',
                              i,
                            )}
                          />
                        </td>
                        <td  key={'units' + i}>
                          <A10Input
                            type="text"
                            placeholder="Units"
                            key={'units' + i}
                            className="sf-input"
                            defaultValue={this.state.vizForm.displayProperties.seriesArr[i].units}
                            onChange={this.handleSFChange.bind(this, 'units', i)}
                          />
                        </td>
                      </tr>
                        
                      ),
                      )}
                    </tbody>
                  </table>
                  <div className="add-series"  onClick={() => {
                      this.addNewForumulaSeries()
                    }}>
                  <A10Icon app="global" type="add-another" />
                </div>
                </div>
              </FormItem>
              {/* <FormItem label="Dimension" {...this.formItemLayout}>
                <A10Radio.Group
                  onChange={this.handleChange.bind(this, 'dimension')}
                  value={this.state.vizForm.displayProperties.dimension}
                >
                  <A10Radio value={'1,1'}>Full Width, Full Height</A10Radio>
                  <A10Radio value={'1,0'}>Full Width, Half Height</A10Radio>
                  <A10Radio value={'0,0'}>Half Width, Half Height</A10Radio>
                  <A10Radio value={'0,1'}>Half Width, Full Height</A10Radio>
                </A10Radio.Group>
              </FormItem> */}

              <FormItem label="Chart Type" {...this.formItemLayout}>
                <A10Select
                  placeholder={'Select Chart Type'}
                  mode={this.state.disableChartOptions? '' : 'multiple'}
                  allowClear={true}
                  value={this.state.vizForm.displayProperties.chartType}
                  onChange={this.handleChange.bind(this, 'chartType')}
                >
                  {this.renderChartTypes()}
                </A10Select>
              </FormItem>
              <FormItem
                label="X Axis Label"
                {...this.formItemLayout}
              >
                <A10Input
                  type="text"
                  defaultValue={this.state.vizForm.displayProperties.xAxis}
                  onChange={this.handleChange.bind(this, 'xAxis')}
                />
              </FormItem>
              <FormItem
                label="Y Axis Label"
                {...this.formItemLayout}
              >
                <A10Input
                  type="text"
                  defaultValue={this.state.vizForm.displayProperties.yAxis}
                  onChange={this.handleChange.bind(this, 'yAxis')}
                />
              </FormItem>
            </A10Form>
          </A10Modal>
          {this.state.col.vizs.map((viz: any, index: number) => {
            const clonedViz = _.cloneDeep(viz)
            return (
              <React.Fragment key={index}>
                {clonedViz.displayProperties &&
                clonedViz.displayProperties.annotation === 'topindicators' ? (
                  // <>
                  //   {clonedViz.displayProperties.drillDown ? (
                  //     <div
                  //       onClick={() => {
                  //         this.viewDrillDashboard(viz)
                  //       }}
                  //       className="fa fa-external-link"
                  //     />
                  //   ) : null}

                    <Vizualization
                      col={this.state.col}
                      contextArray={this.props.contextArray}
                      selectedContext={this.props.selectedContext}
                      onChangeOfContext= {this.props.onChangeOfContext}
                      dashboardIndex={this.props.dashboardIndex}
                      rowIndex={this.state.rowIndex}
                      colIndex={this.state.colIndex}
                      properties={viz}
                      setSchedule={this.props.setSchedule}
                      vizIndex={index}
                      key={index}
                      updates={this.state.updates}
                      dashboard={this.state.dashboard}
                      editDeleteViz = {this.updateViz}
                      drillDownFunction={this.viewDrillDashboard}
                    />
                  // </>
                ) : (
                  <Vizualization
                    col={this.state.col}
                    contextArray={this.props.contextArray}
                    selectedContext={this.props.selectedContext}
                    onChangeOfContext= {this.props.onChangeOfContext}
                    dashboardIndex={this.props.dashboardIndex}
                    rowIndex={this.state.rowIndex}
                    colIndex={this.state.colIndex}
                    properties={viz}
                    setSchedule={this.props.setSchedule}
                    vizIndex={index}
                    key={index}
                    updates={this.state.updates}
                    dashboard={this.state.dashboard}
                    updateTimeRange  = {this.props.updateTimeRange}
                    editDeleteViz = {this.updateViz}
                    chartHeight = {this.props.chartHeight}
                  />
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    )
  }
}
export default setupA10Container(Col)
