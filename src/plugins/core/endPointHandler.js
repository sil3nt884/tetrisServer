

module.exports = (broker, config) => {

    broker.on("/connect", ( {request,  response}) => {
        response.writeHead(200);
        response.end();
        broker.emit("connected client", {socket: request.socket, response});
    });

    broker.on("/data", ({ request,  response }) => {

    });



};
