const client = require('./core/clientsReciever')
const newClientHandler = require('./core/newClientsHandler')
const clientDataHandler = require('./core/clientDataHandler')
// const serverSecure = require('./core/serverSecure')
const endpointHandler = require('./core/endPointHandler')
const expressServer = require('./core/expressServer')

const plugins = {
  client,
  newClientHandler,
  clientDataHandler,
  expressServer,
  endpointHandler
}

module.exports = plugins
