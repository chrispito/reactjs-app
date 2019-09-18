import Mocha from 'mocha'
import chokidar from 'chokidar'
import path from 'path'
import './setup.js' // eslint-disable-line

require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react']
})

const runSuite = (filepath) => {
  if (!filepath) {
    return
  }

  try {
    Object.keys(require.cache).forEach((key) => delete require.cache[key])
    const mocha = new Mocha({ reporter: 'spec' })
    mocha.addFile(filepath)
    mocha.run()
  } catch (e) {
    if (!e.message.match(/Cannot find module/)) {
      console.error(e) // eslint-disable-line
    }
  }
}

const getSpec = (filepath) => {
  if (!filepath) {
    return null
  }

  let result = filepath

  if (filepath.match(/components/)) {
    const parsed = path.parse(filepath)
    const resolved = path.resolve(filepath, '../../')
    result = `${resolved}/${parsed.base}`
  }

  result = result.replace(/\.js$/, '.spec.js')
  result = result.replace(/\/app\/src/, '/app/test')

  return result
}

const opts = {
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 50,
    pollInterval: 10
  }
}
chokidar.watch('/app/test/**/*.spec.js', opts)
  .on('add', (filepath) => runSuite(filepath))
  .on('change', (filepath) => runSuite(filepath))

chokidar.watch('/app/src/**/*.js', opts)
  .on('add', (filepath) => runSuite(getSpec(filepath)))
  .on('change', (filepath) => runSuite(getSpec(filepath)))
