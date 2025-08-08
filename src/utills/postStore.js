// src/utils/postStore.js

const STORAGE_KEY = "submitted_posts";

// Get all posts from localStorage
export function getPosts() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Add a new post
export function addPost(post) {
  const posts = getPosts();
  const newPost = {
    id: Date.now(),
    ...post,
    status: "pending", // default status
    createdAt: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([newPost, ...posts]));
  return newPost;
}

// Accept a post

// Delete a post
export function deletePost(id) {
  const posts = getPosts().filter(post => post.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

// src/utills/postStore.js

// src/utills/postStore.js
export function acceptPost(id) {
  const posts = getPosts().map(post =>
    post.id === id
      ? { ...post, status: "accepted", acceptedAt: new Date().toISOString() }
      : post
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export const getAcceptedPosts = () => {
  const posts = JSON.parse(localStorage.getItem("submitted_posts") || "[]");
  return posts
    .filter(p => p.status === "accepted")
    .sort((a, b) => new Date(b.acceptedAt) - new Date(a.acceptedAt));
};




