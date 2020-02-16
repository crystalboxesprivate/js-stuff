const mongoose = require('mongoose')
const express = require('express')

const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const Data = require('./data')
require('dotenv').config()

const {API_PORT} = process.env
const app = express()
app.use(cors())
const router = express.Router()

const dbRoute = function () {
  return process.env.MONGO_URL
}()

mongoose.connect(dbRoute, { useNewUrlParser: true })
let db = mongoose.connection

db.once('open', () => console.log('connected to the db'))

// checks if connection is successful
db.on('error', console.error.bind(console, 'MongoDB connection error'))

// only made for logging 
// parse request to readable json format
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))

// get method
router.get('/getData', (req, res) => {
  Data.find((err, data) => {
    if (err) {
      console.log(err)
      return res.json({ success: false, error: err })
    }
    return res.json({ success: true, data: data })
  })
})

// update method 
router.post('/updateData', (req, res) => {
  const { id, update } = req.body
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) {
      console.log(err)
      return res.json({ success: false, error: err })
    }
    return res.json({ success: true })
  })
})

// delete method
router.delete('/deleteData', (req, res) => {
  const { id } = req.body
  Data.findByIdAndRemove(id, (err) => {
    if (err) {
      console.log(err)
      return res.json({ success: false, error: err })
    }
    return res.json({ success: true })
  })
})

// create method
router.post('/putData', (req, res) => {
  let data = new Data()
  const { id, message } = req.body
  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS'
    })
  }
  data.message = message
  data.id = id
  data.save((err) => {
    if (err) {
      console.log(err)
      return res.json({ success: false, error: err })
    }
    return res.json({ success: true })
  })
})

// append /api for our http requescorsts
app.use('/api', router)

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
