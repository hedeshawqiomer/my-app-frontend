// src/api/public.js
import { api } from './client';

export async function listPublicPosts(params = {}) {
  const res = await api.get('/posts/public', { params });
  return res.data;
}
