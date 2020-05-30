const Broker = require('./MessageBroker/broker')
const getConfig = require('./utils/config')
const messageBroker = new Broker(getConfig)
const plugins = require('./plugins/index')

const init = () => {
  Object.keys(plugins).forEach(e => plugins[e](messageBroker, getConfig))
}

const main = () => {
  init()
}

main()
