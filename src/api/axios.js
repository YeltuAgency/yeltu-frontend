import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  // admin token
  const token = localStorage.getItem("yeltu_admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // 🔥 LANGUAGE (this fixes everything)
  const lang =
    localStorage.getItem("yeltu_lang") ||
    window.location.pathname.split("/")[1] ||
    "en";

  config.headers["X-Lang"] = lang;
  config.headers["Accept-Language"] = lang;

  // also add ?lang=xx
  const hasQuery = config.url.includes("?");
  config.url = `${config.url}${hasQuery ? "&" : "?"}lang=${lang}`;

  return config;
});

export default api;
