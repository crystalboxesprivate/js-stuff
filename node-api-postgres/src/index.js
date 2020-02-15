// based on
// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
const express = require('express')
const bodyParser = require('body-parser')



const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.get('/', (_, response) => {
  response.json({ info: 'Node js express and postgres api' })
})

app.listen(port, () => {
  console.log(`My ! app running on port ${port}.`)
})

const db = require('./queries')

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

// requests to test
// curl --data "name=Elaine&email=elaine@example.com" 
// curl -X PUT -d "name=Kramer" -d "email=kramer@example.com" 
// curl -X "DELETE" http://localhost:3000/users/1
