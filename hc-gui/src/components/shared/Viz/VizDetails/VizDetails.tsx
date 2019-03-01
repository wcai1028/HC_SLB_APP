import * as React from 'react'
import {
    A10Container,
    setupA10Container
  } from 'a10-gui-framework'

  import {
    A10Collapse,
    A10Tabs
  } from 'a10-gui-widgets'


export interface IVizDetailsProps {
    viz: any
}
export interface IVizDetailsState {}

class VizDetails extends A10Container<IVizDetailsProps, IVizDetailsState> {
    render(){
        
        return(
            this.props.viz.displayProperties.seriesArr.map((series: any, index : any)=>{
                return (<A10Collapse
                            bordered={true}
                            defaultActiveKey={['1']}
                            className="marginTop20 marginBottom15"
                            key={index}
                        > 
                        <A10Collapse.Panel
                                header={
                                    <div
                                    className="col-md-12 productHeader inline"
                                   
                                    >
                                    <div className="col-md-3 no-padding">
                                        <span className="label">{series.name ? series.name : this.props.viz.displayProperties.name}</span>
                                        {/* <RoundNumber number={this.props.appServices.length} /> */}
                                    </div>
                                    <div className="col-md-9 appLauncherDiv">
                                       Series Formula: <b> {series.formula} </b>
                                    </div>
                                    </div>
                                }
                                key={index}
                                className="white"
                                >   
                                    <A10Collapse>
                                    <A10Collapse.Panel 
                                    header={
                                        <div className="col-md-12 productHeader inline">
                                         QUERY
                                        </div>}
                                    >
                                        {JSON.stringify(this.props.viz.modifiedQuery)}

                                    </A10Collapse.Panel>

                                    <A10Collapse.Panel 
                                    header={
                                        <div className="col-md-12 productHeader inline">
                                         RESPONSE
                                        </div>}
                                    >
                                        {JSON.stringify(this.props.viz.mergedResponses)}

                                    </A10Collapse.Panel>

                                    <A10Collapse.Panel 
                                    header={
                                        <div className="col-md-12 productHeader inline">
                                         Series Calculated Data
                                        </div>}
                                    >
                                        {JSON.stringify(series.data)}

                                    </A10Collapse.Panel>

                                    </A10Collapse> 
                                    
                                   
                            </A10Collapse.Panel>
                    </A10Collapse>)
            })
        )
    }
}
export default setupA10Container(VizDetails)
