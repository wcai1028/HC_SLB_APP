import * as React from 'react'
import * as ReactTestRenderer from 'react-test-renderer'

import mockComponentProps from '../__mocks__/parameters/mockComponentProps'

const renderTestComponent = (props: any) => {
  const HCProvider = require('src/HCProvider').default
  const AflexCodeEditor = require('../index').default

  return ReactTestRenderer.create(
    <HCProvider>
      <AflexCodeEditor {...props} />
    </HCProvider>
  )
}

describe('Unit Test: AflexCodeEditor ', () => {
  const addLineClass = jest.fn()
  const setValue = jest.fn()
  const getCodeMirror = jest.fn(function() {
    return {
      addLineClass,
      setValue,
    }
  })

  beforeEach(() => {
    addLineClass.mockClear()
    setValue.mockClear()
    getCodeMirror.mockClear()

    jest.doMock('react-codemirror', () => {
      interface ICodeMirrorProps {
        value: string,
        onChange: (value: string) => void,
        options: object,
      }
      class CodeMirror extends React.Component<ICodeMirrorProps> {
        getCodeMirror = getCodeMirror

        onChange = (value: string) => {
          const { onChange } = this.props
          if (onChange) {
            onChange(value)
          }
        }

        render() {
          const { value, options } = this.props
          return <div>
              <span>Code Mirror</span>
              <span>value: {value}</span>
              <span>options: {JSON.stringify(options)}</span>
            </div>
        }
      }

      return CodeMirror
    })
  })

  afterEach(() => {
    addLineClass.mockClear()
    setValue.mockClear()
    getCodeMirror.mockClear()

    jest.dontMock('react-codemirror')
  })

  describe('should render properly: ', () => {
    test('should render properly without diff in props', (done: any) => {
      const mockAFlexChange = jest.fn()
      const props = mockComponentProps(mockAFlexChange)
      const testComponent = renderTestComponent(props)

      setImmediate(() => {
        expect(testComponent.toJSON()).toMatchSnapshot()
        done()
      })
    })

  })

  describe('should work properly: ', () => {
    test('should work properly without diff in props', (done: any) => {
      const mockAFlexChange = jest.fn()
      const props = mockComponentProps(mockAFlexChange)
      const testComponent = renderTestComponent(props)

      const codeMirror = testComponent.root.find(
        (node: any) => (node.type as any).name === 'CodeMirror',
      )
      codeMirror.instance.onChange('test value')

      setImmediate(() => {
        expect(mockAFlexChange.mock.calls.length).toBe(1)
        expect(mockAFlexChange.mock.calls[0].length).toBe(1)
        expect(mockAFlexChange.mock.calls[0][0]).toBe('test value')
        expect(getCodeMirror.mock.calls.length).toBe(1)
        expect(addLineClass.mock.calls.length).toBe(0)
        done()
      })
    })

    test('should update properly when value changes', (done: any) => {
      const mockAFlexChange = jest.fn()
      const props = mockComponentProps(mockAFlexChange)
      const testComponent = renderTestComponent(props)

      const editor = testComponent.root.find(
        (node: any) => (node.type as any).name === 'AflexCodeEditor',
      )
      editor.instance.componentDidUpdate({...props, value: 'pre-value'})

      setImmediate(() => {
        expect(getCodeMirror.mock.calls.length).toBe(2)
        expect(setValue.mock.calls.length).toBe(1)
        expect(setValue.mock.calls[0]).toMatchObject(['test-value'])
        done()
      })
    })

    test('should add styles properly with diff and "before" version', (done: any) => {
      const mockAFlexChange = jest.fn()
      const props = mockComponentProps(mockAFlexChange, true, true)
      const testComponent = renderTestComponent(props)

      const codeMirror = testComponent.root.find(
        (node: any) => (node.type as any).name === 'CodeMirror',
      )
      codeMirror.instance.onChange('test value')

      setImmediate(() => {
        expect(testComponent.toJSON()).toMatchSnapshot()
        expect(mockAFlexChange.mock.calls.length).toBe(1)
        expect(mockAFlexChange.mock.calls[0].length).toBe(1)
        expect(mockAFlexChange.mock.calls[0][0]).toBe('test value')
        expect(getCodeMirror.mock.calls.length).toBe(1)
        expect(addLineClass.mock.calls.length).toBe(4)
        expect(addLineClass.mock.calls[0]).toMatchObject([1, 'wrap', 'diffReplace'])
        expect(addLineClass.mock.calls[1]).toMatchObject([2, 'wrap', 'diffReplace'])
        expect(addLineClass.mock.calls[2]).toMatchObject([1, 'wrap', 'diffDelete'])
        expect(addLineClass.mock.calls[3]).toMatchObject([2, 'wrap', 'diffDelete'])
        done()
      })
    })

    test('should add styles properly with diff and "after" version', (done: any) => {
      const mockAFlexChange = jest.fn()
      const props = mockComponentProps(mockAFlexChange, true, false)
      const testComponent = renderTestComponent(props)

      const codeMirror = testComponent.root.find(
        (node: any) => (node.type as any).name === 'CodeMirror',
      )
      codeMirror.instance.onChange('test value')

      setImmediate(() => {
        expect(testComponent.toJSON()).toMatchSnapshot()
        expect(mockAFlexChange.mock.calls.length).toBe(1)
        expect(mockAFlexChange.mock.calls[0].length).toBe(1)
        expect(mockAFlexChange.mock.calls[0][0]).toBe('test value')
        expect(getCodeMirror.mock.calls.length).toBe(1)
        expect(addLineClass.mock.calls.length).toBe(4)
        expect(addLineClass.mock.calls[0]).toMatchObject([5, 'wrap', 'diffReplace'])
        expect(addLineClass.mock.calls[1]).toMatchObject([6, 'wrap', 'diffReplace'])
        expect(addLineClass.mock.calls[2]).toMatchObject([5, 'wrap', 'diffInsert'])
        expect(addLineClass.mock.calls[3]).toMatchObject([6, 'wrap', 'diffInsert'])
        done()
      })
    })

  })

})
