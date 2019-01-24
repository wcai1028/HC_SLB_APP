import * as moxios from 'moxios'
import { axios } from 'a10-gui-framework'

// tslint:disable-next-line
;(function() {
  // Get a handle on the global object
  let local
  if (typeof global !== 'undefined') {
    local = global
  } else if (typeof window !== 'undefined' && window.document) {
    local = window
  } else {
    local = self
  }

  // It's replaced unconditionally to preserve the expected behavior
  // in programs even if there's ever a native finally.
  local.Promise.prototype.finally = function finallyPolyfill(callback) {
    const constructor = this.constructor

    return this.then(
      // tslint:disable-next-line:only-arrow-functions
      function(value) {
        // tslint:disable-next-line:only-arrow-functions
        return constructor.resolve(callback()).then(function() {
          return value
        })
      },
      // tslint:disable-next-line:only-arrow-functions
      function(reason) {
        // tslint:disable-next-line:only-arrow-functions
        return constructor.resolve(callback()).then(function() {
          throw reason
        })
      },
    )
  }
})()

// This condition actually should detect if it's an Node environment
if (typeof require.context === 'undefined') {
  const fs = require('fs')
  const path = require('path')

  require.context = (
    base = '.',
    scanSubDirectories = false,
    regularExpression = /\.js$/,
  ) => {
    const files = {}

    function readDirectory(directory) {
      fs.readdirSync(directory).forEach(file => {
        const fullPath = path.resolve(directory, file)

        if (fs.statSync(fullPath).isDirectory()) {
          if (scanSubDirectories) {
            readDirectory(fullPath)
          }

          return
        }

        if (!regularExpression.test(fullPath)) {
          return
        }

        files[fullPath] = true
      })
    }

    readDirectory(path.resolve(__dirname, base))

    function Module(file) {
      return require(file)
    }

    Module.keys = () => Object.keys(files)

    return Module
  }
}

let originDate
beforeEach(() => {
  originDate = (global as any).Date
  moxios.install(axios)
  moxios.install()
})

afterEach(() => {
  // tslint:disable-next-line
  ;(global as any).Date = originDate
  moxios.uninstall(axios)
  moxios.uninstall()
})
