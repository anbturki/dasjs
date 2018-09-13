# DasJs/Router
**NOTE**: this is not stable yet, you may face some issues cause it's still under development
APIs routes Handler
#### Usage Example
```js
# server.js
const express = require('express')
const app = express()
const router = require('dasjs').Router(app, __dirname) // the second paramter is for where the controllers directory is located

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

app.listen(3000)
```