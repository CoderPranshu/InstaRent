import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token safely
instance.interceptors.request.use(
  (config) => {
    try {
      const persisted = localStorage.getItem('persist:root');

      if (persisted) {
        const root = JSON.parse(persisted);

        if (root.auth) {
          const auth = JSON.parse(root.auth);

          const token = auth?.user?.token;

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
      }
    } catch (error) {
      console.log('Token parsing error:', error);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;