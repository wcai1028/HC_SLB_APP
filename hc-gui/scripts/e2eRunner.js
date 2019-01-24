const nightwatch = require('nightwatch')
const path = require('path')

const argv = process.argv.slice(2)

let env = process.env.CI ? 'CI' : 'default'
let tag = undefined
let group = undefined
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '-e' || argv[i] === '--env') {
    env = argv[i + 1]
  } else if (argv[i] === '-a' || argv[i] === '--tag') {
    tag = argv[i + 1]
  } else if (argv[i] === '-g' || argv[i] === '--group') {
    group = argv[i + 1]
  }
}

nightwatch.runner({
    config: path.join(__dirname, '../nightwatch.config.js'),
    env,
    tag,
    group,
  },
  () => {
    console.log('e2e completed!!')
  },
)