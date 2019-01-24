import * as React from 'react'
import * as ReactTestRenderer from 'react-test-renderer'

import mockComponentProps from '../__mocks__/parameters/mockComponentProps'

const renderFormatSlidingPage = (props: any) => {
  const HCProvider = require('src/HCProvider').default
  const FormatSlidingPage = require('../index').default

  return ReactTestRenderer.create(
    <HCProvider>
      <FormatSlidingPage {...props} />
    </HCProvider>
  )
}

describe('Unit Test: FormatSlidingPage ', () => {

  beforeEach(() => {
    jest.doMock('a10-gui-widgets', () => {
      const a10GuiWidgets = require.requireActual('a10-gui-widgets')
      a10GuiWidgets.A10SlidingPage = (cProps: any) => {
        return <>
          {
            cProps.isOpen ?
              <div className="mock-a10-sliding-page">
                {cProps.children}
              </div> : null
          }
        </>
      }
      return a10GuiWidgets
    })
  })

  afterEach(() => {
    jest.dontMock('a10-gui-widgets')
  })

  describe('should render properly: ', () => {
    test('should render properly with min props', (done: any) => {
      const props = mockComponentProps()
      const testComponent = renderFormatSlidingPage(props)

      setImmediate(() => {
        expect(testComponent.toJSON()).toMatchSnapshot()
        done()
      })
    })

    test('should render properly with common props', (done: any) => {
      const mockCallbackOK = jest.fn()
      const mockCallbackCancel = jest.fn()
      const props = mockComponentProps(false, mockCallbackOK, mockCallbackCancel)
      const testComponent = renderFormatSlidingPage(props)

      setImmediate(() => {
        expect(testComponent.toJSON()).toMatchSnapshot()
        done()
      })
    })

    test('should render properly with special props', (done: any) => {
      const mockCallbackOK = jest.fn()
      const mockCallbackCancel = jest.fn()
      const props = mockComponentProps(true, mockCallbackOK, mockCallbackCancel)
      const testComponent = renderFormatSlidingPage(props)

      setImmediate(() => {
        expect(testComponent.toJSON()).toMatchSnapshot()
        done()
      })
    })

  })

  describe('should work properly: ', () => {
    test('should use default callback functions when provided with min props', (done: any) => {
      const props = mockComponentProps()
      const testComponent = renderFormatSlidingPage(props)

      setImmediate(() => {
        const form = testComponent.root.find(
          (node: any) => (node.type as any).name === 'FormatForm',
        )
        form.instance.onClickSaveButton()
        form.instance.onClickCancelButton()
        form.instance.onClickBack()
        done()
      })
    })

    test('should use callbacks properly when provided with common props', (done: any) => {
      const mockCallbackOK = jest.fn()
      const mockCallbackCancel = jest.fn()
      const props = mockComponentProps(false, mockCallbackOK, mockCallbackCancel)
      const testComponent = renderFormatSlidingPage(props)

      setImmediate(() => {
        const form = testComponent.root.find(
          (node: any) => (node.type as any).name === 'FormatForm',
        )
        form.instance.onClickSaveButton()
        form.instance.onClickCancelButton()
        form.instance.onClickBack()

        setImmediate(() => {
          expect(mockCallbackOK.mock.calls.length).toBe(1)
          expect(mockCallbackCancel.mock.calls.length).toBe(2)
          done()
        })
      })
    })

    test('should use callbacks properly when provided with special props', (done: any) => {
      const mockCallbackOK = jest.fn()
      const mockCallbackCancel = jest.fn()
      const props = mockComponentProps(true, mockCallbackOK, mockCallbackCancel)
      const testComponent = renderFormatSlidingPage(props)

      setImmediate(() => {
        const form = testComponent.root.find(
          (node: any) => (node.type as any).name === 'FormatForm',
        )
        form.instance.onClickSaveButton()
        form.instance.onClickCancelButton()
        form.instance.onClickBack()

        setImmediate(() => {
          expect(mockCallbackOK.mock.calls.length).toBe(1)
          expect(mockCallbackCancel.mock.calls.length).toBe(2)
          done()
        })
      })
    })
  })

})
