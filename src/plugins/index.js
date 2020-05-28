const server = require('./core/server');
const client = require('./core/clientsReciever');
const newClientHandler = require('./core/newClientsHandler');
const clientDataHandler = require('./core/clientDataHandler');

const plugins = {
	 server,
	 client,
	 newClientHandler,
	 clientDataHandler
};

module.exports  = plugins;
