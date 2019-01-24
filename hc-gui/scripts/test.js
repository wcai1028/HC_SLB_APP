'use strict'

process.env.BABEL_ENV = 'test'
process.env.NODE_ENV = 'test'
process.env.PUBLIC_URL = ''

process.on('unhandledRejection', err => {
  throw err
})

const jest = require('jest')
let argv = process.argv.slice(2)

if (
  !process.env.CI &&
  argv.indexOf('--coverage') === -1 &&
  argv.indexOf('--watchAll') === -1
) {
  argv.push('--watchAll')
}

if (process.env.CI) {
  argv.push('--runInBand')
}

jest.run(argv)