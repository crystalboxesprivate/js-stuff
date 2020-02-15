const Hapi = require('hapi')
const plugins = require("./plugins")
const routes = require('./routes')
// app
module.exports = async config => {
  const { host, port } = config
  // instance of hapi
  const server = Hapi.server({ host, port })
  // store config for later use
  server.app.config = config
  // plugins !
  await plugins.register(server)
  // register routes
  await routes.register(server)
  return server
}
