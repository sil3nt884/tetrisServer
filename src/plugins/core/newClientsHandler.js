module.exports = (broker) => {
	let clientsObj = {};
	let ids = 0;
	broker.on('new client added', ({socket, response})=> {
		clientsObj[socket.address().address+':'+ids] = {
			clientId: ids,
			attachedDataListener: false,
			socket,
			response
		};
		ids++;
	});

	broker.on('updated client list',() => {
	 Object.keys(clientsObj).forEach(key => {
			let attached = clientsObj[key].attachedDataListener;
			if(!attached) {
				 clientsObj[key].socket.on('data', (data)=> {
				 			broker.emit('client data',{clientId: key, data: String(data), clientsObj})
				 });
				clientsObj[key].attachedDataListener = true
			}
		})

	})

};
