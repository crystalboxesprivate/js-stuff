import express from 'express'
import compression from 'compression'
import ssr from './routes/ssr'
require('dotenv').config()

const app = express()

app.use(compression())
app.use(express.static('public'))


app.use('/firstssr', ssr)

const port = process.env.PORT || 3031

app.listen(port, function listenHandler() {
  console.info(`running on ${port}`)
})
