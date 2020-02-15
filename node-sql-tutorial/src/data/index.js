const events = require('./events')
const sql = require('mssql')

const client = async (server, config) => {
  let pool = null
  const closePool = async () => {
    try {
      // try to close the connection pool
      await pool.close()
      //poool is null to ensure a new one will be created by getConnection
      pool = null
    } catch (err) {
      pool = null
      server.log(['error', 'data'], 'closePool error')
      server.log(['error', 'data'], err)
    }
  }

  const getConnection = async () => {
    try {
      if (pool) {
        // has the connection pool already created?
        return pool
      }
      pool = await sql.connect(config)
      pool.on('error', async err => {
        server.log(['error', 'data'], 'connection pool error')
        server.log(['error', 'data'], err)
        await closePool()
      })
      return pool
    } catch (err) {
      server.log(['error', 'data'], 'error connecting to sql server')
      server.log(['error', 'data'], err)
      pool = null
    }
  }
  return {
    events: await events.register({ sql, getConnection })
  }
}

module.exports = client
