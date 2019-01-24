import * as React from 'react'
import { A10Component, _ } from 'a10-gui-framework'

// tslint:disable:no-var-requires
const styles = require('./styles/index.module.less')

export interface IA10IconTextGroupProps {
  text: string | React.ReactElement<any>
  icon: React.ReactElement<any>
  onClick?: () => {}
  disabled?: boolean
}

class A10IconTextGroup extends A10Component<IA10IconTextGroupProps> {
  render() {
    const { icon, text, onClick, disabled = false } = this.props
    const cls = `${styles.group} ${disabled ? styles.groupDisabled : ''}`
    const newOnClick = disabled ? _.noop : onClick
    return (
      <span className={cls} onClick={newOnClick}>
        {icon}
        {text}
      </span>
    )
  }
}
export default A10IconTextGroup
