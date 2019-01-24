import * as React from 'react'
import * as ReactTestRenderer from 'react-test-renderer'
import * as moxios from 'moxios'
import HCProvider from 'src/HCProvider'

const renderTestComponent = () => {
  const TestSpan = require('../index').default
  return ReactTestRenderer.create(
    <HCProvider>
      <TestSpan />
    </HCProvider>,
  )
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
})
  