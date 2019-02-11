import React from 'react'
import { Link } from 'react-router-dom'

import { _ } from 'a10-gui-framework'
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
      data: _.cloneDeep(props.data),
    }
  }
  onPrev = (event: React.SyntheticEvent) => {
    event.preventDefault()
    event.stopPropagation()
    this.props.onPrev()
  }

  onNext = () => {
    const { isUpdate } = this.props
    if (isUpdate) {
      this.clearBeforeSave()
        .then(this.save)
        .then(() => {
          this.props.onNext()
        })
    } else {
      this.save().then(() => {
        this.props.onNext()
      })
    }
  }

  clearBeforeSave = () => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')
    const { data } = this.state
    const itemsWillBeRemoved = [
      {
        url: `/hccapi/v3/provider/${provider}/tenant/${tenant}/app-svc/${
          data['app-svc'].name
        }`,
      },
    ]

    Object.values(data.notEditableServers).forEach(server => {
      itemsWillBeRemoved.push({
        url: `/hccapi/v3/provider/${provider}/tenant/${tenant}/shared-object/slb/server/${
          server.name
        }`,
      })
    })

    if (data['logical-cluster'].name) {
      itemsWillBeRemoved.push({
        url: `/hccapi/v3/uuid/${data['logical-cluster'].uuid}`,
      })
    }

    if (_.get(data, 'template.persist.source-ip.uuid')) {
      itemsWillBeRemoved.push({
        url: `/hccapi/v3/uuid/${data.template.persist['source-ip'].uuid}`,
      })
    }

    if (_.get(data, 'health.monitor.uuid')) {
      itemsWillBeRemoved.push({
        url: `/hccapi/v3/uuid/${data['health.monitor'].uuid}`,
      })
    }

    return this.clearConfiguration(itemsWillBeRemoved)
  }

  clearConfiguration = (
    itemsWillBeRemoved: Array<{
      url: string
    }>,
  ) => {
    return Promise.all(
      itemsWillBeRemoved.map(item => {
        return httpClient.delete(item.url)
      }),
    )
  }

  save = () => {
    const { data } = this.state
    const promises: Array<Promise<any>> = [
      this.createLogicalCluster(),
      this.createServers(),
    ]
    const { persistence, enableHealthCheck } = data
    if (enableHealthCheck) {
      promises.push(this.createHealthMonitor())
    }

    if (persistence) {
      promises.push(this.createPersistSourceIP())
    }

    return Promise.all([promises])
      .then(this.createAppService)
      .then(this.createServiceGroup)
      .then(this.createVirtualServer)
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

    return httpClient.post(
      `/hccapi/v3/provider/${provider}/tenant/${tenant}/logical-cluster`,
      {
        'logical-cluster': data['logical-cluster'],
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
    const virtualServer = _.cloneDeep(data['virtual-server'])
    const { deployment } = data

    virtualServer['port-list'].forEach(port => {
      port['service-group'] = data['service-group'].name
      port['template-persist-source-ip'] =
        data.template.persist['source-ip'].name
      switch (deployment) {
        case 'SOURCE-NAT':
          port.auto = true
          break
        case 'DSR':
          port['no-dest-nat'] = true
          break
      }
    })

    return httpClient.post(
      `/hccapi/v3/provider/${provider}/tenant/${tenant}/app-svc/${appServiceName}/slb/virtual-server/`,
      {
        'virtual-server': virtualServer,
      },
    )
  }

  createServiceGroup = () => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')
    const { data } = this.state
    const appServiceName = data['app-svc'].name
    const healthMonitorName = data['health.monitor'].name
    const { servers } = data
    const { protocol } = data['virtual-server']['port-list'][0]
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
      return httpClient.post(
        `/hccapi/v3/provider/${provider}/tenant/${tenant}/shared-object/slb/server`,
        {
          server,
        },
      )
    })

    return Promise.all(promises)
  }

  createHealthMonitor = () => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')
    const { data } = this.state
    const monitor = data['health.monitor']

    return httpClient.post(
      `/hccapi/v3/provider/${provider}/tenant/${tenant}/health/monitor`,
      {
        monitor,
      },
    )
  }

  createPersistSourceIP = () => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')
    const { data } = this.state
    const sourceIP = data.template.persist['source-ip']

    return httpClient.post(
      `/hccapi/v3/provider/${provider}/tenant/${tenant}/shared-object/slb/template/persist/source-ip`,
      {
        'source-ip': sourceIP,
      },
    )
  }

  componentDidMount() {
    const timestamp = Date.now()
    const { data } = this.state
    const { enableHealthCheck, persistence } = data
    const ip = data['virtual-server']['ip-address']
    const port = data['virtual-server']['port-list'][0]['port-number']
    const protocol = data['virtual-server']['port-list'][0].protocol
    const members: string[] = []

    data['logical-cluster'].name = L4SLBUtilities.generateLogicalClusterName(
      ip,
      timestamp,
    )
    data['virtual-server'].name = L4SLBUtilities.generateVirtualServerName(
      ip,
      timestamp,
    )

    if (enableHealthCheck) {
      data['health.monitor'].name = L4SLBUtilities.generateHealthMonitorName(
        ip,
        port,
        timestamp,
      )
    }

    if (persistence) {
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
      persistence,
      enableHealthCheck,
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
                      virtualServer['port-list'][0]['port-number']
                        ? virtualServer['port-list'][0]['port-number']
                        : 'No virtual port was added'
                    }`}
                  </span>
                </A10Form.Item>
                <A10Form.Item label="Protocol" {...this.formItemLayout}>
                  <span>{virtualServer['port-list'][0].protocol}</span>
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
                  <span className={`${persistence ? 'enable' : 'disable'}`}>
                    {persistence ? 'On' : 'Off'}
                  </span>
                </A10Form.Item>
                <A10Form.Item label="Health Monitor" {...this.formItemLayout}>
                  <span
                    className={`${enableHealthCheck ? 'enable' : 'disable'}`}
                  >
                    {enableHealthCheck ? 'On' : 'Off'}
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
