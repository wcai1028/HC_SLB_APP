import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { A10Collapse } from 'a10-gui-widgets'
import { LoadbalancerChart } from '../LoadbalancerChart'
import { RoundNumber } from 'src/components/shared/RoundNumber'
import 'src/styles/base.scss'

export interface ILoadbalancerChartsProps {
  chartsInput: any
}
export interface ILoadbalancerChartsState {
  inpputPresent: boolean
}

class LoadbalancerCharts extends A10Component<
  ILoadbalancerChartsProps,
  ILoadbalancerChartsState
> {
  state = {
    inpputPresent: false,
  }
  // componentWillReceiveProps(props: any) {
  // }
  render() {
    return (
      <A10Collapse
        bordered={false}
        defaultActiveKey={''}
        className="marginBottom20"
      >
        <A10Collapse.Panel
          header={
            <>
              CPUs{' '}
              <RoundNumber
                number={
                  this.props.chartsInput ? this.props.chartsInput.length : 0
                }
              />{' '}
            </>
          }
          key="1"
          className="white"
        >
          {this.props.chartsInput ? (
            <div className="display-inline">
              {this.props.chartsInput.map((key: any, index: number) => {
                return <LoadbalancerChart chartInput={key} key={index} />
              })}
            </div>
          ) : null}
        </A10Collapse.Panel>
      </A10Collapse>
    )
  }
}

export default LoadbalancerCharts
