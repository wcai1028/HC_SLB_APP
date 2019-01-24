import * as React from 'react'
import * as ReactTestRenderer from 'react-test-renderer'
import HCProvider from '../../../../HCProvider'
import { BrowserRouter, Route } from 'react-router-dom'
import { A10InteractiveTree } from '../index'

const renderTestComponent = props => {
  return ReactTestRenderer.create(
    <HCProvider>
      <BrowserRouter>
        <A10InteractiveTree {...props} />
      </BrowserRouter>
    </HCProvider>,
  )
}

test('should render properly with default icon', () => {
  const onCurrentChange = jest.fn()
  const props = {
    width: 100,
    height: 100,
    data: {
      label: 'test1',
      showChildrenAsStraightLine: true,
    }
  }
  const testComponent = renderTestComponent(props)
  expect(testComponent.toJSON()).toMatchSnapshot()
})

test('should render properly with triangle icon', () => {
  const onCurrentChange = jest.fn()
  const props = {
    width: 100,
    height: 100,
    data: {
      label: 'test1',
      showChildrenAsStraightLine: true,
      iconSymbol: 'triangle'
    }
  }
  const testComponent = renderTestComponent(props)
  expect(testComponent.toJSON()).toMatchSnapshot()
})

test('should render properly with circle icon', () => {
  const onCurrentChange = jest.fn()
  const props = {
    width: 100,
    height: 100,
    data: {
      label: 'test1',
      showChildrenAsStraightLine: true,
      iconSymbol: 'circle'
    }
  }
  const testComponent = renderTestComponent(props)
  expect(testComponent.toJSON()).toMatchSnapshot()
})

test('should render properly with circle icon', () => {
  const onCurrentChange = jest.fn()
  const props = {
    width: 100,
    height: 100,
    data: {
      label: 'test1',
      showChildrenAsStraightLine: true,
      iconSymbol: 'circle'
    }
  }
  const testComponent = renderTestComponent(props)
  expect(testComponent.toJSON()).toMatchSnapshot()
})


test('function _onNodeClick', () => {
  const onCurrentChange = jest.fn()
  const props = {
    width: 100,
    height: 100,
    data: {
      label: 'test1',
      showChildrenAsStraightLine: true,
      iconSymbol: 'circle'
    }
  }
  const testComponent = renderTestComponent(props)
  const tree = testComponent.root.find((node: any) => (node.type as any).name === 'A10InteractiveTree')
  tree.instance._onNodeClick({
    data: {
      label: 'test1',
      showChildrenAsStraightLine: true,
      iconSymbol: 'circle',
      children: [{
        label: 'test2',
        showChildrenAsStraightLine: true,
        iconSymbol: 'circle',
      }]
    }
  })
})
