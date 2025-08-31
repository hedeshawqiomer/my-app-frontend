const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/+$/, "");

export const toAbss = (u) => {
  if (!u) return "";
  if (/^https?:\/\//i.test(u)) return u;        // already absolute
  if (u.startsWith("/")) return `${API_BASE}${u}`;  // "/uploads/x.jpg"
  return `${API_BASE}/${u}`;                        // "uploads/x.jpg"
};

export const imgUrl = (img) =>
  toAbss(typeof img === "string" ? img : (img?.url ?? img?.path ?? ""));
