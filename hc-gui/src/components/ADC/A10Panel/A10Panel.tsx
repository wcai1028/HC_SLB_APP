import * as React from 'react'
import { A10Component, createA10Widget } from 'a10-gui-framework'

// tslint:disable-next-line:no-var-requires
const styles = require('./styles/index.module.less')

export interface IA10PanelProps {
  title: string | React.ReactElement<any>
  menu?: string | React.ReactElement<any>
  shouldShowTitle: boolean
  isFormContent: boolean
}

class A10Panel extends A10Component<IA10PanelProps> {
  render() {
    const {
      title,
      menu = null,
      isFormContent = true,
      shouldShowTitle = true,
      ...rest
    } = this.props
    return (
      <div className={styles.a10WidgetsPanel}>
        <div className={styles.a10WidgetsPanelHeader}>
          {shouldShowTitle ? (
            <div className={styles.a10WidgetsPanelHeaderTitle}>{title}</div>
          ) : null}
          {menu ? (
            <div className={styles.a10WidgetsPanelHeaderMenu}>{menu}</div>
          ) : null}
        </div>
        <div
          className={
            isFormContent
              ? 'a10-gui-widgets-panel-body'
              : styles.a10WidgetsPanelBody
          }
          {...rest}
        />
      </div>
    )
  }
}

export default createA10Widget(A10Panel)
