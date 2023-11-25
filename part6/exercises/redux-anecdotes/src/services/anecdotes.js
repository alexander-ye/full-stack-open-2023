import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const baseUrl = 'http://localhost:3001/anecdotes';

const getId = () => uuidv4();

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