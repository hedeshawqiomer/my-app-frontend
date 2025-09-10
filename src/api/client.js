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
    if (status === 401 && typeof window !== "undefined") {
      const path = window.location.pathname;
      const isAdminRoute =
        path.startsWith("/admin") && path !== "/admin/login";

      // only bounce to login for protected admin screens
      if (isAdminRoute) {
        try {
          sessionStorage.setItem("postLoginNext", path);
        } catch { /* ignore */ }
        const url = `/admin/login?next=${encodeURIComponent(path)}`;
        window.location.replace(url);
      }
    }
    return Promise.reject(err);
  }
);
