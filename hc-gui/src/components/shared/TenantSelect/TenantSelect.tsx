import * as React from 'react'
import { A10Component, _ } from 'a10-gui-framework'
import { A10Form, A10Select, A10Button } from 'a10-gui-widgets'
// tslint:disable-next-line:no-var-requires
import { getItem, setItem } from 'src/libraries/storage'
import { httpClient } from 'src/libraries/httpClient'
import { Redirect } from 'react-router'
import parameters from 'parameters'

export interface ITenantSelectProps {
}
export interface ITenantSelectStates {
    redirect: boolean
    tenantList: IObject[]
    selectedTenant: string
}

class TenantSelect extends A10Component<ITenantSelectProps, ITenantSelectStates> {
    constructor(props: ITenantSelectProps) {
        super(props)
        this.state = {
            redirect: false,
            tenantList: [],
            selectedTenant: null
        }
    }

    componentDidMount() {
        this.getTenantList().then((Res: IObject) => {
            const tenantList = Res.data ? Res.data['tenant-list'] : []
            this.setState({ tenantList })
        })
    }

    getTenantList = () => {
        const uri = `/hccapi/v3/provider/${getItem('PROVIDER')}/tenant`
        return httpClient.get(uri)
    }

    onClickSubmit = (e: any) => {
        const tenantName = JSON.parse(this.state.selectedTenant).name
        setItem('tenant', tenantName)
        setItem('CURRENT_TENANT', this.state.selectedTenant)
        this.setState({redirect: true})
    }

    onChangeTenant = (tenant: string) => {
        this.setState({selectedTenant: tenant})
    }

    render() {
        const { tenantList, redirect, selectedTenant } = this.state
        const options = tenantList.map((tenant: IObject) => {
            const keyStr = JSON.stringify(tenant)
            return (
              <A10Select.Option key={keyStr}>
                <span>{tenant.name}</span>
              </A10Select.Option>
            )
          })
        let uri = ''
        if (selectedTenant) {
            const usr = getItem('USER_ID')
            const api = parameters.BASE_URL
            const provider = getItem('PROVIDER')
            const tenant = getItem('tenant')
            const token = getItem('USER_SESSION_ID')
            uri = `/dashboard?user_id=${usr}&api_ep=${api}&provider=${provider}&tenant=${tenant}&token=${token}`
        }
        return ( !redirect ?
            <A10Form layout="horizontal">
                <A10Form.Item label="Tenants">
                    <A10Select onChange={this.onChangeTenant.bind(this)} >
                      {options}
                    </A10Select>
                </A10Form.Item>
                <A10Button className="submit-button" onClick={this.onClickSubmit.bind(this)} >
                    Select
                </A10Button>
            </A10Form> :
            <Redirect to={uri} />
        )
    }
}

export default TenantSelect
