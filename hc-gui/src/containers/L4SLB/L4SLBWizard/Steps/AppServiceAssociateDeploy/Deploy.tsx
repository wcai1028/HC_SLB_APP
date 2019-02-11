import * as React from 'react'
import { A10Container, _ } from 'a10-gui-framework'
import { A10Row, A10Col, A10Collapse } from 'a10-gui-widgets'
import ReactLoading from 'react-loading'
import A10ExpandRow from 'src/components/shared/ExpandRow'
import AflexCodeEditor from 'src/components/shared/AflexCodeEditor'
import { getObjectTypeByUrl } from 'src/libraries/stringUtils'
import DiffContent from './DiffContent'

import './styles/index.less'

export interface IAppServiceAssociateDeployProps {
  isSingle?: boolean
  dirtyList?: IObject[]
  onToggleDirtyItem?: any
  loadDirtyList?: boolean
}

export interface IAppServiceAssociateDeployState {
  selectedDirtyList: string[]
  checkAll: boolean
}

class AppServiceAssociateDeploy extends A10Container<
  IAppServiceAssociateDeployProps,
  IAppServiceAssociateDeployState
> {
  static defaultProps = {
    isSingle: false,
  }

  constructor(props: IAppServiceAssociateDeployProps) {
    super(props)
    this.state = {
      checkAll: false,
      selectedDirtyList: [],
    }
    this.onCheckAll = this.onCheckAll.bind(this)
  }

  onToggle = (record: IObject, checked: boolean) => {
    const state = { ...this.state }
    state.selectedDirtyList = state.selectedDirtyList.filter(
      item => item !== record.uuid,
    )
    record.toggle = checked
    if (checked) {
      state.selectedDirtyList.push(record.uuid)
    } else {
      state.checkAll = false
    }
    this.props.onToggleDirtyItem(state.selectedDirtyList)
    this.setState(state)
  }

  renderDeploySpec = (deploySpec: IObject) => {
    const appSvcCount = deploySpec['app-svc-association-list'].length
    return (
      <>
        {appSvcCount > 1 ? (
          <span>{appSvcCount} App Services</span>
        ) : (
          <span>
            <span className="app-assoc-deploy-title-desc">App Service </span>
            <span className="app-assoc-deploy-title-name">
              {deploySpec['app-svc-association-list'][0]['app-svc']}
            </span>
          </span>
        )}
      </>
    )
  }

  renderTitle = (record: IObject, deployInfo: IObject, single: boolean) => {
    let appSvc = ''
    let hasLogicalCluster = false
    if (record.deployspec) {
      appSvc = record.deployspec['app-svc-association-list']
        ? record.deployspec['app-svc-association-list'][0]['app-svc']
        : ''
      if (
        record.deployspec['app-svc-association-list'] &&
        record.deployspec['app-svc-association-list'][0]['logical-cluster-list']
      ) {
        hasLogicalCluster = true
      }
    }
    return (
      <span className="app-assoc-deploy-title">
        <span className="app-assoc-deploy-title-desc">
          {deployInfo.type + ': '}
        </span>
        <span className="app-assoc-deploy-title-name">
          {deployInfo.type === 'App Service' ? appSvc : deployInfo.name}
        </span>
        {deployInfo.type === 'Virtual Port' ? (
          <>
            <span className="app-assoc-deploy-title-desc">
              {' of Virtual Server: '}
            </span>
            <span className="app-assoc-deploy-title-name">
              {deployInfo.vserver}
            </span>
          </>
        ) : null}
        {appSvc ? (
          hasLogicalCluster ? (
            <>
              {' on '}
              {this.renderDeploySpec(record.deployspec)}
            </>
          ) : single ? (
            <span className="app-non-assoc-title">
              No Logical Cluster associated
            </span>
          ) : null
        ) : single ? (
          <span className="app-non-assoc-title">No App Service associated</span>
        ) : null}
      </span>
    )
  }

  renderListCloset = (
    config: string,
    version: string,
    diff: any[],
    id: string,
  ) => {
    const options = {
      mode: { name: 'text/x-aflex' },
      extraKeys: { Ctrl: 'autocomplete' },
      theme: 'a10',
      readOnly: true,
    }
    return (
      <AflexCodeEditor
        value={config}
        options={options}
        version={version}
        diff={diff}
        id={id}
      />
    )
  }

  renderRecord = (record: IObject, supportToggle: boolean, single: boolean) => {
    let disableToggle = true
    if (record.deployspec) {
      if (record.deployspec['app-svc-association-list']) {
        disableToggle = false
        for (const svc of record.deployspec['app-svc-association-list']) {
          if (!svc['logical-cluster-list']) {
            disableToggle = true
            break
          }
        }
      }
    }
    const deployInfo = getObjectTypeByUrl(record.uri)
    return (
      <A10ExpandRow
        key={record.uuid}
        checkAll={this.state.checkAll}
        onToggle={this.onToggle.bind(this, record)}
        supportToggle={supportToggle}
        toggleValue={record.toggle}
        disableToggle={disableToggle}
        title={this.renderTitle(record, deployInfo, single)}
      >
        <A10Row>
          <A10Col style={{ paddingLeft: '20px' }} span={20}>
            {/* {this.renderContent(record, deployInfo.type, !disableToggle)} */}
            <DiffContent
              record={record}
              type={deployInfo.type}
              hasAppAssoc={!disableToggle}
            />
          </A10Col>
        </A10Row>
      </A10ExpandRow>
    )
  }

  checkAppServiceAssoc = (record: IObject) => {
    if (record.deployspec) {
      if (record.deployspec['app-svc-association-list']) {
        for (const svc of record.deployspec['app-svc-association-list']) {
          if (!svc['logical-cluster-list']) {
            /* istanbul ignore next */
            return false
          }
        }
        return true
      }
      /* istanbul ignore next */
      return false
    }
    /* istanbul ignore next */
    return false
  }

  renderNoAssocDirtyList = (dirtyList: IObject[]) => {
    const options = dirtyList.map(item => {
      return this.renderRecord(item, false, false)
    })

    const DirtyListHeader = () => {
      return (
        <>
          <A10Row type="flex" align="middle">
            <A10Col lg={20}>
              <div className="section-title-container">
                <span className="app-non-assoc-title">
                  Not Associated with any App Services (Won't be deployed){' '}
                </span>
              </div>
            </A10Col>
          </A10Row>
        </>
      )
    }
    return (
      <>
        <div className="detail-section app-non-assoc-section">
          <A10Collapse bordered={false}>
            <A10Collapse.Panel header={<DirtyListHeader />} key="1">
              <div style={{ marginLeft: '30px' }}>{options}</div>
            </A10Collapse.Panel>
          </A10Collapse>
        </div>
      </>
    )
  }

  renderDeployList = (dirtyList: IObject[]) => {
    const assocList = []
    const noAssocList = []
    for (const item of dirtyList) {
      if (this.checkAppServiceAssoc(item)) {
        assocList.push(item)
      } else {
        /* istanbul ignore next */
        noAssocList.push(item)
      }
    }
    const supportToggle = !!this.props.onToggleDirtyItem
    const options = assocList.map(item => {
      return this.renderRecord(item, supportToggle, false)
    })
    return (
      <React.Fragment>
        {options}
        {this.renderNoAssocDirtyList(noAssocList)}
      </React.Fragment>
    )
  }

  renderDeploySingle = (dirtyList: IObject[] = []) => {
    return (
      <React.Fragment>
        {dirtyList.length > 0
          ? this.renderRecord(dirtyList[0], false, true)
          : null}
      </React.Fragment>
    )
  }

  onCheckAll = (e: React.MouseEvent<any>) => {
    const { dirtyList, onToggleDirtyItem = _.noop } = this.props
    const assocList: string[] = []
    for (const item of dirtyList) {
      if (!this.state.checkAll) {
        if (this.checkAppServiceAssoc(item)) {
          item.toggle = true
          assocList.push(item.uuid)
        }
      } else {
        if (item.hasOwnProperty('toggle')) {
          /* istanbul ignore next */
          item.toggle = false
        }
      }
    }
    onToggleDirtyItem(assocList)
    this.setState(state => ({
      checkAll: !this.state.checkAll,
      selectedDirtyList: assocList,
    }))
  }

  render() {
    const { isSingle, dirtyList, loadDirtyList } = this.props

    return (
      <div className="app-assoc-deploy">
        {loadDirtyList ? (
          <div className="a10-autoform-loading__icon">
            <ReactLoading type="bars" color="#ddd" height={70} width={70} />
          </div>
        ) : isSingle ? (
          this.renderDeploySingle(dirtyList)
        ) : (
          this.renderDeployList(dirtyList)
        )}
      </div>
    )
  }
}

export default AppServiceAssociateDeploy
