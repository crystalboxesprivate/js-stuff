const express = require('express')
const cors = require('cors')
const schema = require('./graphql/schema')
const graphqlHTTP = require('express-graphql')
const { setupDB } = require('./config/databaseConnection')
const app = express()

setupDB(v => console.log(v))
app.use(cors())
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  pretty: true
}))

app.listen(4000)
console.log('server ok')