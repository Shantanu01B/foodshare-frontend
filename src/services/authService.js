import api from './api';
import { useAuthStore } from '../store/authStore';

const getAuthHeaders = () => {
    const token = useAuthStore.getState().token;
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const login = async(email, password) => {
    // Login does NOT need headers as it provides credentials directly
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;
    useAuthStore.getState().login(token, user);
    return user;
};

export const register = async(formData) => {
    // Register does NOT need headers
    const response = await api.post('/auth/register', formData);
    const { token, user } = response.data;
    useAuthStore.getState().login(token, user);
    return user;
};

export const verifyNgo = async(ngoId) => {
    // Inject Headers for protected verification route
    const response = await api.post(`/ngo/${ngoId}/verify`, {}, getAuthHeaders());
    return response.data;
}