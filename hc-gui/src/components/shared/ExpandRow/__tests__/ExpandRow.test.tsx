import * as React from 'react'
import * as ReactTestRenderer from 'react-test-renderer'
import * as moxios from 'moxios'
import HCProvider from 'src/HCProvider'

const renderTestComponent = () => {
  const ExpandRow = require('../index').default
  return ReactTestRenderer.create(
    <HCProvider>
      <ExpandRow />
    </HCProvider>,
  )
}
const renderTestComponentWithSupportToggle = () => {
  const ExpandRow = require('../index').default
  return ReactTestRenderer.create(
    <HCProvider>
      <ExpandRow supportToggle="true" />
    </HCProvider>,
  )
}

const getComponentInstance = (testRenderer: any) => {
  const testInstance = testRenderer.root
  const testComponent = testInstance.find(
    (node: any) => node.type.name === 'ExpandRow',
  )
  return testComponent.instance
}
beforeEach(() => {
  moxios.install()
})
afterEach(() => {
  moxios.uninstall()
})

describe('test component: ExpandRow', () => {
  test('should render properly with supportToggle is FASLE', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponent()
    const instance = getComponentInstance(testComponent)
    instance.state.expanded = true
    instance.render()
    setImmediate(() => {
      expect(testComponent.toJSON()).toMatchSnapshot(
        'supportToggle IS FASLE and expanded is True',
      )
      done()
    })
  })
  test('should render properly', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponentWithSupportToggle()
    setImmediate(() => {
      expect(testComponent.toJSON()).toMatchSnapshot(
        'supportToggle is TRUE and expanded is false',
      )
      done()
    })
  })
})

test('onExpand should render properly', (done: jest.DoneCallback) => {
  const testComponent = renderTestComponentWithSupportToggle()
  const instance = getComponentInstance(testComponent)
  instance.onExpand()
  setImmediate(() => {
    expect(instance.state.expanded).toBe(true)
    done()
  })
})
