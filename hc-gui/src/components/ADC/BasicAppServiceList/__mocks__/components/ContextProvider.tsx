import * as React from 'react'
import * as PropTypes from 'prop-types'

export interface IContextProviderProps {
  openSlidingPage: (component: JSX.Element) => void
}

export interface IContextProviderState {
}

class ContextProvider extends React.Component<IContextProviderProps, IContextProviderState> {

  static childContextTypes = {
    openSlidingPage: PropTypes.func.isRequired,
  }

  getChildContext() {
    return {
      openSlidingPage: this.props.openSlidingPage,
    }
  }

  render() {
    return this.props.children
  }
}

export default ContextProvider
