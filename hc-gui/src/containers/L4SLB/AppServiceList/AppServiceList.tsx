import * as React from 'react'
import { Link } from 'react-router-dom'

import {
  A10Container,
  setupA10Container,
  IA10ContainerDefaultProps,
} from 'a10-gui-framework'

import { A10Button, A10Badge, A10Table, A10DropdownMenu } from 'a10-gui-widgets'

import { HealthStatus } from 'src/components/shared'

import './styles/index.less'

interface IDeployed {
  cluster: string
  partition: string
}

export interface IAppServiceListProps extends IA10ContainerDefaultProps {}

export interface IAppServiceState {
  data: any
}

class AppServiceList extends A10Container<
  IAppServiceListProps,
  IAppServiceState
> {
  columns = [
    {
      title: 'App Service',
      dataIndex: 'name',
      key: 'name',
      className: 'link',
      render: (name: string) => <span className="link">{name}</span>,
    },
    {
      title: 'VIP',
      dataIndex: 'vip.obj-references[0].name',
      key: 'vip.obj-references[0].name',
    },
    {
      title: '# vPort',
      dataIndex: 'vport.obj-refcnt',
      key: 'vport.obj-refcnt',
    },
    {
      title: '# Servers',
      dataIndex: 'servers',
      key: 'servers',
    },
    {
      title: 'Deployed',
      dataIndex: 'deployed',
      key: 'deployed',
      render: (deployed: IDeployed, record: any, index: number) => {
        if (!deployed) {
          return <span className="link">Deploy</span>
        }
        return (
          <div>
            <HealthStatus
              type="ongoing"
              tooltip="Cluster"
              text="C"
              description={deployed.cluster}
            />
            <HealthStatus
              type="ongoing"
              tooltip="Partition"
              text="P"
              description={deployed.partition}
            />
          </div>
        )
      },
    },
    {
      title: 'Current Conn.',
    },
    {
      title: 'Health',
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      className: 'action-list',
      render: (record: any) => {
        return (
          <A10DropdownMenu
            style={{ color: '#757575', marginBottom: '-15px' }}
            menu={[
              <div key="viewDashboard">View Dashboard</div>,
              <div key="edit">Edit</div>,
            ]}
            trigger="hover"
            placement="bottomRight"
            arrowPointAtCenter={true}
          />
        )
      },
    },
  ]

  constructor(props: IAppServiceListProps) {
    super(props)
    this.state = {
      data: [
        {
          name: 'testAppSvc',
          'app-svc-type': 'adc',
          'logical-cluster': 'Cluster_e2e_A.Partition_e2e_A',
          vport: {
            'obj-references': [
              {
                'app-svc': 'testAppSvc',
                'port-number': 80,
                protocol: 'tcp',
                uuid: '8335e3a0-206c-11e9-832d-6a8a4cfd3ce7',
                'a10-url': '/hccapi/v3/slb/virtual-server/vip1/port/80+tcp',
              },
            ],
            'obj-refcnt': 1,
            'obj-class': 'slb.virtual-server.port',
          },
          vip: {
            'obj-references': [
              {
                name: 'vip1',
                uuid: '7cbf6b40-206c-11e9-832d-6a8a4cfd3ce7',
                'a10-url': '/hccapi/v3/slb/virtual-server/vip1',
              },
            ],
            'obj-refcnt': 1,
            'obj-class': 'slb.virtual-server',
          },
          servers: 0,
          uuid: '598526ae-1fa6-11e9-832d-6a8a4cfd3ce7',
          'a10-url':
            '/hccapi/v3/provider/root/tenant/Tenant_e2e_A/app-svc/testAppSvc',
        },
        {
          name: 'testAppSvc2',
          'app-svc-type': 'adc',
          'logical-cluster': 'Cluster_e2e_A.Partition_e2e_A',
          vport: {
            'obj-references': [
              {
                'app-svc': 'testAppSvc2',
                'port-number': 80,
                protocol: 'tcp',
                uuid: '8335e3a0-206c-11e9-832d-6a8a4cfd3ce7',
                'a10-url': '/hccapi/v3/slb/virtual-server/vip2/port/80+tcp',
              },
            ],
            'obj-refcnt': 1,
            'obj-class': 'slb.virtual-server.port',
          },
          vip: {
            'obj-references': [
              {
                name: 'vip2',
                uuid: '7cbf6b40-206c-11e9-832d-6a8a4cfd3ce7',
                'a10-url': '/hccapi/v3/slb/virtual-server/vip2',
              },
            ],
            'obj-refcnt': 1,
            'obj-class': 'slb.virtual-server',
          },
          servers: 3,
          deployed: {
            cluster: 'Cluster4',
            partition: 'Partition1',
          },
          uuid: '598526ae-1fa6-11e9-832d-6a8a4cfd3ce7',
          'a10-url':
            '/hccapi/v3/provider/root/tenant/Tenant_e2e_A/app-svc/testAppSvc',
        },
      ],
    }
  }

  render() {
    const { data } = this.state
    return (
      <div className="l4slb-app-service-list">
        <header>
          <h1>SLB App Services</h1>
          <A10Badge
            showZero={true}
            count={data.length}
            overflowCount={999999}
            title={data.length}
          />
          <div className="table-actions">
            <A10Button type="primary" icon="plus">
              <Link to="/wizard">Add App Service</Link>
            </A10Button>
          </div>
        </header>
        <A10Table
          columns={this.columns}
          dataSource={data}
          rowKey={(record: any) => record.name}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: any, props: IAppServiceListProps) => {
  return {}
}
export default setupA10Container(AppServiceList, mapStateToProps)
