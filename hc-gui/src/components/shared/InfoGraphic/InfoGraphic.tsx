import * as React from 'react'
import {
  A10Container,
  setupA10Container,
  IA10ContainerDefaultProps,
} from 'a10-gui-framework'
import {
  A10Icon,
  A10Input
} from 'a10-gui-widgets'
import parameters from 'parameters'
const styles = require('./styles/infographic.scss')

export interface IInfoGraphicProps extends IA10ContainerDefaultProps {
  details: any
  selectedInfoGraphicKey: string
  click(appName: string): void
  updateIG(igVar: any): void
  igIndex: any
}
export interface IInfoGraphicState {}

class InfoGraphicState extends A10Container<
  IInfoGraphicProps,
  IInfoGraphicState> 
{
  constructor(props: any) {
    super(props)
  }

  igName = ''

  onNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.igName = e.currentTarget.value
  }

  editName = () => {
    let igVar: any = {
      'igIndex': this.props.igIndex,
      'option': ['editable'],
      'value': [true]
    }
    this.props.updateIG(igVar)
  }

  cancelName = () => {
    let igVar = {
      'igIndex': this.props.igIndex,
      'option': ['editable'],
      'value': [false]
    }
    this.props.updateIG(igVar)
  }

  changeName = () => {
    let igVar = {
      'igIndex': this.props.igIndex,
      'option': ['editable', 'displayName'],
      'value': [false, this.igName]
    }
    this.props.updateIG(igVar)
  }

  selectedInfoGraphic = event => {
    this.props.click(this.props.details.name)
  }

  render() {
    const mode = parameters.MODE
    const icon = {
      backgroundImage: `url(../assets/images/svg/info-graphics/${this.props.details.image}.svg)`
    }
    return (
      <div
        className={
          'infographic ' +
          (this.props.details.name === this.props.selectedInfoGraphicKey
            ? 'active'
            : '')
        }
        onClick={this.selectedInfoGraphic}
      >
        <div className="title-panel">
          <div className="ic adc" style={icon}/>
          {
            this.props.details.editable ? (
              <div className="tab-name" key={this.props.details.name}>
                <A10Input 
                defaultValue={this.props.details.displayName}
                onChange={this.onNameChange}
                className="width-200px"
                />
                <span className="pad-h-5-i" onClick={ () => this.changeName()}>
                  <A10Icon app="global" type="check" className="action-icon" />
                </span>
                <span className="pad-h-5-i" onClick={ () => this.cancelName()}>
                  <A10Icon app="global" type="close" className="action-icon" />
                </span>
              </div>
            ) : (
              <div className="tab-name" key={this.props.details.name}>
                {this.props.details.displayName}
                { mode === 'DEVELOPMENT' ? 
                <span className="pad-h-5" onClick={ () => this.editName()}>
                  <A10Icon app="global" type="edit" className="action-icon" />
                </span> : null}
              </div>
            )
          }
          {/* <div className="tab-name">{this.props.details.displayName}</div> */}
        </div>
      </div>
    )
  }
}
export default setupA10Container(InfoGraphicState)
