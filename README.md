# DasJs/Router

add more features to express routes

it helps you to modulate express routes.  `router.post('/user', 'UserController@create')`, without needs to require controllers everywhere.

make your routes in one place, distribute your controllers.

## Installation
```bash
npm install dasjs --save
```

**NOTE**: this is not stable yet, you may face some issues cause it's still under development

#### Usage Example
```js
# server.js
const express = require('express')
const app = express()

// the first paramter is express() instance
/*
* the second parameter is application root path where the controllers directory is located.
* the controllers directory will be automatically created if it does not exists.
* you can change the controllers directory name by passing the new name in the third parameter.
*/
const router = require('dasjs').Router(app, __dirname)

router.get('/user', 'UserController@index')
router.post('/user', 'UserController@create')
router.put('/user/:id', 'UserController@update')
router.delete('/user/:id', (request) => {
  const params = request.params // going to improve it
  // rest of code
  return {
    success: true
  }
})

// multi verbs for one route
router.route('/post', (req, res) => {}, ['get', 'post'])

app.listen(3000)
```

and

```js
# controllers/UserController.js
module.exports = {
  index (req, res, next) {},
  async create (req, res) {}
  // ... and so on
}
```