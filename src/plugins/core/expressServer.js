const https = require('https')
const fs = require('fs')
const express = require('express')
const app = express()
const cors = require('cors')

module.exports = (broker, config) => {
  app.use(cors())
  app.options('*', cors())

  https
    .createServer(
      {
        key: fs.readFileSync(config.key),
        cert: fs.readFileSync(config.cert)
      },
      app)
    .listen(config.port, () => {
      broker.emit('server listening')
    })

  app.get('*', (request, response, next) => {
    broker.requestEmit(request.url, { request, response })
  })
  app.post('*', (request, response, next) => {
    broker.requestEmit(request.url, { request, response })
  })
}
