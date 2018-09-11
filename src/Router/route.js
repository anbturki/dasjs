function Route(route, verbs, handler) {
	_instantiate(route)
}

/**
 * 
 * @param {*} route 
 * @param {*} verbs 
 * @param {*} handler 
 */
const _instantiate = (route, verbs, handler) => {
	_validateRoute(route)
}

/**
 * validates the route to make sure it is a valid string
 * @param {String} route
 * @returns {void}
 */
const _validateRoute = (route) => {
	if (typeof route !== 'string') {
		throw new Error('Cannot instantiate route without a valid url string')
	}
}

module.exports = Route