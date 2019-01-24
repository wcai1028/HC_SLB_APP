import * as React from 'react'
import * as ReactTestRenderer from 'react-test-renderer'
import * as moxios from 'moxios'
import HCProvider from 'src/HCProvider'

const renderTestComponent = () => {
  const A10IconTextGroup = require('../index').default
  return ReactTestRenderer.create(
    <HCProvider>
      <A10IconTextGroup />
    </HCProvider>,
  )
}
const renderTestComponentWithDisable = () => {
  const A10IconTextGroup = require('../index').default
  return ReactTestRenderer.create(
    <HCProvider>
      <A10IconTextGroup disabled="true" />
    </HCProvider>,
  )
}

const getComponentInstance = (testRenderer: any) => {
  const testInstance = testRenderer.root
  const testComponent = testInstance.find(
    (node: any) => node.type.name === 'A10IconTextGroup',
  )
  return testComponent.instance
}
beforeEach(() => {
  moxios.install()
})
afterEach(() => {
  moxios.uninstall()
})

describe('test component: A10IconTextGroup', () => {
  test('should render properly', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponent()
    setImmediate(() => {
      expect(testComponent.toJSON()).toMatchSnapshot()
      done()
    })
  })
  test('should render properly with DISABLED is TRUE', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponentWithDisable()
    setImmediate(() => {
      expect(testComponent.toJSON()).toMatchSnapshot('DISABLED IS TRUE')
      done()
    })
  })
})
