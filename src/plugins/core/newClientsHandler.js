module.exports = (broker) => {
  const clientsObj = {}
  let ids = 0
  broker.on('new client added', ({ request, response }) => {
    if (!clientsObj[request.connection.remoteAddress]) {
      clientsObj[request.connection.remoteAddress] = {
        clientId: ids
      }
    }
    ids++
  })
  broker.on('updated client list', () => broker.emit('updated client Object', clientsObj))
}
