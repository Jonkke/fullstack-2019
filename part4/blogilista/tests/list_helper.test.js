const listHelper = require('../utils/list_helper')
const manyBlogs = require('./testblogs')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [{
    title: "Test1",
    author: "TestAuthor",
    url: "dummyurl",
    likes: 10
  }]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(listWithOneBlog[0].likes)
  })
  test('of a bigger list is calculated right', () => {
    const result =listHelper.totalLikes(manyBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  const rightAnswer = {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  }

  test('is returned when list is not empty', () => {
    expect(listHelper.favoriteBlog(manyBlogs)).toEqual(rightAnswer)
  })
  test('is undefined when list is empty', () => {
    expect(listHelper.favoriteBlog([])).toBe(undefined)
  })
})