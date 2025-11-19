import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  changePassword: (passwordData) => api.put('/users/change-password', passwordData),
  deleteAccount: () => api.delete('/users/account'),
};

// Resume API
export const resumeAPI = {
  getUserResumes: () => api.get('/resumes'),
  getResume: (id) => api.get(`/resumes/${id}`),
  createResume: (resumeData) => api.post('/resumes', resumeData),
  updateResume: (id, resumeData) => api.put(`/resumes/${id}`, resumeData),
  deleteResume: (id) => api.delete(`/resumes/${id}`),
  duplicateResume: (id) => api.post(`/resumes/${id}/duplicate`),
  getPublicResumes: (params) => api.get('/resumes/public', { params }),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health'),
};

export default api;

