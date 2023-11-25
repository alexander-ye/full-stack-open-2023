import axios from 'axios';

const baseUrl = 'http://localhost:3001';
const baseSlug = '/api/login';

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}${baseSlug}`, credentials);
  return response.data;
};

export default { login };
