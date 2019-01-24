import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import moment from 'moment'

export interface ISparcLineProps {
  seriesData: IObject
  series?: IObject[]
  chartConfig?: IObject
}

// tslint:disable-next-line:no-var-requires
const ReactHighcharts = require('react-highcharts')
// tslint:disable-next-line:no-var-requires
const { NoDataToDisplay } = require('react-highcharts-no-data-to-display')
// tslint:disable-next-line:no-var-requires
const styles = require('./styles/index.module.less')

/* istanbul ignore next */
if (typeof NoDataToDisplay === 'function') {
  NoDataToDisplay(ReactHighcharts.Highcharts)
}

const defaultChartConfig: IObject = {
  chart: {
    animation: false,
    type: 'area',
    height: '60px',
  },
  credits: { enabled: false },
  title: {
    text: '',
  },
  time: {
    timezoneOffset: new Date().getTimezoneOffset(),
  },
  xAxis: {
    gridLineWidth: '0px',
    tickPosition: 'inside',
    type: 'datetime',
    labels: {
      // format: '{value:%Y-%b-%e %H:%M}',
      enabled: false,
    },
  },
  yAxis: {
    gridLineWidth: '0px',
    labels: { enabled: false },
    title: { text: '' },
  },
  tooltip: {
    xDateFormat: '%Y-%b-%e %H:%M',
    valueDecimals: 1,
    formatter: function() {
      return (
        this.point.name +
        '<br/>' +
        moment(this.x).format('MM/DD, HH:mm:ss') +
        ' : <b>' +
        Math.round(this.y * 100) / 100 +
        '</b> /s<br/>.'
      )
    },
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    area: {
      animation: { duration: 0 },
      stacking: 'normal',
      lineColor: '#887cc6',
      lineWidth: 1,
      color: 'rgba(219, 217, 238, 0.46)',
    },
  },
}

class SparcLine extends A10Component<ISparcLineProps> {
  chartConfig: IObject = {}
  constructor(props: any) {
    super(props)
    this.chartConfig = defaultChartConfig
    if (this.props.chartConfig) {
      Object.assign(this.chartConfig, this.props.chartConfig)
    }
  }

  render() {
    const { seriesData } = this.props
    this.chartConfig.series = []
    this.chartConfig.series.push({ data: seriesData ? seriesData : [] })

    return (
      <div className={styles.sparcLine}>
        <ReactHighcharts
          className={styles.sparcLineChart}
          config={this.chartConfig}
        />
      </div>
    )
  }
}

export default SparcLine
