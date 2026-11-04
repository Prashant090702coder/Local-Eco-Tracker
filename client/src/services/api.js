
import axios from 'axios';

// Deployed Render backend URL
const BACKEND_URL = import.meta.env.VITE_API_URL || 'https://local-eco-tracker-4.onrender.com';

// Centralized Axios instance
const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
});

export { BACKEND_URL };

// Helper to resolve full image URLs
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
    return imagePath;
  }
  return `${BACKEND_URL}${imagePath}`;
};

// Predefined Eco Activities and official server-controlled points mapping
export const ECO_ACTIVITIES = [
  { id: '1', title: 'Planted a Tree', points: 20, icon: 'FaTree', category: 'Nature' },
  { id: '2', title: 'Recycled Plastic', points: 10, icon: 'FaRecycle', category: 'Recycling' },
  { id: '3', title: 'Cycled to College', points: 15, icon: 'FaBicycle', category: 'Transport' },
  { id: '4', title: 'Used Public Transport', points: 10, icon: 'FaBus', category: 'Transport' },
  { id: '5', title: 'Used Reusable Bottle', points: 5, icon: 'FaTint', category: 'Habits' },
  { id: '6', title: 'Saved Electricity', points: 5, icon: 'FaBolt', category: 'Energy' },
  { id: '7', title: 'Avoided Single-Use Plastic', points: 10, icon: 'FaShoppingBag', category: 'Habits' },
];

// Request Interceptor: Attach JWT Token automatically to outgoing requests
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

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

// Authentication Service Functions
export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  updateCurrentUserPoints: (points) => {
    try {
      const user = localStorage.getItem('user');
      if (user) {
        const parsed = JSON.parse(user);
        parsed.ecoPoints = points;
        localStorage.setItem('user', JSON.stringify(parsed));
      }
    } catch (e) {
      console.error(e);
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

// Activity Service Functions (with multipart/form-data support for image uploads)
export const activityService = {
  getMyActivities: async () => {
    const response = await api.get('/activities');
    return response.data;
  },

  addActivity: async (activityData) => {
    let headers = {};
    if (activityData instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data';
    }
    const response = await api.post('/activities', activityData, { headers });
    if (response.data.totalEcoPoints !== undefined) {
      authService.updateCurrentUserPoints(response.data.totalEcoPoints);
    }
    return response.data;
  },

  deleteActivity: async (id) => {
    const response = await api.delete(`/activities/${id}`);
    if (response.data.totalEcoPoints !== undefined) {
      authService.updateCurrentUserPoints(response.data.totalEcoPoints);
    }
    return response.data;
  },
};

// Waste Report Service Functions (with multipart/form-data support for image uploads)
export const wasteService = {
  submitReport: async (reportData) => {
    let headers = {};
    if (reportData instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data';
    }
    const response = await api.post('/waste', reportData, { headers });
    return response.data;
  },

  getReports: async () => {
    const response = await api.get('/waste');
    return response.data;
  },
};

export default api;
