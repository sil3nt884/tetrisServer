module.exports = async (broker) => {
    const clients = [];
    let countOfClients = 0;

    await broker.until("server listening");
    // eslint-disable-next-line no-console
    console.log("ready for clients");

    broker.on("connected client", ({request, response}) => {
        clients.push({ request, response });
    });

    const pollForNewClients =  () => {
        setTimeout(() => {
            if (countOfClients < clients.length) {
                broker.emit("new client added", clients[clients.length - 1]);
                broker.emit("updated client list", clients);
                broker.emit("clients count", clients.length);
                countOfClients = clients.length;
            }

            pollForNewClients();
        }, 1000);
    };

    pollForNewClients();

};
