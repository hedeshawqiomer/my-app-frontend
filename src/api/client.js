// src/api/client.js
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401) {
      const isAdminRoute =
        typeof window !== "undefined" &&
        window.location.pathname.startsWith("/admin") &&
        window.location.pathname !== "/admin/login";

      // only bounce to login for protected admin screens
      if (isAdminRoute) {
        const next = window.location.pathname;
        const url = `/admin/login${next ? `?next=${encodeURIComponent(next)}` : ""}`;
        window.location.replace(url);
      }
    }
    return Promise.reject(err);
  }
);
