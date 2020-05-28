const Events = require('events');

module.exports = class broker extends Events {

	constructor() {
		super();
	}

	emit(...args) {
		super.emit(...args);
	}

	on(...args) {
		super.on(...args);
	}

	until(...args) {
		return new Promise((resolve) => {
			super.once(...args, (data) => {
				resolve(data);
			});
		});
	}

};
