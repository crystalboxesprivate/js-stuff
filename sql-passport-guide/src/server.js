let passport = require('passport')
let session = require('express-session')
let express = require('express')
let pool = require('./db')

let bodyParser = require('body-parser')
let app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 60000, secure: false }
}))
app.use(passport.initialize())
app.use(passport.session())

//To use it, we need to require it in server.js, and get a reference to the module’s strategy object.
let localStrategy = require('passport-local').Strategy

// Now, we have to tell passport which strategy to use inside our server.js file.
passport.use('local', new localStrategy({
  passReqToCallback: true,
  usernameField: 'username'
},
  (req, username, password, done) => {
    // Now return to your localStrategy that we previously started (with comment).
    console.log('called local - pg')
    pool.query('SELECT * FROM users WHERE username = $1', [username], (err, res) => {
      if (err) {
        console.log(err)
      }
      let row = res.rows[0]
      console.log('user row', row)
      console.log('pwd: ', password)
      user = row
      if (password == user.password) {
        console.log('match')
        done(null, user)
      } else {
        done(null, false, { message: "incorrect username and password" })
      }
    })

  }
))

// Then create the rest of the function for authenticating users. 
// Serialize and deserialize allow user information to be stored 
// and retrieved from session.
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  console.log('called deserialize user')
  let user = {}
  console.log('callded decereialize user')
  pool.query('SELECT * FROM users WHERE id = $1', [id], (err, res) => {
    // Handle Errors
    if (err) {
      console.log(err);
    }
    console.log('user row', res)
    user = res
    done(null, user)
  })
})

let path = require('path')
let router = express.Router()

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views/index.html'))
})


router.post('/', passport.authenticate('local', {
  successRedirect: '/users',
  failureRedirect: '/'
}))

app.use('/', router)

let register = require('./register')
app.use('/register', register)

let users = require('./users')
app.use('/users', users)

app.listen(3000, () => {
  console.log("listenign 3000")
})