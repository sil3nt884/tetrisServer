const crypto = require('crypto')
module.exports = (broker) => {
  const clientsObj = {}
  let lastClientObj
  broker.on('new client added', ({ request, response }) => {
    const generatePlayerId = () => crypto.createHash('sha256').update(new Date().toISOString() + Object.keys(clientsObj).length).digest('hex')
    clientsObj[request.connection.remoteAddress] = {
      id: generatePlayerId()
    }
    lastClientObj = clientsObj[request.connection.remoteAddress]
    console.log('lastClientObj: ', lastClientObj);
    broker.emit('last client to join', lastClientObj)
    response.end()
  })
  broker.on('updated client list', () => broker.emit('updated client Object', clientsObj))
}
