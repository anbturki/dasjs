const routeManager = require('./Route')
const router = (expressInstance, controllerDirPath, controllerDir) => {
  const Route = routeManager(expressInstance, controllerDirPath, controllerDir)
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
