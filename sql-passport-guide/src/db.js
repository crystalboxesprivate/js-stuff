let Pool = require('pg').Pool

require('dotenv').config()

module.exports = new Pool({
  user: process.env.SQL_USER,
  host: process.env.SQL_HOST,
  database: process.env.SQL_DATABASE,
  password: process.env.SQL_PASSWORD,
  port: process.env.SQL_PORT
})
