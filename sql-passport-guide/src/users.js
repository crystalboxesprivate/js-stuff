let express = require('express')
let router = express.Router()
/*
This alone will do nothing, but if you do a call from the client (a GET request) 
to the ‘/users’ route, and then console log out the response in the success 
callback function, you will see what the server sends back for whether or not the user is authenticated. You could also add a route to send a response of req.user to get information about the user.
*/
router.get('/', (req, res, next) => {
  res.send(req.isAuthenticated())
})

module.exports = router
