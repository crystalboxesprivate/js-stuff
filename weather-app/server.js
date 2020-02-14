const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const request = require('request')

// weather stuff
const apiKey = '48802695b0c9ae618e13f79d595297a5'

function makeOpenWatherMapUrl(city) {
  return `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
}

let renderError = (res) => { res.render('index', { weather: null, error: "Try again!" }) }

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null})
})

app.post('/', function (req, res) {
  request(makeOpenWatherMapUrl(req.body.city), function (err, response, body) {
    if (err) {
      renderError(res)
    } else {
      let weather = JSON.parse(body)
      if (weather.main == undefined) {
        renderError(res)
      } else {
        res.render('index', { weather: `It's ${weather.main.temp} degrees in ${weather.name}`, error: null })
      }
    }
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
