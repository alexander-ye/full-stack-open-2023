import axios from 'axios'

const BASE_URL = '/api/persons'

const getAll = () => {
  return axios.get(BASE_URL)
  .then(({data}) => {
    return data
  })
  .catch(error => console.log(error))
}

const addNew = (newPerson) => {
  return axios.post(BASE_URL, newPerson)
  .then(({data}) => {
    return data
  })
  .catch(error => console.log(error))
}

const edit = (id, personObject) => {
  return axios.put(`${BASE_URL}/${id}`, personObject)
  .then(({data}) => {
    return data
  })
  .catch(error => console.log(error))
}

const remove = (id) => {
  return axios.delete(`${BASE_URL}/${id}`)
  .then(({data}) => {
    console.log(data)
  })
  .catch(error => console.log(error))
}

export default {
  getAll,
  addNew,
  edit, 
  remove
}