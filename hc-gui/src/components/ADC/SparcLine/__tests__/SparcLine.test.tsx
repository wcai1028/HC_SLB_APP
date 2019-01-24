import * as React from 'react'
import * as ReactTestRenderer from 'react-test-renderer'
import * as moxios from 'moxios'
import HCProvider from 'src/HCProvider'
import fakeData from '../__mocks__/FakeData'
import moment from 'moment'

const defaultChartConfig = {
  chart: {
    animation: false,
    type: 'area',
    height: '60px',
  },
  credits: { enabled: false },
  title: {
    text: '',
  },
  time: {
    timezoneOffset: new Date().getTimezoneOffset(),
  },
  xAxis: {
    gridLineWidth: '0px',
    tickPosition: 'inside',
    type: 'datetime',
    labels: {
      // format: '{value:%Y-%b-%e %H:%M}',
      enabled: false,
    },
  },
  yAxis: {
    gridLineWidth: '0px',
    labels: { enabled: false },
    title: { text: '' },
  },
  tooltip: {
    xDateFormat: '%Y-%b-%e %H:%M',
    valueDecimals: 1,
    formatter: function() {
      return (
        this.point.name +
        '<br/>' +
        moment(this.x).format('MM/DD, HH:mm:ss') +
        ' : <b>' +
        Math.round(this.y * 100) / 100 +
        '</b> /s<br/>.'
      )
    },
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    area: {
      animation: { duration: 0 },
      stacking: 'normal',
      lineColor: '#887cc6',
      lineWidth: 1,
      color: 'rgba(219, 217, 238, 0.46)',
    },
  },
}
const renderTestComponent = () => {
  const SparcLine = require('../index').default
  return ReactTestRenderer.create(
    <HCProvider>
      <SparcLine seriesData={fakeData} />
    </HCProvider>,
  )
}
const renderTestComponentWithChartConfig = () => {
  const SparcLine = require('../index').default
  return ReactTestRenderer.create(
    <HCProvider>
      <SparcLine seriesData={fakeData} chartConfig={defaultChartConfig} />
    </HCProvider>,
  )
}
const renderTestComponentWithEmpty = () => {
  const SparcLine = require('../index').default
  return ReactTestRenderer.create(
    <HCProvider>
      <SparcLine />
    </HCProvider>,
  )
}

const getComponentInstance = (testRenderer: any) => {
  const testInstance = testRenderer.root
  const testComponent = testInstance.find(
    (node: any) => node.type.name === 'SparcLine',
  )
  return testComponent.instance
}

beforeEach(() => {
  moxios.install()
})
afterEach(() => {
  moxios.uninstall()
})

describe('should render properly', () => {
  test('with EMPTY chartConfig', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponent()
    // wait all component are rendered ready
    setImmediate(() => {
      expect(testComponent.toJSON()).toMatchSnapshot()
      done()
    })
  })
  test('with seriesData has mockData', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponentWithChartConfig()
    // wait all component are rendered ready
    setImmediate(() => {
      expect(testComponent.toJSON()).toMatchSnapshot()
      done()
    })
  })
  test('with EMPTY seriesData', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponentWithEmpty()
    // wait all component are rendered ready
    setImmediate(() => {
      expect(testComponent.toJSON()).toMatchSnapshot()
      done()
    })
  })
})
