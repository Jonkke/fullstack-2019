import React, { useState } from 'react'
import blogService from '../services/blogs'

import { useField } from '../hooks'

const AddBlogForm = ({ setNotification, updateBlogs }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const [isVisible, setIsVisible] = useState(false)

  const addBlogHandler = async (e) => {
    e.preventDefault()
    try {
      await blogService.addNewBlog({
        title: title.value,
        author: author.value,
        url: url.value,
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
          Title: <input {...title.spread()} />
          Author: <input {...author.spread()} />
          URL: <input {...url.spread()} />
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