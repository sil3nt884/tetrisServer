
module.exports = async (broker) => {
  const clients = []
  let countOfClients = 0

  await broker.until('server listening')
  console.log('ready for clients')

  broker.on('connected client', ({ request, response }) => {
    clients.push({ request, response })
    broker.once('last client to join', (clientsObj) => {
      console.log(clientsObj.clientId)
      response.send(clientsObj.clientId)
      response.end()
    })
  })

  const pollForNewClients = () => {
    setTimeout(() => {
      if (countOfClients < clients.length) {
        broker.emit('new client added', clients[clients.length - 1])
        broker.emit('updated client list', clients)
        broker.emit('clients count', clients.length)
        countOfClients = clients.length
      }

      pollForNewClients()
    }, 1000)
  }

  pollForNewClients()
}
