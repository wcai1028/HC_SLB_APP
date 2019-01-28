import * as React from 'react'
import {
  A10Container,
  setupA10Container,
  IA10ContainerDefaultProps,
} from 'a10-gui-framework'

import { InfoGraphic } from 'src/components/shared/InfoGraphic'
const styles = require('./styles/infographics.scss')

export interface IInfoGraphicsProps extends IA10ContainerDefaultProps {
  rowDetails: any
  selectedInfoGraphicKey: any
  onInfoGraphicUpdate(appName: string): void
  onIGUpdate(igVar: any): void
  
}
export interface IInfoGraphicsState {
  selectedInfoGraphicKey: any
}

class InfoGraphics extends A10Container<
  IInfoGraphicsProps,
  IInfoGraphicsState
> {
  state = {
    selectedInfoGraphicKey: this.props.selectedInfoGraphicKey,
  }
  selectedInfoGraphic = (name: string) => {
    this.setState({
        selectedInfoGraphicKey: name,
    })
    this.props.onInfoGraphicUpdate(name)
  }
  updateInfoGraphic = (igVar: any) => {
    this.props.onIGUpdate(igVar)
  }

  render() {
    return (
      <div>
        <div className="infographic-row">
          {this.props.rowDetails.infographics.map((key: any , index: any) => 
            {
             return    (
                <InfoGraphic
                  selectedInfoGraphicKey={this.state.selectedInfoGraphicKey}
                  details={key}
                  click={this.selectedInfoGraphic}
                  updateIG={this.updateInfoGraphic}
                  igIndex={index}
                  key = {index}
                />)
            }
            )}
        </div>
        {/* <div>
            Selected InfoGraphic - {this.state.selectedInfoGraphicKey}
        </div> */}
      </div>
    )
  }
}
export default setupA10Container(InfoGraphics)
