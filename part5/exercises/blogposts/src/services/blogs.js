import axios from 'axios'

const baseUrl = 'http://localhost:3001'
const baseSlug = '/api/blogs'
const endpoint = `${baseUrl}${baseSlug}`

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(endpoint)
  return request.then((response) => response.data)
}

const get = (id) => {
  const request = axios.get(`${endpoint}/${id}`)
  return request.then((response) => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${endpoint}/${id}`, newObject)
  return request.then((response) => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(endpoint, newBlog, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${endpoint}/${id}`, config)
  return response.data
}

export default {
  get, getAll, create, deleteBlog, update, setToken,
}
