import axios from "axios";
console.log('process.env', process.env)

const axiosConfig = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://api.altana.ai/atlas/v1' : '/atlas/v1',
  headers: {
    'x-api-key': process.env.REACT_APP_ALTANA_API_KEY,
  }
});

export default axiosConfig;