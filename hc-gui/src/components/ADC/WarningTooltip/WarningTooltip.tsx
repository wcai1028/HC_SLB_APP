import * as React from 'react'
import { A10Component, _ } from 'a10-gui-framework'
import { A10Tooltip } from 'a10-gui-widgets'

// tslint:disable-next-line:no-var-requires
export const styles = require('./styles/index.module.less')

export interface IWarningTooltipProps {
  title?: string
  description?: string[]
  action?: string
  onConfirm?: () => void
  content?: (
    title: string,
    description: string[],
    action: string,
    onConfirm: () => void,
  ) => React.ReactNode
  arrowPointAtCenter?: boolean
  placement?: string
  trigger?: string
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
}

export interface IWarningTooltipStates {
  title: string
  description: string[]
  action: string
}

class WarningTooltip extends A10Component<
  IWarningTooltipProps,
  IWarningTooltipStates
> {
  constructor(props: IWarningTooltipProps) {
    super(props)
    this.state = {
      title:
        props.title || (props.description && props.description.length > 0)
          ? 'Warning...'
          : 'No Data.',
      description:
        props.description && props.description.length > 0
          ? props.description
          : [],
      action: props.action || 'Confirm',
    }
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps && nextProps.title) {
      this.setState({
        title: nextProps.title,
      })
    }
    if (nextProps && nextProps.description) {
      this.setState({
        description: nextProps.description,
      })
    }
    if (nextProps && nextProps.action) {
      this.setState({
        action: nextProps.action,
      })
    }
  }

  render() {
    const { title, description, action } = this.state
    const onConfirm = this.props.onConfirm && this.props.onConfirm.bind(this)
    const tooltipProps = {
      title:
        (this.props.content &&
          this.props.content.bind(
            this,
            title,
            description,
            action,
            onConfirm,
          )) ||
        (() => {
          return (
            <div className={styles.dirtyList}>
              <h2 className={styles.title}>{title}</h2>
              <ul className={styles.description}>
                {description.map((data, index) => (
                  <li key={index}>
                    <span className={styles.warningIcon} />
                    <span>{data}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.action}>
                <a href="javascript:;" onClick={onConfirm}>
                  {action}
                </a>
              </div>
            </div>
          )
        }),
      arrowPointAtCenter: this.props.arrowPointAtCenter || true,
      placement: this.props.placement || 'bottomLeft',
      trigger: this.props.trigger || 'hover',
      onVisibleChange: this.props.onVisibleChange || _.noop,
    }
    Object.assign(
      tooltipProps,
      this.props.visible !== undefined ? { visible: this.props.visible } : {},
    )

    return (
      <A10Tooltip {...tooltipProps} overlayClassName={styles.dirtyListWrap}>
        <span className={styles.warningIcon} />
      </A10Tooltip>
    )
  }
}

export default WarningTooltip
