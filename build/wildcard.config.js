import path from 'path'
import obfuscator from 'rollup-plugin-obfuscator'
import packageJson from './../package.json'
import distPackageJson from './../dist.package.json'

const ncp = require('ncp')
const fs = require('fs')
const _ = require('lodash')

const outputDir = path.resolve(__dirname, '../../@vueform-wildcard')

function deleteFolderRecursiveSync(directory, deleteCurrent = false) {
  if (fs.existsSync(directory)) {
    fs.readdirSync(directory).forEach((file) => {
      const filePath = path.join(directory, file);
      if (fs.lstatSync(filePath).isDirectory() && file != '.git') {
        deleteFolderRecursiveSync(filePath, true);
      } else if (file != '.git') {
        fs.unlinkSync(filePath);
      }
    });

    if (deleteCurrent) {
      fs.rmdirSync(directory);
    }
  }
}

deleteFolderRecursiveSync(outputDir)

const copyFiles = {
  'themes': 'themes',
  'locales': 'locales',
  'CHANGELOG.md': 'CHANGELOG.md',
  'tailwind.js': 'tailwind.js',
  'tailwind-prefixer.js': 'tailwind-prefixer.js',
  'vite.js': 'vite.js',
  'src/plugin.js': 'plugin.js',
  '.gitignore.dist': '.gitignore',
  '.npmrc.wildcard': '.npmrc',
  'README.prod.md': 'README.md',
}

export default (commandLineArgs) => {
  let version = commandLineArgs.configVersion

  if (!version) {
    version = packageJson.version
  }

  const copyPackageJson = function()
  {
    const finalPackageJson = { ...distPackageJson }

    finalPackageJson.name = '@vueform/sdk'
    finalPackageJson.version = version
    finalPackageJson.private = false
    finalPackageJson.description = 'Vueform SDK wildcard production build.'

    fs.writeFileSync(path.resolve(outputDir, 'package.json'), JSON.stringify(finalPackageJson, null, 2))
  }

  if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
  }

  _.each(copyFiles, (to, from) => {
    const fromPath = path.resolve(__dirname, '../', from)
    
    if (!fs.existsSync(fromPath)) {
      return
    }

    ncp(fromPath, path.resolve(outputDir, to), function (err) {
      if (err) {
        return console.error(err);
      }
    })
  })

  copyPackageJson()

  const files = [
    {
      input: path.resolve(__dirname, '../dist/installer.js'),
      output: path.resolve(__dirname, '../../@vueform-wildcard/installer.js'),
    },
    {
      input: path.resolve(__dirname, '../dist/element.js'),
      output: path.resolve(__dirname, '../../@vueform-wildcard/element.js'),
    },
    {
      input: path.resolve(__dirname, '../dist/index.js'),
      output: path.resolve(__dirname, '../../@vueform-wildcard/index.js'),
    },
  ]

  return files.map((file) => {
    let globalOptions = {
      identifierNamesGenerator: 'mangled-shuffled',
      forceTransformStrings: [
        '//api.vueform.com/check?key=',
      ],
      splitStrings: true,
      stringArrayCallsTransform: true,
      stringArrayEncoding: ['base64'],
    }

    return {
      input: file.input,
      output: {
        file: file.output,
        format: 'esm',
        sourcemap: false,
      },
      plugins: [
        obfuscator({
          fileOptions: false,
          globalOptions,
        }),
      ],
      external: ['vue', 'axios', 'lodash', 'moment'],
    }
  })
}