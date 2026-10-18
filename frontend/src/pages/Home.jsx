import { useEffect, useState } from "react";
import { getPosts } from "../api";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="page-title">Latest posts</h1>
      {loading && <p>Loading posts...</p>}
      {error && <p className="msg error">{error}</p>}
      {!loading && !error && posts.length === 0 && (
        <p className="muted">No posts yet. The admin can add the first one.</p>
      )}
      <div className="grid">
        {posts.map((p) => <PostCard key={p._id} post={p} />)}
      </div>
    </>
  );
}
