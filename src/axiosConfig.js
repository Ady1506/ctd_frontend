// src/axiosConfig.js
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
axios.defaults.withCredentials = true;    // ↪️ send cookies (e.g. your "token" cookie)
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios;
