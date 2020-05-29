module.exports = (broker) => {
    let clientsObj = {},
        ids = 0;
    broker.on("new client added", ({request, response}) => {
        clientsObj[request.connection.remoteAddress] = {
            clientId: ids,
            attachedDataListener: false,
            request,
            response
        };
        ids++;
        // console.log(clientsObj);
    });

    broker.on("updated client list", () => {
        Object.keys(clientsObj).forEach(key => {
            let attached = clientsObj[key].attachedDataListener;
            if (!attached) {
            	let body = "";
                clientsObj[key].request.on("data", chunk => {
                    body += chunk;
                });
                clientsObj[key].request.on("end", () => {
                    broker.emit("client data", {body, response: clientsObj[key].response});
                });

                clientsObj[key].attachedDataListener = true;
            }
        });

    });

};
