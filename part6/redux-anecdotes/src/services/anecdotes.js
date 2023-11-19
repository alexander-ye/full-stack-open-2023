import axios from 'axios';

const baseUrl = 'http://localhost:3002/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0)
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const createNew = async (content) => {
  const newAnecdote = asObject(content);
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
}

const update = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export default { getAll, createNew, update }