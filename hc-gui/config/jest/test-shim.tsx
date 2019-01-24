import * as React from 'react'
import * as MockDate from 'mockdate'
import { _ } from 'a10-gui-framework'

jest.mock('react-dom', () => {
  return {
    findDOMNode: () => ({
      innerText: '',
    }),
    createPortal: jest.fn(),
    render: () => {},
  }
})
jest.mock('rc-animate/lib/Animate', () =>
  jest.fn((props: IObject) => props.children),
)
jest.doMock('a10-gui-widgets', () => {
  const guiWidgets = require.requireActual('a10-gui-widgets')

  const mockModal = (props: IObject) => props.children
  mockModal.confirm = jest.fn()
  mockModal.info = jest.fn()
  mockModal.success = jest.fn()
  mockModal.error = jest.fn()
  mockModal.warning = jest.fn()
  guiWidgets.A10Modal = mockModal

  guiWidgets.A10SlidingPage = jest.fn((props: IObject) => {
    return (
      <>
        {props.isOpen ? (
          <div className="mock-a10-sliding-page">{props.children}</div>
        ) : null}
      </>
    )
  })

  const mockMessage = jest.fn()
  mockMessage.success = jest.fn()
  mockMessage.error = jest.fn()
  mockMessage.destroy = jest.fn()
  mockMessage.cleanMockData = jest.fn(() => {
    mockMessage.mockClear()
    mockMessage.success.mockClear()
    mockMessage.error.mockClear()
    mockMessage.destroy.mockClear()
  })
  guiWidgets.A10Message = mockMessage

  class DummySelect extends React.Component<any> {
    render() {
      return (
        <div
          className="mock-a10-select"
          data-mode={this.props.mode}
          data-onchange={this.props.onChange}
          data-value={
            this.props.value instanceof Array
              ? this.props.value.join(', ')
              : this.props.value
          }
        >
          {this.props.children}
        </div>
      )
    }
  }
  const mockSelect: any = DummySelect
  mockSelect.Option = (props: IObject) => {
    return <div className="a10-select-option">{props.value}</div>
  }
  guiWidgets.A10Select = mockSelect

  const mockNotification = jest.fn()
  mockNotification.open = jest.fn()
  mockNotification.success = jest.fn()
  mockNotification.error = jest.fn()
  mockNotification.info = jest.fn()
  mockNotification.warning = jest.fn()
  mockNotification.warn = jest.fn()
  mockNotification.open = jest.fn()
  mockNotification.close = jest.fn()
  mockNotification.destory = jest.fn()
  mockNotification.cleanMockData = jest.fn(() => {
    mockNotification.mockClear()
    mockNotification.open.mockClear()
    mockNotification.success.mockClear()
    mockNotification.error.mockClear()
    mockNotification.info.mockClear()
    mockNotification.warning.mockClear()
    mockNotification.warn.mockClear()
    mockNotification.open.mockClear()
    mockNotification.close.mockClear()
    mockNotification.destory.mockClear()
  })
  guiWidgets.A10Notification = mockNotification

  guiWidgets.A10Chart = {
    ...guiWidgets.A10Chart,
    Detail: 'A10Chart.Detail',
    Summary: 'A10Chart.Summary',
  }

  return guiWidgets
})
jest.doMock('react-highcharts', () => {
  return (props: any) => {
    const { config } = props
    const tooltipFormatter = _.get(config, 'tooltip.formatter', () => null)
    const tooltipEle = tooltipFormatter.call({
      ...this,
      point: {
        name: 'test',
      },
      x: 0,
      y: 0,
    })
    return (
      <>
        <div className="hightchart-config">
          {config ? JSON.stringify(config) : null}
        </div>
        <div className="hightchart-tooltip">{tooltipEle}</div>
      </>
    )
  }
})
jest.doMock('react-highcharts-no-data-to-display', () => {
  return {
    NoDataToDisplay: jest.fn(),
  }
})
jest.doMock('highcharts/highcharts-more', () => () => {})
jest.doMock('highcharts/modules/heatmap', () => () => {})
jest.doMock('highcharts/modules/treemap', () => () => {})

// --------------

const globalAny: any = global

globalAny.parameters = {
  BASE_URL: '',
  // BASE_URL = 'https://10.0.1.54:8443/api/v2'
  CLOUD_ACCOUNT_ID: '339858680748',
  DEPLOYMENT_TYPE: 'SaaS', // <onprem/SaaS>, SaaS = AWS,Azure,Openstack   onprem=vmwarer
  WHITELABELED_PROVIDER: [''],
  EDUCATION_LINK: 'http://docs.lc.a10networks.com/4.0.0/',
  TDM_URL: 'https://107.178.208.19:7443',
  VERSION_NUMBER: '4.0.1',
  BUILD_NUMBER: '78755630314bbbbe41122885ae874ed76b4aac3a',
  SUPPORT_URL: 'http://www.a10networks.com/cloud-support',
}

// --------------

jest.doMock('parameters', () => globalAny.parameters)

MockDate.set('2018-12-4')
