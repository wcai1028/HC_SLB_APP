import * as React from 'react'
import {
  A10Container,
  setupA10Container,
  IA10ContainerDefaultProps,
} from 'a10-gui-framework'
import {
  A10Icon,
  A10Input,
  A10Select
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
  igIcon = ''

  onIconChange = (value: any) => {
    this.igIcon = value
  }

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
      'option': ['editable', 'displayName', 'image'],
      'value': [false,
                this.igName ? this.igName : this.props.details.displayName,
                this.igIcon ? this.igIcon : this.props.details.image
              ]
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
    const icons = [ {
      bg: {
        backgroundImage: `url(../assets/images/svg/info-graphics/icon-application.svg)`
      },
      name: 'icon-application'
    }, {
      bg: {
        backgroundImage: `url(../assets/images/svg/info-graphics/icon-client.svg)`
      },
      name: 'icon-client'
    }, {
      bg: {
        backgroundImage: `url(../assets/images/svg/info-graphics/icon-cluster-server.svg)`
      },
      name: 'icon-cluster-server'
    }, {
      bg: {
        backgroundImage: `url(../assets/images/svg/info-graphics/icon-ladc.svg)`
      },
      name: 'icon-ladc'
    }, {
      bg: {
        backgroundImage: `url(../assets/images/svg/info-graphics/icon-wan.svg)`
      },
      name: 'icon-wan'
    }]
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
          {/* <div className="ic adc" style={icon}/> */}
          {
            this.props.details.editable ? (
            <>
              <A10Select defaultValue={this.props.details.image} className="mxw100" onChange={this.onIconChange}>
              {icons.map( (obj, index) => {
                return (
                  <A10Select.Option value={obj.name} key={index}>
                    <div className="ic adc" style={obj.bg}/>
                  </A10Select.Option>
                )
              })}
              </A10Select>
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
            </>
            ) : (
              <>
              <div className="ic adc" style={icon}/>
              <div className="tab-name" key={this.props.details.name}>
                {this.props.details.displayName}
                { mode === 'DEVELOPMENT' ? 
                <span className="pad-h-5" onClick={ () => this.editName()}>
                  <A10Icon app="global" type="edit" className="action-icon" />
                </span> : null}
              </div>
              </>
            )
          }
          {/* <div className="tab-name">{this.props.details.displayName}</div> */}
        </div>
      </div>
    )
  }
}
export default setupA10Container(InfoGraphicState)
