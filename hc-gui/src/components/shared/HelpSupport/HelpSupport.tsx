import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { A10Row, A10Col, A10Icon, A10Label } from 'a10-gui-widgets'

import { Configs } from 'src/constants/Configs'
const styles = require('./styles/helpsupport.scss')

export interface IHelpSupportProps {
  helpFunction(): void
}
export interface IHelpSupportState {
  helpSupportObjs: any
}

class HelpSupport extends A10Component<IHelpSupportProps, IHelpSupportState> {
  Configs = new Configs()
  state = {
    helpSupportObjs: this.Configs.HELPSUPPORT,
  }
  render() {
    return (
      <div className="row no-margin modal-section">
        <A10Row type="flex" gutter={16}>
          {this.state.helpSupportObjs.map((key: any, index: any) => {
            return (
              <A10Col
                span={6}
                key={index}
                className="help-col"
                onClick={this.props.helpFunction.bind(this, key.helpUrl)}
              >
                <div>
                  <A10Icon
                    className="help-icons"
                    style={{ fontSize: 36 }}
                    type={key.logo}
                  />
                </div>
                <span>{key.name}</span>
              </A10Col>
            )
          })}
        </A10Row>
      </div>
    )
  }
}

export default HelpSupport
