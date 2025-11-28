import { create } from "zustand";
import * as aiService from "../services/aiService";
import toast from "react-hot-toast";

export const useAiStore = create((set, get) => ({

    chatHistory: JSON.parse(localStorage.getItem("chatHistory") || "[]"),
    loadingChat: false,

    loadingAi: false,
    freshnessScore: null,
    suggestions: null,

    clearChatHistory: () => {
        localStorage.removeItem("chatHistory");
        set({ chatHistory: [] });
    },

    sendChatMessage: async function(message) {
        if (!message) return;

        const prev = get().chatHistory || [];
        const updatedUser = prev.concat([{ sender: "user", text: message }]);

        set({ chatHistory: updatedUser, loadingChat: true });
        localStorage.setItem("chatHistory", JSON.stringify(updatedUser));

        try {
            const res = await aiService.aiChat({ message: message });
            const reply = res && res.reply ? res.reply : "No reply from AI";

            const now = get().chatHistory || [];
            const updated = now.concat([{ sender: "assistant", text: reply }]);

            set({ chatHistory: updated });
            localStorage.setItem("chatHistory", JSON.stringify(updated));

        } catch (err) {
            const now = get().chatHistory || [];
            const updated = now.concat([
                { sender: "assistant", text: "AI chat failed" },
            ]);

            set({ chatHistory: updated });
            localStorage.setItem("chatHistory", JSON.stringify(updated));

            toast.error("AI chat failed");
        } finally {
            set({ loadingChat: false });
        }
    },

    checkFreshness: async function(data) {
        set({ loadingAi: true });

        try {
            const res = await aiService.aiFreshness(data);
            set({ freshnessScore: res });
            return res;
        } catch (err) {
            toast.error("Freshness check failed");
            return null;
        } finally {
            set({ loadingAi: false });
        }
    },

    getSuggestions: async function(data) {
        set({ loadingAi: true });
        try {
            const res = await aiService.aiSuggestions(data);
            set({ suggestions: res });
            return res;
        } catch (err) {
            toast.error("Failed to get suggestions");
            return null;
        } finally {
            set({ loadingAi: false });
        }
    },

    generateThankYou: async function(title) {
        try {
            const msg =
                "Generate a short polite thank you message for donating: " +
                title;
            const res = await aiService.aiChat({ message: msg });
            if (res && res.reply) return res.reply;
            return "Thank you for your donation!";
        } catch (e) {
            return "Thank you for your donation!";
        }
    },

}));