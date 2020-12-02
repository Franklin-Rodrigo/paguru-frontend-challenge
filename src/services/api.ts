import axios from 'axios';

const api = axios.create({
  baseURL: 'https://paguru-challenge.herokuapp.com/api/v1',
});

export default api;
