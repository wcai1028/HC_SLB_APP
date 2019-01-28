import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { A10Row, A10Col, A10Switch, A10Select } from 'a10-gui-widgets'
import './styles/eventitemsheader.scss'

export interface IEventItemsHeaderProps {
  items: any
}
export interface IEventItemsHeaderState {}

class EventItemsHeader extends A10Component<
  IEventItemsHeaderProps,
  IEventItemsHeaderState
> {
  render() {
    return (
      <A10Row className="eventHeader">
        {this.props.items.contents.map((item: any, index: number) => {
          return item.type === 'switch' ? (
            <A10Col span={8} key={index} className={item.name}>
              <A10Switch defaultChecked onChange="{ onChange}" />
              {item.name}
            </A10Col>
          ) : item.type === 'dropDown' ? (
            <A10Col span={8} key={index}>
              <A10Select
                value={item.options[0].value}
                onChange="{this.handleChange.bind(this, 'objectType')}"
                className="bigSelect"
              >
                {item.options.map((option: any, index: number) => {
                  return (
                    <A10Select.Option key={index} value={option.value}>
                      {option.name}
                    </A10Select.Option>
                  )
                })}
              </A10Select>
            </A10Col>
          ) : item.type === 'histogram' ? (
            <A10Col span={8} key={index}>
              'hist'
            </A10Col>
          ) : null
        })}
      </A10Row>
    )
  }
}
export default EventItemsHeader
