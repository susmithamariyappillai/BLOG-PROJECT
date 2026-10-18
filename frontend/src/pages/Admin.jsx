import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts, createPost, updatePost, deletePost } from "../api";

const emptyForm = { title: "", category: "General", imageUrl: "", content: "" };

export default function Admin() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null); // null = adding a new post
  const [message, setMessage] = useState({ type: "", text: "" });

  const show = (type, text) => setMessage({ type, text });
  const loadPosts = () => getPosts().then(setPosts).catch((e) => show("error", e.message));
  useEffect(() => { loadPosts(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Add or update a post
  const handleSubmit = async (e) => {
    e.preventDefault();
    // The short summary on the card is made from the first part of the content
    const data = { ...form, excerpt: form.content.slice(0, 100) };
    try {
      if (editingId) {
        await updatePost(editingId, data);
        show("success", "Post updated.");
      } else {
        await createPost(data);
        show("success", "Post added.");
      }
      setForm(emptyForm);
      setEditingId(null);
      loadPosts();
    } catch (err) {
      show("error", err.message);
    }
  };

  // Put the post into the form so it can be edited
  const startEdit = (post) => {
    setEditingId(post._id);
    setForm({
      title: post.title, category: post.category,
      imageUrl: post.imageUrl, content: post.content,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await deletePost(id);
      show("success", "Post deleted.");
      loadPosts();
    } catch (err) {
      show("error", err.message);
    }
  };

  return (
    <>
      <h1 className="page-title">Admin panel</h1>
      {message.text && <p className={`msg ${message.type}`}>{message.text}</p>}

      <div className="card">
        <h2>{editingId ? "Edit post" : "Add new post"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input name="title" value={form.title} onChange={handleChange} required />
          <label>Category</label>
          <input name="category" value={form.category} onChange={handleChange} />
          <label>Image URL (optional, a random photo is used if empty)</label>
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} />
          <label>Content</label>
          <textarea name="content" rows="5" value={form.content} onChange={handleChange} required />
          <div className="row">
            <button className="btn" type="submit">{editingId ? "Save changes" : "Publish post"}</button>
            {editingId && (
              <button type="button" className="btn ghost" onClick={() => { setEditingId(null); setForm(emptyForm); }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="card list">
        {posts.length === 0 && <p className="muted">No posts yet. Add your first one above.</p>}
        {posts.map((p) => (
          <div className="admin-row" key={p._id}>
            <div>
              <div>{p.title}</div>
              <div className="muted">{p.category}</div>
            </div>
            <div className="row">
              <Link className="btn small ghost" to={`/post/${p._id}`}>View</Link>
              <button className="btn small ghost" onClick={() => startEdit(p)}>Edit</button>
              <button className="btn small danger" onClick={() => handleDelete(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
