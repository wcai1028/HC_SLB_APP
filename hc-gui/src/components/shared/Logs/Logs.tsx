import * as React from 'react'
import {
    A10Container,
    setupA10Container
  } from 'a10-gui-framework'
  import {
    A10Modal,
    A10Button,
    A10Icon,
    A10Col,
    A10Row
  } from 'a10-gui-widgets'
  import {AddLog} from 'src/components/shared/Logs/AddLog'
import parameters from 'parameters'

export interface ILogsProps {
    dashboardIndex : number
    onUpdate : any
    dashboard : any
    log: any
}
export interface ILogsState {
    visible: boolean
}

class Logs extends A10Container<ILogsProps, ILogsState> {

    state = {
        visible: false,
    }

    updateModalData = (formData: any) => {
        console.log('updateModalData', formData)
        const StoredDashBoards = JSON.parse(window.sessionStorage.getItem('DASHBOARDS'))
        StoredDashBoards[this.props.dashboardIndex]['logs'][this.props.log.key-1].viz.push(formData)
        window.sessionStorage.setItem('DASHBOARDS',JSON.stringify(StoredDashBoards))
        this.props.onUpdate()
    }

    handleCancel = (e: any) => {
        this.setState({
            visible: false,
          })
    }

    showModal = () => {
        this.setState({
          visible: true,
        })
      }

    render(){
        const mode = parameters.MODE
        return(
            <>
            <A10Row>
            <A10Col span={2}>
            {this.props.log.name} - {this.props.log.key}
            </A10Col>
            <A10Col span={2}>{mode === 'DEVELOPMENT' ? 
                
                // <A10Button type="primary" onClick ={() => this.addNewDashbaord()}>Add New Dashboard</A10Button>
                <A10Button className="action-button" onClick={this.showModal}>
                           <A10Icon type="plus" className="action-icon" />
                </A10Button>
                : null}
                </A10Col>
            </A10Row>
            <A10Modal
            title="Add Log"
            width = "1080px"
            visible={this.state.visible}
            destroyOnClose={true}
            footer={null}
            zIndex={2049}>
                <AddLog updateModalData={this.updateModalData} 
                        handleCancel= {this.handleCancel}/>
            </A10Modal>
            </>
        )
    }
}

export default setupA10Container(Logs)