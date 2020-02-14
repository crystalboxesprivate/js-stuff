// from the tutorial 
// https://codeburst.io/build-a-weather-website-in-30-minutes-with-node-js-express-openweather-a317f904897b
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const request = require('request')

// weather stuff
function makeOpenWatherMapUrl(city) {
  const apiKey = '48802695b0c9ae618e13f79d595297a5'
  return `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
}

let renderError = (res) => { res.render('index', { weather: null, error: "Try again!" }) }

// set body-parser middleware for requests
app.use(bodyParser.urlencoded({ extended: true }))
// set ejs for rendering
app.set('view engine', 'ejs')
// add 'public folder' which html could find
app.use(express.static('public'))
// get request for the front page
app.get('/', function (req, res) {
  // render - template name
  res.render('index', { weather: null, error: null })
})
// post request from the form
app.post('/', function (req, res) {
  request(/* url= */makeOpenWatherMapUrl(req.body.city), /* callback=*/ function (err, response, body) {
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
// this will initialize the server for the events
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
