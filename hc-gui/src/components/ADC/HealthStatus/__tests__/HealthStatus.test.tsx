import * as React from 'react'
import * as ReactTestRenderer from 'react-test-renderer'

import mockComponentProps from '../__mocks__/parameters/mockComponentProps'
const {
  headerProps,
  ongoingProps,
  lowwarnProps,
  warningProps,
  stoppedProps,
  infoProps,
  unusedProps,
  numberProps,
  undefinedProps,
} = mockComponentProps

const renderTestComponent = (props: object) => {
  const HCProvider = require('src/HCProvider').default
  const HealthStatus = require('../index').default

  return ReactTestRenderer.create(
    <HCProvider>
      <HealthStatus {...props} />
    </HCProvider>
  )
}

describe('Unit Test: HealthStatus ', () => {

  beforeEach(() => {
    jest.doMock('a10-gui-widgets', () => {
      const guiWidgets = require.requireActual('a10-gui-widgets')
      guiWidgets.A10Tooltip = (props: any) => {
        return (
          <div className="mock-a10-tooltip">
            <div className="mock-tooltip">{props.title ? props.title : null}</div>
            {props.children}
          </div>
        )
      }
      return guiWidgets
    })
  })

  afterEach(() => {
    jest.dontMock('a10-gui-widgets')
  })

  describe('should render properly: ', () => {
    test('should render properly with header type', (done: any) => {
      const testComponent = renderTestComponent(headerProps)

      setImmediate(() => {
        expect(testComponent.toJSON()).toMatchSnapshot()
        done()
      })
    })

    test('should render properly with ongoing type', (done: any) => {
      const testComponent = renderTestComponent(ongoingProps)

      setImmediate(() => {
        expect(testComponent.toJSON()).toMatchSnapshot()
        done()
      })
    })

    test('should render properly with lowwarn type', (done: any) => {
      const testComponent = renderTestComponent(lowwarnProps)

      setImmediate(() => {
        expect(testComponent.toJSON()).toMatchSnapshot()
        done()
      })
    })

    test('should render properly with warning type', (done: any) => {
      const testComponent = renderTestComponent(warningProps)

      setImmediate(() => {
        expect(testComponent.toJSON()).toMatchSnapshot()
        done()
      })
    })

    test('should render properly with stopped type', (done: any) => {
      const testComponent = renderTestComponent(stoppedProps)

      setImmediate(() => {
        expect(testComponent.toJSON()).toMatchSnapshot()
        done()
      })
    })

    test('should render properly with info type', (done: any) => {
      const testComponent = renderTestComponent(infoProps)

      setImmediate(() => {
        expect(testComponent.toJSON()).toMatchSnapshot()
        done()
      })
    })

    test('should render properly with unused type', (done: any) => {
      const testComponent = renderTestComponent(unusedProps)

      setImmediate(() => {
        expect(testComponent.toJSON()).toMatchSnapshot()
        done()
      })
    })

    test('should render properly with number type', (done: any) => {
      const testComponent = renderTestComponent(numberProps)

      setImmediate(() => {
        expect(testComponent.toJSON()).toMatchSnapshot()
        done()
      })
    })

    test('should render properly with undefined type', (done: any) => {
      const testComponent = renderTestComponent(undefinedProps)

      setImmediate(() => {
        expect(testComponent.toJSON()).toMatchSnapshot()
        done()
      })
    })

  })

  describe('should work properly: ', () => {
    test('should update properly when props change', (done: any) => {
      const testComponent = renderTestComponent(ongoingProps)

      const instance = testComponent.root.find(
        (node: any) => (node.type as any).name === 'HealthStatus',
      )
      instance.instance.componentWillReceiveProps(stoppedProps)

      setImmediate(() => {
        expect(testComponent.toJSON()).toMatchSnapshot()
        done()
      })
    })
  })

})
