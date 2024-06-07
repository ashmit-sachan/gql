// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// // You can add interceptors to handle requests and responses
// api.interceptors.request.use(
//   config => {
//     // Modify request config if needed
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   response => {
//     // Handle responses
//     return response;
//   },
//   error => {
//     // Handle errors
//     return Promise.reject(error);
//   }
// );

export default api;
