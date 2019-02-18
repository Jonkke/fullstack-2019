const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((prev, curr) => {
    return { likes: prev.likes + curr.likes }
  }, { likes: 0 }).likes
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return undefined
  return blogs.reduce((prev, curr) => {
    return prev.likes > curr.likes ? prev : curr
  })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return undefined
  const authorBlogs = {}
  blogs.forEach(blog => {
    if (!(authorBlogs.hasOwnProperty(blog.author))) {
      authorBlogs[blog.author] = 0
    }
    authorBlogs[blog.author] += 1
  })
  const authorOfMost = Object.keys(authorBlogs).reduce((prev, curr) => {
    return authorBlogs[prev] > authorBlogs[curr] ? prev : curr
  })
  return {
    author: authorOfMost,
    blogs: authorBlogs[authorOfMost]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return undefined
  const authorLikes = {}
  blogs.forEach(blog => {
    if (!(authorLikes.hasOwnProperty(blog.author))) {
      authorLikes[blog.author] = 0
    }
    authorLikes[blog.author] += blog.likes
  })
  const authorWithMostLikes = Object.keys(authorLikes).reduce((prev, curr) => {
    return authorLikes[prev] > authorLikes[curr] ? prev : curr
  })
  return {
    author: authorWithMostLikes,
    likes: authorLikes[authorWithMostLikes]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}