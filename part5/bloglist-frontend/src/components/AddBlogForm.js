import React, { useState } from 'react'
import blogService from '../services/blogs'

const AddBlogForm = ({ setNotification, updateBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const addBlogHandler = async (e) => {
    e.preventDefault()
    try {
      await blogService.addNewBlog({
        title,
        author,
        url,
        likes: 0
      })
      updateBlogs()
      setNotification('New blog successfully added', false, 3500)
    } catch (err) {
      setNotification('Error adding new blog', true, 3500)
    }
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  if (isVisible) {
    return (
      <div className={'addblogform-container'}>
        <h5>Add new blog:</h5>
        <form>
          Title: <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} />
          Author: <input type="text" name="author" value={author} onChange={e => setAuthor(e.target.value)} />
          URL: <input type="text" name="url" value={url} onChange={e => setUrl(e.target.value)} />
          <input type="button" value="Add new blog!" onClick={e => addBlogHandler(e)} />
        </form>
        <button onClick={toggleVisibility}>Close</button>
      </div>
    )
  } else {
    return (
      <div className={'addblogform-container'}>
        <button onClick={toggleVisibility}>Add blog...</button>
      </div>
    )
  }

}

export default AddBlogForm