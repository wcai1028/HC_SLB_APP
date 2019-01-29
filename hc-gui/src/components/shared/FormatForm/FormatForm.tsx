import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { A10Icon, A10Button } from 'a10-gui-widgets'

const styles = require('./styles/index.module.less')

export interface IFormatFormProps {
  title?: string
  description?: string
  children: React.ReactElement<any> | Array<React.ReactElement<any>>
  showBack?: boolean
  saveText?: string
  disableSave?: boolean
  hideCancel?: boolean
  alignSaveButtonToRight?: boolean
  customizedButtons?: React.ReactElement<any>
  onRequestOk?: (isOpen: boolean) => void
  onRequestClose?: (isOpen: boolean) => void
}

class FormatForm extends A10Component<IFormatFormProps> {
  static defaultProps = {
    onRequestOk: (isOpen: boolean) => {
      return
    },
  }

  closeSlidingPage = () => {
    const { onRequestClose } = this.props
    onRequestClose(false)
  }

  render() {
    const {
      title,
      description,
      children,
      showBack = false,
      saveText,
      disableSave,
      hideCancel,
      alignSaveButtonToRight,
      customizedButtons,
      onRequestOk,
    } = this.props
    return (
      <>
        <div className={styles.a10SlidingPageContent}>
          <div className={styles.a10SlidingPageTitle}>{title}</div>
          <div className={styles.a10SlidingPageDescription}>{description}</div>
          {children}
        </div>
        <div className={styles.a10SlidingPageFooter}>
          {showBack ? (
            <a className="back-link" onClick={this.closeSlidingPage}>
              <A10Icon type="double-left" /> Back
            </a>
          ) : null}
          {alignSaveButtonToRight ? (
            <A10Button
              type="primary"
              className="submit-button"
              onClick={onRequestOk}
              disabled={disableSave}
              style={{ float: 'right' }}
            >
              {saveText ? saveText : 'Save'}
            </A10Button>
          ) : (
            <A10Button
              type="primary"
              className="submit-button"
              onClick={onRequestOk}
              disabled={disableSave}
            >
              {saveText ? saveText : 'Save'}
            </A10Button>
          )}
          {customizedButtons ? customizedButtons : null}
          {hideCancel ? null : (
            <A10Button
              className="cancel-button"
              onClick={this.closeSlidingPage}
            >
              Cancel
            </A10Button>
          )}
        </div>
      </>
    )
  }
}
export default FormatForm
