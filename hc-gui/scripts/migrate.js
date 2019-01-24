const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const prettier = require('prettier')
const packageJson = require('../package.json')

// usage: npm run dev:migrate -- containers/Mypackage scss|less
let packagePath = process.argv[2].trim().replace(/\/+$/, '')
const cssPreprocessorExt = (process.argv[3] || 'scss').trim()
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
  try {
    const name = packagePath.split('/').pop()
    const thePath = path.resolve(process.cwd(), 'src', packagePath)
    createDirIfNotExists(thePath)
    const testPath = `${thePath}/__tests__`
    createDirIfNotExists(testPath)
    const testFile = `${testPath}/${name}.test.tsx`
    createFileIfNotExists(testFile)
    const stylesPath = `${thePath}/styles`
    createDirIfNotExists(stylesPath)
    const styleFile = `${stylesPath}/${name.toLowerCase()}.${cssPreprocessorExt}`
    createFileIfNotExists(styleFile)
    const indexFile = `${thePath}/index.tsx`
    createFileIfNotExists(indexFile, () => {
      fs.writeFileSync(
        indexFile,
        `export { default, default as ${name} } from './${name}'`,
      )
    })
    const mainFile = `${thePath}/${name}.tsx`
    createFileIfNotExists(mainFile, () => {
      let code = ''
      if (thePath.includes('containers')) {
        code = `
          import * as React from 'react'
          import {
            A10Container,
            setupA10Container,
            IA10ContainerDefaultProps,
          } from 'a10-gui-framework'

          export interface I${name}Props extends IA10ContainerDefaultProps {}
          export interface I${name}State {}
        `
      } else if (thePath.includes('components')) {
        code = `
          import * as React from 'react'
          import { A10Component } from 'a10-gui-framework'

          export interface I${name}Props {}
          export interface I${name}State {}
        `
      }
      fs.writeFileSync(
        mainFile,
        prettier.format(code, {
          ...(packageJson.prettier || {}),
          parser: 'typescript',
        }),
      )
    })
    console.log(
      chalk.green(`Package "${thePath}" has been created successfully`),
    )
  } catch (e) {
    console.error(e)
  }
} else {
  console.log(chalk.red('No argument'))
}
