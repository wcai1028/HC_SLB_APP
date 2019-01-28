import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { A10Collapse, A10Chart } from 'a10-gui-widgets'
import { EventItemsHeader } from '../EventItemsHeader'
export interface IEventContainerProps {
  items: any
}
export interface IEventContainerState {}

class EventContainer extends A10Component<
  IEventContainerProps,
  IEventContainerState
> {
  chartConfig = {
    xAxis: {
      type: 'datetime',
    },
    series: [
      {
        name: 'Actions',
        data: [
          13,
          5,
          17,
          18,
          3,
          16,
          7,
          15,
          6,
          7,
          9,
          13,
          5,
          17,
          8,
          3,
          6,
          7,
          9,
          3,
          5,
          7,
          8,
          3,
          6,
          7,
          9,
          3,
          5,
          7,
          8,
          3,
          6,
          17,
          8,
          13,
          6,
          7,
          9,
          8,
          13,
          6,
          7,
          9,
          13,
          15,
          17,
          8,
          13,
          6,
          7,
          9,
        ],
        color: '#ff9090',
      },
    ],
    plotOptions: {
      series: {
        pointStart: new Date().getTime() - 6 * 60 * 60 * 1000,
        pointInterval: 5 * 60 * 1000,
        pointWidth: 15,
      },
    },
  }
  render() {
    return this.props.items.map((key: any, index: number) => {
      return (
        <A10Collapse
          bordered={false}
          defaultActiveKey={['0']}
          className="marginTop20"
        >
          <A10Collapse.Panel
            header={<EventItemsHeader items={key} />}
            key={index}
            className="white no-border"
          >
            <A10Chart.Detail
              chartConfig={this.chartConfig}
              series={this.chartConfig.series}
              type="column"
              types={['area', 'column', 'table']}
              title="Occured"
              height="200"
            />
          </A10Collapse.Panel>
        </A10Collapse>
      )
    })
  }
}
export default EventContainer
