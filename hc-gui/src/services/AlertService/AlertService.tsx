import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { Messages } from 'src/locale/en/Messages'

export interface IAlertProps {
  isMessage: string
  messageType: number
  isKey: number | boolean
  showAlert: boolean
  showSLider?: boolean
}
export type SetAlertFn = (
  isMessage: string,
  messageType: number,
  isKey: number | boolean,
  readMore?: string,
) => void
export interface IAlertServiceProps {
  defaultMethods: any
  alertProps: any
}

export interface IAlertServiceState {
  classType: any
  isMessageSet: any
  message: string
}

class AlertService extends A10Component<
  IAlertServiceProps,
  IAlertServiceState
  > {
  Messages = new Messages()

  constructor(props: IAlertServiceProps) {
    super(props)
    this.state = {
      message: '',
      classType: 'alert-info',
      isMessageSet: false,
    }
  }

  componentWillReceiveProps(props: any) {
    if (props.alertProps.showAlert) {
      if (props.alertProps.isMessage) {
        const loaclProps = { ...props }
        this.setAlert(
          loaclProps.alertProps.isMessage,
          loaclProps.alertProps.messageType,
          loaclProps.alertProps.messageKey,
          loaclProps.alertProps.readMore,
        )
      }
    }
  }

  setAlert = (
    key: string,
    type: number,
    isKey: number | boolean,
    readMore?: string,
  ) => {
    const message = (!isKey || isKey === 0) ? key : this.Messages[key]
    let classType = 'alert-info'
    if (type === 0) {
      classType = 'alert-danger'
    } else if (type === 1) {
      classType = 'alert-success'
    }
    this.setState({
      message,
      classType,
      isMessageSet: true,
    })
  }

  closeMessage = () => {
    this.setState({
      message: '',
      classType: 'info',
      isMessageSet: false,
    })
  }
  render() {
    const classes = this.state.classType + ' ' + 'alertBox'
    return this.state.isMessageSet ? (
      <div className={classes}>
        <div className="col-md-11"> {this.state.message} </div>
        <div className="col-md-1 closeAlert" onClick={this.closeMessage}>
          {' '}
          x{' '}
        </div>
      </div>
    ) : null
  }
}
export default AlertService
