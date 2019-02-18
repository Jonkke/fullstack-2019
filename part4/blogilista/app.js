const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const logger = require('./utils/logger')

const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const blogRouter = require('./controllers/blog')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGO_URL, { useNewUrlParser: true })
  .then(() => logger.info('MongoDB connection established!'))
  .catch(err => logger.error('Error connecting to MongoDB', err.message))

app.use(bodyParser.json())
app.use(cors())
app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogRouter)

module.exports = app