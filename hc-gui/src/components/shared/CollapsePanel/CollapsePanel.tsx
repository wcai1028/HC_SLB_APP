import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import {
    A10Container,
    setupA10Container,
    IA10ContainerDefaultProps,
  } from 'a10-gui-framework'
  import {
    A10Row,
    A10Col,
    A10Button,
    A10Icon,
  } from 'a10-gui-widgets'
  import parameters from 'parameters'
  import {Logs} from 'src/components/shared/Logs'
  const styles = require('./styles/collapsepanel.scss')
export interface ICollapsePanelProps {
    dashboardIndex : number
    onUpdate : any
    dashboard : any,
    logs: any
    updates: any
}
export interface ICollapsePanelState {
    headerStyle: any,
    bodyStyle: any,
    logs: any,
    focusedLog: number
}

class CollapsePanel extends A10Container<ICollapsePanelProps, ICollapsePanelState> {
    state = {
        headerStyle: {
            bottom : '0%'
        },
        bodyStyle: {
            top: '100%'
        },
        logs: this.props.logs,
        updates : this.props.updates,
        dashboardIndex : this.props.dashboardIndex,
        focusedLog: 0
    }

    componentDidUpdate() {
           if(JSON.stringify(this.props.logs) !== JSON.stringify(this.state.logs) || (this.props.updates !== this.state.updates)){
            this.setState({
                dashboardIndex : this.props.dashboardIndex,
                logs : this.props.logs,
                updates : this.props.updates
              })
           }
         }

    headerStyle(bottomValue: string, topValue: string){
        const tempStyle = {...this.state}
        tempStyle.headerStyle = {
            bottom: bottomValue
        } 
        tempStyle.bodyStyle= {
            top: topValue
        }
        this.setState({
            headerStyle: tempStyle.headerStyle,
            bodyStyle: tempStyle.bodyStyle
        })
    }

    loadLog (index : any){
        this.setState({
            focusedLog: index
          })
    }

    addLogs(){
        const StoredDashBoards = JSON.parse(window.sessionStorage.getItem('DASHBOARDS'))
        const log  =  {
            key: '',
            name: '',
            viz: []
        }
        log.key = StoredDashBoards[this.props.dashboardIndex]['logs'].length + 1
        log.name = 'Log'
        StoredDashBoards[this.props.dashboardIndex]['logs'].push(log)
        window.sessionStorage.setItem('DASHBOARDS',JSON.stringify(StoredDashBoards))
        this.props.onUpdate()
    }

    render(){
        const mode = parameters.MODE
        return (
        <div className="col-md-12 c-section animate" style={this.state.headerStyle}>
            <div className="row c-header">
                <div className="col-md-4">
                    TRANSACTIONS
                </div>
                <div className="col-md-8 icons">
                    <div className="row">
                        <div className="col-md-9">
                            Search
                        </div>
                        <div className="col-md-3 text-right">
                            <span className="fa fa-file-excel-o"/>
                            <span className="fa fa-chart-bar"/>
                            <span className="fa fa-window-maximize" onClick={()=> {this.headerStyle('66%', '34%')}}/>
                            <span className="fa fa-window-restore" onClick={()=> {this.headerStyle('18%', '82%')}}/>
                            <span className="fa fa-minus-square" onClick={()=> {this.headerStyle('0%', '100%')}}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="logs animate" style={this.state.bodyStyle}>
            <A10Row>
                <A10Col>
                     {this.state.logs.map((log : any,index : any) => {
                         return(
                            <div className="name-container" key={index}>
                                <A10Button 
                                className="width-200px border-none"
                                onClick={ () => this.loadLog(index)} key={index}>
                                    {log.name} - {log.key}
                                </A10Button>
                            </div>
                         )
                          
                      })
        }
                    
                </A10Col>
            </A10Row>
            <A10Row>
                <A10Col className="pull-right" span={4}>{mode === 'DEVELOPMENT' ? 
                
                // <A10Button type="primary" onClick ={() => this.addNewDashbaord()}>Add New Dashboard</A10Button>
                <A10Button className="action-button" onClick={ () => this.addLogs()}>
                            <A10Icon type="plus" className="action-icon" />
                            Add Logs 
                </A10Button>
                : null}
                </A10Col>
            </A10Row>
            {this.state.logs.length ? 
                <Logs 
                key
                log = {this.state.logs[this.state.focusedLog]}
                dashboardIndex= {this.props.dashboardIndex}
                dashboard={this.props.dashboard}
                onUpdate={this.props.onUpdate}/> 
                : null
            }
            </div>
        </div>
        )
    }
}

export default setupA10Container(CollapsePanel)