import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // for cookies/session
  headers: { "Content-Type": "application/json" },
});

export default api;
