import * as React from 'react'
import {
  A10Container,
  setupA10Container,
  IA10ContainerDefaultProps,
} from 'a10-gui-framework'
import { A10Spin, A10Alert, A10Modal, A10Select, A10Row, A10Col, A10Button,A10Icon } from 'a10-gui-widgets'
import { Viz, ACTIONS, VizContext, VIZ_CONTEXT_DATA } from 'a10-gui-dgp-viz'
import { VizDetails } from 'src/components/shared/Viz/VizDetails'
import { IDefaultMethods } from 'src/containers/L4SLB'
const styles = require('./styles/Vizualization.scss')
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
      foramttedDonutData.series[0].data.push({
        name: series[i].name,
        y: series[i].data[0],
      })
    }
    return foramttedDonutData
  }
  getSeriesTotal(data: any) {
    let sum = 0
    for (let i = 0; i < data.length; i++) {
      sum = sum + data[i][1]
    }
    sum = sum / data.length
    sum = parseFloat(sum.toFixed(2))
    return sum
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
  render() {
    if(this.state.viz.displayProperties){
    console.log(this.state.viz.displayProperties.name, this.state.viz.dataSet)}
    const {
      MainChart,
      Indicator,
      Timeline,
      Selector,
      PieChart,
      MultiChart,
    } = Viz
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
      }
    }

    return (
      <>
          {/* <A10Row>
              <A10Col className="pull-right">
                <A10Button className="action-button padding-3" onClick={this.showModal}>
                  <A10Icon style={{ width: '13px', height: '13px' }} app="global" type="view-analytic" className="action-icon" />
                </A10Button>
                </A10Col>
            </A10Row> 
           <A10Modal
              title="Vizualization Details"
              width = "1080px"
              visible={this.state.visible}
              onOk={this.handleOk}
              destroyOnClose={true}
              onCancel={this.handleCancel}>
                <VizDetails viz={this.state.viz}/> 
            </A10Modal> */}
       {mode === 'DEVELOPMENT' ? 
        
            <A10Row>
              
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
              {this.state.displayType !== 'number' ? (
                this.state.displayType === 'donut' ? (
                  <div style={style.chartBackGround}>
                    <PieChart
                      name={this.state.viz.displayProperties.name.toUpperCase()}
                      vizType="donut"
                      data={this.getDonutData(
                        this.state.viz.displayProperties.seriesArr,
                        this.state.viz.displayProperties.name,
                      )}
                      description=""
                      legend={true}
                      //counters={this.getDonutData(this.state.viz.displayProperties.seriesArr)}
                    />
                  </div>
                ) : this.state.displayType === 'multi' ? (
                  <div style={style.chartBackGround}>
                    <MultiChart
                      name={this.state.viz.displayProperties.name.toUpperCase()}
                      // data={this.getMultiData(
                      //   this.state.viz.displayProperties.seriesArr,
                      // )}
                      charts={this.getMultiCharts(
                        this.state.viz.displayProperties.seriesArr,
                      )}
                    />
                    {/* {console.log(
                      'charts',
                      this.getMultiCharts(
                        this.state.viz.displayProperties.seriesArr,
                      ),
                    )} */}
                  </div>
                ) : (
                  <MainChart
                    name={this.state.viz.displayProperties.name.toUpperCase()}
                    data={{
                      series: this.state.viz.displayProperties.seriesArr,
                    }}
                    vizType={this.state.viz.displayProperties.chartType}
                    description="This is my chart"
                    colors="cyan_to_green"
                  />
                )
              ) : this.state.viz.displayProperties.seriesArr[0] ? (
                <Indicator
                  name={this.state.viz.displayProperties.name.toUpperCase()}
                  data={[this.state.viz.displayProperties.seriesArr[0]]}
                  prefix=""
                  range={[200, 500]}
                  inverse={false}
                  divider=""
                />
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
              />
            </div>
          )
        ) : (
          <A10Spin>
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
