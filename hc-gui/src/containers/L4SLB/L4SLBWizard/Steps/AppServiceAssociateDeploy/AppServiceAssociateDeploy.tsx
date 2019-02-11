import * as React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { _ } from 'a10-gui-framework'
import { A10Button, A10Icon, A10Message } from 'a10-gui-widgets'

import AbstractStep, {
  IAbstractStepProps,
} from 'src/components/shared/Wizard/AbstractStep'
import A10IconTextGroup from 'src/components/shared/A10IconTextGroup'
import { A10Panel } from 'src/components/shared/A10Panel'
import {
  IDirtyInstanceListObject,
  IDirtyInstance,
  IDiff,
  IDeploySpec,
  IWizardData,
} from '../../interface'
import { IAppServiceObject, IAppService } from '../../../interface'
import { getItem } from 'src/libraries/storage'
import { httpClient } from 'src/libraries/httpClient'
import Deploy from './Deploy'

export interface IAppServiceAssociateDeployProps extends IAbstractStepProps {
  data?: IWizardData
}

export interface IAppServiceAssociateDeployState {
  loadDirtyList: boolean
  dirtyList: IDirtyInstance[]
  isRedirect: boolean
}

class AppServiceAssociateDeploy extends AbstractStep<
  IAppServiceAssociateDeployProps,
  IAppServiceAssociateDeployState
> {
  constructor(props: IAppServiceAssociateDeployProps) {
    super(props)
    this.state = {
      loadDirtyList: true,
      dirtyList: [],
      isRedirect: false,
    }
  }

  onPrev = (event: React.SyntheticEvent) => {
    event.preventDefault()
    event.stopPropagation()
    this.props.onPrev()
  }

  onNext = () => {
    const { data } = this.props
    const { name } = data['app-svc']

    this.getAppService(name)
      .then(appServiceObject => {
        this.deploy(appServiceObject['app-svc'])
      })
      .then(() => {
        this.setState({ isRedirect: true })
      })
  }

  deploy = (appService: IAppService) => {
    return httpClient
      .post('/hocapi/v1/workflow/deploy/', {
        deploy: {
          'obj-id': appService.uuid,
        },
      })
      .then(() => {
        A10Message.success('Success: The deployment task has been scheduled.')
      })
      .catch(() => {
        A10Message.error('Error: The deployment task failed.')
      })
  }

  getDirtyInstanceList() {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')
    const appServiceName = this.props.data['app-svc'].name
    const promises: Array<Promise<any>> = []
    let dirtyList: IDirtyInstance[] = []

    httpClient
      .get<IDirtyInstanceListObject>(
        `/hccapi/v3/provider/${provider}/tenant/${tenant}/app-svc/${appServiceName}/dirty`,
      )
      .then(({ data }) => {
        if (Array.isArray(data['dirty-instance-list'])) {
          dirtyList = data['dirty-instance-list']
          dirtyList.forEach(dirtyInstance => {
            promises.push(this.getDirtyInstanceDiff(dirtyInstance))
            promises.push(this.getDirtyInstanceDeploySpec(dirtyInstance))
          })
        }

        return Promise.all(promises)
      })
      .then(() => {
        this.setState({ dirtyList, loadDirtyList: false })
      })
      .catch(() => {
        this.setState({ loadDirtyList: false })
      })
  }

  getDirtyInstanceDiff = (dirtyInstance: IDirtyInstance) => {
    return new Promise((resolve, reject) => {
      httpClient
        .get<IDiff>(`/hccapi/v3/uuid/${dirtyInstance.uuid}/diff`)
        .then(({ data }) => {
          dirtyInstance.before = data.before
          dirtyInstance.latest = data.latest
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  getDirtyInstanceDeploySpec = (dirtyInstance: IDirtyInstance) => {
    return new Promise((resolve, reject) => {
      httpClient
        .get<IDeploySpec>(`/hccapi/v3/uuid/${dirtyInstance.uuid}/deployspec`)
        .then(({ data }) => {
          dirtyInstance.deployspec = data
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  getAppService = (appServiceName: string) => {
    const provider = getItem('PROVIDER')
    const tenant = getItem('tenant')

    return httpClient
      .get<IAppServiceObject>(
        `/hccapi/v3/provider/${provider}/tenant/${tenant}/app-svc/${appServiceName}`,
      )
      .then(({ data }) => data)
  }

  componentDidMount() {
    this.getDirtyInstanceList()
  }

  render() {
    const { loadDirtyList, dirtyList, isRedirect } = this.state

    if (isRedirect) {
      return <Redirect to="/appservice" />
    }

    return (
      <React.Fragment>
        <A10Panel
          title={
            <A10IconTextGroup text="Deploy" icon={<A10Icon type="desktop" />} />
          }
          shouldShowTitle={true}
          isFormContent={true}
        >
          <Deploy
            isSingle={false}
            dirtyList={dirtyList}
            loadDirtyList={loadDirtyList}
          />
        </A10Panel>
        <div className="footer">
          <a href="" className="btn-back" onClick={this.onPrev}>
            « Back
          </a>
          <A10Button className="btn-next" type="primary" onClick={this.onNext}>
            Deploy
          </A10Button>
          <A10Button className="btn-cancel" onClick={this.onNext}>
            <Link to="/appservice">Deploy Later</Link>
          </A10Button>
        </div>
      </React.Fragment>
    )
  }
}

export default AppServiceAssociateDeploy
