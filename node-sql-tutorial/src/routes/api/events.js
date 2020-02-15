module.exports.register = async server => {
  server.route({
    method: 'GET',
    path: '/api/events',
    config: {
      handler: async request => {
        try {
          // get sql client registered as a plugin
          const db = request.server.plugins.sql.client
          // get the current auth user:
          const userId = 'user1234'
          // run the query
          const res = await db.events.getEvents(userId)
          // return the recordset object
          return res.recordset
        } catch (err) {
          console.log(err)
        }
      }
    }
  })
}
