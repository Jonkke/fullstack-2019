const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('User', { username: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  } catch (exception) {
    logger.error(exception)
  }
})

blogsRouter.post('/', async (request, response) => {
  const token = getTokenFrom(request)
  const blogRaw = request.body
  if (!blogRaw.hasOwnProperty('likes') || !blogRaw.likes) { // try moving this to model somehow?
    blogRaw.likes = 0
  }
  if (!blogRaw.hasOwnProperty('title') || !blogRaw.title ||
    !blogRaw.hasOwnProperty('url') || !blogRaw.url) {
    return response.status(400).end()
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid!' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: blogRaw.title,
      author: blogRaw.author,
      url: blogRaw.url,
      likes: blogRaw.likes,
      user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())
  } catch (exception) {
    logger.error(exception)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    likes: body.likes
  }
  try {
    const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: false })
    response.json(updatedNote.toJSON())
  } catch (exception) {
    logger.error(exception)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    logger.error(exception)
  }
})

module.exports = blogsRouter