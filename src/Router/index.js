const routeManager = require('./Route')
const router = (expressInstance, controllerDirPath, controllerDir) => {
  const Route = routeManager(expressInstance, controllerDirPath, controllerDir)
  return {
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
    }
  }
}

module.exports = router
