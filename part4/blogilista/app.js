const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const blogRouter = require('./controllers/blog')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connection established!'))
  .catch(err => console.log('Error connecting to MongoDB', err.message))

app.use(bodyParser.json())
app.use(cors())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter)

module.exports = app