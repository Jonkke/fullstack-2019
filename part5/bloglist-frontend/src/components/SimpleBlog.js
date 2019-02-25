import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className={'testDiv'}>
    <div className={'nameAuthor'}>
      {blog.title} {blog.author}
    </div>
    <div className={'likesDiv'}>
      blog has {blog.likes} likes
      <button className={'testButton'} onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog