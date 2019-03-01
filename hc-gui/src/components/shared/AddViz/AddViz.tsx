import * as React from 'react'
import {
    A10Container,
    setupA10Container,
  } from 'a10-gui-framework'
  import * as endPoint from 'src/constants/AppDashboards/endpoints.json'
  import parameters from 'parameters'
  import {
    A10Row,
    A10Button,
    A10Icon,
    A10Form,
    A10Input,
    A10Select,
    A10Collapse,
    A10Radio,
    A10Tooltip,
  } from 'a10-gui-widgets'
  const FormItem = A10Form.Item

export interface IAddVizProps{
    updateModalData: any
    handleCancel: any
}
export interface IAddVizState {
    vizForm: any
    endPointForm: any,
    dataSourceSelected: any
    endPointSelected: any
    metricSelected: any,
    activeKey: any,
    isEditViz: boolean
    dataSourceIndex: any
    disableChartOptions: boolean
    editVizInfo: any,
    isGroupBySelected: boolean
}

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

class AddViz extends A10Container<IAddVizProps, IAddVizState> {

    state = {
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
          editVizInfo: {
            colIndex: -1,
            vizIndex: -1
          },
        dataSourceSelected: '',
        endPointSelected: '',
        metricSelected: '',
        activeKey: ['2'],
        dataSourceIndex: -1,
        disableChartOptions : false,
        isEditViz: false,
        isGroupBySelected : false
    }

    formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      }
    
    buttonItemLayout = {
        wrapperCol: { span: 14, offset: 4 },
    }

    
    

    checkGroup(queries: any){
        const queriesArr = queries.filter((obj: any)=> obj.groupBy !== '')
        if(queriesArr.length > 0){
          return true
        }else{
          return false
        }
      }

      deleteDataSource =  (e: any, sourceIndex: any) => {
        e.preventDefault()
        const vizFormTemp = this.state.vizForm
        vizFormTemp.queries = this.state.vizForm.queries.filter((obj,index)=> index !== sourceIndex)
        const groupValue = this.checkGroup(vizFormTemp.queries)
        this.setState({
          vizForm: vizFormTemp,
          isGroupBySelected: groupValue
        })
      }
    
      editDataSource =  (e: any, sourceIndex: any) => {
        e.preventDefault()
        let vizFormTemp = this.state.vizForm.queries
        vizFormTemp = this.state.vizForm.queries.filter((obj,index)=> index === sourceIndex)
        const dataSourceSelectedTemp = endPoint.endPoints[vizFormTemp[0].dataSource]
        const endPointSelectedTemp = dataSourceSelectedTemp[vizFormTemp[0].endPoint]
        const metricSelectedTemp = endPointSelectedTemp[vizFormTemp[0].metrics]
        this.setState({
          endPointForm: vizFormTemp[0],
          activeKey: ['2'],
          dataSourceIndex: sourceIndex,
          dataSourceSelected: dataSourceSelectedTemp,
          endPointSelected: endPointSelectedTemp,
          metricSelected: metricSelectedTemp,
          isGroupBySelected: false
          
        })
      }

      handleOk = (e: any) => {
        // isEditViz will differentiate from New Viz or Exisiting viz 
        this.setState({
          isEditViz: false,
          editVizInfo: {
            colIndex: -1,
            vizIndex: -1
          },
          isGroupBySelected: false
        })
        this.props.updateModalData(this.state.vizForm)
        this.handleCancel({})

      }
    handleCancel = (e: any) => {
        this.setState({
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
        this.props.handleCancel()
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

      handleEndPointOk = (e: any) => {
        const tempState = this.state
        if(tempState.dataSourceIndex > -1 ) {
          tempState.vizForm.queries[tempState.dataSourceIndex] = this.state.endPointForm
        } else {
          tempState.vizForm.queries.push(this.state.endPointForm)
        }
        const groupValue = this.checkGroup(tempState.vizForm.queries)
      
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
          metricSelected: '',
          isGroupBySelected: groupValue
        })
      }
      handleEndPointCancel = (e: any) => {
        const groupValue =  this.checkGroup(this.state.vizForm.queries)
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
          metricSelected: '',
          isGroupBySelected: groupValue
        })
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

    setActiveKey = (key: string) => {
        if (key === '2' && this.state.isGroupBySelected && this.state.dataSourceIndex === -1) {
          return
        }
        this.setState({
          activeKey: [key],
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

    render() {
        //  console.log('Column called', this.state.dashboardIndex + '_' + this.state.rowIndex  + '_' +this.state.colIndex,new Date(), new Date().getMilliseconds())
        const mode = parameters.MODE
        return(
            <>
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
                    <A10Tooltip title={this.state.isGroupBySelected ? 'Disabled as group by selected' : 'Add Data Source'}>
                      Add DataSource
                    </A10Tooltip>
                  </div>
                  }
                  key="2"
                  disabled={this.state.isGroupBySelected}
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
            <FormItem {...this.buttonItemLayout}>
                <A10Button className="mr-20" type="primary" onClick={this.handleOk}>Submit</A10Button>
                <A10Button type="default" onClick={this.handleCancel}>Cancel</A10Button>
            </FormItem>
          </A10Form>
          </>

        )
    }
}

export default setupA10Container(AddViz)