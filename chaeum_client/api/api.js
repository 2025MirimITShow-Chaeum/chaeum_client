import axios from 'axios';

const api = axios.create({
  baseURL: 'https://9f3e-122-37-66-196.ngrok-free.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
