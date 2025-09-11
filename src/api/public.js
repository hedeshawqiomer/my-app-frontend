// src/api/public.js
import { api } from './client';

export async function listPublicPosts(params = {}) {
  const res = await api.get('/posts/public', { params });
  return Array.isArray(res.data) ? res.data : (res.data?.items || []);
}

