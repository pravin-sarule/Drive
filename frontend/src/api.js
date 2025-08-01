import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust if your backend runs on a different port
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;