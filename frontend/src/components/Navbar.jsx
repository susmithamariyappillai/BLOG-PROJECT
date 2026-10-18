import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { state: { message: "You have been logged out." } });
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">My Blog</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {isAdmin && <Link to="/admin">Admin Panel</Link>}
        {user ? (
          <>
            <span className="muted">Hi, {user.displayName || user.email}</span>
            <button className="btn small" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="btn small">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
