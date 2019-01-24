import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { A10Tooltip } from 'a10-gui-widgets'

// tslint:disable-next-line:no-var-requires
const styles = require('./styles/index.module.less')

export interface IStatusBarProps {
  text?: string
  type?: string
  color?: string
  isRect?: boolean
  isBig?: boolean
  tip?: React.ReactNode
}

class StatusBar extends A10Component<IStatusBarProps> {
  renderRectangle = (
    text: string,
    backgroundColor: string,
    padding: string,
  ) => {
    const { isBig = false } = this.props
    const cls = isBig ? styles.avatarRectangleBig : styles.avatarRectangleSmall
    return (
      <span
        className={`${styles.avatar} ${cls}`}
        style={{ backgroundColor, padding }}
      >
        {text}
      </span>
    )
  }

  render() {
    const { type, text = '', color, isRect = false, tip } = this.props
    let backgroundColor = ''
    let padding = ''

    if (color) {
      backgroundColor = color
    }

    if (text.length > 2) {
      padding = '0 6px'
    }

    switch (type) {
      case 'up':
        backgroundColor = '#7ed321'
        break
      case 'down':
        backgroundColor = '#ff2e48'
        break
      case 'partial':
        backgroundColor = '#f5a623'
        break
      case 'disable':
        backgroundColor = '#f1f8ff'
        break
      case 'none':
        backgroundColor = '#4d9fff'
        break
      case 'unknow':
        backgroundColor = '#ffba47'
        break
    }

    let content

    if (isRect) {
      content = this.renderRectangle(text, backgroundColor, padding)
    } else {
      content = (
        <span className={styles.avatar} style={{ backgroundColor, padding }}>
          {text}
        </span>
      )
    }
    if (tip) {
      return (
        <A10Tooltip overlay={tip} arrowPointAtCenter={true}>
          {content}
        </A10Tooltip>
      )
    }
    return content
  }
}

export default StatusBar
