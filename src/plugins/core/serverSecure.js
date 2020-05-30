const https = require('https')
const fs = require('fs')

module.exports = (broker, config) => {
  https
    .createServer(
      {
        key: fs.readFileSync(config.key),
        cert: fs.readFileSync(config.cert)
      },
      (request, response) => {
        broker.requestEmit(request.url, { request, response })
      })
    .listen(config.port, () => {
      broker.emit('server listening')
    })
}
