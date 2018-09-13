#DasJs/Router
APIs routes Handler
### Usage Example
```js
const express = require('express')
const app = express()
const router = require('dasjs').Router(app, __dirname)

router.get('/user', 'UserController@index')
router.post('/user', 'UserController@create')
router.put('/user/:id', 'UserController@update')
```