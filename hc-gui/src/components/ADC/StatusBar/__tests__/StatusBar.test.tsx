import * as React from 'react'
import * as ReactTestRenderer from 'react-test-renderer'
import * as moxios from 'moxios'
import HCProvider from 'src/HCProvider'

const renderTestComponent = () => {
  const StatusBar = require('../index').default
  return ReactTestRenderer.create(
    <HCProvider>
      <StatusBar />
    </HCProvider>,
  )
}
const renderTestComponentWithAllAttr = () => {
  const StatusBar = require('../index').default
  return ReactTestRenderer.create(
    <HCProvider>
      <StatusBar
        text="5"
        type="up"
        color="#00aa6c"
        isRect={true}
        isBig={true}
        tip={<React.Fragment />}
      />
      <StatusBar
        text="cp"
        type="down"
        color="#00aa6c"
        isRect={true}
        isBig={false}
        tip={<React.Fragment />}
      />
      <StatusBar
        text="pa"
        type="partial"
        color="#00aa6c"
        isRect={true}
        isBig={false}
        tip={<React.Fragment />}
      />
      <StatusBar
        text="dis"
        type="disable"
        color="#00aa6c"
        isRect={true}
        isBig={false}
        tip={<React.Fragment />}
      />
      <StatusBar
        text="none"
        type="none"
        color="#00aa6c"
        isRect={true}
        isBig={false}
        tip={<React.Fragment />}
      />
      <StatusBar
        text="un"
        type="unknow"
        color="#00aa6c"
        isRect={true}
        tip={<React.Fragment />}
      />
    </HCProvider>,
  )
}

const getComponentInstance = (testRenderer: any) => {
  const testInstance = testRenderer.root
  const testComponent = testInstance.find(
    (node: any) => node.type.name === 'StatusBar',
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
  test('with EMPTY Attribute', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponent()
    // wait all component are rendered ready
    setImmediate(() => {
      expect(testComponent.toJSON()).toMatchSnapshot()
      done()
    })
  })
  test('with ALL States of All Attributes', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponentWithAllAttr()
    // wait all component are rendered ready
    setImmediate(() => {
      expect(testComponent.toJSON()).toMatchSnapshot()
      done()
    })
  })
})
