import * as React from 'react'
import * as ReactTestRenderer from 'react-test-renderer'
import * as moxios from 'moxios'
import HCProvider from 'src/HCProvider'

const renderTestComponent = () => {
  const PullUp = require('../index').default
  return ReactTestRenderer.create(
    <HCProvider>
      <PullUp />
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
    (node: any) => node.type.name === 'PullUp',
  )
  return testComponent.instance
}
beforeEach(() => {
  moxios.install()
})
afterEach(() => {
  moxios.uninstall()
})

describe('test component: PullUp', () => {
  test('should render properly', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponent()
    setImmediate(() => {
      expect(testComponent.toJSON()).toMatchSnapshot()
      done()
    })
  })
})

describe('test function literally', () => {
  test('onDragStart should render properly', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponent()
    const instance = getComponentInstance(testComponent)
    instance.onDragStart({ clientX: 250, clientY: 250 })
    setImmediate(() => {
      expect(instance.canMove).toBe(true)
      done()
    })
  })
  test('onDragEnd should render properly', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponent()
    const instance = getComponentInstance(testComponent)
    instance.onDragEnd()
    setImmediate(() => {
      expect(instance.canMove).toBe(false)
      done()
    })
  })
  test('onDrag should render properly', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponent()
    const instance = getComponentInstance(testComponent)
    const spyOnOnMove = jest.spyOn(instance, 'onMove')
    instance.onDrag({ clientX: 150, clientY: 150 })
    setImmediate(() => {
      expect(spyOnOnMove).toHaveBeenCalledTimes(1)
      spyOnOnMove.mockRestore()
      done()
    })
  })
  test('onMove should render properly', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponent()
    const instance = getComponentInstance(testComponent)
    instance.canMove = true
    instance.onMove({ clientX: 200, clientY: 200 })
    setImmediate(() => {
      expect(instance.state.height).toBe(-100)
      done()
    })
  })
})
