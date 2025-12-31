import axios from "axios";
import { auth } from "../firebase";

const getBaseUrl = () => {
    let url = import.meta.env.VITE_API_URL || "http://localhost:5000";
    // Ensure the backend URL ends with /api because the backend routes are defined as /api/...
    if (!url.endsWith("/api")) {
        url += "/api";
    }
    return url;
};

const api = axios.create({
    baseURL: getBaseUrl(),
});

api.interceptors.request.use(
    async (config) => {
        const user = auth.currentUser;
        if (user) {
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
