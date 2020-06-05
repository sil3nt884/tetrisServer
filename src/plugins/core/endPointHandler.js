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
        clients[address].data = JSON.parse(body)
        broker.emit('client data', { body, response })
      })
    }
  })

  broker.on('/players', ({ request, response }) => {
    // console.log('players id ', request.connection.remoteAddress, clients[request.connection.remoteAddress])
    console.log('Object length', Object.keys(clients).length)
    if (Object.keys(clients).length >= 2) {
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
    if (Object.keys(clients).length >= 2) {
      const address = request.connection.remoteAddress
      const otherClient = Object.keys(clients).filter(key => key !== address)[0]
      console.log('send players client id ', otherClient)
      response.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive'
      })
      console.log('sending player object', clients[otherClient])
      const playerData = clients[otherClient].data
      if (clients[otherClient].data) {
        const data = `data: ${playerData}\n\n`
        response.flushHeaders()
        response.write(data)
        response.end()
      }
    }
  })
}
