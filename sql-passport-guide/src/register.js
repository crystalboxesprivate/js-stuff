let express = require('express')
let router = express.Router()
let passport = require('passport')
let path = require('path')
let pool = require('./db')

router.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../views/register.html'))
})

router.post('/', (req, res, next) => {
  pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [
    req.body.username, req.body.password
  ], (err, result) => {
    if (err) {
      console.log(err)
    }
    res.sendStatus(200)
  })
})

module.exports = router
