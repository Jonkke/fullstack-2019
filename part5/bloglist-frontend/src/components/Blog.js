import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlogs }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const username= JSON.parse(window.localStorage.loggedUser).username
  const blogIsByCurrentUser = blog.user.username === username

  const toggleIsExpanded = (e) => {
    setIsExpanded(!isExpanded)
  }

  const addLike = async (e) => {
    e.preventDefault()
    await blogService.updateBlog(blog)
    updateBlogs()
  }

  const removeBlog = async (e) => {
    e.preventDefault()
    const wat = window.confirm(`Remove blog "${blog.title}"?`)
    if (!wat) return
    await blogService.deleteBlog(blog)
    updateBlogs()
  }

  if (!isExpanded) {
    return (
      <div style={blogStyle} className={'blog-container'} >
        <p style={{ ...paragStyle, ...titleStyle }} onClick={toggleIsExpanded}>{blog.title}</p>
      </div>
    )
  } else {
    return (
      <div style={blogStyle} className={'blog-container expanded'} >
        <p style={{ ...paragStyle, ...titleStyle }} onClick={toggleIsExpanded}>{blog.title}</p>
        <p style={paragStyle}>Author: {blog.author}</p>
        <p style={paragStyle}>URL: </p><a href={blog.URL}>{blog.url}</a>
        <p style={paragStyle}>Likes: {blog.likes}</p>
        <button onClick={addLike}>Like</button>
        {blogIsByCurrentUser && <button onClick={removeBlog}>Remove blog</button>}
      </div>
    )
  }
}

const blogStyle = {
  border: '1px solid black',
  padding: '0px 10px',
  marginTop: '5px'
}

const titleStyle = {
  fontWeight: 'bold',
  cursor: 'pointer'
}

const paragStyle = {
  padding: 0,
  margin: 0
}


export default Blog