import api from './api';
import { useAuthStore } from '../store/authStore';

const getAuthHeaders = () => {
    const token = useAuthStore.getState().token;
    if (!token) {
        useAuthStore.getState().logout();
        return {};
    }
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const getImpact = async() => {
    const response = await api.get('/analytics/impact', getAuthHeaders());
    return response.data;
};

export const getStreak = async() => {
    const response = await api.get('/analytics/streak', getAuthHeaders());
    return response.data;
};