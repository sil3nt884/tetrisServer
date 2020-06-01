module.exports = (broker) => {
  broker.on('client data', ({ body, response }) => {
    console.log('body', body)
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
      'Access-Control-Max-Age': 2592000,
      'Access-Control-Allow-Headers': '*'// 30 days
      /** add other headers as per requirement */
    }
    broker.emit('player object', body);
    response.writeHead(200, headers)
    response.end()
  })
}
