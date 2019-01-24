import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { A10SlidingPage } from 'a10-gui-widgets'

import FormatForm from '../FormatForm'

export interface IA10SlidingPageProps {
  isOpen: boolean
  title?: string
  description?: string
  children: React.ReactElement<any>
  showBack?: boolean
  saveText?: string
  disableSave?: boolean
  hideCancel?: boolean
  customizedButtons?: React.ReactElement<any>
  onRequestOk?: (isOpen: boolean) => void
  onRequestClose?: (isOpen: boolean) => void
}

class FormatSlidingPage extends A10Component<IA10SlidingPageProps> {
  static defaultProps = {
    onRequestOk: (isOpen: boolean) => {
      return
    },
    onRequestClose: (isOpen: boolean) => {
      return
    },
  }
  render() {
    const {
      isOpen,
      onRequestClose,
      onRequestOk,
      children,
      title,
      saveText,
      description,
      customizedButtons,
      disableSave,
      hideCancel,
      showBack = false,
    } = this.props

    return (
      <A10SlidingPage isOpen={isOpen} onRequestClose={onRequestClose}>
        <FormatForm
          {...{
            title,
            description,
            children,
            showBack: showBack ? showBack : false,
            saveText,
            disableSave,
            hideCancel,
            onRequestOk,
            onRequestClose,
            customizedButtons,
          }}
        />
      </A10SlidingPage>
    )
  }
}
export default FormatSlidingPage
