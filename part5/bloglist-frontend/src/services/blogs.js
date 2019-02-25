import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addNewBlog = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response
}

const updateBlog = async blogToUpdate => {
  const config = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${blogToUpdate.id}`
  const updatedBlog = {
    user: blogToUpdate.user.id,
    title: blogToUpdate.title,
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: blogToUpdate.likes + 1
  }
  const response = await axios.put(url, updatedBlog, config)
  return response
}

const deleteBlog = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${blog.id}`
  const response = await axios.delete(url, config)
  return response
}

export default { getAll, addNewBlog, setToken, updateBlog, deleteBlog }