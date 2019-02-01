import React from 'react'
import { Link } from 'react-router-dom'

import {
  A10Button,
  A10Form,
  A10Icon,
  A10Row,
  A10Col,
  A10Select,
} from 'a10-gui-widgets'

import AbstractStep, {
  IAbstractStepProps,
} from 'src/components/shared/Wizard/AbstractStep'
import { getItem } from 'src/libraries/storage'
import { httpClient } from 'src/libraries/httpClient'

import A10IconTextGroup from 'src/components/shared/A10IconTextGroup'
import { A10Panel } from 'src/components/shared/A10Panel'
import { IWizardData, DeploymentType } from '../../interface'

import './styles/index.less'

const deploymentTypes: Array<{
  deploymentType: DeploymentType
  topology: string
}> = [
  { deploymentType: 'INLINE', topology: 'inline' },
  {
    deploymentType: 'SOURCE-NAT',
    topology: 'source-nat',
  },
  { deploymentType: 'DSR', topology: 'dsr' },
]

interface IDeploymentFormProps extends IAbstractStepProps {
  data?: IWizardData
}
interface IDeploymentFormState {
  clusterList: string[]
  partitionList: string[]
}

export default class DeploymentForm extends AbstractStep<
  IDeploymentFormProps,
  IDeploymentFormState
> {
  constructor(props: IDeploymentFormProps) {
    super(props)
    this.state = {
      clusterList: [],
      partitionList: [],
    }
  }

  onPrev = (event: React.SyntheticEvent) => {
    event.preventDefault()
    event.stopPropagation()
    this.props.onPrev()
  }

  onNext = () => {
    this.props.onNext()
  }

  onChangeDeployment = (deployment: DeploymentType) => () => {
    const data = { ...this.props.data }
    data.deployment = deployment
    this.props.onChange(data)
  }

  onChangeCluster = (cluster: string) => {
    const data = { ...this.props.data }
    data['logical-cluster']['physical-cluster-list'][0].cluster = cluster
    this.props.onChange(data)
    this.getPartitionListByCluster(cluster)
  }

  onChangePartition = (partition: string) => {
    const data = { ...this.props.data }
    data['logical-cluster']['physical-cluster-list'][0].partition = partition
    this.props.onChange(data)
  }

  getProviderCluster = () => {
    const provider = getItem('PROVIDER')
    httpClient.get(`/hccapi/v3/provider/${provider}/cluster`).then(response => {
      if (response.data && response.data['cluster-list']) {
        this.setState({
          clusterList: response.data['cluster-list'].map(
            ({ name }: { name: string }) => name,
          ),
        })
      }
    })
  }

  getPartitionListByCluster = (cluster: string) => {
    const provider = getItem('PROVIDER')
    httpClient
      .get(
        `/hccapi/v3/provider/${provider}/device?cluster=${cluster}&detail=true`,
      )
      .then(response => {
        if (response.data && response.data['device-list']) {
          let partitionList: string[] = []
          response.data['device-list'].forEach((device: IObject) => {
            const devicePartitionList = device['partition-list'] || []
            partitionList = partitionList.concat(
              devicePartitionList.map(({ name }: { name: string }) => name),
            )
          })

          this.setState({
            partitionList,
          })
        }
      })
  }

  componentDidMount() {
    this.getProviderCluster()
  }

  render() {
    const { clusterList, partitionList } = this.state
    const { data } = this.props
    return (
      <React.Fragment>
        <A10Panel
          title={
            <A10IconTextGroup
              text="Select a deployment choice…"
              icon={<A10Icon type="desktop" />}
            />
          }
          shouldShowTitle={true}
          isFormContent={true}
        >
          <A10Row
            type="flex"
            justify="space-around"
            gutter={16}
            className="l4slb-wizard--deployment-list"
          >
            {deploymentTypes.map(({ deploymentType, topology }) => {
              return (
                <A10Col span={8} key={deploymentType}>
                  <div
                    onClick={this.onChangeDeployment(deploymentType)}
                    className={`l4slb-wizard--deployment-type ${
                      data.deployment === deploymentType ? 'selected' : ''
                    }`}
                  >
                    <div>
                      <span className="title">{deploymentType}</span>
                      <A10Icon
                        app="global"
                        type="success-green"
                        style={{ width: 15, height: 15 }}
                      />
                    </div>
                    <div
                      className={`l4slb-wizard--deployment-topology ${topology}`}
                    />
                  </div>
                </A10Col>
              )
            })}
          </A10Row>
        </A10Panel>
        <A10Panel
          title={
            <A10IconTextGroup
              text="Associate Cluster & Partition…"
              icon={<A10Icon type="desktop" />}
            />
          }
          shouldShowTitle={true}
          isFormContent={true}
        >
          <A10Row>
            <A10Col span={12}>
              <A10Form>
                <A10Form.Item label="Cluster" {...this.formItemLayout}>
                  <A10Select
                    value={data['logical-cluster']['physical-cluster-list'][0].cluster}
                    onChange={this.onChangeCluster}
                  >
                    {clusterList.map(providerCluster => {
                      return (
                        <A10Select.Option
                          key={providerCluster}
                          value={providerCluster}
                        >
                          {providerCluster}
                        </A10Select.Option>
                      )
                    })}
                  </A10Select>
                </A10Form.Item>
                <A10Form.Item label="Partition" {...this.formItemLayout}>
                  <A10Select
                    value={data['logical-cluster']['physical-cluster-list'][0].partition}
                    onChange={this.onChangePartition}
                  >
                    {partitionList.map(devicePartition => {
                      return (
                        <A10Select.Option
                          key={devicePartition}
                          value={devicePartition}
                        >
                          {devicePartition}
                        </A10Select.Option>
                      )
                    })}
                  </A10Select>
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
          {/* <A10Button className="btn-action">
            <Link to="/configuration">Skip Wizard to configuration</Link>
          </A10Button> */}
        </div>
      </React.Fragment>
    )
  }
}
