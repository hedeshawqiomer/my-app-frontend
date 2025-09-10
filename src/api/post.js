import { api } from "./client";

// Create post
export async function createPost(fields, files) {
  const fd = new FormData();
  Object.entries(fields).forEach(([k, v]) => {
    if (v !== undefined && v !== null) fd.append(k, v);
  });
  files.forEach((file) => fd.append("images", file)); // must be 'images'
  const { data } = await api.post("/posts", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

// List posts
export async function listPosts({ status, city } = {}) {
  const params = {};
  if (status) params.status = status;
  if (city) params.city = city;
  const { data } = await api.get("/posts", { params });
  return data;
}

// Mutations
export async function acceptPost(id) {
  const { data } = await api.post(`/posts/${id}/accept`);
  return data;
}
export async function deletePostById(id) {
  const { data } = await api.delete(`/posts/${id}`);
  return data;
}
export async function updatePostById(id, patch) {
  const { data } = await api.patch(`/posts/${id}`, patch);
  return data;
}

// Image helpers
export async function deletePostImageByUrl(postId, url) {
  const { data } = await api.delete(`/posts/${postId}/images`, { params: { url } });
  return data;
}
export async function deletePostImageById(postId, imageId) {
  const { data } = await api.delete(`/posts/${postId}/images/${imageId}`);
  return data;
}
export async function deletePostImagesBulk(postId, { ids = [], urls = [] } = {}) {
  const { data } = await api.post(`/posts/${postId}/images:delete`, { ids, urls });
  return data;
}
