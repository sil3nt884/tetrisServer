module.exports = (broker) => {
  broker.on('client data', ({ body, response }) => {
    console.log('body', body)
    broker.emit('player object', body)
    response.sendStatus(200)
    response.end()
  })
}
