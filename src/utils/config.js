let fs = require('fs');
const config = {
	key: process.env.serverKey ||  'src/cert/server.key',
	cert : process.env.serverCert || 'src/cert/server.cert',
	port : process.env.serverPort || 8000,
	endPoints : ['/connect', '/data']

};


module.exports = config;
