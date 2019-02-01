import React from 'react'
import { Link } from 'react-router-dom'

import {
  A10Button,
  A10Form,
  A10Icon,
  A10Row,
  A10Col,
  A10Notification,
} from 'a10-gui-widgets'

import A10Panel from 'src/components/shared/A10Panel'
import A10IconTextGroup from 'src/components/shared/A10IconTextGroup'
import AbstractStep, {
  IAbstractStepProps,
} from 'src/components/shared/Wizard/AbstractStep'
import { IWizardData } from '../../interface'
import L4SLBUtilities from 'src/containers/L4SLB/Utilities'
import { httpClient } from 'src/libraries/httpClient'
import { getItem } from 'src/libraries/storage'

import './styles/index.less'

interface IReviewProps extends IAbstractStepProps {
  data?: IWizardData
}

interface IReviewState {
  data?: IWizardData
}

export default class Review extends AbstractStep<IReviewProps, IReviewState> {
  constructor(props: IReviewProps) {
    super(props)
    this.state = {
      data: props.data,
    }
  }
  onPrev = (event: React.SyntheticEvent) => {
    event.preventDefault()
    event.stopPropagation()
    this.props.onPrev()
  }

  onNext = () => {
    this.onSubmit()
  }

  onSubmit = () => {
    const { data } = this.props
    const promises: Array<Promise<any>> = [
      this.createLogicalCluster(),
      this.createServers(),
    ]
    const { 'health-check': healthCheck, persistence } = data['service-group']
    if (healthCheck) {
      promises.push(this.createHealthMonitor())
    }

    if (persistence) {
      promises.push(this.createPersistSourceIP())
    }

    Promise.all([promises])
      .then(this.createServerPorts)
      .then(this.createAppService)
      .then(this.createServiceGroup)
      .then(this.createVirtualServer)
      .then(this.createVirtualPort)
      .then(() => {
        A10Notification.open({
          message: 'Success!',
          description: 'Success!',
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  createLogicalCluster = () => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')
    const { data } = this.state
    const { name } = data['logical-cluster']
    const { partition, cluster } = data['logical-cluster'][
      'physical-cluster-list'
    ][0]

    return httpClient.post(
      `/hccapi/v3/provider/${provider}/tenant/${tenant}/logical-cluster`,
      {
        'logical-cluster': {
          name,
          'physical-cluster-list': [
            {
              cluster,
              partition,
            },
          ],
        },
      },
    )
  }

  createAppService = () => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')
    const { data } = this.state
    const { name } = data['app-svc']
    const logicalClusterName = data['logical-cluster'].name

    return httpClient.post(
      `/hccapi/v3/provider/${provider}/tenant/${tenant}/app-svc`,
      {
        'app-svc': {
          name,
          'app-svc-type': 'adc',
          'logical-cluster': logicalClusterName,
        },
      },
    )
  }

  createVirtualServer = () => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')
    const { data } = this.state
    const appServiceName = data['app-svc'].name
    const { name, 'ip-address': ipAddress } = data['virtual-server']
    const virtualServerPayload: IObject = {
      'virtual-server': {
        name,
        'ip-address': ipAddress,
      },
    }

    return httpClient.post(
      `/hccapi/v3/provider/${provider}/tenant/${tenant}/app-svc/${appServiceName}/slb/virtual-server/`,
      virtualServerPayload,
    )
  }

  createVirtualPort = () => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')
    const { data } = this.state
    const appServiceName = data['app-svc'].name
    const serviceGroupName = data['service-group'].name
    const persistSourceIPName = data.template.persist['source-ip'].name
    const { name } = data['virtual-server']
    const { 'port-number': portNumber, protocol } = data[
      'virtual-server'
    ].port[0]
    const { deployment } = data

    const virtualPortPayload: IObject = {
      port: {
        'port-number': portNumber,
        protocol,
        'service-group': serviceGroupName,
        'template-persist-source-ip': persistSourceIPName,
        'sampling-enable': [
          {
            counters1: 'total_l4_conn',
          },
          {
            counters1: 'total_fwd_bytes',
          },
          {
            counters1: 'total_rev_bytes',
          },
        ],
      },
    }

    switch (deployment) {
      case 'SOURCE-NAT':
        virtualPortPayload.port.auto = 1
        break
      case 'DSR':
        virtualPortPayload.port['no-dest-nat'] = 1
        break
    }

    return httpClient.post(
      `/hccapi/v3/provider/${provider}/tenant/${tenant}/app-svc/${appServiceName}/slb/virtual-server/${name}/port`,
      virtualPortPayload,
    )
  }

  createServiceGroup = () => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')
    const { data } = this.state
    const appServiceName = data['app-svc'].name
    const healthMonitorName = data['health.monitor'].name
    const { servers } = data
    const { protocol } = data['virtual-server'].port[0]
    const { name } = data['service-group']
    const memberList = servers.map(server => {
      return {
        name: server.name,
        port: server['port-list'][0]['port-number'],
      }
    })

    return httpClient.post(
      `/hccapi/v3/provider/${provider}/tenant/${tenant}/app-svc/${appServiceName}/slb/service-group/`,
      {
        'service-group': {
          name,
          protocol,
          'health-check': healthMonitorName,
          'member-list': memberList,
        },
      },
    )
  }

  createServers = () => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')

    const { data } = this.state
    const { servers } = data

    const promises: Array<Promise<any>> = servers.map(server => {
      const { name, host } = server
      return httpClient.post(
        `/hccapi/v3/provider/${provider}/tenant/${tenant}/shared-object/slb/server`,
        {
          server: {
            name,
            host,
          },
        },
      )
    })

    return Promise.all(promises)
  }

  createServerPorts = () => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')

    const { data } = this.state
    const { protocol } = data['virtual-server'].port[0]
    const { servers } = data
    const promises: Array<Promise<any>> = servers.map(server => {
      const { name, 'port-list': portList } = server

      return httpClient.post(
        `/hccapi/v3/provider/${provider}/tenant/${tenant}/shared-object/slb/server/${name}/port`,
        {
          port: {
            'port-number': portList[0]['port-number'],
            protocol,
            'health-check': 'ping',
            'sampling-enable': [
              {
                counters1: 'total_conn',
              },
              {
                counters1: 'total_fwd_bytes',
              },
              {
                counters1: 'total_rev_bytes',
              },
            ],
          },
        },
      )
    })

    return Promise.all(promises)
  }

  createHealthMonitor = () => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')
    const { data } = this.state
    const { name } = data['health.monitor']

    return httpClient.post(
      `/hccapi/v3/provider/${provider}/tenant/${tenant}/health/monitor`,
      {
        monitor: {
          name,
        },
      },
    )
  }

  createPersistSourceIP = () => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')
    const { data } = this.state
    const { name } = data.template.persist['source-ip']

    return httpClient.post(
      `/hccapi/v3/provider/${provider}/tenant/${tenant}/shared-object/slb/template/persist/source-ip`,
      {
        'source-ip': {
          name,
        },
      },
    )
  }

  componentDidMount() {
    const timestamp = Date.now()
    const data = { ...this.props.data }
    const ip = data['virtual-server']['ip-address']
    const port = data['virtual-server'].port[0]['port-number']
    const protocol = data['virtual-server'].port[0].protocol
    const members: string[] = []

    data['logical-cluster'].name = L4SLBUtilities.generateLogicalClusterName(
      ip,
      timestamp,
    )
    data['virtual-server'].name = L4SLBUtilities.generateVirtualServerName(
      ip,
      timestamp,
    )

    if (data['service-group']['health-check']) {
      data['health.monitor'].name = L4SLBUtilities.generateHealthMonitorName(
        ip,
        port,
        timestamp,
      )
    }

    if (data['service-group'].persistence) {
      data.template.persist[
        'source-ip'
      ].name = L4SLBUtilities.generatePersistSourceIPTemplateName(
        ip,
        port,
        timestamp,
      )
    }

    data.servers = data.servers.map(server => {
      const name = L4SLBUtilities.generateServerName(server.host, timestamp)
      server.name = name
      members.push(name)
      return server
    })

    data['service-group'].name = L4SLBUtilities.generateServiceGroupName(
      ip,
      port,
      protocol,
      timestamp,
    )

    this.setState({ data })
  }

  render() {
    const { isUpdate } = this.props
    const { data } = this.state
    const {
      'virtual-server': virtualServer,
      'service-group': serviceGroup,
      servers,
      'logical-cluster': { 'physical-cluster-list': clusterList },
    } = data
    const { partition } = clusterList[0]

    return (
      <div className="l4slb-wizard--review">
        <A10Panel
          title={
            <A10IconTextGroup text="Review" icon={<A10Icon type="desktop" />} />
          }
        >
          <A10Row>
            <A10Col>
              <A10Form>
                <A10Form.Item
                  label="Deployment Choice"
                  {...this.formItemLayout}
                >
                  <span>{data.deployment}</span>
                </A10Form.Item>
                <A10Form.Item label="Partition" {...this.formItemLayout}>
                  <span className={`${partition ? '' : 'no-data'}`}>
                    {`${partition ? partition : 'No partition was provided'}`}
                  </span>
                </A10Form.Item>
              </A10Form>
            </A10Col>
          </A10Row>
        </A10Panel>
        <A10Panel
          title={
            <A10IconTextGroup
              text="Virtual Server"
              icon={<A10Icon type="desktop" />}
            />
          }
        >
          <A10Row>
            <A10Col>
              <A10Form>
                <A10Form.Item label="IP Address" {...this.formItemLayout}>
                  <span
                    className={`${
                      virtualServer['ip-address'] ? '' : 'no-data'
                    }`}
                  >
                    {`${
                      virtualServer['ip-address']
                        ? virtualServer['ip-address']
                        : 'No IP Address was provided'
                    }`}
                  </span>
                </A10Form.Item>
                <A10Form.Item label="Name" {...this.formItemLayout}>
                  <span>{virtualServer.name}</span>
                </A10Form.Item>
                <A10Form.Item label="Virtual Port" {...this.formItemLayout}>
                  <span>
                    {`${
                      virtualServer.port[0]['port-number']
                        ? virtualServer.port[0]['port-number']
                        : 'No virtual port was added'
                    }`}
                  </span>
                </A10Form.Item>
                <A10Form.Item label="Protocol" {...this.formItemLayout}>
                  <span>{virtualServer.port[0].protocol}</span>
                </A10Form.Item>
              </A10Form>
            </A10Col>
          </A10Row>
        </A10Panel>
        <A10Panel
          title={
            <A10IconTextGroup text="Pool" icon={<A10Icon type="desktop" />} />
          }
        >
          <A10Row>
            <A10Col>
              <A10Form>
                <A10Form.Item label="LB Method" {...this.formItemLayout}>
                  <span>{serviceGroup['lb-method']}</span>
                </A10Form.Item>
                <A10Form.Item label="Persistence" {...this.formItemLayout}>
                  <span
                    className={`${
                      serviceGroup.persistence ? 'enable' : 'disable'
                    }`}
                  >
                    {serviceGroup.persistence ? 'On' : 'Off'}
                  </span>
                </A10Form.Item>
                <A10Form.Item label="Health Monitor" {...this.formItemLayout}>
                  <span
                    className={`${
                      serviceGroup['health-check'] ? 'enable' : 'disable'
                    }`}
                  >
                    {serviceGroup['health-check'] ? 'On' : 'Off'}
                  </span>
                </A10Form.Item>
                <A10Form.Item label="Members" {...this.formItemLayout}>
                  <span>{servers.length} Member(s) added</span>
                </A10Form.Item>
              </A10Form>
            </A10Col>
          </A10Row>
        </A10Panel>
        <div className="footer">
          <a href="" className="btn-back" onClick={this.onPrev}>
            « Back
          </a>
          <A10Button className="btn-next" type="primary" onClick={this.onNext}>
            Next
          </A10Button>
          <A10Button className="btn-action">
            <Link
              to={L4SLBUtilities.getURLForConfiguration(
                isUpdate,
                data['app-svc'].name,
              )}
            >
              Skip Wizard to configuration
            </Link>
          </A10Button>
        </div>
      </div>
    )
  }
}
