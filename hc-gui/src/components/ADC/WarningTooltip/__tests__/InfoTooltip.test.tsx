import * as React from 'react'
import * as ReactTestRenderer from 'react-test-renderer'

import { mockInfoTooltipProps } from '../__mocks__/parameters/mockComponentProps'

const renderTestComponent = (props: any) => {
  const HCProvider = require('src/HCProvider').default
  const InfoTooltip = require('../InfoTooltip').default

  return ReactTestRenderer.create(
    <HCProvider>
      <InfoTooltip {...props} />
    </HCProvider>
  )
}

describe('Unit Test: InfoTooltip ', () => {

  describe('should render properly: ', () => {
    test('should render properly with empty props', (done: any) => {
      const props = mockInfoTooltipProps(true, false, false)
      const testComponent = renderTestComponent(props)

      setImmediate(() => {
        expect(testComponent.toJSON()).toMatchSnapshot()
        done()
      })
    })

    test('should render properly with default props', (done: any) => {
      const props = mockInfoTooltipProps(false, true, false)
      const testComponent = renderTestComponent(props)

      setImmediate(() => {
        expect(testComponent.toJSON()).toMatchSnapshot()
        done()
      })
    })

    test('should render properly with text', (done: any) => {
      const props = mockInfoTooltipProps(false, false, true)
      const testComponent = renderTestComponent(props)

      setImmediate(() => {
        expect(testComponent.toJSON()).toMatchSnapshot()
        done()
      })
    })

    test('should render properly with component', (done: any) => {
      const props = mockInfoTooltipProps(false, false, false)
      const testComponent = renderTestComponent(props)

      setImmediate(() => {
        expect(testComponent.toJSON()).toMatchSnapshot()
        done()
      })
    })

  })

})
