import axios from 'axios'
import { useState } from 'react'


export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  let token = null

  const setToken = newToken => {
    token = `bearer ${newToken}`
  }

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    setResources(response.data)
  }

  const create = async newObject => {
    const config = {
      headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    setResources(resources.concat(response.data))
  }

  const update = async (id, newObject) => {
    const response = await axios.put(`${ baseUrl }/${id}`, newObject)
    setResources(resources.map(resource => resource.id !== id ? resource : response.data))
  }

  return [
    resources,
    {
      getAll, 
      create, 
      update, 
      setToken
    }
  ]
}

