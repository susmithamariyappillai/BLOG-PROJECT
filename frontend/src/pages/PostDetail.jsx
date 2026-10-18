import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPost } from "../api";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getPost(id).then(setPost).catch((e) => setError(e.message));
  }, [id]);

  if (error) return <p className="msg error">{error}</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <article className="card">
      <Link to="/">Back to posts</Link>
      <h1 className="page-title">{post.title}</h1>
      <p className="muted">
        {post.category} | by {post.author} | {new Date(post.createdAt).toLocaleDateString()}
      </p>
      {post.imageUrl && <img className="hero-img" src={post.imageUrl} alt={post.title} />}
      <p className="content">{post.content}</p>
    </article>
  );
}
