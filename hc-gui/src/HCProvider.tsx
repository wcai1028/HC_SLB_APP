import React from 'react'
import { Store } from 'redux'
import { A10Provider } from 'a10-gui-framework'

export interface IHCPRoviderProps {
  children: JSX.Element
  store?: Store<any>
  initState?: IObject
}

import appReducers from './redux/reducers'
import config from './settings/config'
const middlewares: any[] = []

const HCProvider = (props: IHCPRoviderProps) => {
  const { children, store, initState } = props
  const options: any = {
    initState,
    reducers: appReducers,
    middlewares,
    CONFIG: config,
    children,
  }
  if (store) {
    options.store = store
  }
  return <A10Provider {...options} />
}
export default HCProvider
