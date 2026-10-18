import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  // If the post has no image, take a random photo from the internet (same photo every time for the same post)
  const image = post.imageUrl || `https://picsum.photos/seed/${post._id}/600/300`;

  return (
    <article className="post-card">
      <img src={image} alt={post.title} />
      <div className="post-body">
        <span className="tag">{post.category}</span>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <Link to={`/post/${post._id}`}>Read post</Link>
      </div>
    </article>
  );
}
