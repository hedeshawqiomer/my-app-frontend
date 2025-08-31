// src/api/posts.js
import { api } from "./client";

// fields = { name, email, city, district, location }
// files  = File[] from your ImageUploader
export async function createPost(fields, files) {
  const fd = new FormData();
  Object.entries(fields).forEach(([k, v]) => {
    if (v !== undefined && v !== null) fd.append(k, v);
  });

  // ⚠️ KEY MUST BE EXACTLY 'images' to match multer.array('images', 8)
  files.forEach((file) => fd.append("images", file));

  const { data } = await api.post("/posts", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

 // axios instance (baseURL=http://localhost:4000, withCredentials:true)

// Get posts by status (and optional city)
export async function listPosts({ status, city } = {}) {
  const params = {};
  if (status) params.status = status;
  if (city) params.city = city;
  const { data } = await api.get("/posts", { params });
  return data;
}

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

// src/api/post.js
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
