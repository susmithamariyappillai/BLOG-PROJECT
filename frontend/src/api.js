import { auth } from "./firebase";

 const API = `${import.meta.env.VITE_API_URL}/api`;

// One helper for every request. Adds the login token when a user is logged in.
async function request(path, method = "GET", body) {
  const headers = { "Content-Type": "application/json" };
  if (auth.currentUser) {
    headers.Authorization = `Bearer ${await auth.currentUser.getIdToken()}`;
  }

  const res = await fetch(API + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

export const getPosts = () => request("/posts");
export const getPost = (id) => request(`/posts/${id}`);
export const createPost = (post) => request("/posts", "POST", post);
export const updatePost = (id, post) => request(`/posts/${id}`, "PUT", post);
export const deletePost = (id) => request(`/posts/${id}`, "DELETE");
export const getMe = () => request("/auth/me");
