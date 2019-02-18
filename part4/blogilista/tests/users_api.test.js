const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const users = require('./testusers')

const api = supertest(app)



test('attempting to create user without username or password results in error', async () => {
  const newUser = {
    name: 'Test name'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(result.body.error).toContain('Username or password missing!')
})

test('attempting to create username or password less than 3 character long results in error', async () => {
  const newUser = {
    username: 'TestUser235325',
    name: 'Test Name',
    password: 'a1'
  }
  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(result.body.error).toContain('Username and password must be at least 3 character long!')
})

afterAll(() => {
  mongoose.connection.close()
})