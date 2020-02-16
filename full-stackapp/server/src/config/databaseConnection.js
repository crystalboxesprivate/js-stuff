const MongoClient = require('mongodb').MongoClient
let mongodb

const setupDB = callback => {
  require('dotenv').config()
  const uri = process.env.MONGO_URL

  MongoClient.connect(uri, {
    useNewUrlParser: true, useUnifiedTopology: true
  },
    (err, client) => {
      mongodb = client.db('full-stack-server')
      if (err) {
        callback(err)
      } else {
        return callback('database connection established')
      }
    })
}

const getDB = () => {
  return mongodb
}

module.exports = { setupDB, getDB }
