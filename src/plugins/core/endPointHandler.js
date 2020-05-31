
module.exports = (broker, config) => {
  let clients = {}
  broker.on('updated client Object', clientsObj => {
    clients = clientsObj
  })

  broker.on('/connect', ({ request, response }) => {
    broker.emit('connected client', {
      request,
      response
    })
  })

  broker.on('/data', ({ request, response }) => {
    const address = request.connection.remoteAddress
    if (clients[address]) {
      let body = ''
      request.on('data', (data) => {
        body += data
      })
      request.on('end', (data) => {
        broker.emit('client data', { body, response })
      })
    }
  })

  broker.on('/players', ({ request, response }) => {
    if (Object.keys(clients).length > 1) {
      const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000,
        'Access-Control-Allow-Headers': '*'// 30 days
        /** add other headers as per requirement */
      }
      response.writeHead(200, headers)
      response.end()
    }
  })
}
