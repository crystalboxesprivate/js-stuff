const Hapi = require('hapi')
const routes = require('./routes')
module.exports = async config => {
  const { host, port } = config
  // instance of hapi
  const server = Hapi.server({ host, port })
  // store config for later use
  server.app.config = config
  await routes.register(server)
  return server
}
