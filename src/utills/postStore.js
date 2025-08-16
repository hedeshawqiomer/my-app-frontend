// src/utills/postStore.js

const STORAGE_KEY = "posts";

/* ------------ core io ------------ */
function getRaw() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}
function setRaw(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

/* ------------ public api ------------ */
export function getPosts() {
  return getRaw();
}

export function getPendingPosts() {
  return getRaw()
    .filter(p => p.status === "pending")
    .sort((a,b) => new Date(b.createdAt||0) - new Date(a.createdAt||0));
}

export function getAcceptedPosts() {
  return getRaw()
    .filter(p => p.status === "accepted")
    .sort((a,b) => new Date(b.acceptedAt||0) - new Date(a.acceptedAt||0));
}

export function addPost(post) {
  const now = new Date().toISOString();
  const newPost = {
    id: Date.now(),
    status: "pending",
    createdAt: now,
    ...post,
  };
  setRaw([newPost, ...getRaw()]);
  return newPost;
}

export function acceptPost(id) {
  const now = new Date().toISOString();
  const next = getRaw().map(p =>
    p.id === id ? { ...p, status: "accepted", acceptedAt: now } : p
  );
  setRaw(next);
}

export function updatePost(id, patch) {
  const now = new Date().toISOString();
  const next = getRaw().map(p =>
    p.id === id ? { ...p, ...patch, updatedAt: now } : p
  );
  setRaw(next);
}

export function deletePost(id) {
  setRaw(getRaw().filter(p => p.id !== id));
}
