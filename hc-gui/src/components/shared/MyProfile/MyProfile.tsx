import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import {
    A10Form,
    A10Icon,
    A10Label,
    A10Table,
} from 'a10-gui-widgets'
import { A10Panel } from 'src/components/shared/A10Panel'
import { A10IconTextGroup } from 'src/components/shared/A10IconTextGroup'
import { Messages } from 'src/locale/en/Messages'
import { DashboardService } from 'src/services'
import ReactLoading from 'react-loading'
import { getItem } from 'src/libraries/storage'


export interface IMyProfileProps {

}
export interface IMyProfileState {
    profileObj: any
    roles: any
}

class MyProfile extends A10Component<
    IMyProfileProps,
    IMyProfileState
    >
{
    Messages = new Messages()
    DashboardService = new DashboardService()
    dataLoaded = false
    state = {
        profileObj: {
            firstName: '',
            lastName: '',
            emailId: '',
            id: '',
            state: '',
            createdAt: '',
            lastModifiedAt: ''
        },
        roles: []
    }
    roleColumns = [
        {
            title: 'Level',
            dataIndex: 'level',
            key: 'level',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        }
    ]

    loadProfileInfo() {
        const userId = getItem('USER_ID')
        const profileResponse = this.DashboardService.userProfile(null, null, userId)
        profileResponse
            .then((response: any) => {
                this.state.roles = []
                const roleArray = []
                for (let i = 0; i < response.data.roles.length; i++) {
                    const role = response.data.roles[i]
                    const roleObj = {
                        level: '',
                        type: role.role.toUpperCase()
                    }

                    if (role.scopes[0].providers.tenants) {
                        roleObj.level = role.scopes[0].providers.ids[0] + ' / ' + role.scopes[0].providers.tenants.ids[0]
                    } else {
                        roleObj.level = role.scopes[0].providers.ids[0]
                    }

                    roleArray.push(roleObj)
                }
                this.dataLoaded = true
                this.setState({
                    profileObj: response.data,
                    roles: roleArray
                })
            })
            .catch((error: any) => {
                this.dataLoaded = true
            })

    }

    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        }
        if (!this.dataLoaded) {
            this.loadProfileInfo()
        }
        return (
            <A10Form layout="horizontal">
                <A10Panel
                    title={
                        <A10IconTextGroup
                            text="User's Info"
                            icon={<A10Icon style={{ fontSize: 36 }} type="user" />}
                        />
                    }
                >
                    <A10Form.Item {...formItemLayout}
                        label={
                            <A10IconTextGroup
                                text=""
                                icon={<A10Icon style={{ fontSize: 24 }} type="user" />}
                            />
                        }
                    >
                        <A10Label style={{ marginLeft: 10 }}>Change Picture</A10Label>
                    </A10Form.Item>

                    <A10Form.Item {...formItemLayout} label={this.Messages.NAME}>
                        <A10Label style={{ marginLeft: 10 }}>
                            {this.state.profileObj.firstName + ' ' + this.state.profileObj.lastName}
                        </A10Label>
                    </A10Form.Item>

                    <A10Form.Item {...formItemLayout} label={this.Messages.EMAIL}>
                        <A10Label style={{ marginLeft: 10 }}>{this.state.profileObj.emailId}</A10Label>
                    </A10Form.Item>

                    <A10Form.Item {...formItemLayout} label={this.Messages.USER_ID}>
                        <A10Label style={{ marginLeft: 10 }}>{this.state.profileObj.id}</A10Label>
                    </A10Form.Item>

                    <A10Form.Item {...formItemLayout} label={this.Messages.USER_STATE}>
                        <A10Label style={{ marginLeft: 10 }}>{this.state.profileObj.state} since {this.state.profileObj.createdAt}</A10Label>
                        <A10Label style={{ marginLeft: 10 }}>Last Access {this.state.profileObj.lastModifiedAt}</A10Label>
                    </A10Form.Item>

                    <A10Form.Item {...formItemLayout} label={this.Messages.ACCESS_LEVEL}>
                        <A10Table
                            columns={this.roleColumns}
                            dataSource={this.state.roles.map((key: any, index: number) => {
                                key.key = key.id
                                return key
                            })}
                            size="small"
                            loading={
                                !this.dataLoaded
                                    ? {
                                        indicator: (
                                            <div >
                                                <ReactLoading
                                                    type="bars"
                                                    color="#4a90e2"
                                                    height={20}
                                                    width={20}
                                                />
                                            </div>
                                        ),
                                    }
                                    : false
                            }
                        />
                    </A10Form.Item>
                </A10Panel>
            </A10Form>
        )
    }
}

export default MyProfile