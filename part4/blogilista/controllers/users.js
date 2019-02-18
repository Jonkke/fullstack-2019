const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const logger = require('../utils/logger')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (req, res) => {
  try {
    const body = req.body
    if (!(body.username && body.password)) {
      return res.status(400).json({ error: 'Username or password missing!' })
    }
    if (body.username.length < 3 || body.password.length < 3) {
      return res.status(400).json({ error: 'Username and password must be at least 3 character long!' })
    }

    const saltRounds = 10
    const pwHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash: pwHash
    })
    const savedUser = await user.save()
    res.json(savedUser)
  } catch (exception) {
    logger.error(exception)
  }
})

module.exports = usersRouter