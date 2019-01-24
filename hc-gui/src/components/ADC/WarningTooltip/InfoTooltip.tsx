import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { A10Tooltip } from 'a10-gui-widgets'

// tslint:disable-next-line:no-var-requires
const styles = require('./styles/index.module.less')

/**
 * Render tooltip for assocaite column.
 * @param objList Which list need to render, if the list length is 0, return undefined.
 * @param renderText Render the context in <li />
 * @param associateButton If show associateButton in tooltip.
 */
export interface IInfoTooltip {
  objList: IObject[]
  componentDisplay?: JSX.Element
  textDisplay?: string
  renderText: (obj: IObject) => {}
  actions?: IObject
}
class InfoTooltip extends A10Component<IInfoTooltip> {
  render() {
    const {
      objList = [],
      textDisplay,
      componentDisplay,
      renderText = (obj: IObject) => ' ',
      actions,
    } = this.props
    if (objList && objList.length > 0) {
      const tooltipProps = {
        title: (
          <div className={styles.dirtyList}>
            <ul className={styles.description}>
              {objList.map((obj: IObject, index: number) => {
                return <li key={index}>{renderText(obj)}</li>
              })}
              {actions ? (
                <div className={styles.action}>{actions}</div>
              ) : (
                  undefined
                )}
            </ul>
          </div>
        ),
        placement: 'right',
      }
      return (
        <A10Tooltip {...tooltipProps} overlayClassName={styles.dirtyListWrap}>
          {componentDisplay ? componentDisplay
            : (textDisplay ?
              <a>{textDisplay}</a>
              : <a>{objList.length}</a>)
          }
        </A10Tooltip>
      )
    }
    return 0
  }
}

export default InfoTooltip
