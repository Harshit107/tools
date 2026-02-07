import axios from 'axios';

// Create Axios instance
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

console.log(`🔌 API Client Initialized`);
console.log(`🌍 Environment: ${import.meta.env.MODE}`);
console.log(`🔗 Base URL: ${baseURL}`);

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor for auth headers (temporary user-id)
apiClient.interceptors.request.use((config) => {
  // In a real app, this would come from Auth Context or LocalStorage
  config.headers['x-user-id'] = 'default-user-id'; 
  return config;
});

export default apiClient;
