// separate app configuration and the server initialization into separate files
// to manage app testing better
const server = require('./server')
const config = require('./config')

const startServer = async () => {
  try {
    // create an instance of server application
    const app = await server(config)
    // start the web server
    await app.start();

    console.log(`server tunning at http://${config.host}:${config.port}...`)
  } catch (err) {
    console.log('startup error: ', err)
  }
}
console.log(config)
startServer()
