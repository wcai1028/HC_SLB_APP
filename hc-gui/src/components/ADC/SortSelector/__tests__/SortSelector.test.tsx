import * as React from 'react'
import * as ReactTestRenderer from 'react-test-renderer'
import * as moxios from 'moxios'
import HCProvider from 'src/HCProvider'

const renderTestComponent = () => {
  const SortSelector = require('../index').default
  return ReactTestRenderer.create(
    <HCProvider>
      <SortSelector />
    </HCProvider>,
  )
}
const renderTestComponentWithProps = () => {
  const SortSelector = require('../index').default
  return ReactTestRenderer.create(
    <HCProvider>
      <SortSelector
        defaultSelected="Time"
        name="alert-sort-selector"
        sortTitle="Sort By"
        sortList={['Time', 'Severity', 'Object Type', 'Name']}
      />
    </HCProvider>,
  )
}

const getComponentInstance = (testRenderer: any) => {
  const testInstance = testRenderer.root
  const testComponent = testInstance.find(
    (node: any) => node.type.name === 'SortSelector',
  )
  return testComponent.instance
}
beforeEach(() => {
  moxios.install()
})
afterEach(() => {
  moxios.uninstall()
})

describe('test component: SortSelector', () => {
  test('should render properly', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponent()
    setImmediate(() => {
      expect(testComponent.toJSON()).toMatchSnapshot('without Props')
      done()
    })
  })
  test('should render properly with Props', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponentWithProps()
    setImmediate(() => {
      expect(testComponent.toJSON()).toMatchSnapshot('with Props')
      done()
    })
  })
})

describe('test function literally', () => {
  test('componentWillReceiveProps: should render properly', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponentWithProps()
    const instance = getComponentInstance(testComponent)
    instance.componentWillReceiveProps({ defaultSelected: 'Time' })
    setImmediate(() => {
      expect(instance.state.selectedValue).toBe('Time')
      done()
    })
  })
  test('handleClick: should render properly', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponentWithProps()
    const instance = getComponentInstance(testComponent)
    instance.handleClick({ key: 'Severity' })
    setImmediate(() => {
      expect(instance.state.selectedValue).toBe('Severity')
      done()
    })
  })
})
