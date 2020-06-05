const crypto = require('crypto')
module.exports = (broker) => {
  const clientsObj = {}
  let lastClientObj
  broker.on('new client added', ({ request, response }) => {
    const generatePlayerId = () => crypto.createHash('sha256').update(new Date().toISOString() + Object.keys(clientsObj).length).digest('hex')
    if (!clientsObj[request.connection.remoteAddress]) {
      clientsObj[request.connection.remoteAddress] = {
        clientId: generatePlayerId()
      }
      lastClientObj = clientsObj[request.connection.remoteAddress]
      broker.emit('last client to join', lastClientObj)
    } else {
      response.end()
    }
  })
  broker.on('updated client list', () => broker.emit('updated client Object', clientsObj))
}
