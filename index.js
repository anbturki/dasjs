const express = require('express')
const app = express()
const router = require('./src/Router')(app, __dirname)
const debug = require('debug')('dev:server')

router.get('/', 'UserController@create')
router.get('/user', () => {
  return getUser()
})

function getUser () {
  return Promise.resolve({
    name: 'user resol'
  })
}

app.listen(3000, () => {
  debug('server running on port 3000')
})
