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
    console.log('Object length', Object.keys(clients).length)
    if (Object.keys(clients).length >= 1) {
      response.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive'
      })
      const data = 'data: ok\n\n'
      response.flushHeaders()
      response.write(data)
      response.end()
    } else {
      response.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive'
      })
      response.flushHeaders()
      const data = 'data: not ready\n\n'
      response.write(data)
      response.end()
    }
  })

  broker.on('/get-data', ({ request, response }) => {
    // If a GET request is received
    const address = request.connection.remoteAddress
    // Take a player id
    const playerId = new URL(`https://${request.headers.host}${request.url}`).searchParams

    // Only if two players connected
    if (Object.keys(clients).length > 1) {
      // Send player 2 object
      broker.on('player object', (body) => {
        response.send(body)
        response.end()
      })
    } else {
      response.sendStatus(404)
      response.end()
    }
  })
}
