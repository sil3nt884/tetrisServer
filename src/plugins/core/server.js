const net = require('net');

module.exports = (broker, config) => {

	let server = net.createServer(socket => {
		socket.on('error', (err)=> {
			broker.emit('server error', err)
		})
	});

	server.listen(config.serverPort, ()=> {
		broker.emit('server listening')
	});

	server.on('connection', (data)=> broker.emit('connected client', data))

};
