import cityCenters from "./CityCenter";

// only allow http/https images
export function safeHttpUrl(u) {
  if (!u || typeof u !== "string") return "";
  try {
    const url = new URL(u, window.location.origin);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

// parse "lat,lng" -> {lat, lng}
export function parseLatLng(input) {
  if (!input || typeof input !== "string") return null;
  const m = input.trim().match(/^\s*(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)\s*$/);
  if (!m) return null;
  const lat = parseFloat(m[1]);
  const lng = parseFloat(m[3]);
  if (Number.isNaN(lat) || Number.isNaN(lng)) return null;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
  return { lat, lng };
}

// strict city-center lookup by post.city (case-insensitive fallback)
export function getCityCenterFor(post) {
  const name = String(post?.city ?? "").trim();
  if (cityCenters[name]) return cityCenters[name];
  const foundKey = Object.keys(cityCenters).find(
    (k) => k.toLowerCase() === name.toLowerCase()
  );
  return foundKey ? cityCenters[foundKey] : null;
}

// choose origin: user first, else city center (or null if unknown)
export function chooseOrigin(userLoc, post) {
  return userLoc ?? getCityCenterFor(post) ?? null;
}

// build Google Maps directions forcing the chosen origin if available
export function buildDirectionsUrl(originLL, destStr) {
  const destLL = parseLatLng(destStr);
  const base = "https://www.google.com/maps/dir/?api=1";
  const travel = "travelmode=driving";

  const originParam = originLL ? `origin=${originLL.lat},${originLL.lng}` : null;
  const destinationParam = destLL
    ? `destination=${destLL.lat},${destLL.lng}`
    : `destination=${encodeURIComponent(destStr || "")}`;

  // if no origin (unknown city), omit origin → Google will use “Your location”
  return [base, originParam, destinationParam, travel].filter(Boolean).join("&");
}
