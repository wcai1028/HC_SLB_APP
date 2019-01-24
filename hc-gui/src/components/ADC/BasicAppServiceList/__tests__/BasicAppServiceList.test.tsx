import * as React from 'react'
import * as ReactTestRenderer from 'react-test-renderer'

import ContextProvider from '../__mocks__/components/ContextProvider'
import mockComponentProps from '../__mocks__/parameters/mockComponentProps'

const renderTestComponent = (props: any, openSlidingPage: any) => {
  const HCProvider = require('src/HCProvider').default
  const BasicAppServiceList = require('../index').default

  return ReactTestRenderer.create(
    <HCProvider>
      <ContextProvider openSlidingPage={openSlidingPage}>
        <BasicAppServiceList {...props} />
      </ContextProvider>
    </HCProvider>
  )
}

describe('Unit Test: BasicAppServiceList ', () => {

  beforeEach(() => {
    jest.doMock('../../FormatSlidingPage', () => {
      interface IFormatSlidingPageProps {
        isOpen: boolean
        title: string
        description: string
        customizedButtons: JSX.Element
        onRequestClose: () => void
      }

      class FormatSlidingPage extends React.Component<IFormatSlidingPageProps> {
        render() {
          const { isOpen, title, description, customizedButtons, onRequestClose } = this.props
          return (
            isOpen ? <div className="mock-format-sliding-page" onClick={onRequestClose}>
              <div>{title}</div>
              <div>{description}</div>
              <div>{customizedButtons}</div>
            </div> : null
          )
        }
      }

      return FormatSlidingPage
    })
  })

  afterEach(() => {
    jest.dontMock('../../FormatSlidingPage')
  })

  describe('should render properly: ', () => {
    test('should render properly when data is loading', (done: any) => {
      const mockOpenSlidingPage = jest.fn()
      const props = mockComponentProps(true)
      const testComponent = renderTestComponent(props, mockOpenSlidingPage)

      setImmediate(() => {
        expect(testComponent.toJSON()).toMatchSnapshot()
        done()
      })
    })

    test('should render properly when data is ready', (done: any) => {
      const mockOpenSlidingPage = jest.fn()
      const props = mockComponentProps(false)
      const testComponent = renderTestComponent(props, mockOpenSlidingPage)

      setImmediate(() => {
        expect(testComponent.toJSON()).toMatchSnapshot()
        done()
      })
    })

    test('should render sliding page properly', (done: any) => {
      const mockOpenSlidingPage = jest.fn()
      const props = mockComponentProps(false)
      const testComponent = renderTestComponent(props, mockOpenSlidingPage)

      const list = testComponent.root.find(
        (node: any) => (node.type as any).name === 'BasicAppServiceList',
      )
      list.instance.setSlidingPage(true, props.data[0])

      setImmediate(() => {
        expect(testComponent.toJSON()).toMatchSnapshot()
        done()
      })
    })

  })

  describe('should work properly: ', () => {
    test('should work properly when call onCreateAppService', (done: any) => {
      const mockOpenSlidingPage = jest.fn()
      const props = mockComponentProps(false)
      const testComponent = renderTestComponent(props, mockOpenSlidingPage)

      const list = testComponent.root.find(
        (node: any) => (node.type as any).name === 'BasicAppServiceList',
      )
      list.instance.setSlidingPage(true, props.data[0])

      setImmediate(() => {
        list.instance.onCreateAppService()

        setImmediate(() => {
          expect(testComponent.toJSON()).toMatchSnapshot()
          done()
        })
      })
    })

    test('should work properly when call onCloseSlidingPage', (done: any) => {
      const mockOpenSlidingPage = jest.fn()
      const props = mockComponentProps(false)
      const testComponent = renderTestComponent(props, mockOpenSlidingPage)

      const list = testComponent.root.find(
        (node: any) => (node.type as any).name === 'BasicAppServiceList',
      )
      list.instance.setSlidingPage(true, props.data[0])

      setImmediate(() => {
        list.instance.onCloseSlidingPage()

        setImmediate(() => {
          expect(testComponent.toJSON()).toMatchSnapshot()
          done()
        })
      })
    })

  })

})
