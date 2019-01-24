const path = require('path')
const seleniumServer = require('selenium-server')
const chromedriver = require('chromedriver')
const geckodriver = require('geckodriver')
const fs = require('fs')

const rootPath = path.resolve(__dirname, 'tests/e2e/dist/')

// function getTarget(dirPath, target) {
//   let targetList = []
//   const files = fs.readdirSync(dirPath)
//   files.forEach(fileName => {
//     const filePath = path.resolve(dirPath, fileName)
//     if (fs.statSync(filePath).isFile()) {
//       if (fileName.match(target)) {
//         targetList.push(filePath)
//       }
//     } else {
//       targetList = [...targetList, ...getTarget(filePath, target)]
//     }
//   })
//   return targetList
// }
// const testFiles = getTarget(rootPath, /.*e2e\.js/)
module.exports = {
  src_folders: [rootPath],
  output_folder: 'reports/testcase/e2e',
  // page_objects_path: path.resolve(rootPath, 'page_objects'),
  // globals_path: path.resolve(rootPath, 'config/globals.js'),
  custom_commands_path: path.resolve(rootPath, 'config/custom_commands'),

  selenium: {
    start_process: process.env.CI == 1 ? false : true,
    server_path: seleniumServer.path,
    log_path: '',
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': chromedriver.path,
      'webdriver.geckodriver': geckodriver.path,
    },
  },

  test_settings: {
    default: {
      launch_url: 'http://localhost:3000',
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      screenshots: {
        enable: true,
        on_failure: true,
        path: '',
      },
      filter: '**/*.e2e.js',
      compatible_testcase_support: true,
      desiredCapabilities: {
        browserName: 'chrome',
        // marionette: true,
        chromeOptions: {
          args: ['disable-web-security', 'test-type'],
        },
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
    },

    CI: {
      launch_url: 'http://10.0.1.87',
      desiredCapabilities: {
        browserName: 'chrome',
        // marionette: true,
        chromeOptions: {
          args: ['disable-web-security', 'test-type'],
        },
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
    },

    firefox: {
      desiredCapabilites: {
        browserName: 'firefox',
      },
    },

    edge: {
      desiredCapabilites: {
        browserName: 'MicrosoftEdge',
      },
    },
  },
}
