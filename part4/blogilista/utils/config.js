if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let PORT = process.env.PORT
let MONGO_URL = process.env.MONGO_URL

if (process.env.NODE_ENV === 'test') {
  MONGO_URL = process.env.TEST_MONGODB_URI
}

module.exports = {
  PORT,
  MONGO_URL
}