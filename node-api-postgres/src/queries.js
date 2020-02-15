const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
  user: process.env.SQL_USER,
  host: process.env.SQL_HOST,
  database: process.env.SQL_DATABASE,
  password: process.env.SQL_PASSWORD,
  port: process.env.SQL_PORT
})

function handleError(err) {
  if (err) { console.log(err) }
}

// GET all users
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    handleError(error)
    response.status(200).json(results.rows)
  })
}

// GET a single user by id
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    handleError(error)
    response.status(200).json(results.rows)
  })
}

// POST a new user
const createUser = (request, response) => {
  const { name, email } = request.body
  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (err, res) => {
    handleError(err)
    response.status(201).send(`user added with id: ${result.insertId}`)
  })
}

//PUT updated data in an existing user
const updateUser = (req, resp) => {
  const id = parseInt(req.params.id)
  const { name, email } = req.body
  pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id], (err, res) => {
      handleError(err)
      resp.status(200).send(`user mod with id ${id}`)
    })
}

// delete user
const deleteUser = (req, resp) => {
  const id = parseInt(req.params.id)
  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    handleError(error)
    resp.status(200).send(`user dleeted with id :${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}