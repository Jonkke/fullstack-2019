import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

import { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMsg, setSNotificationMsg] = useState('')
  const [notificationIsError, setNotificationIsError] = useState('')
  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((b1, b2) => (b2.likes - b1.likes))
      setBlogs(sortedBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const userCreds = JSON.parse(loggedUserJSON)
      setUser(userCreds)
      blogService.setToken(userCreds.token)
    }
  }, [])

  const setNotification = (message, isError, timeMillis) => {
    setSNotificationMsg(message)
    setNotificationIsError(isError)
    setTimeout(() => {
      setSNotificationMsg(null)
      setNotificationIsError(false)
    }, timeMillis)
  }

  const loginHandler = async event => {
    event.preventDefault()
    try {
      const userCreds = await loginService.login({
        username: username.value,
        password: password.value
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(userCreds)
      )
      blogService.setToken(userCreds.token)
      setUser(userCreds)
      username.reset()
      password.reset()
      setNotification(`Successfully logged in as ${username.value}`, false, 3500)
    } catch (err) {
      setNotification('Invalid username or password', true, 3500)
    }
  }

  const logoutHandler = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const updateBlogs = () => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((b1, b2) => (b2.likes - b1.likes))
      setBlogs(sortedBlogs)
    })
  }


  if (user === null) {
    return (
      <div>
        <div className={'notification-container'}>
          <Notification message={notificationMsg} isError={notificationIsError} />
        </div>
        <h2 className={'loginHeader'}>Log in to application</h2>
        <form>
          username
          <input
            {...username.spread()}
          />
          password
          <input
            {...password.spread()}
          />
          <input type="button" onClick={e => loginHandler(e)} value="Log in" />
        </form>
      </div>
    )
  }

  return (
    <div>
      <div className={'notification-container'}>
        <Notification message={notificationMsg} isError={notificationIsError} />
      </div>
      <button onClick={() => logoutHandler()}>Log out</button>
      <AddBlogForm setNotification={setNotification} updateBlogs={updateBlogs} />
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlogs={updateBlogs} />
      )}
    </div>
  )
}

export default App