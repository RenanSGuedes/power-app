const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const path = require('path')

const app = express()

nunjucks.configure({
  express: app,
  autoescape: true,
  watch: true,
})

app.use(express.json())

app.use(express.urlencoded({
  extended: true
}))

app.use(routes)

app.use(express.static(path.join(__dirname, 'public')))

app.listen(8085, () => console.log('Server is running'))