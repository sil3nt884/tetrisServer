module.exports = (broker) => {

    broker.on("client data", ({body, response}) => {
		    	console.log(body);
        response.writeHead(200);
        response.end();
    });

};
