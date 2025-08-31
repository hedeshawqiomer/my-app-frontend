// src/api/client.js
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  withCredentials: true, // send/receive the ek_session cookie
  headers: {
    "Content-Type": "application/json",
  },
});

// (optional) basic response error logging
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // You’ll still get the error in your component, this just logs it
    console.error("API error:", err?.response?.status, err?.response?.data || err.message);
    return Promise.reject(err);
  }
);
