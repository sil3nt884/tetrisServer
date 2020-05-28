const Broker = require('./MessageBroker/broker');
const messageBroker = new Broker();
const plugins = require('./plugins/index');
const getConfig = require('./utils/config');

const init = () => {
	Object.keys(plugins).forEach(e => plugins[e](messageBroker,getConfig ));
};

const main = () => {
	init()
};

main();
