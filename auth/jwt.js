const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()

function authenticateToken(req, res, next) {
  const authHeadesr = req.headers.cookie
  console.log(authHeader)
  const token =  authHeader.split('=')[1]
  console.log(token)
  if (token == undefined) return res.sendStatus(401)
  jwt.verify(token, process.env.TOKEN_SECRET,(err,data) => {
    if (err) return res.sendStatus(403)
    console.log(data)
    next()
  })
}

module.exports = {authenticateToken}