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
    A10Input,
    A10Modal,
    A10Select
  } from 'a10-gui-widgets'
  import parameters from 'parameters'
  import {Logs} from 'src/components/shared/Logs'
  import {AddLog} from 'src/components/shared/Logs/AddLog'
  const styles = require('./styles/collapsepanel.scss')
  import {AddViz} from 'src/components/shared/AddViz'

export interface ICollapsePanelProps {
    dashboardIndex : number
    onUpdate : any
    dashboard : any,
    logs: any
    updates: any,
    onVizUpdate: any
    getLogs : any
}
export interface ICollapsePanelState {
    headerStyle: any,
    bodyStyle: any,
    logs: any,
    focusedLog: number,
    visible: boolean,
    addLogVisible: boolean,
    searchText: string
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
        focusedLog: 0,
        visible: false,
        addLogVisible: false,
        searchText: '*.*'
    }
    logName = ''

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

    loadLog = (index : any)=>{
        this.setState({
            focusedLog: index,
            searchText: '*.*'
          })
    }

    handleSelect = (value: any) => {
      this.loadLog(value)
    }

    onNameChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.logName = e.currentTarget.value
    }

    editName = (index: number) => {
        const StoredDashBoards = JSON.parse(
            window.sessionStorage.getItem('DASHBOARDS'),
        )
        this.logName = StoredDashBoards[this.props.dashboardIndex]['logs'][index]['name']
        StoredDashBoards[this.props.dashboardIndex]['logs'][index]['editable'] = true
        window.sessionStorage.setItem(
            'DASHBOARDS',
            JSON.stringify(StoredDashBoards),
        )
        this.props.onUpdate()
    }
    cancelName = (index: number) => {
        const StoredDashBoards = JSON.parse(
            window.sessionStorage.getItem('DASHBOARDS'),
        )
        StoredDashBoards[this.props.dashboardIndex]['logs'][index]['editable'] = false
        window.sessionStorage.setItem(
            'DASHBOARDS',
            JSON.stringify(StoredDashBoards),
        )
        this.props.onUpdate()
    }

    changeName = (index: number) => {
        const StoredDashBoards = JSON.parse(
            window.sessionStorage.getItem('DASHBOARDS'),
        )
        StoredDashBoards[this.props.dashboardIndex]['logs'][index]['editable'] = false
        StoredDashBoards[this.props.dashboardIndex]['logs'][index]['name'] = this.logName
        window.sessionStorage.setItem(
            'DASHBOARDS',
            JSON.stringify(StoredDashBoards),
        )
        this.props.onUpdate()
    }

    setlogName(e: any){
        this.logName = e.target.value
      }

    addLogs(vizData: any){
        const StoredDashBoards = JSON.parse(window.sessionStorage.getItem('DASHBOARDS'))
        const log  =  {
            key: '',
            name: vizData.name,
            viz: [vizData],
            editable: false,
            dataSet: false
        }
        log.key = StoredDashBoards[this.props.dashboardIndex]['logs'].length + 1
        StoredDashBoards[this.props.dashboardIndex]['logs'].push(log)
        window.sessionStorage.setItem('DASHBOARDS',JSON.stringify(StoredDashBoards))
        this.props.onUpdate()
    }

    showAddLogModal = () => {
      this.setState({
        addLogVisible: true
      })
    }

    handleLogModal = () => {
      this.setState({
        addLogVisible: false
      })
    }

    updateAddModalData = (formData: any) => {
      this.addLogs(formData)
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }
    updateModalData = (formData: any) => {
      const StoredDashBoards = JSON.parse(window.sessionStorage.getItem('DASHBOARDS'))
      StoredDashBoards[this.props.dashboardIndex]['logViz']  = formData
      window.sessionStorage.setItem('DASHBOARDS',JSON.stringify(StoredDashBoards))
      this.props.onUpdate()
  }

  handleCancel = (e: any) => {
      this.setState({
          visible: false
        })
  }

  updateSearchText = (e: any) => {
    this.setState({
          searchText: e
        })
  }

  handleSearchTextChange = (e: any) => {
    this.setState({
        searchText: e.target.value
    })

  }

    render(){
        const mode = parameters.MODE
        return (
          <>

          <A10Modal
            title="Add Viz"
            width = "1080px"
            visible={this.state.visible}
            destroyOnClose={true}
            footer={null}
            zIndex={2049}>
                <AddViz updateModalData={this.updateModalData} 
                        handleCancel= {this.handleCancel}/>
          </A10Modal>
            <A10Modal
              title="Add Log"
              width = "1080px"
              visible={this.state.addLogVisible}
              destroyOnClose={true}
              footer={null}
              zIndex={2049}>
                  <AddLog updateModalData={this.updateAddModalData} 
                          isEdit = {false}
                          handleCancel= {this.handleLogModal}/>
            </A10Modal>
          
        <div className="col-md-12 c-section animate" style={this.state.headerStyle}>
        <div className="c-header">
        <A10Row>
              <A10Col span={6}>
                  <div className="title">
                        TRANSACTIONS
                        <span>
                          <span className="logs-count">80</span>     
                        </span>
                    </div>
              </A10Col>
              <A10Col span={12}>
                {/* <input type="text" className="input"/>
                <A10Icon app="global" type="question"/> */}
              </A10Col>
              <A10Col span={6} className="log-page-options">
                <A10Col span={10}>
                <select className="select-drop">
                    <option value="all">All Logs</option>
                    <option value="attack">Waf Logs</option>
                    <option value="ackattacks">Ack Waf Logs</option>
                  </select>
                </A10Col>
                <A10Col span={14}>
                      <div className="icons">
                        <div className="text-right">
                            <span className="fa fa-file-excel-o"/>
                            <span className="fa fa-bar-chart-o" onClick={this.showModal}/>
                            <span className="fa margin-right-8" onClick={()=> {this.headerStyle('66%', '34%')}}>&#xf2d0;</span>
                            <span className="fa margin-right-8" onClick={()=> {this.headerStyle('18%', '82%')}}>&#xf2d2;</span>
                            <span className="fa margin-right-8" onClick={()=> {this.headerStyle('0%', '100%')}}>&#xf2d1;</span>
                        </div>
                      </div>
                </A10Col>
              </A10Col>
            </A10Row>
        </div>
            
            <div className="logs animate" style={this.state.bodyStyle}>
            <A10Row>
                {/* <A10Col>
                     {this.state.logs.map((log : any,index : any) => {
                        return log.editable ? (
                            <div className="name-container" key={index}>
                              <A10Input
                                defaultValue={log.name}
                                onChange={this.onNameChange}
                                className="width-200px"
                              />
                              <span
                                className="pad-h-5-i"
                                onClick={() => this.changeName(index)}
                              >
                                <A10Icon
                                  app="global"
                                  type="check"
                                  className="action-icon"
                                />
                              </span>
                              <span
                                className="pad-h-5-i"
                                onClick={() => this.cancelName(index)}
                              >
                                <A10Icon
                                  app="global"
                                  type="close"
                                  className="action-icon"
                                />
                              </span>
                            </div>
                          ) : (
                              <div className="name-container" key={index}>
                                <A10Button
                                  className="width-200px border-none"
                                  onClick={() => this.loadLog(index)}
                                  key={index}
                                >
                                  {log.name}
                                </A10Button>
                                {mode === 'DEVELOPMENT' ? (
                                  <span
                                    className="pad-h-5"
                                    onClick={() => this.editName(index)}
                                  >
                                    <A10Icon
                                      app="global"
                                      type="edit"
                                      className="action-icon"
                                    />
                                  </span>
                                ) : null}
                              </div>
                            )
                          
                      })
        }
                    
                </A10Col> */}
                <A10Col span={4}>
                  <A10Select defaultValue={this.state.focusedLog} onChange={this.handleSelect}>
                    {
                      this.state.logs.map((log : any,index : any) => {
                      // tslint:disable-next-line:no-unused-expression
                        return (
                          <A10Select.Option key={index} value={index}>
                            {log.name}
                          
                          </A10Select.Option>
                        )
                      })
                    }
                  </A10Select>
                </A10Col>
                <A10Col span={12}>
                  <A10Input type="text" value={this.state.searchText} className="input" onChange={this.handleSearchTextChange}/>
                  <A10Icon app="global" type="question"/>
              </A10Col>
            </A10Row>
            <A10Row>
                <A10Col className="pull-right" span={4}>{mode === 'DEVELOPMENT' ? 
                
                // <A10Button type="primary" onClick ={() => this.addNewDashbaord()}>Add New Dashboard</A10Button>
                <A10Button className="action-button" onClick={ () => this.showAddLogModal()}>
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
                    onUpdate={this.props.onUpdate}
                    onVizUpdate={this.props.onVizUpdate}
                    getLogs = {this.props.getLogs}
                    updateSearchText = {this.updateSearchText}
                /> 
                : null
            }
            </div>
        </div>
        </>
        )
    }
}

export default setupA10Container(CollapsePanel)
