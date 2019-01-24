import * as React from 'react'
import { A10Component } from 'a10-gui-framework'
import { A10Icon } from 'a10-gui-widgets'

// tslint:disable-next-line:no-var-requires
const styles = require('./styles/index.module.less')

export interface ITenantSelectorProps {
  options: string[]
  currentOption: string // If props has a current option, then use it as the initial option
  onCurrentChange?: (option: string) => void // If props has a current option, this will work for the first time
  defaultOption?: string // If props has no current option but default option, use it to initialize
  // But onCurrentChange will not work with the default one
}

export interface ITenantSelectorStates {
  currentIndex: number
  showDropMenu: boolean
}

class TenantSelector extends A10Component<
  ITenantSelectorProps,
  ITenantSelectorStates
  > {
  constructor(props: ITenantSelectorProps) {
    super(props)
    let initialIndex = 0
    if (props.currentOption) {
      props.options.some((item, index) => {
        if (item === props.currentOption) {
          initialIndex = index
          if (props.onCurrentChange) {
            props.onCurrentChange(item)
          }
          return true
        }
        return false
      })
    } else if (props.defaultOption) {
      props.options.some((item, index) => {
        if (item === props.defaultOption) {
          initialIndex = index
          return true
        }
        return false
      })
    }
    this.state = {
      currentIndex: initialIndex,
      showDropMenu: false,
    }
  }

  componentDidUpdate(preProps: any) {
    if (preProps.currentOption !== this.props.currentOption ||
      preProps.options !== this.props.options) {
      this.props.options.some((item, index) => {
        if (item === this.props.currentOption) {
          const initialIndex = index
          this.setState({ currentIndex: initialIndex })
          return true
        }
        return false
      })
    }
  }

  onClickOption(option: string, index: number) {
    return this.setState({ currentIndex: index }, () => {
      return this.props.onCurrentChange && this.props.onCurrentChange(option)
    })
  }

  onControlDropMenu(show: boolean) {
    return this.setState({ showDropMenu: show })
  }

  render() {
    // const onClickOption = (option: string, index: number) => {
    //   return this.setState({ currentIndex: index }, () => {
    //     return this.props.onCurrentChange && this.props.onCurrentChange(option)
    //   })
    // }

    // const onControlDropMenu = (show: boolean) => {
    //   return this.setState({ showDropMenu: show })
    // }

    const { currentIndex, showDropMenu } = this.state
    const currentText = this.props.options[currentIndex]
    const currentInitial = currentText
      ? currentText.slice(0, 1).toUpperCase()
      : ''

    return (
      <div className={styles.tenantSelector}>
        <div
          className={styles.currentBlock}
          onClick={this.onControlDropMenu.bind(this, !showDropMenu)}
        >
          <div className={styles.currentIcon}>
            <span>{currentInitial}</span>
          </div>
          <span className={styles.currentText}>{currentText}</span>
          <A10Icon
            className={styles.currentArrow}
            type={showDropMenu ? 'up' : 'down'}
          />
          {showDropMenu ? (
            <ul
              className={styles.dropdownList}
              onMouseLeave={this.onControlDropMenu.bind(this, false)}
            >
              {this.props.options.map((option, index) => {
                return (
                  <li
                    key={index}
                    data-option={option}
                    className={styles.optionBlock}
                    onClick={this.onClickOption.bind(this, option, index)}
                  >
                    <div className={styles.innerBlock}>
                      <span className={styles.text}>{option}</span>
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : null}
        </div>
      </div>
    )
  }
}

export default TenantSelector
