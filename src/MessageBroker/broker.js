const Events = require('events')

module.exports = class broker extends Events {
  constructor (config) {
    super()
    this.endPoints = config.endPoints
  }

  emit (...args) {
    super.emit(...args)
  }

  on (...args) {
    super.on(...args)
  }

  until (...args) {
    return new Promise((resolve) => {
      super.once(...args, (data) => {
        resolve(data)
      })
    })
  }

  requestEmit (endpoint, { request, response }) {
    const isExist = this.endPoints.filter(element => endpoint.includes(element)).length > 0;
    if (isExist) {
      super.emit(endpoint.split('?')[0], { request, response })
    }
  }
}
