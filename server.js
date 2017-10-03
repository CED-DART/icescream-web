var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')

var app = express()

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

app.use(serveStatic(path.join(__dirname, 'dist')))

var port = process.env.PORT || 8080
app.listen(port)
console.log('server started ' + port)