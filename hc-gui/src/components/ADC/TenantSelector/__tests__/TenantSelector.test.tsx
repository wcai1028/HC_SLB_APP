import * as React from 'react'
import * as ReactTestRenderer from 'react-test-renderer'
import HCProvider from '../../../../HCProvider'
import { BrowserRouter, Route } from 'react-router-dom'
import { TenantSelector } from '../index'

const renderTestComponent = props => {
  return ReactTestRenderer.create(
    <HCProvider>
      <BrowserRouter>
        <TenantSelector {...props} />
      </BrowserRouter>
    </HCProvider>,
  )
}

test('should render properly with current option', () => {
  const onCurrentChange = jest.fn()
  const props = { options: ['tenant1', 'tenant2', 'root'], currentOption: 'tenant2', onCurrentChange }
  const testComponent = renderTestComponent(props)
  expect(testComponent.toJSON()).toMatchSnapshot()
  expect(onCurrentChange.mock.calls.length).toEqual(1)
})

test('should render properly with default option', () => {
  const onCurrentChange = jest.fn()
  const props = { options: ['tenant1', 'tenant2', 'root'], currentOption: null, onCurrentChange, defaultOption: 'root' }
  const testComponent = renderTestComponent(props)
  expect(testComponent.toJSON()).toMatchSnapshot()
})

test('function componentDidUpdate', () => {
  const onCurrentChange = jest.fn()
  const props = { options: ['tenant1', 'tenant2', 'root'], currentOption: 'tenant2', onCurrentChange }
  const testComponent = renderTestComponent(props)
  const selector = testComponent.root.find((node: any) => (node.type as any).name === 'TenantSelector')
  selector.instance.componentDidUpdate({ currentOption: 'tenant2' })
  expect(selector.instance.state.currentIndex).toBe(1)
})

test('function onControlDropMenu', () => {
  const onCurrentChange = jest.fn()
  const props = { options: ['tenant1', 'tenant2', 'root'], currentOption: 'tenant2', onCurrentChange }
  const testComponent = renderTestComponent(props)
  const selector = testComponent.root.find((node: any) => (node.type as any).name === 'TenantSelector')
  selector.instance.onControlDropMenu(true)
  expect(selector.instance.state.showDropMenu).toBeTruthy()
})

test('function onClickOption', () => {
  const onCurrentChange = jest.fn()
  const props = { options: ['tenant1', 'tenant2', 'root'], currentOption: 'tenant2', onCurrentChange }
  const testComponent = renderTestComponent(props)
  const selector = testComponent.root.find((node: any) => (node.type as any).name === 'TenantSelector')
  selector.instance.onClickOption('tenant1', 0)
  expect(selector.instance.state.currentIndex).toBe(0)
  expect(onCurrentChange.mock.calls.length).toEqual(2)
})
