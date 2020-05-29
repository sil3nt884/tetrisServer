module.exports = (broker) => {

    broker.on("client data", (args) => {
		  console.log(args);
    });

};
