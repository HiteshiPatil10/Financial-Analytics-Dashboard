import axios from 'axios';

const API = axios.create({
  baseURL: 'https://finance-api-anns.onrender.com/api',
  withCredentials: true,
});

// Attach token if exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
