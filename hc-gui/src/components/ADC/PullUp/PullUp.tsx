import * as React from 'react'

export interface IPullUpProps {
  header: React.ReactNode
  minHeight?: number
}

export interface IPullUpState {
  height: number
}

// tslint:disable-next-line:no-var-requires
const styles = require('./styles/index.module.less')
const initHeight = 100

class PullUp extends React.Component<IPullUpProps, IPullUpState> {
  canMove = false
  prevPosition = { x: 0, y: 0 }

  constructor(props: any) {
    super(props)
    this.state = {
      height: 0,
    }
  }

  componentWillMount() {
    this.setState({
      height: this.props.minHeight,
    })
  }

  onDragStart = (event: IObject) => {
    this.prevPosition = {
      x: event.clientX,
      y: event.clientY,
    }
    this.canMove = true
  }
  onDragEnd = () => {
    this.canMove = false
  }
  onMove = (event: IObject) => {
    const { minHeight = initHeight } = this.props
    if (this.canMove && event.clientY !== 0) {
      // const fixX = this.prevPosition.x - event.clientX
      const fixY = this.prevPosition.y - event.clientY
      this.prevPosition = {
        x: event.clientX,
        y: event.clientY,
      }
      this.setState((prevState: IPullUpState) => {
        const height = prevState.height || minHeight
        return {
          height: height + fixY,
        }
      })
    }
  }

  onDrag = (event: IObject) => {
    this.onMove(event)
  }
  render() {
    const { header, minHeight } = this.props
    return (
      <div style={{ position: 'relative', paddingBottom: '100px' }}>
        <div
          className={styles.pullup}
          style={{ height: this.state.height, minHeight }}
        >
          <div className={`${styles.pullupContainer} pullup-container`}>
            <div className={styles.pullupHeader}>
              <div
                className={styles.pullupHeaderBar}
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd}
                onDrag={this.onDrag}
                draggable={true}
                title="Pull"
              >
                <div />
                <div />
              </div>
            </div>
            {header}
            <div style={{ height: this.state.height - 60, overflowY: 'auto' }}>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PullUp
