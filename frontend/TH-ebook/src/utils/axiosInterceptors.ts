import axios from 'axios';

const setupAxiosInterceptors = (refreshToken: () => Promise<void>) => {
  axios.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          await refreshToken();
          const newToken = localStorage.getItem('token');
          if (newToken) {
            axios.defaults.headers.common['Authorization'] = newToken;
            originalRequest.headers['Authorization'] = newToken;
            return axios(originalRequest);
          }
        } catch (refreshError) {
          console.error('Refresh token failed', refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;
