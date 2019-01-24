import * as React from 'react'

const minProps = {
  isOpen: true,
  children: <p>Inner Component</p>,
}

const commonProps = {
  isOpen: true,
  title: 'Common Unit Test',
  description: 'This is a common Unit Test',
  children: <p>Inner Component</p>,
  showBack: false,
  saveText: null,
  disableSave: false,
  hideCancel: false,
  customizedButtons: null,
}

const specialProps = {
  isOpen: true,
  title: 'Special Unit Test',
  description: 'This is a special Unit Test',
  children: <p>Inner Component</p>,
  showBack: true,
  saveText: 'TestSave',
  disableSave: true,
  hideCancel: true,
  customizedButtons: <button>Customized</button>,
}

export default (isSpecial?: boolean, callbackOK?: any, callbackCancel?: any) => {
  if (isSpecial === undefined && callbackOK === undefined && callbackCancel === undefined) {
    return minProps
  }

  if (isSpecial) {
    return {
      ...specialProps,
      onRequestOk: callbackOK,
      onRequestClose: callbackCancel,
    }
  } else {
    return {
      ...commonProps,
      onRequestOk: callbackOK,
      onRequestClose: callbackCancel,
    }
  }
}
