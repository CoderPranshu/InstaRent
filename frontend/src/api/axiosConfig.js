import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://instarent.onrender.com/api', // ✅ include /api here
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