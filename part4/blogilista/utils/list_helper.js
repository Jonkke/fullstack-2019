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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}