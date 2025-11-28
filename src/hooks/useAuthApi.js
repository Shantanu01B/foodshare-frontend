import { useAuthStore } from '../store/authStore';
import api from '../services/api';
import toast from 'react-hot-toast';

// Custom hook to create a request config with the current auth token
export const useAuthApi = () => {
    const { token, logout } = useAuthStore();

    const getAuthHeaders = () => {
        if (!token) {
            toast.error("Session expired. Please log in.");
            logout();
            return {};
        }
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    };

    // Return methods that use the token
    return {
        get: (url, config = {}) => api.get(url, {...config, ...getAuthHeaders() }),
        post: (url, data, config = {}) => api.post(url, data, {...config, ...getAuthHeaders() }),

        // Add other methods (put, delete) if needed
    };
};