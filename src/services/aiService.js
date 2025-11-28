import api from "./api";

export const aiChat = async(payload) => {
    // payload: { message: string }
    const res = await api.post("/ai/chat", payload);
    return res.data;
};

export const aiFreshness = async(payload) => {
    const res = await api.post("/ai/freshness", payload);
    return res.data;
};

export const aiSuggestions = async(payload) => {
    const res = await api.post("/ai/suggestions", payload);
    return res.data;
};