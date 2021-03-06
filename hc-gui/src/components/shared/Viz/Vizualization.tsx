import * as React from 'react'
import {
  A10Container,
  setupA10Container,
  IA10ContainerDefaultProps,
} from 'a10-gui-framework'
import { A10Spin, A10Alert, A10Modal, A10Select, A10Row, A10Col, A10Button,A10Icon } from 'a10-gui-widgets'
import { Viz, ACTIONS, VizContext, VIZ_CONTEXT_DATA } from 'a10-gui-dgp-viz'
import {VizDetails} from 'src/components/shared/Viz/VizDetails'
import { IDefaultMethods } from 'src/containers/L4SLB'
import './styles/Vizualization.scss'
import parameters from 'parameters'

export interface IVizualizationProps extends IA10ContainerDefaultProps {
  defaultMethods: IDefaultMethods
  rowIndex: number
  colIndex: number
  dashboardIndex: number
  selectedContext : any
  contextArray : any
  onChangeOfContext : any
  properties: any
  setSchedule: any
  vizIndex: number
  updates: any
  dashboard: any
  updateTimeRange  : any
  editDeleteViz: any
  chartHeight: any
  drillDownFunction : any
}
export interface IVizualizationState {
  data: any
  viz: any
  updates: any
  dashboard: any
  displayType: any
  visible: boolean
}

class Vizualization extends A10Container<
  IVizualizationProps,
  IVizualizationState
> {
  pageLength = 5

  state = {
    visible: false,
    data: 0,
    viz: this.props.properties,
    updates: this.props.updates,
    dashboard: this.props.dashboard,
    displayType: this.props.properties.displayProperties
      ? this.props.properties.displayProperties.chartType[0]
      : '',
  }

  vizContext: typeof VIZ_CONTEXT_DATA

  constructor(props: IVizualizationProps) {
    super(props)
    this.vizContext = {
      isLoading: false, //this.state.isLoading
      receive: action => {
        const { type, callback } = action
        console.log('Receive an action', action)
        switch (type) {
          case ACTIONS['VIZ.TIMELINE.ONCHANGE']: {
            console.log(action)
            const { startTime, endTime } = action
            this.props.updateTimeRange(startTime, endTime)
          }
        }
      },
    }
  }
  editDeleteVizualization = (isEdit: boolean) => {
    this.props.editDeleteViz(isEdit, this.props.colIndex, this.props.vizIndex)
  }

  toggleModal = (value: boolean) => {
    this.setState({
      visible: value,
    })
  }

  handleOk = (e: any) => {
    this.toggleModal(false)
  }

  handleCancel = (e: any) => {
    this.toggleModal(false)
  }

  showModal = () => {
    this.toggleModal(true)
  }

  callOnChangeofTime = (startTime: number, endTime: number) => {
    // TBD
  }

  componentWillMount() {
    if (
      JSON.stringify(this.props.dashboard) !==
        JSON.stringify(this.state.dashboard) ||
      this.props.updates !== this.state.updates
    ) {
      this.setState({
        dashboard: this.props.dashboard,
        updates: this.props.updates,
        viz: this.props.properties,
      })
    }
  }

  getDonutData(series: any, name: any) {
    let foramttedDonutData = {
      series: [
        {
          name: name,
          data: Array(),
        },
      ],
    }

    for (let i = 0; i < series.length; i++) {
      const numData = series[i].data[0]
      foramttedDonutData.series[0].data.push({
        name: series[i].name,
        y: numData === null || isNaN(numData) || !isFinite(numData) ? 0 : numData,
      })
    }
    return foramttedDonutData
  }
  getSeriesTotal(data: number[][]) {
    // let sum = 0
    // for (let i = 0; i < data.length; i++) {
    //   sum = sum + data[i][1]
    // }
    // sum = sum / data.length
    // sum = parseFloat(sum.toFixed(2))
    // return sum
    return this.isTimeseriesDataValid(data) ? parseFloat((data.map(d=> d[1])
    .reduce((accum: number, curr: number) => accum + curr, 0)
    /data.length)
    .toFixed(2))
    .toString() : '-'
  }
  getMultiCharts(series: any) {
    let charts: any = []
    for (let i = 0; i < series.length; i++) {
      if (i % 2 === 0) {
        charts.push([])
      }
      let index = charts.length - 1
      const name = series[i].name.toUpperCase()
      charts[index].push({
        name,
        data: {
          series: [
            {
              data: series[i].data,
            },
          ],
          total: this.getSeriesTotal(series[i].data),
        },
        range: [60, 80],
        inverse: true,
        unit: '%',
        type: 'column',
      })
    }
    return charts
  }
  getMultiData(series: any) {
    return {
      data_cpu: {
        series: [
          {
            data: [
              [1543437297968, 35],
              [1543537297968, 82],
              // ... more plot points
            ],
            name: 'DATA CPU',
          },
        ],
      },
      total_memory: {
        series: [
          {
            data: [
              [1543437297968, 35],
              [1543537297968, 82],
              // ... more plot points
            ],
            name: 'TOTAL MEMORY',
          },
        ],
      },
    }
  }
  componentDidUpdate() {
    if (
      JSON.stringify(this.props.dashboard) !==
        JSON.stringify(this.state.dashboard) ||
      this.props.updates !== this.state.updates
    ) {
      this.setState({
        dashboard: this.props.dashboard,
        updates: this.props.updates,
        viz: this.props.properties,
      })
    }
  }

  getVizualizationData(vizIndex: any) {
    let viz = { ...this.state.viz }

    this.props.setSchedule(
      viz,
      this.props.dashboardIndex,
      this.props.rowIndex,
      this.props.colIndex,
      vizIndex,
    )
  }

  getMapData(series : any){
    return ({
      series: [{
        name: 'Geo-Locations',
        data: [
          {code: 'us', name: 'USA', value: 100},
          {code: 'in', name: 'India', value: 200},
          {code: 'cn', name: 'China', value: 300},    
        ]
      }],
    })

  }

  getChartData(){
    const {seriesArr, name, chartType} = this.state.viz.displayProperties
    switch(this.state.displayType){
      case 'donut':
          return this.getDonutData(
            seriesArr,
            name,
          )
      case 'semi-donut':
          return this.getDonutData(
            seriesArr,
            name,
          )
      case 'map':
          return this.getMapData(
           seriesArr,
          )
      case 'multi':
          return this.getMultiCharts(
            seriesArr,
          )
      case 'grid':
          return seriesArr.map((series: {name: string, data: []} ) => ({
            name: series.name,
            value: series.data[0] ? series.data[0] : '-',
          }))
      case 'overall':
          // data for two charts
          return seriesArr.map((series: any) => ({
            title: series.name, // chart title
            counter: this.getTimeseriesTotal(series.data), // chart caption/counter
            data: this.isTimeseriesDataValid(series.data) ? series.data : null, // data for chart
            color: 'green',
          }))
      case 'indicator':
          return seriesArr.map((series: {name: string, data: []}) => {
            const data = series.data[0]
            return data !== null && !isNaN(data) && isFinite(data) ? data : '-'
          })
      case 'progress-bar':
          return seriesArr ? seriesArr.map((series: any) => ({
            // set min/max, and zero for default values for progress bar's data
            data: isNaN(series.data[0]) || !isFinite(series.data[0]) 
            || series.data[0] > 1 || series.data[0] ? 0 : series.data[0], 
            name: isNaN(series.data[0]) || !isFinite(series.data[0]) ? 'No Data' : series.name,  
            total: 1,
          })) : [{
            data: 0, 
            name: 'No Data',  
            total: 1,
          }]
      case 'list':
          return seriesArr.map((series: any, i: number) => [
            {value: `Rule ${i}`}, 
            {value: this.getTimeseriesTotal(series.data)},
            {type: 'chart', value: this.isTimeseriesDataValid(series.data) ? series.data : null}
          ])
      default:
          return {
            series: seriesArr,
            categories: chartType.includes('column') ? 
              seriesArr.map((series:any)=> series.name) 
              : null,
          }
    }
  }
  getTimeseriesTotal(total: number[][]){
    // make sure 2 dimensional arr
    return this.isTimeseriesDataValid(total) ? parseFloat((total.map(series=> series[1])
                .reduce((accum: number, curr: number) => accum + curr, 0)
                /total.length).toFixed(2))
                .toString() : '-'
  }

  isTimeseriesDataValid(data: number[][]){
    return data[0] && data[0][1]
  }

  renderServiceOptions() {
    const keys = this.props.contextArray
    return keys.map((key: any, index: any) => {
      return <A10Select.Option key={key.name} >{key.displayName ? key.displayName : key.name}</A10Select.Option>
    })
  }
  updateDisplayType(key: any) {
    this.setState({
      displayType: key,
    })
  }
  updateContext(e : any){
    this.props.onChangeOfContext(e)
  }
  drillDown =()=>{
    this.props.drillDownFunction(this.state.viz)
  }

  render() {
    const {
      MainChart,
      Indicator,
      Timeline,
      Selector,
      PieChart,
      MultiChart,
      MapChart, 
      GridChart,
      OverallChart,
      IndicatorChart,
      ProgressBarChart,
      ListChart,
    } = Viz
    const {displayType} = this.state
    const mode = parameters.MODE
    let vheight = '100%'
    let vwidth = '100%'
    if (this.state.viz.displayProperties) {
      let widthHeight = this.state.viz.displayProperties.dimension
      widthHeight = widthHeight.split(',')
      if (widthHeight[0] === '0') {
        vwidth = '50%'
      }
      if (widthHeight[1] === '0') {
        vheight = '50%'
      }
    }
    const style = {
      bodyStyle: {
        borderRadius: '2px',
        color: 'gray',
        height: vheight,
        width: vwidth,
      },
      chartBackGround: {
        background: '#ffffff',
        border: '1px solid #e3e3e3',
      },
      chartHeight: {
        height: vheight,
      },
      negMargin :{
        marginBottom: '-60px',
        marginRight: 20 // to uncover the rightmost icon
      },
      debug : {
        maxHeight : '2px'
      },
      visibleIcon: {
        width: 'calc(100% - 60px)',
      }
    }
    return (
      <>
          {this.state.viz.vizAnnotaion === 'AppSelector' || this.state.viz.vizAnnotaion === 'TimeLine' ? 
          
          null : 
          <div style={style.debug}> 
          <A10Row >
              <A10Col className="pull-right">
                <A10Button className="action-button padding-3" onClick={this.showModal}>
                  <A10Icon style={{ width: '13px', height: '13px' }} app="global" type="view-analytic" className="action-icon" />
                </A10Button>
                </A10Col>
                {this.state.viz.displayProperties.drillDown ? 
                  <A10Col className="pull-right">
                  <A10Button className="action-button padding-3" onClick={this.drillDown.bind(this)}>
                    <span className="fa fa-external-link" />
                  </A10Button>
                  </A10Col>
                : null }
            </A10Row> 
           <A10Modal
              title="Vizualization Details"
              width = "1080px"
              visible={this.state.visible}
              onOk={this.handleOk}
              destroyOnClose={true}
              onCancel={this.handleCancel}>
                <VizDetails viz={this.state.viz}/> 
            </A10Modal>
            </div>
          }
       {mode === 'DEVELOPMENT' ? 
        
            <A10Row style={style.negMargin}>
              
                <A10Col className="pull-right">
                    <A10Icon onClick={()=> {this.editDeleteVizualization(true)}} style={{ width: '13px', height: '13px' }} app="global" type="edit" className="action-icon" />
                    <A10Icon onClick={()=> {this.editDeleteVizualization(false)}} style={{ width: '13px', height: '13px' }} app="global" type="delete" className="action-icon" />
                  </A10Col>
              
          </A10Row>
      : null }
      <VizContext.Provider value={this.vizContext}>
        {this.state.viz.vizAnnotaion === 'AppSelector' ? (
          <A10Select
            placeholder={'Select App-Service'}
            value={this.props.selectedContext}
            onChange={this.updateContext.bind(this)}
            style={{ width: '85%'}}
          >
            {this.renderServiceOptions()}
          </A10Select>
        ) : this.state.viz.vizAnnotaion === 'TimeLine' ? (
          <Timeline
            standalone={true}
            autoRefreshButton={true}
            currentTimeButton={false}
            periodButtons={false}
          />
        ) : this.state.viz.dataSet ? (
          this.state.viz.displayProperties.annotation === 'mainchart' ? (
            <div className="mainChartBody" style={style.chartHeight}>
              {displayType !== 'number' ? (
                displayType === 'donut' ? (
                  <div style={style.chartBackGround}>
                    <PieChart
                      name={this.state.viz.displayProperties.name.toUpperCase()}
                      data={this.getChartData()}
                      description={this.state.viz.displayProperties.description}
                      legend={true}
                    />
                  </div>
                ) : displayType === 'multi' ? (
                  <div style={style.chartBackGround}>
                    <MultiChart
                      name={this.state.viz.displayProperties.name.toUpperCase()}
                      charts={this.getChartData()}
                      description={this.state.viz.displayProperties.description}
                    />
                  </div>
                ) : displayType === 'map' ? (
                  <div style={style.chartBackGround}>
                    <MapChart
                      name={this.state.viz.displayProperties.name.toUpperCase()}
                      description={this.state.viz.displayProperties.description}
                      data={this.getChartData()}
                      height={200}
                    />
                  </div>
                ) : displayType === 'grid' ? (
                  <div style={style.chartBackGround}>
                    <GridChart
                      name={this.state.viz.displayProperties.name.toUpperCase()}
                      data={this.getChartData()}
                      description={this.state.viz.displayProperties.description}
                      inverse={true}
                    />
                  </div>
                ) : displayType === 'indicator' ? (
                  <div style={style.chartBackGround}>
                    <IndicatorChart
                      name={this.state.viz.displayProperties.name.toUpperCase()}
                      units ={this.state.viz.displayProperties.seriesArr.map((series:any) => series.units)}
                      divider={true}
                      data={this.getChartData()}
                    />
                    </div>
                ) : displayType === 'semi-donut' ? (
                  <div style={style.chartBackGround}>
                    <PieChart
                        name={this.state.viz.displayProperties.name.toUpperCase()}
                        vizType={'semi-donut'} // vizType donut is spelled wrong in dgp library
                        data={this.getChartData()}
                        // data={{data: }}
                        description={this.state.viz.displayProperties.description}
                        legend={false}
                        showTotal={true}
                        // counters={this.getDonutData(this.state.viz.displayProperties.seriesArr)}
                      />
                    </div>
                ): displayType === 'progress-bar' ? (
                  <div style={style.chartBackGround}>
                    <ProgressBarChart 
                      name={this.state.viz.displayProperties.name.toUpperCase()}
                      data={{series: this.getChartData()}}
                    />
                  </div>
                ): displayType === 'overall' ? (
                  <div style={style.chartBackGround}>
                  {/* need to call here otherwise renders twice, and gives two charts */}
                  <OverallChart 
                    name={this.state.viz.displayProperties.name.toUpperCase()}
                    totalTitle={this.state.viz.displayProperties.seriesArr[2] ? 
                      this.state.viz.displayProperties.seriesArr[2].name : ''}
                    summaryCounter={this.getTimeseriesTotal(this.state.viz.displayProperties.seriesArr[2].data)}
                    summaryUnit={this.state.viz.displayProperties.seriesArr[2] ?
                      this.state.viz.displayProperties.seriesArr[2].units 
                      : '-'}
                    description={this.state.viz.displayProperties.description}
                    unit={this.state.viz.displayProperties.units}
                    itemInfo={this.getChartData()}
                  />
                  </div>
                ) : displayType === 'list' ? (
                  <div style={style.chartBackGround}>
                  <ListChart 
                    name={this.state.viz.displayProperties.name.toUpperCase()}
                    headers={[{
                      name: 'Rules',
                      span: 4,
                    },
                    {
                      name: 'Hits',
                      span: 8,
                    },
                    {
                      name: 'Hits over time',
                      span: 12,
                    }]}
                    data={this.getChartData()}
                  />
                  </div>
                ) : (
                  <div style={style.chartBackGround}>
                    <MainChart
                      name={this.state.viz.displayProperties.name.toUpperCase()}
                      data={this.getChartData()}
                      vizType={this.state.viz.displayProperties.chartType}
                      description={this.state.viz.displayProperties.description}
                      colors="red_to_blue"
                    />
                  </div>
                )
              ) : this.state.viz.displayProperties.seriesArr[0] ? (
                <div style={style.chartBackGround}>
                  <Indicator
                    name={this.state.viz.displayProperties.name.toUpperCase()}
                    data={[this.state.viz.displayProperties.seriesArr[0]]}
                    prefix=""
                    range={[200, 500]}
                    inverse={false}
                    divider=""
                    description={this.state.viz.displayProperties.description}
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <div>
              <Indicator
                name={this.state.viz.displayProperties.name.toUpperCase()}
                data={this.state.viz.displayProperties.seriesArr.map(
                  (sr: any, index: any) => {
                    return sr.data
                  },
                )}
                prefix={this.state.viz.displayProperties.prefix}
                range={this.state.viz.displayProperties.threshold}
                inverse={this.state.viz.displayProperties.inverse}
                divider={this.state.viz.displayProperties.divider}
                unit={this.state.viz.displayProperties.seriesArr[0].units}
                description={this.state.viz.displayProperties.description}
              />
            </div>
          )
        ) : (
          <A10Spin >
            <A10Alert
              message="Fetching data"
              description={this.props.vizIndex}
              type="info"
            />
            {this.getVizualizationData(this.props.vizIndex)}
          </A10Spin>
        )}
      </VizContext.Provider>
      </>
    )
  }
}
export default setupA10Container(Vizualization)
