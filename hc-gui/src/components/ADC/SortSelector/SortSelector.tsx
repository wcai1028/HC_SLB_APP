import * as React from 'react'
import { _ } from 'a10-gui-framework'
import { A10Popover, A10Menu, A10Icon } from 'a10-gui-widgets'

// import dropdownSvg from 'src/assets/images/svg/actions/dropdown.svg'
// import passedSvg from 'src/assets/images/svg/actions/check-green.svg'

export interface ISortSelectorProps {
  sortList: string[]
  name?: string
  sortTitle?: string
  defaultSelected?: string
  onChange?: (sortName: string) => {}
}
export interface ISortSelectorState {
  selectedValue: string
}

// tslint:disable-next-line:no-var-requires
const styles = require('./styles/index.module.less')

class SortSelector extends React.Component<
  ISortSelectorProps,
  ISortSelectorState
> {
  constructor(props: any) {
    super(props)
    this.state = {
      selectedValue: '',
    }
  }

  componentWillMount() {
    this.setState({ selectedValue: this.props.defaultSelected })
  }
  componentWillReceiveProps(nextProps: any) {
    this.setState({ selectedValue: nextProps.defaultSelected })
  }
  handleClick = (item: IObject) => {
    const { onChange = _.noop } = this.props
    if (this.state.selectedValue !== item.key) {
      this.setState({ selectedValue: item.key })
      onChange(item.key)
    }
  }

  renderMenu = () => {
    const { sortList = [] } = this.props
    const { selectedValue } = this.state
    return (
      <A10Menu onClick={this.handleClick} className="sort-selector-menu-list">
        {sortList.map((item: string) => {
          return (
            <A10Menu.Item key={item}>
              <div className={styles.sortSelectorMenuIcon}>
                {selectedValue === item ? (
                  <A10Icon
                    app="global"
                    type="check-green"
                    style={{
                      width: '12px',
                      height: '12px',
                      marginRight: '4px',
                    }}
                  />
                ) : null}
              </div>
              {item}
            </A10Menu.Item>
          )
        })}
      </A10Menu>
    )
  }
  // renderSortPanel = () => {
  //   const { sortTitle = 'Sort By' } = this.props
  //   return (
  //     <div className={styles.sortSelectorMenu}>
  //       <div className={styles.sortSelectorMenuTitle}>{sortTitle}</div>
  //       {this.renderMenu()}
  //     </div>
  //   )
  // }
  render() {
    const { selectedValue } = this.state
    const { sortTitle = 'Sort By', name } = this.props
    const popoverContent = (
      <div className={`${name}-popover ${styles.sortSelectorMenu}`}>
        <div className={styles.sortSelectorMenuTitle}>{sortTitle}</div>
        {this.renderMenu()}
      </div>
    )
    return (
      <div className={styles.sortSelector} style={{ cursor: 'pointer' }}>
        <A10Popover
          content={popoverContent}
          trigger="hover"
          arrowPointAtCenter={true}
          placement="bottomRight"
        >
          <span className={`${name} ${styles.sortSelectorName}`}>
            {selectedValue}
          </span>
          <A10Icon
            app="global"
            type="dropdown"
            style={{ width: '12px', height: '12px', marginLeft: '4px' }}
          />
        </A10Popover>
      </div>
    )
  }
}

export default SortSelector
