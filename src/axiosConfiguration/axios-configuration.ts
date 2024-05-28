import axios from 'axios';
import { Router } from 'next/router';
 const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:4000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        // Redirect to login page
        window.location.href = '/login';
        localStorage.removeItem('token')
      }
      return Promise.reject(error);
    }
  );

export default  axiosInstance