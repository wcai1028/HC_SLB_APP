import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { A10Table, A10Row, A10Col, A10Icon, A10Button } from 'a10-gui-widgets'
import ReactLoading from 'react-loading'
import * as propTypes from 'prop-types'

import FormatSlidingPage from '../FormatSlidingPage'
import TextSpan from '../TextSpan'

// tslint:disable-next-line:no-var-requires
const styles = require('./styles/index.module.less')

export interface IAppServiceListProps {
  data: any[]
  isLoading?: boolean
}

export interface IAppServiceState {
  showSlidingPage: boolean
  formData: IObject
}

class BasicAppServiceList extends A10Component<
  IAppServiceListProps,
  IAppServiceState
  > {
  static contextTypes = {
    openSlidingPage: propTypes.func.isRequired,
  }
  defaultAppServiceColumns: any[]
  constructor(props: IAppServiceListProps) {
    super(props)
    this.state = {
      showSlidingPage: false,
      formData: null,
    }
    this.defaultAppServiceColumns = [
      {
        title: 'App Service',
        dataIndex: 'app-svc',
        key: 'app-svc',
        render: (text: string) => {
          return <TextSpan text={text} />
        },
      },
      {
        title: '# vPorts',
        dataIndex: 'vport',
        key: 'vport',
      },
      {
        title: 'App Service Group',
        dataIndex: 'app-svc-group',
        key: 'app-svc-group',
      },
      {
        title: '',
        dataIndex: '',
        key: '',
        render: (record: any) => {
          return (
            <div className={styles.editColumn}>
              <i>
                <img src="/images/svg/icon-analytics.svg" />
              </i>
              <i onClick={this.setSlidingPage.bind(this, true, record)}>
                <img src="/images/svg/icon-edit.svg" />
              </i>
              <i>
                <img src="/images/svg/icon-more-actions.svg" />
              </i>
            </div>
          )
        },
      },
    ]
  }

  setSlidingPage = (isOpen: boolean, data: IObject) => {
    this.setState({ showSlidingPage: isOpen, formData: data })
  }

  onCreateAppService = () => {
    this.setSlidingPage(false, null)
  }

  onCloseSlidingPage = () => {
    this.setSlidingPage(false, null)
  }

  render() {
    const { showSlidingPage } = this.state
    const { data } = this.props
    const appServiceColumns = [...this.defaultAppServiceColumns]

    return (
      <>
        <A10Row type="flex" align="middle" className="action-container">
          <A10Col lg={24}>
            <div
              className="table-header table-header-inner action-wrap"
            >
              <A10Button
                className="action-button"
                onClick={this.setSlidingPage.bind(this, true, null)}
              >
                <A10Icon type="plus" className="action-icon" />
                Add App Service
              </A10Button>
            </div>
          </A10Col>
        </A10Row>
        <A10Table
          className={`hc-list ${styles.portList}`}
          columns={appServiceColumns}
          dataSource={data}
          size="small"
          loading={
            this.props.isLoading
              ? {
                indicator: (
                  <div className="loading-icon">
                    <ReactLoading
                      type="bars"
                      color="#4a90e2"
                      height={40}
                      width={40}
                    />
                  </div>
                ),
              }
              : false
          }
        />
        <FormatSlidingPage
          isOpen={showSlidingPage}
          onRequestClose={this.setSlidingPage.bind(this, false)}
          title="New App Service"
          description="Please provide following information to create a new App Service."
          customizedButtons={
            <A10Button className="customized-button">Save </A10Button>
          }
        >
          <span>AppServiceForm</span>
        </FormatSlidingPage>
      </>
    )
  }
}

export default BasicAppServiceList
