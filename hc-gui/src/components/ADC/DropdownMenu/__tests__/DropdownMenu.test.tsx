import * as React from 'react'
import * as ReactTestRenderer from 'react-test-renderer'
import * as moxios from 'moxios'
import tenantList from '../__mocks__/apis/tenant'
import HCProvider from 'src/HCProvider'

const renderTestComponent = () => {
  const DropdownMenu = require('../index').default
  return ReactTestRenderer.create(
    <HCProvider>
      <DropdownMenu
        options={['thunder', 'lightning', 'ssli', 'cgn', 'gifi', 'controller']}
        defaultOption="controller"
        selectedTenant="Tenant1"
      />
    </HCProvider>,
  )
}
const renderTestComponentWithHidText = () => {
  const DropdownMenu = require('../index').default
  return ReactTestRenderer.create(
    <HCProvider>
      <DropdownMenu
        options={['thunder', 'lightning', 'ssli', 'cgn', 'gifi', 'controller']}
        defaultOption="controller"
        selectedTenant="Tenant1"
        hideText="true"
      />
    </HCProvider>,
  )
}
const allTenants = tenantList['tenant-list']
const providerClusters = [
  {
    name: 'a12',
    type: 'single',
    'cluster-uuid': '45B8ABF84DF0223EDD5C0514AB1601305DA84B63',
    uuid: '155f3f72-dd5d-11e8-9a98-62371b11a8cd',
    'a10-url': '/hpcapi/v3/provider/root/cluster/a12',
  },
  {
    name: 'c1',
    type: 'single',
    'cluster-uuid': '725C667450C6672638780B36304C456202F427CA',
    description: '',
    uuid: 'dd0fac02-d897-11e8-9a98-62371b11a8cd',
    'a10-url': '/hpcapi/v3/provider/root/cluster/c1',
  },
  {
    name: 'cl4',
    type: 'single',
    description: '',
    uuid: '06e6ad44-dceb-11e8-9a98-62371b11a8cd',
    'a10-url': '/hpcapi/v3/provider/root/cluster/cl4',
  },
]

const initSessionStorage = () => {
  const sessionStorage = (global as any).sessionStorage
  sessionStorage.setItem('PROVIDER', 'root')
  sessionStorage.setItem('ALLTENANTS', JSON.stringify(allTenants))
  sessionStorage.setItem('CURRENT_TENANT', JSON.stringify(allTenants[0]))
  sessionStorage.setItem('PROVIDER_CLUSTERS', JSON.stringify(providerClusters))
  sessionStorage.setItem('TARGET_URL', '/providers/root')
}
const getComponentInstance = (testRenderer: any) => {
  const testInstance = testRenderer.root
  const testComponent = testInstance.find(
    (node: any) => node.type.name === 'DropdownMenu',
  )
  return testComponent.instance
}
beforeEach(() => {
  moxios.install()
})
afterEach(() => {
  moxios.uninstall()
})

describe('test component: DropdownMenu', () => {
  test('should render properly WITHOUT seesion storage', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponent()
    const instance = getComponentInstance(testComponent)
    setImmediate(() => {
      expect(testComponent.toJSON()).toMatchSnapshot('WITHOUT seesion storage')
      done()
    })
  })
  test('should render properly', (done: jest.DoneCallback) => {
    initSessionStorage()
    const testComponent = renderTestComponent()
    const instance = getComponentInstance(testComponent)
    setImmediate(() => {
      expect(testComponent.toJSON()).toMatchSnapshot()
      done()
    })
  })
})

describe('test function literally', () => {
  test('componentDidUpdate should render properly WITHOUT DRILL_LEVEL', (done: jest.DoneCallback) => {
    initSessionStorage()
    window.sessionStorage.setItem('DRILL_LEVEL', '')
    const testComponent = renderTestComponent()
    const instance = getComponentInstance(testComponent)
    const spyOnLoadMyApps = jest.spyOn(instance, 'loadMyApps')
    instance.componentDidUpdate()
    setImmediate(() => {
      expect(spyOnLoadMyApps).toHaveBeenCalledTimes(1)
      spyOnLoadMyApps.mockRestore()
      done()
    })
  })
  test('componentDidUpdate should render properly WITH DRILL_LEVEL', (done: jest.DoneCallback) => {
    initSessionStorage()
    window.sessionStorage.setItem('DRILL_LEVEL', 'provider')
    const testComponent = renderTestComponent()
    const instance = getComponentInstance(testComponent)
    const spyOnLoadCatalogApps = jest.spyOn(instance, 'loadCatalogApps')
    instance.componentDidUpdate()
    setImmediate(() => {
      expect(spyOnLoadCatalogApps).toHaveBeenCalledTimes(1)
      spyOnLoadCatalogApps.mockRestore()
      done()
    })
  })
  test('loadCatalogApps should render properly', (done: jest.DoneCallback) => {
    initSessionStorage()
    window.sessionStorage.setItem('DRILL_LEVEL', 'provider')
    const testComponent = renderTestComponent()
    const instance = getComponentInstance(testComponent)
    instance.DashboardService.getHCAppCatalog = jest
      .fn()
      .mockResolvedValue([{ name: 'thunder', text: 'Thunder ADC' }])
    instance.loadCatalogApps()
    moxios.wait(() => {
      expect(instance.state.appsLoaded).toBe(true)
      expect(instance.state.selectedTenant).toBe('Tenant1')
      done()
    })
  })
  test('render should render properly', (done: jest.DoneCallback) => {
    initSessionStorage()
    window.sessionStorage.setItem('DRILL_LEVEL', 'provider')
    const testComponent = renderTestComponentWithHidText()
    const instance = getComponentInstance(testComponent)
    instance.allApps = [{ name: 'gifi', text: 'gifi ADC' }]
    instance.state.showDropMenu = true
    instance.render()
    moxios.wait(() => {
      expect(testComponent.toJSON()).toMatchSnapshot('WITH allApps')
      done()
    })
  })
  test('onClickOption should render properly', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponent()
    const instance = getComponentInstance(testComponent)
    instance.onClickOption('test', 1)()
    moxios.wait(() => {
      expect(instance.state.currentIndex).toBe(1)
      done()
    })
  })
  test('onControlDropMenu should render properly', (done: jest.DoneCallback) => {
    const testComponent = renderTestComponent()
    const instance = getComponentInstance(testComponent)
    instance.onControlDropMenu(true)()
    moxios.wait(() => {
      expect(instance.state.showDropMenu).toBe(true)
      done()
    })
  })
})
