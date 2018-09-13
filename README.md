# DasJs/Router

it handles API routes.

make your routes in one place, distribute your controllers.

**NOTE**: this is not stable yet, you may face some issues cause it's still under development

#### Usage Example
```js
# server.js
const express = require('express')
const app = express()
const router = require('dasjs').Router(app, __dirname)
// the second paramter is for where the controllers directory is located

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
# controller/UserController.js
module.exports = {
  index (req, res, next) {},
  async create (req, res) {}
  // ... and so on
}
```