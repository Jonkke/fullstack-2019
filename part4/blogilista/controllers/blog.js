const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
  } catch (exception) {
    logger.error(exception)
  }
})

blogsRouter.post('/', async (request, response) => {
  const blogRaw = request.body
  if (!blogRaw.hasOwnProperty('likes') || !blogRaw.likes) { // try moving this to model somehow?
    blogRaw.likes = 0
  }
  if (!blogRaw.hasOwnProperty('title') || !blogRaw.title ||
    !blogRaw.hasOwnProperty('url') || !blogRaw.url) {
    return response.status(400).end()
  }
  const blog = new Blog(blogRaw)
  try {
    const result = await blog.save()
    response.status(201).json(result)
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