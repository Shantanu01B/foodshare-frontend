import axios from "axios";

const API_BASE_URL =
    import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use(
    (config) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = "Bearer " + token;
            }
        } catch (e) {
            // ignore
        }
        return config;
    },
    (err) => Promise.reject(err)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error && error.response && error.response.status === 401) {
            try {
                localStorage.removeItem('token');
                localStorage.removeItem('auth-store');
                window.location.href = '/login';
            } catch (e) {}
        }
        return Promise.reject(error);
    }
);

export default api;