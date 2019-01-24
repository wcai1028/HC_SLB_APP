import * as React from 'react'
import { A10Component } from 'a10-gui-framework'

export interface ICountCardProps {
  title: string
  count?: number | string
  counts?: IObject[]
  type?: string
  color?: string
  isWide?: boolean
}

// tslint:disable-next-line:no-var-requires
const styles = require('./styles/index.module.less')

class CountCard extends A10Component<ICountCardProps> {
  renderCounts = (counts: IObject[] = []) => {
    return counts.map((item: IObject, index: number) => {
      return (
        <div className={styles.countCardInner} key={index}>
          <div
            className={styles.countCardInnerCount}
            style={{ color: item.color || '#8e8e8e' }}
          >
            {item.count}
          </div>
          <div className={styles.countCardTitle} style={{ marginTop: '-6px' }}>
            {item.name}
          </div>
        </div>
      )
    })
  }
  render() {
    const { title, count, counts = [], color, type, isWide } = this.props
    let fontColor = '#8e8e8e'
    let padding = '10px 10px 0 10px'
    let titleMargin = ''

    if (color) {
      fontColor = color
    }
    if (isWide) {
      padding = '10px 20px 0 20px'
    }
    if (!(count || count === 0)) {
      padding = '0px 5px'
      titleMargin = '-4px 0 0 0'
    }
    switch (type) {
      case 'up':
        fontColor = '#7ed321'
        break
      case 'down':
        fontColor = '#ff2e48'
        break
      case 'partial':
        fontColor = '#f5a623'
        break
      case 'disable':
        fontColor = '#f1f8ff'
        break
      case 'unknow':
        fontColor = '#ffba47'
        break
    }
    return (
      <div className={styles.countCard} style={{ padding }}>
        <span className={styles.countCardCount} style={{ color: fontColor }}>
          {count || count === 0 ? count : this.renderCounts(counts)}
        </span>
        <div className={styles.countCardTitle} style={{ margin: titleMargin }}>
          {title}
        </div>
      </div>
    )
  }
}

export default CountCard
