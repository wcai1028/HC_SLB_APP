import * as React from 'react'
import * as ReactDOM from 'react-dom'
// import createHistory from 'history/createHashHistory'

import registerServiceWorker from './registerServiceWorker'

// import routes from './routes'
import { Root } from './containers/Root'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
// import './styles/index.scss'
import './styles/index.less'
import HCProvider from './HCProvider'

// const history = createHistory()

ReactDOM.render(
  <HCProvider>
    <Root />
  </HCProvider>,
  document.getElementById('root') as HTMLElement,
)
registerServiceWorker()
