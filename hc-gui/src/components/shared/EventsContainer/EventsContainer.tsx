import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { A10Collapse } from 'a10-gui-widgets'
import EventContainer from './EventContainer'
import EventHeader from './EventHeader'
export interface IEventsContainerProps {
  events: any
}
export interface IEventsContainerState {}
import './styles/eventscontainer.scss'

class EventsContainer extends A10Component<
  IEventsContainerProps,
  IEventsContainerState
> {
  render() {
    return (
      <>
        {this.props.events.map((key: any, index: any) => {
          return (
            <A10Collapse
              bordered={true}
              defaultActiveKey={['0']}
              className={index == 0 ? "" : "marginTop20"}
            >
              <A10Collapse.Panel
                header={<EventHeader headerData={key} />}
                key={index}
                className="white"
              >
                {key.contents.map((subKey: any, subIndex: number) => {
                  return (
                    <A10Collapse
                      bordered={false}
                      defaultActiveKey={['0']}
                      className="marginTop20"
                    >
                      <A10Collapse.Panel
                        header={subKey.name}
                        key={subIndex}
                        className="white"
                      >
                        <EventContainer items={subKey.items} />
                      </A10Collapse.Panel>
                    </A10Collapse>
                  )
                })}
              </A10Collapse.Panel>
            </A10Collapse>
          )
        })}
      </>
    )
  }
}
export default EventsContainer
