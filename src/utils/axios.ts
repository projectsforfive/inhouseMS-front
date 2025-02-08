// lib/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Replace with your API base URL
  timeout: 10000, // Optional: Set timeout
  headers: {
    'Content-Type': 'application/json', // Optional: Set headers
    'Authorization': localStorage.getItem('token') || '', // Set Access Token for Authorization
  },
});

// Optional: You can set up interceptors here if needed
axiosInstance.interceptors.request.use(config => {
  // You can modify the request configuration here
  return config;
});

axiosInstance.interceptors.response.use(response => {
  // You can modify the response here
  return response;
}, error => {
  // Handle response errors
  return Promise.reject(error);
});

export default axiosInstance;
