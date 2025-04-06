import axios from 'axios';
import { config } from '../config';

console.log('API URL:', config.API_URL); // Debug log

const api = axios.create({
    baseURL: config.API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add response interceptor for debugging
api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            data: error.response?.data
        });
        return Promise.reject(error);
    }
);

export const commentAPI = {
    getAll: () => api.get('/comments'),
    create: (data) => api.post('/comments', data),
    update: (id, data) => api.put(`/comments/${id}`, data),
    delete: (id) => api.delete(`/comments/${id}`)
};

export const relationshipAPI = {
    getAll: () => api.get('/relationship-types')
};

export const categoryAPI = {
    getByRelationship: (id) => api.get(`/categories/relationship/${id}`)
};

export default api; 