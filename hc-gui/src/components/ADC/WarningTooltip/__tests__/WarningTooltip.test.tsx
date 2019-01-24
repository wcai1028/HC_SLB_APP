import * as React from 'react'
import * as ReactTestRenderer from 'react-test-renderer'

import { mockWarningTooltipProps } from '../__mocks__/parameters/mockComponentProps'

const renderTestComponent = (props: any) => {
  const HCProvider = require('src/HCProvider').default
  const WarningTooltip = require('../index').default

  return ReactTestRenderer.create(
    <HCProvider>
      <WarningTooltip {...props} />
    </HCProvider>
  )
}

describe('Unit Test: WarningTooltip ', () => {

  describe('should render properly: ', () => {
    test('should render properly with min props', (done: any) => {
      const mockConfirm = jest.fn()
      const mockVisibleChange = jest.fn()
      const props = mockWarningTooltipProps(true, mockConfirm, mockVisibleChange)
      const testComponent = renderTestComponent(props)

      setImmediate(() => {
        expect(testComponent.toJSON()).toMatchSnapshot()
        done()
      })
    })

    test('should render properly with common props', (done: any) => {
      const mockConfirm = jest.fn()
      const mockVisibleChange = jest.fn()
      const props = mockWarningTooltipProps(false, mockConfirm, mockVisibleChange)
      const testComponent = renderTestComponent(props)

      setImmediate(() => {
        expect(testComponent.toJSON()).toMatchSnapshot()
        done()
      })
    })

    test('should render properly when props changes', (done: any) => {
      const mockConfirm = jest.fn()
      const mockVisibleChange = jest.fn()
      const props = mockWarningTooltipProps(true, mockConfirm, mockVisibleChange)
      const testComponent = renderTestComponent(props)

      const tooltip = testComponent.root.find(
        (node: any) => (node.type as any).name === 'WarningTooltip',
      )
      const newprops = mockWarningTooltipProps(false, mockConfirm, mockVisibleChange)
      tooltip.instance.componentWillReceiveProps(newprops)

      setImmediate(() => {
        expect(testComponent.toJSON()).toMatchSnapshot()
        done()
      })
    })

  })

})
