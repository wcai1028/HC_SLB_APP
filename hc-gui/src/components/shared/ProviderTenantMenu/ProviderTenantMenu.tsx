import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { A10TreeSelect } from 'a10-gui-widgets'
import HealthStatus from 'src/components/ADC/HealthStatus'
import { AppRoot } from 'src/settings/appRoot'
import { getItem, setItem, removeItem } from 'src/libraries/storage'
import './styles/ProviderTenantMenu.scss'

export interface IProviderTenantMenuProps {
  defaultMethods: object
  tenants: any
  selectedTenant: any
  tenantChange(tenant: any, isProviderMode: boolean): void
}

export interface IProviderTenantMenuState {
  tenants: any
  selectedTenant: any
  searchString: string
}

const A10TreeNode = A10TreeSelect.A10TreeNode

class ProviderTenantMenu extends A10Component<
  IProviderTenantMenuProps,
  IProviderTenantMenuState
> {
  AppRoot = new AppRoot()
  state = {
    selectedTenant: this.props.selectedTenant
      ? JSON.parse(this.props.selectedTenant)
      : null,
    tenants: getItem('ALLTENANTS', true),
    searchString: '',
  }

  tenantChange = (tenant: any) => {
    try {
      // tenant
      tenant = JSON.parse(tenant)
    } catch (e) {
      // provider
      tenant = {
        name: tenant,
      }
    }
    if (tenant.name === getItem('PROVIDER')) {
      removeItem('CURRENT_TENANT')
      setItem('DRILL_LEVEL', 'provider')
      this.AppRoot.setRootScopeElement('currentTenant', '')
      this.AppRoot.setRootScopeElement('currentDrillLevel', 'provider')
      this.props.tenantChange(tenant, true)
    } else {
      setItem('DRILL_LEVEL', 'tenant')
      this.AppRoot.setRootScopeElement('currentDrillLevel', 'tenant')
      this.props.tenantChange(tenant, false)
    }
    this.setState({
      selectedTenant:
        !tenant || tenant.length === 0
          ? undefined
          : tenant,
    })
    // console.log(this.AppRoot)
    // const currentTenant = this.AppRoot.getRootScopeElement('currentTenant')
    // this.state = {
    //   isTenantLevel: false,
    //   tenantUpdated: false,
    //   showDropdown: false,
    //   selectedTenant:
    //     !currentTenant || currentTenant.length === 0
    //       ? undefined
    //       : currentTenant,
    // }
    // return false
  }

  prefillData = () => {
    const queryParams = location.search.substr(1).split('&')

    if (queryParams.length > 0) {
      queryParams.forEach(param => {
        const entry = param.split('=')
        if (entry[0] === 'tenant') {
          // const tenant = JSON.stringify({name: entry[1]})
          const tenant = this.getTenantByName(entry[1])
          if (tenant) {
            sessionStorage.setItem('CURRENT_TENANT', JSON.stringify(tenant))
            this.tenantChange(JSON.stringify(tenant))
          }
        }
        if (entry[0] === 'provider') {
          sessionStorage.setItem('PROVIDER', entry[1])
        }
      })
    }
  }

  getTenantByName = (tenantName: string): any => {
    const tenants = getItem('ALLTENANTS', true)
    const currentTenant = tenants.find((tenant: any) => {
      return tenant.name === tenantName
    })
    return currentTenant
  }

  searchTenant = (searchString: any) => {
    const tenants = getItem('ALLTENANTS', true)
    let filteredTenants = tenants
    if (searchString && searchString !== '') {
      filteredTenants = tenants.filter((tenant: any) => {
        return tenant.name.toLowerCase().indexOf(searchString) > -1
      })
    }
    this.setState({
      tenants: filteredTenants,
    })
  }
  componentDidMount() {
    this.prefillData()
    if (this.props.selectedTenant) {
      if (
        this.props.selectedTenant !== JSON.stringify(this.state.selectedTenant)
      ) {
        this.setState({
          selectedTenant: this.props.selectedTenant
            ? JSON.parse(this.props.selectedTenant)
            : undefined,
          tenants: getItem('ALLTENANTS', true),
        })
      }
    } else {
      if (this.props.selectedTenant !== this.state.selectedTenant) {
        this.setState({
          selectedTenant: undefined,
          tenants: getItem('ALLTENANTS', true),
        })
      }
    }
  }
  componentDidUpdate() {
    if (this.props.selectedTenant) {
      if (
        this.props.selectedTenant !== JSON.stringify(this.state.selectedTenant)
      ) {
        this.setState({
          selectedTenant: this.props.selectedTenant
            ? JSON.parse(this.props.selectedTenant)
            : undefined,
          tenants: getItem('ALLTENANTS', true),
        })
      }
    } else {
      if (
        this.props.selectedTenant &&
        this.state.selectedTenant &&
        this.props.selectedTenant !== this.state.selectedTenant
      ) {
        this.setState({
          selectedTenant: undefined,
          tenants: getItem('ALLTENANTS', true),
        })
      }
    }
  }

  renderDisplayText = (displayName: any, symbol: string) => {
    return (
      <>
        <HealthStatus type="ongoing" text={symbol} />
        <span className="option-label" title={displayName}>
          {displayName}
        </span>
      </>
    )
  }

  render() {
    const adminLevel = getItem('ADMIN_LEVEL')
    return (
      <div className="menu-container">
        <A10TreeSelect
          searchValue={this.state.searchString}
          onSearch={this.searchTenant}
          filterTreeNode={false}
          showSearch
          value={
            this.state.selectedTenant
              ? JSON.stringify(this.state.selectedTenant)
              : undefined
          }
          dropdownStyle={{ maxHeight: 400, width: 300, overflow: 'auto' }}
          className="provider-tenant-menu"
          placeholder={this.renderDisplayText(getItem('PROVIDER'), 'P')}
          treeDefaultExpandAll
          onChange={this.tenantChange}
        >
          <A10TreeNode
            value={getItem('PROVIDER')}
            title={getItem('PROVIDER')}
            key="provider"
            selectable={adminLevel === 'provider' ? true : false}
          >
            {this.state.tenants.map((key: any, index: number) => {
              return (
                <A10TreeNode
                  value={JSON.stringify(key)}
                  title={this.renderDisplayText(
                    key.displayName || key.name,
                    'T',
                  )}
                  key={key.name}
                />
              )
            })}
          </A10TreeNode>
        </A10TreeSelect>
      </div>
    )
  }
}

export default ProviderTenantMenu
