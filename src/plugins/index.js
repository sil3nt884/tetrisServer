const server = require('./core/server');
const client = require('./core/clientsReciever');
const newClientHandler = require('./core/newClientsHandler');
const clientDataHandler = require('./core/clientDataHandler');
const serverSecure = require('./core/serverSecure');
const endpointHandler = require('./core/endPointHandler');

const plugins = {
	 server,
	 client,
	 newClientHandler,
	 clientDataHandler,
	 serverSecure,
	 endpointHandler,
};

module.exports  = plugins;
