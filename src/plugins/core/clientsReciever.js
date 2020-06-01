const crypto = require('crypto');

module.exports = async (broker) => {
  const clients = []
  let countOfClients = 0

  await broker.until('server listening')
  console.log('ready for clients')

  const generatePlayerId = () => crypto.createHash("sha256").update(new Date().toISOString() + clients.length).digest("hex");

  broker.on('connected client', ({ request, response }) => {
    clients.push({ request, response })
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
      'Access-Control-Max-Age': 2592000,
      'Access-Control-Allow-Headers': '*'// 30 days
      /** add other headers as per requirement */
    }
    response.writeHead(200, headers);
    response.write(generatePlayerId());
    response.end();
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
