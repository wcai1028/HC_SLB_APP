import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import {
  A10Table,
  A10Icon,
  A10Row,
  A10Col,
  A10Collapse,
} from 'a10-gui-widgets'
export interface IEventHeaderProps {
  headerData: any
}
export interface IEventHeaderState { }
import './styles/eventheader.scss'
class EventHeader extends A10Component<IEventHeaderProps, IEventHeaderState> {
  render() {
    return (
      <A10Row className="eventHeader">
        {this.props.headerData.columns.map((colName: any, index: number) => {
          return (
            <A10Col span={8} key={index}>
              {
                colName.logo ? (
                  <A10Icon
                    style={{ fontSize: 24, verticalAlign: 'middle' }}
                    type={colName.logo}
                  />
                ) : null
              }
              <span className="colHeader" key={colName.title}>
                {colName.title}
                {colName.subText ? (
                  <span className="subText">({colName.subText}) </span>
                ) : null}
              </span>
            </A10Col>
          )
        })}
      </A10Row>
    )
  }
}
export default EventHeader
