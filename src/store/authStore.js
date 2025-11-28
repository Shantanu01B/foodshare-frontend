import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAiStore } from './aiStore';

export const useAuthStore = create(
    persist(
        (set) => ({
            token: null,
            user: null,

            setAuth: (token, user) => {
                localStorage.setItem("token", token);
                set({ token, user });
            },

            login: (token, user) => {
                localStorage.setItem("token", token);
                set({ token, user });
            },

            logout: () => {
                localStorage.removeItem("token");

                // ⭐ NEW: Clear AI chat on logout
                try {
                    useAiStore.getState().clearChatHistory();
                } catch (e) {
                    console.error("Failed clearing AI history", e);
                }

                set({ token: null, user: null });
            },

            isAuthenticated: () => !!localStorage.getItem('token'),

            getUserRole: () => {
                const storedAuthData = localStorage.getItem('auth-store');
                if (!storedAuthData) return null;

                try {
                    const parsedState = JSON.parse(storedAuthData);
                    return parsedState && parsedState.state &&
                        parsedState.state.user &&
                        parsedState.state.user.role ?
                        parsedState.state.user.role :
                        null;
                } catch (e) {
                    console.error("Failed to parse auth store:", e);
                    return null;
                }
            }
        }), {
            name: 'auth-store',
            getStorage: () => localStorage,
        }
    )
);