// Keep post-login redirects strictly internal and under /admin
export function sanitizeNextPath(next) {
  if (typeof next !== "string") return "/admin/pending";
  const lower = next.toLowerCase().trim();

  // Block absolute/protocol or protocol-relative
  if (lower.startsWith("http://") || lower.startsWith("https://") || lower.startsWith("//")) {
    return "/admin/pending";
  }

  // Normalize to leading slash
  if (!next.startsWith("/")) next = "/" + next;

  // Constrain admin login redirect to /admin only
  if (!next.startsWith("/admin")) return "/admin/pending";

  // Avoid loops / root
  if (next === "/admin" || next === "/admin/") return "/admin/pending";
  if (next === "/admin/login") return "/admin/pending";

  return next;
}
