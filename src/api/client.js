// src/api/client.js
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

let redirectingToLogin = false;

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401) {
      // Only bounce to login for protected admin routes
      const path = typeof window !== "undefined" ? window.location.pathname : "";
      const isAdminRoute =
        path.startsWith("/admin") && path !== "/admin/login";

      if (isAdminRoute && !redirectingToLogin) {
        redirectingToLogin = true;

        try {
          // remember where we were trying to go
          sessionStorage.setItem("postLoginNext", path + (window.location.search || ""));
        } catch {
          /* ignore */
        }

        // Replace (no extra history entry) to avoid the “back then flash” loop
        const url = "/admin/login";
        window.location.replace(url);
      }
    }
    // No alert/popups here — just pass the error through
    return Promise.reject(err);
  }
);
