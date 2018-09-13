const express = require('express')
const app = express()
const router = require('../src').Router(app, __dirname) // the second paramter is for where the controllers directory is located

router.get('/example/user/:id', 'UserController@index')

app.listen(3000)
