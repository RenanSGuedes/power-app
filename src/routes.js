const express = require('express')
const routes = express.Router()

const UserController = require('./Controllers/UserController')

routes.get('/users', UserController.index)
routes.post('/users', UserController.create)

module.exports = routes