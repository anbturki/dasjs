const config = require('../config')
const path = require('path')
const fs = require('fs')
/**
 * it called to return a class Route after accept express instance
 * @method routeManager
 * @param {Object} expressInstance - Express app instance
 * @param {String} controllerDirPath - the absolute path where the controllers directory is located
 * @param {String} controllerDir - a name of directory that holds controllers - the default is controllers
 * @returns {Route class}
 * @private
 */
const routeManager = function (expressInstance, controllerDirPath, controllerDir) {
  config.controllerDir = controllerDir || config.controllerDir
  config.controllerDirPath = controllerDirPath || __dirname
  if (!controllerDirPath) {
    throw new Error('please enter the root path of your project, to be able to access the controllers directory')
  }
  if (!expressInstance) {
    throw new Error('You must pass a express() instance')
  }
  isControllerExists()
  /**
   * handle incoming request
   * @kind Class
   * @class Route
   * @param {String} route - matched route
   * @param {String|Function} handler - a callback function that will be invoked one the route is matchs
   * @param {Array} verbs - request verb/method one route myight has many diffrent verbs
   * @example
   * const route = new Route('/post', 'PostController@create', ['post'])
   * @private
   */
  function Route (route, handler, verbs = ['get']) {
    validateRoute(route)
    validateHandler(handler)
    validateVerbs(verbs)
    this.route = route
    this.verbs = verbs
    this.handler = handler
    this.method = splitHandler(handler).method
    this.controller = splitHandler(handler).controller
    executeRoutes.apply(this)
  }

  /**
  * validates the route to make sure it is a valid string
  * @method validateRoute
  * @param {String} route
  * @returns {void}
  * @private
 */
  function validateRoute (route) {
    if (typeof route !== 'string') {
      throw new Error('Cannot instantiate route without a valid url string')
    }
  }

  /**
   * validate handler to make sure it is a valid function or string
   * @method validateHandler
   * @param {String|Function} handler - a string or function, which will be the callback
   * for the http route
   * @returns {void}
   * @private
   */
  function validateHandler (handler) {
    if (!['function', 'string'].includes(typeof handler)) {
      throw new Error('Cannot instantiate route without route handler')
    }
  }

  /**
   * validate verbs to make sure that the verbs is an array.
   * @method validateVerbs
   * @param {Array} verbs - HTTP methods [GET,POST,PUT,DELETE,PATCH,OPTIONS,HEAD]
   * @returns {void}
   * @private
   */
  function validateVerbs (verbs) {
    if (!Array.isArray(verbs)) {
      throw new Error('New route expects HTTP verbs to be an array')
    }
  }
  /**
  * it split both method and controller name if the handler is a string
  * @method splitHandler
  * @param {String|Function} handler - if it is a string
  * @returns {Object}
  * @private
  */
  function splitHandler (handler) {
    let method
    let controller
    if (typeof handler === 'function') {
      method = handler
    } else {
      const handle = handler.split('@')
      if (!handle || !handle.length || handle.length !== 2) {
        throw new Error(`Enter a valid controller name format -you entered ${handle} - expected a format like UserController@create`)
      }
      controller = handle[0]
      method = handle[1]
    }
    return {
      method,
      controller
    }
  }

  /**
  * execute and handle incoming requests and spreed routes
  * @private
  */
  function executeRoutes () {
    const self = this
    // iterate over all routes,s verbs
    this.verbs.forEach(verb => {
      expressInstance[verb](self.route, function () {
        const methodContent = getCallbackResponse(self.controller, self.method, arguments)
        handleCallbackResponse(methodContent, arguments[1])
      })
    })
  }
  /**
   * it gets controller method value or callback returned value
   * @method getCallbackResponse
   * @param {String|Undefined} controller - controller name from string handler or undefined if the handled is a callback
   * @param {String|Function} method - if the is a callback it will be the callback,
   * if the handler is a string it will be method name then it will be called from its controller.
   * @param {Object} context - this is an object that holds prorprties that will pass to callback handler
   * proprties like response, request, and maybe auth
   * @private
   */
  function getCallbackResponse (controller, method, context) {
    let methodContent
    if (controller) {
      const ctrl = requireController(controller)
      if (typeof ctrl[method] !== 'function') {
        throw new Error(`the ${method} method is not exists in ${getControllersDir()}/${controller}.js`)
      }
      methodContent = ctrl[method](...context)
    } else {
      methodContent = method(...context)
    }
    return methodContent
  }
  /**
 * @method requireController
 * @param {String} controller
 * @private
 */
  function requireController (controller) {
    const ctrlPath = path.resolve(getControllersDir(), `${controller}.js`)
    const isExists = fs.existsSync(ctrlPath)
    if (!isExists) {
      throw new Error(`the ${controller}.js file is not found in ${getControllersDir()}`)
    }
    const ctrl = require(ctrlPath)
    return ctrl
  }
  /**
 * @method isControllerExists
 * @private
 */
  function isControllerExists () {
    const ctrlPath = getControllersDir()
    const isExists = fs.existsSync(ctrlPath)
    if (!isExists) {
      throw new Error(`the ${config.controllerDir} directory is not found in ${config.controllerDirPath}`)
    }
  }
  /**
  * @method getControllersDir
  * @private
  */
  function getControllersDir () {
    const ctrlPath = path.resolve(config.controllerDirPath, config.controllerDir)
    return ctrlPath
  }
  /**
  * @method handleCallbackResponse
  * @param {*} callbackContent
  * @param {*} response
  * @private
 */
  async function handleCallbackResponse (callbackContent, response) {
    if (callbackContent && callbackContent.then) {
      try {
        const content = await callbackContent
        response.send(content)
      } catch (error) {
        throw new Error(error)
      }
    } else if (callbackContent) {
      response.send(callbackContent)
    } else {
      response.sendStatus(500)
    }
  }
  // return the Route class
  return Route
}
module.exports = routeManager
