const Events = require("events");

module.exports = class broker extends Events {

    constructor (config) {
        super();
        this.endPoints = config.endPoints;
    }
    emit (...args) {
        super.emit(...args);
    }

    on (...args) {
        super.on(...args);
    }

    until (...args) {
        return new Promise((resolve) => {
            super.once(...args, (data) => {
                resolve(data);
            });
        });
    }

    requestEmit (endPoint, { request,  response }) {
        let isExist = this.endPoints.filter(e => e === endPoint).length > 0;
        if (isExist) {
            super.emit(endPoint, { request, response });
        }
    }

};
