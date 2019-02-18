const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const blogs = require('./testblogs')

const api = supertest(app)

beforeEach(async () => {
  await Blog.remove({})
  const blogObjs = blogs.map(blog => new Blog(blog))
  const promiseArr = blogObjs.map(blog => blog.save())
  await Promise.all(promiseArr)
})

describe('when we already store some blogs', async () => {
  test('right amount of blogs is returned', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(blogs.length)
    const firstBlog = response.body[0]
    expect(firstBlog.id).toBeDefined()
  })

  test('blog with the right id gets removed by delete operation', async () => {
    await api
      .delete(`/api/blogs/${blogs[0]['_id']}`)
      .expect(204)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(blogs.length - 1)
  })
})

describe('when we are adding new blogs', async () => {
  test('new blogs can be added', async () => {
    const newBlog = {
      title: 'A test blog',
      author: 'Nobody Inparticular',
      url: 'somedummyadress',
      likes: 10
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(blogs.length + 1)
    const titles = response.body.map(blog => blog.title)
    expect(titles).toContain('A test blog')
  })

  test('new blog with no likes field gets zero likes', async () => {
    const newBlog = {
      title: 'A test blog',
      author: 'Nobody Inparticular',
      url: 'somedummyadress'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const response = await api.get('/api/blogs')
    const addedBlog = response.body.filter(blog => blog.title === 'A test blog')[0]
    expect(addedBlog).toHaveProperty('likes')
    expect(addedBlog.likes).toBe(0)
  })

  test('adding new blog with no title and url field results in status 400', async () => {
    const newBlog = {
      author: 'Just Me And Nothing Else'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})