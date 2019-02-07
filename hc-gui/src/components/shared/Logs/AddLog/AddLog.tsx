import * as React from 'react'
import {
    A10Container,
    setupA10Container
  } from 'a10-gui-framework'
  import {
    A10Form,
    A10Input,
    A10Button,
    A10Select
  } from 'a10-gui-widgets'
  const FormItem = A10Form.Item
import * as endPoint from 'src/constants/AppDashboards/endpoints.json'
const styles = require('./styles/addlog.scss')

export interface IAddLogProps {
    updateModalData: any
    handleCancel: any
}
export interface IAddLogState {
    logForm: any,
    dataSourceSelected: any,
    endPointSelected: any,
    metricSelected:  any,
}

class AddLog extends A10Container<IAddLogProps, IAddLogState> {

    state = {
        logForm: {
            dataSource : '',
            endPoint : '',
            metrics :'',
            name: ''
        },
        dataSourceSelected: '',
        endPointSelected: '',
        metricSelected: '',
    }
    formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      }
    
    buttonItemLayout = {
        wrapperCol: { span: 14, offset: 8 },
      }

    handleChange = (stateName: any, e: any) => {
    const tempState = this.state
    if(stateName === 'dataSource'){
        tempState.dataSourceSelected = endPoint.endPoints[e]
        tempState.logForm.dataSource = e
        tempState.logForm.endPoint = ''
        tempState.logForm.metrics = ''
        // @ts-ignore
        this.setState({
        dataSourceSelected :  tempState.dataSourceSelected ,
        logForm:  tempState.logForm
        })
        return
    }
    if(stateName === 'endPoint'){
        tempState.endPointSelected = tempState.dataSourceSelected[e]
        tempState.logForm[stateName] = e
        tempState.logForm.metrics = ''
        
        this.setState({
        endPointSelected :  tempState.endPointSelected ,
        logForm:  tempState.logForm
        })
        return
    }
    if(stateName === 'metrics'){
        tempState.metricSelected = tempState.endPointSelected[e]
        tempState.logForm[stateName] = e
        this.setState({
        metricSelected :  tempState.metricSelected ,
        logForm:  tempState.logForm
        })
        return
    }
    if(stateName === 'name'){
        tempState.logForm[stateName] = e.target.value
        this.setState({
            logForm: tempState.logForm
        })
    }
    
        
    }
    handleOk = (e: any) => {
        this.props.updateModalData(this.state.logForm)
        this.handleCancel({})
    }
    handleCancel = (e: any) => {
        this.setState({
            logForm: {
                dataSource : '',
                endPoint : '',
                metrics :'',
                name: ''
            }
        })
        this.props.handleCancel()
    }

    renderSourceOptions = () => {
        const keys = Object.keys(endPoint.endPoints)
        return keys.map((name: any, i: number) => {
          return (
            <A10Select.Option
              key={'dataSource' + i}
              value={name}
            >
            {name}
            </A10Select.Option>
          )
        })
    }

    renderSelectOptions = (stateName: string, labelName: string) =>{
        const keys = Object.keys(this.state[stateName])
        return keys.map((name: any, i: number) => {
          return (
            <A10Select.Option
              key={ labelName + i}
              value={name}
            >
            {name}
            </A10Select.Option>
          )
        })
      }

    render(){
        return(
            <A10Form layout="horizontal">
              <FormItem
          label="Name"
            {...this.formItemLayout}
          >
           <A10Input
                  type="text"
                  defaultValue={this.state.logForm.name}
                  onChange={this.handleChange.bind(this, 'name')}
                />
          </FormItem>
          <FormItem
          label="End Point"
            {...this.formItemLayout}
          >
          <A10Select
                value={this.state.logForm.dataSource}
                placeholder={'Select DataSource'}
                onChange={this.handleChange.bind(this, 'dataSource')}
              >
               {this.renderSourceOptions()}
              
            </A10Select>
          </FormItem>
          <FormItem
          label="Data Source Point"
            {...this.formItemLayout}
          >
           <A10Select
                value={this.state.logForm.endPoint}
                onChange={this.handleChange.bind(this, 'endPoint')}
              >
                  {this.renderSelectOptions('dataSourceSelected', 'endPoint')}
              </A10Select>
          </FormItem>

          <FormItem
          label="Metrics"
            {...this.formItemLayout}
          >
          <A10Select
                value={this.state.logForm.metrics}
                onChange={this.handleChange.bind(this, 'metrics')}
              >
                  {this.renderSelectOptions('endPointSelected', 'metrics')}
              </A10Select>
          </FormItem>
          <FormItem {...this.buttonItemLayout}>
            <A10Button className="mr-20" type="primary" onClick={this.handleOk}>Submit</A10Button>
            <A10Button type="default" onClick={this.handleCancel}>Cancel</A10Button>
          </FormItem>
          </A10Form>
        )
    }
}

export default setupA10Container(AddLog)