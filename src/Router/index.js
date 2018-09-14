const routeManager = require('./Route')
const config = require('../config')
const fs = require('fs')
const path = require('path')
const router = (expressInstance, controllerDirPath, options = {}) => {
  if (!controllerDirPath) {
    throw new Error('please enter the root path of your project, to be able to access the controllers directory')
  }
  config.controllerDir = options.controllerDir || config.controllerDir
  config.controllerDirPath = controllerDirPath
  const ctrlPath = path.resolve(config.controllerDirPath, config.controllerDir)
  const isDirExists = fs.existsSync(ctrlPath)
  if (!isDirExists) {
    fs.mkdir(ctrlPath, (err) => {
      if (err) throw new Error(err)
    })
  }
  const Route = routeManager(expressInstance)
  return {
    /**
     * @param {String} route - matchs endpoint
     * @param {String|Function} handler callback function that will be inovked matchs route endpoint
     * @param {Array} verbs HTTP method [GET,POST,PUT]
     */
    route (route, handler, verbs = ['get']) {
      return new Route(route, handler, verbs)
    },
    get (route, handler) {
      this.route(route, handler, ['get'])
    },
    post (route, handler) {
      this.route(route, handler, ['post'])
    },
    put (route, handler) {
      this.route(route, handler, ['put'])
    },
    delete (route, handler) {
      this.route(route, handler, ['put'])
    }
  }
}

module.exports = router
