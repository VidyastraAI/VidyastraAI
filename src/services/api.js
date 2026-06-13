import axios from 'axios';

// Create an Axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your production API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Auth Token to every request
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('vidyastra_user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;