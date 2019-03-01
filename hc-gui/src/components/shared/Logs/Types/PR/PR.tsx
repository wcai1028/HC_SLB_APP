import * as React from 'react'
import {
    A10Container,
    setupA10Container
  } from 'a10-gui-framework'
  import {
    A10Row,
    A10Col
  } from 'a10-gui-widgets'
  import {PRFlowChart} from 'src/components/shared/Logs/PRFlowChart'
  const styles = require('./styles/pr.scss')

export interface IPRProps {
    logsList: any
}
export interface IPRState {
    logsList: any
}
class PR extends A10Container<IPRProps, IPRState> {

    static getDerivedStateFromProps(props: IPRProps, currentState: IPRState) {
        if (JSON.stringify(props.logsList) !== JSON.stringify(currentState.logsList)) {
          return {
            logsList: props.logsList
          }
        }
        return null
      }

    state = {
        logsList: this.props.logsList
    }
    // Showing PR Flow chart and other Details
    openDetails(index: any){
        const list =  this.state.logsList
        const selectedItem = list[index]
        selectedItem.show = !selectedItem.show
        list[index] = selectedItem
        this.setState({
           logsList : list
         })
     }
    render(){
        return(
            <div className="logs-list">
            <div className="padding0">
                <ul className="table-header">
                    <li>
                        <ul>
                            <li style={{width:'6%'}} />
                            <li style={{width:'18%'}}>Timestamp</li>
                            <li style={{width:'14%'}}>Virtual Host</li>
                            <li style={{width:'17%'}}>Server Port</li>
                            <li style={{width:'9%'}}>Server IP</li>
                            <li style={{width:'9%'}}>Product ID</li>
                            <li style={{width:'9%'}}>Resp Size</li>
                            <li style={{width:'9%'}}>Type</li>
                            <li style={{width:'9%'}}>Bandwidth</li>
                            
                        </ul>
                    </li>
                </ul>
                
                <ul className="table-body">
                  {
                    this.state.logsList.map((log, index) => (
                    <li key={index}>
                        <ul onClick={()=> this.openDetails(index)}>
                            <li className="status" style={{width:'6%'}}>
                                <i className={ log.show ?' fa fa-caret-down' : 'fa fa-caret-right'}/>
                                <i className="fa fa-circle good" />
                                <input type="checkbox" className="ml4" disabled={true} />
                            </li>
                            <li style={{width:'18%'}}>
                                {log.timestamp}
                            </li>     
                            <li style={{width:'14%'}}>{log.virtualHost}</li>
                            <li style={{width:'17%'}}>{log.appServerPort}</li>
                            <li style={{width:'9%'}}>{log.appServerIP}</li>
                            <li style={{width:'9%'}}>{log.productId}</li>
                            <li style={{width:'9%'}}>{log.totalResponseSize}</li>
                            <li style={{width:'9%'}}>{log.type}</li>
                            <li style={{width:'9%'}}>{log.totalBandwidth}</li>
                        </ul>
                        {log.show ? 
                          <>
                            <A10Col span={24} className=" log-details">
                              <PRFlowChart details={log}/>
                              <A10Row className="details">
                              {/* <A10Col span={16} className="col-md-8">
                                className="col-md-8"
                              </A10Col> */}
                              <A10Col span={8}>
                                  <A10Row>
                                        <A10Col span={24} className=" title">Request Info</A10Col>
                                        <A10Col span={24} className="">
                                            <A10Col span={24} className=" pad-s-15">
                                                <A10Col span={10} className="value">Host: </A10Col>
                                                <A10Col span={14} ><span className="text-ellpsis">--</span></A10Col>
                                            </A10Col>
                                            <A10Col span={24} className=" pad-s-15">
                                                <A10Col span={10} className="value">Request: </A10Col><A10Col span={14} >--</A10Col>
                                            </A10Col>
                                            <A10Col span={24} className=" pad-s-15">
                                                <A10Col span={10} className="value">URI: </A10Col>
                                                <A10Col span={14} ><span className="text-ellipsis">--</span></A10Col>
                                            </A10Col>
                                            <A10Col span={24} className=" pad-s-15">
                                                <A10Col span={10} className="value">Referer: </A10Col>
                                                <A10Col span={14}><span className="text-ellipsis">--</span></A10Col>
                                            </A10Col>
                                            <A10Col span={24} className=" pad-s-15">
                                                <A10Col span={10} className="value">Request Size: </A10Col><A10Col span={14} >--</A10Col>
                                            </A10Col>
                                            <A10Col span={24} className=" pad-s-15">
                                                <A10Col span={10} className="value">User Agent: </A10Col>
                                                <A10Col span={14} ><span className="text-ellipsis">--</span></A10Col>
                                            </A10Col>
                                        </A10Col>
                                    </A10Row>
                                    <A10Col span={24} className=" marginTop10">
                                            <A10Col span={24} className=" title">Response Info</A10Col>
                                            <A10Col span={24} className="">
                                                <A10Col span={24} className=" pad-s-15">
                                                    <A10Col span={10} className="value">Response Length: </A10Col><A10Col span={14} >--</A10Col>
                                                </A10Col>
                                                <A10Col span={24} className=" pad-s-15">
                                                    <A10Col span={10} className="value">Response Code: </A10Col><A10Col span={14} >--</A10Col>
                                                </A10Col>
                                                <A10Col span={24} className=" pad-s-15">
                                                    <A10Col span={10} className="value">MethodType: </A10Col><A10Col span={14} >--</A10Col>
                                                </A10Col>
                                                <A10Col span={24} className=" pad-s-15">
                                                    <A10Col span={10} className="value">Cached: </A10Col><A10Col span={14} >--</A10Col>
                                                </A10Col>
                                            </A10Col>
                                        </A10Col>
                              </A10Col>
                            </A10Row>
                            </A10Col>
                            
                            </>
                          : null
                        }
                      
                    </li>
                    ))
                    }
                </ul>
            </div>
        </div>
        )
    }

   
}

export default setupA10Container(PR)