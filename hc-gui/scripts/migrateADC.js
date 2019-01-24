const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const prettier = require('prettier')
const shell = require('shelljs')
const packageJson = require('../package.json')

// usage: npm run dev:migrate -- containers/Mypackage scss|less
let packagePath = process.argv[2].trim().replace(/\/+$/, '')
const cssPreprocessorExt = 'less'
const traversalPackages = (dir, migrate = true) => {
  console.log(`Starting... ${dir}`)
  const name = dir
    .replace(/\/+$/, '')
    .split('/')
    .pop()
  if (migrate) {
    const fix = ext => {
      const mainFile = path.join(dir, `${name}.${ext}`)
      const indexFile = path.join(dir, `index.${ext}`)
      if (fs.existsSync(indexFile)) {
        if (fs.existsSync(mainFile)) {
          return true
        } else {
          const content = fs.readFileSync(indexFile, 'utf8')
          if (content.includes(`class ${name} extends `)) {
            // fs.renameSync(indexFile, mainFile)
            shell.exec(`git mv ${indexFile} ${mainFile}`)
          } else {
            console.log(
              chalk.yellow(`${indexFile} has no class ${name}, so skip.`),
            )
            return true
          }
        }
      }
      if (!fs.existsSync(indexFile) && fs.existsSync(mainFile)) {
        fs.writeFileSync(
          indexFile,
          `export { default, default as ${name} } from './${name}'`,
        )
      }
      return fs.existsSync(mainFile) || fs.existsSync(indexFile)
    }
    !fix('tsx') && fix('ts')
  }

  const files = fs.readdirSync(dir)
  files.forEach(function(file) {
    const nextDir = path.join(dir, file)
    const stats = fs.statSync(nextDir)
    const exclusions = ['style', 'styles', '__tests__', 'images']
    if (file.startsWith('.')) {
      return
    }
    if (stats.isDirectory()) {
      if (!exclusions.includes(file)) {
        traversalPackages(nextDir, file[0] === file.toUpperCase()[0])
      }
    } else {
      const content = fs.readFileSync(nextDir, 'utf8')
      fs.writeFileSync(nextDir, formatCode(content, nextDir))
    }
  })

  if (migrate) {
    const testPath = `${dir}/__tests__`
    createDirIfNotExists(testPath)
    const testFile = `${testPath}/${name}.test.tsx`
    createFileIfNotExists(testFile)
    const stylesPath = `${dir}/styles`
    if (fs.existsSync(`${dir}/style`)) {
      // fs.renameSync(`${dir}/style`, stylesPath)
      shell.exec(`git mv ${dir}/style ${stylesPath}`)
    } else if (!fs.existsSync(stylesPath)) {
      createDirIfNotExists(stylesPath)
      const styleFile = `${stylesPath}/${name.toLowerCase()}.${cssPreprocessorExt}`
      createFileIfNotExists(styleFile)
    }
  }
}
const formatCode = (code, filepath) => {
  return prettier.format(code, {
    ...(packageJson.prettier || {}),
    filepath,
  })
}
const createDirIfNotExists = dirPath => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
  }
}
const createFileIfNotExists = (filePath, callback) => {
  if (!fs.existsSync(filePath)) {
    fs.closeSync(fs.openSync(filePath, 'w'))
    callback && callback()
  }
}
if (packagePath) {
  packagePath = path.resolve(process.cwd(), 'src', packagePath)
  traversalPackages(packagePath)
}
