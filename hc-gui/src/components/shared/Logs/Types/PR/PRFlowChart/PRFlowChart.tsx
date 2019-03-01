import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import {
    A10Container,
    setupA10Container
  } from 'a10-gui-framework'
  import {
    A10Row,
    A10Col
  } from 'a10-gui-widgets'
  const styles = require('./styles/prflowchart.scss')

export interface IPRFlowChartProps {
    details: any
}
export interface IPRFlowChartState {}


class PRFlowChart extends A10Container<IPRFlowChartProps, IPRFlowChartState> {
    render(){
        return(
            <A10Row className="row flow-diagram">

                                    <A10Col span={24} className="bigMarginBottom">
                                        <A10Col span={18} className="dt-client">
                                            <span className="title">Data Transfer Request</span>
                                            <span className="value" ><span> 0</span> ms</span>

                                        </A10Col>
                                    </A10Col>
                                        
                               
                                    <A10Col span={24}>
                                        <A10Col span={16}>
                                            <A10Col span={24}>
                                                <A10Col span={4} className="client-section">
                                                    <div className="ic client"/>
                                                    <div className="value">Client</div>
                                                </A10Col>
                                                <A10Col span={6}>
                                                    <div className="title">Client SRTT</div>
                                                    <div className="value"><span> 0</span> ms</div>
                                                </A10Col>
                                                <A10Col span={8} className="adc-section">
                                                    <A10Col span={24}>
                                                        <span className="title">In Latency</span>
                                                        <span className="value">
                                                            <span> 0.00 </span>
                                                              ms
                                                        </span>
                                                    </A10Col>
                                                    <A10Col span={24}>
                                                        <div className="ic adc"/>
                                                        <div className="value">Thunder ADC</div>
                                                    </A10Col>
                                                    <A10Col span={24}>
                                                        <span className="title">Out Latency</span>
                                                        <span className="value"><span> 0.00</span> ms</span>
                                                    </A10Col>
                                                </A10Col>
                                                <A10Col span={6}>
                                                    <div className="title">Server RTT</div>
                                                    <div className="value">
                                                        <span> 0 </span>
                                                         ms
                                                    </div>
                                                </A10Col>
                                            </A10Col>
                                            <A10Col span={24} className="flow-line">
                                                <span className="fa fa-chevron-right arrows right-1"/>
                                                <span className="fa fa-chevron-right arrows right-2"/>
                                                <span className="fa fa-chevron-left arrows left-1"/>
                                                <span className="fa fa-chevron-left arrows left-2"/>
                                            </A10Col>
                                        </A10Col>
                                        <A10Col span={8}  className="server-section">
                                        <A10Col span={8}>
                                                <div className="ic clusters"/>
                                                <div className="value">Server</div>
                                            </A10Col>
                                            <A10Col span={8}>
                                                <div className="title">App Latency</div>
                                                <div className="value"><span>0 </span>ms</div>
                                            </A10Col>
                                            <A10Col span={8}>
                                                <div className="ic clusters"/>
                                                <div className="value">App</div>
                                            </A10Col>
                                        </A10Col>
                                    </A10Col>
                                    <A10Col  span={24} className="data-transfer margin-top-15">
                                    <A10Col  span={18} className="dt-client ">
                                            <span className="title">Data Transfer Response</span>
                                            <span className="value"><span> 0</span> ms</span>
                                        </A10Col>
                                       
                                    </A10Col>
                                </A10Row>
        )
    }
}

export default setupA10Container(PRFlowChart)