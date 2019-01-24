import * as React from 'react'
import * as ReactTestRenderer from 'react-test-renderer'

const renderTestComponent = (props: IObject) => {
  const CountCard = require('../index').default

  return ReactTestRenderer.create(<CountCard {...props} />)
}

describe('should render CountCard', () => {
  it('should render with count', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponent({
      title: 'Service',
      count: 10,
      color: '#8e8e8e',
      isWide: false,
    })
    setImmediate(() => {
      expect(testComponent.toJSON()).toMatchSnapshot()
      done()
    })
  })

  it('should render with counts', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponent({
      title: 'Service',
      counts: [
        {
          color: '#fff',
          count: 10,
          name: 'HTTP',
        },
        {
          count: 10,
          name: 'TCP',
        },
      ],
      type: 'up',
      isWide: true,
    })
    setImmediate(() => {
      expect(testComponent.toJSON()).toMatchSnapshot()
      done()
    })
  })

  it('should render with up type', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponent({
      title: 'Service',
      count: 10,
      type: 'up',
      isWide: false,
    })
    setImmediate(() => {
      expect(testComponent.toJSON()).toMatchSnapshot()
      done()
    })
  })

  it('should render with down type', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponent({
      title: 'Service',
      count: 10,
      type: 'down',
      isWide: false,
    })
    setImmediate(() => {
      expect(testComponent.toJSON()).toMatchSnapshot()
      done()
    })
  })

  it('should render with partial type', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponent({
      title: 'Service',
      count: 10,
      type: 'partial',
      isWide: false,
    })
    setImmediate(() => {
      expect(testComponent.toJSON()).toMatchSnapshot()
      done()
    })
  })

  it('should render with disable type', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponent({
      title: 'Service',
      count: 10,
      type: 'disable',
      isWide: false,
    })
    setImmediate(() => {
      expect(testComponent.toJSON()).toMatchSnapshot()
      done()
    })
  })

  it('should render with unknow type', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponent({
      title: 'Service',
      count: 10,
      type: 'unknow',
      isWide: false,
    })
    setImmediate(() => {
      expect(testComponent.toJSON()).toMatchSnapshot()
      done()
    })
  })
})
