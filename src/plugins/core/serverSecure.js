const https = require("https");
let fs = require("fs");

module.exports = (broker, config) => {
    https
        .createServer(
            {
                key : fs.readFileSync(config.key),
                cert: fs.readFileSync(config.cert)
            },
            (request, response) => {
                broker.requestEmit(request.url, {request,  response});
                broker.emit("server listening");
            })
        .listen(8000);
};
