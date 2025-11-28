import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// Get user's donations
export const getUserDonations = () => API.get('/donations/mine');

// Create donation
export const createDonation = (donationData) => API.post('/donations', donationData);

// Get available donations
export const getAvailableDonations = (pinCode, type = '') =>
    API.get(`/donations/available?pin=${pinCode}${type ? `&type=${type}` : ''}`);

// Accept donation (NGO)
export const acceptDonation = (donationId) => API.post(`/donations/${donationId}/accept`);

// Volunteer accept task
export const volunteerAcceptTask = (donationId) => API.post(`/donations/${donationId}/volunteer-accept`);

// Confirm pickup
export const confirmPickup = (donationId, qrToken) => 
    API.post(`/donations/${donationId}/confirm`, { qrToken });

// Delete donation
export const deleteDonation = (donationId) => API.delete(`/donations/${donationId}`);