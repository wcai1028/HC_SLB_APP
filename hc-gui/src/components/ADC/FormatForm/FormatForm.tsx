import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { A10Icon, A10Button } from 'a10-gui-widgets'

// tslint:disable:no-var-requires
const styles = require('./styles/index.module.less')

export interface IFormatFormProps {
  title?: string
  description?: string
  children: React.ReactElement<any> | Array<React.ReactElement<any>>
  showBack?: boolean
  saveText?: string
  disableSave?: boolean
  hideCancel?: boolean
  customizedButtons?: React.ReactElement<any>
  onRequestOk?: (isOpen: boolean) => void
  onRequestClose?: (isOpen: boolean) => void
}

class FormatForm extends A10Component<IFormatFormProps> {
  static defaultProps = {
    showBack: false,
    disableSave: false,
    hideCancel: false,
    onRequestOk: (isOpen: boolean) => {
      return
    },
    onRequestClose: (isOpen: boolean) => {
      return
    },
  }

  onClickSaveButton = () => {
    const { onRequestOk } = this.props
    onRequestOk(false)
  }

  onClickCancelButton = () => {
    const { onRequestClose } = this.props
    onRequestClose(false)
  }

  onClickBack = () => {
    const { onRequestClose } = this.props
    onRequestClose(false)
  }

  render() {
    const {
      title,
      description,
      children,
      showBack,
      saveText,
      disableSave,
      hideCancel,
      customizedButtons,
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
            <a className="back-link" onClick={this.onClickBack}>
              <A10Icon type="double-left" /> Back
            </a>
          ) : null}
          <A10Button
            type="primary"
            className="submit-button"
            onClick={this.onClickSaveButton}
            disabled={disableSave}
          >
            {saveText ? saveText : 'Save'}
          </A10Button>
          {customizedButtons ? customizedButtons : null}
          {hideCancel ? null : (
            <A10Button className="cancel-button" onClick={this.onClickCancelButton}>
              Cancel
            </A10Button>
          )}
        </div>
      </>
    )
  }
}
export default FormatForm
