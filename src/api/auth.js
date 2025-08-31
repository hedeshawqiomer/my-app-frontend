import { api } from "./client";
export const apiLogin  = (email, password) => api.post("/auth/login", { email, password }).then(r=>r.data);
export const apiMe     = () => api.get("/auth/me").then(r=>r.data);
export const apiLogout = () => api.post("/auth/logout").then(r=>r.data);
