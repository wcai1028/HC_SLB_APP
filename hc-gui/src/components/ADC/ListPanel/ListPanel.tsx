import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { A10Icon, A10Popover, A10Menu } from 'a10-gui-widgets'

export interface IListPanelProps {
  title: string
  settingName?: string
  settingMenu?: React.ReactNode
  statusBars?: React.ReactNode
  rightContent?: React.ReactNode | string
}

// tslint:disable-next-line:no-var-requires
const styles = require('./styles/index.module.less')

class ListPanel extends A10Component<IListPanelProps> {
  render() {
    const {
      title = '',
      settingName = '',
      settingMenu,
      statusBars,
      rightContent,
    } = this.props
    return (
      <div className={styles.listPanel}>
        <div className={styles.listPanelHeader}>
          <div className={styles.listPanelHeaderTitle}>
            <span className={styles.listPanelHeaderTitleSpan}>
              {title.toUpperCase()}
            </span>
            {statusBars}
          </div>
          <div className={styles.listPanelHeaderSetting}>
            {settingName}
            {settingMenu ? (
              <A10Popover
                placement="bottomRight"
                arrowPointAtCenter={true}
                content={settingMenu}
              >
                <A10Icon type="down" />
              </A10Popover>
            ) : null}
            {rightContent}
          </div>
        </div>
        <div className={styles.listPanelContent}>{this.props.children}</div>
      </div>
    )
  }
}

export default ListPanel
