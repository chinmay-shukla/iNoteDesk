var jwt = require('jsonwebtoken');
const JWT_SECRET = 'In5b69oo68k'

const fetchuser = (req, res, next) => {
  const token = req.header('auth-token')

  if (!token) {
    return res.status(401).json({ error: "please authenticate using a valid token" })
  }

  try {
    const string = jwt.verify(token, JWT_SECRET)
    req.user = string.user;
    next()

  } catch (error) {
    return res.status(401).json({ error: "please authenticate using a valid token" })

  }

}

module.exports = fetchuser;