module.exports = (broker) => {

    broker.on("client data", ({body, response}) => {
		    	console.log(body);
        const headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
            "Access-Control-Max-Age": 2592000 // 30 days
            /** add other headers as per requirement */
        };
        response.writeHead(headers, 200);
        response.end();
    });

};
