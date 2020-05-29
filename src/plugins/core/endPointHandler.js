

module.exports = (broker, config) => {

    broker.on("/connect", ( {request,  response}) => {
        broker.emit("connected client", {request, response});
    });

    broker.on("/data", ({ request,  response }) => {
        response.writeHead(200);
        response.end();
    });



};
