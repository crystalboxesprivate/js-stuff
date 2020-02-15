const utils = require('../utils')
const register = async ({ sql, getConnection }) => {
  // read in all the sql files for this folder
  const sqlQueries = await utils.loadSqlQueries('events')
  const getEvents = async userId => {
    // get a connection to sql server
    const cnx = await getConnection()

    // create a request
    const request = await cnx.request()
    // configure sql query parameters
    request.input('userId', sql.VarChar(50), userId)
    // return exectued query
    return request.query(sqlQueries.getEvents)
  }
  return { getEvents }
}
module.exports = { register }