const path = require('path')
const fs = require('fs')
const { exec } = require('child_process')
var rimraf = require('rimraf')

const REPO_DIR = path.resolve(__dirname, '../../a10-framework-repo/')

function isFrameworkSource(str) {
  return str.match(/git\+https:\/\/git.a10networks.com:8443\/scm\/guinext\//)
}

function updateLibPackage(libDir) {
  const packageFile = path.resolve(libDir, 'package.json')
  let packageContent = fs.readFileSync(packageFile)
  try {
    packageContent = JSON.parse(packageContent)
  } catch (err) {
    console.error(`${key} has invalid package.json format`)
    process.exit(1)
  }
  ;['dependencies', 'devDependencies', 'peerDependencies'].forEach(key => {
    const dependencies = packageContent[key]
    if (dependencies) {
      Object.keys(dependencies).forEach(packageKey => {
        const source = dependencies[packageKey]
        if (isFrameworkSource(source)) {
          const projectName = source.match(
            /^git\+https:\/\/git.a10networks.com:8443\/scm\/guinext\/(.*).git$/,
          )
          if (projectName && projectName[1]) {
            packageContent[key][packageKey] = `file:../${projectName[1]}`
          }
        }
      })
    }
  })
  fs.writeFileSync(packageFile, JSON.stringify(packageContent))
}

let packageContent = fs.readFileSync(path.resolve(__dirname, '../package.json'))
try {
  packageContent = JSON.parse(packageContent)
} catch (err) {
  console.error(`package.json is invalid JSON format`)
  process.exit(1)
}

const frameworkLibs = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
].reduce((result, key) => {
  const dependencies = packageContent[key]
  if (dependencies) {
    Object.keys(dependencies).forEach(packageKey => {
      const source = dependencies[packageKey]
      if (isFrameworkSource(source)) {
        result[packageKey] = source
      }
    })
  }
  return result
}, {})

const libKeys = Object.keys(frameworkLibs)
if (libKeys.length === 0) {
  console.error('There is no framework dependency in package.json')
  process.exit(1)
}

libKeys.forEach(key => {
  const source = frameworkLibs[key]
  let [sourceUrl, branchName] = source.split('#')
  const libDir = path.resolve(REPO_DIR, key)

  // check the project is existing or not
  if (fs.existsSync(libDir)) {
    let libPackageContent = fs.readFileSync(
      path.resolve(libDir, 'package.json'),
    )
    try {
      libPackageContent = JSON.parse(libPackageContent)
      const libVersion = libPackageContent.version
      if (branchName && libVersion === branchName) {
        return
      } else {
        rimraf.sync(libDir)
      }
    } catch (err) {
      console.log(err)
      console.error(`${key} has invalid package.json format`)
      process.exit(1)
    }
  }

  // clone framework project
  let commandLine = `git clone ${sourceUrl.replace('git+', '')}`
  if (branchName) {
    commandLine += ` --branch ${branchName}`
  }
  exec(`${commandLine} ${libDir}`, (error, stdout, stderr) => {
    if (error) {
      console.error(error)
      console.error(`-------- Failed to clone ${key} from ${source} --------`)
      process.exit(1)
    }
    updateLibPackage(libDir)

    const lockFilePath = path.resolve(libDir, 'package-lock.json')
    if (fs.existsSync(lockFilePath)) {
      rimraf.sync(lockFilePath)
    }

    const gitDirPath = path.resolve(libDir, '.git')
    if (fs.existsSync(gitDirPath)) {
      rimraf.sync(gitDirPath)
    }

    console.log(stdout)
    console.log(stderr)
  })
})
