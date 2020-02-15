// separate app configuration and the server initialization into separate files
// to manage app testing better
const server = require('./server')
const startServer = async () => {
  try {
    const config = {
      host: 'localhost',
      port: 8080
    }
    const app = await server(config)
    await app.start();
    console.log(`server tunning at http://${config.host}:${config.port}...`)
  } catch (err) {
    console.log('startup error: ', err)
  }
}
startServer()