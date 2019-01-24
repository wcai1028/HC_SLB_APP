import * as React from 'react'
import * as ReactTestRenderer from 'react-test-renderer'
import * as moxios from 'moxios'
import HCProvider from 'src/HCProvider'

const renderTestComponent = () => {
  const A10Panel = require('../index').default
  return ReactTestRenderer.create(
    <HCProvider>
      <A10Panel />
    </HCProvider>,
  )
}
const renderTestComponentWithProps = () => {
  const A10Panel = require('../index').default
  return ReactTestRenderer.create(
    <HCProvider>
      <A10Panel
        menu="Test page"
        isFormContent="false"
        shouldShowTitle="false"
      />
    </HCProvider>,
  )
}

const getComponentInstance = (testRenderer: any) => {
  const testInstance = testRenderer.root
  const testComponent = testInstance.find(
    (node: any) => node.type.name === 'A10Panel',
  )
  return testComponent.instance
}
beforeEach(() => {
  moxios.install()
})
afterEach(() => {
  moxios.uninstall()
})

describe('test component: A10Panel', () => {
  test('should render properly', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponent()
    setImmediate(() => {
      expect(testComponent.toJSON()).toMatchSnapshot()
      done()
    })
  })
  test('should render properly with props', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponentWithProps()
    setImmediate(() => {
      expect(testComponent.toJSON()).toMatchSnapshot('Props is not default')
      done()
    })
  })
})
