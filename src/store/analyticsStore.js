import { create } from 'zustand';
import * as analyticsService from '../services/analyticsService';
import toast from 'react-hot-toast';

export const useAnalyticsStore = create((set) => ({
    impact: { mealsSaved: 0, co2Saved: 0 },
    streak: 0,
    loading: false,

    fetchImpact: async() => {
        set({ loading: true });
        try {
            const data = await analyticsService.getImpact();
            set({ impact: data });
        } catch (error) {
            toast.error('Failed to fetch impact data.');
        } finally {
            set({ loading: false });
        }
    },

    fetchStreak: async() => {
        set({ loading: true });
        try {
            const data = await analyticsService.getStreak();
            set({ streak: data.streak });
        } catch (error) {
            toast.error('Failed to fetch user streak.');
        } finally {
            set({ loading: false });
        }
    },
}));