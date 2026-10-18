import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

// Only lets the admin see the page inside it
export default function ProtectedRoute({ children }) {
  const { user, isAdmin, uid, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;

  if (!isAdmin) {
    return (
      <div className="card">
        <h2>Access denied</h2>
        <p>Your account is not an admin account.</p>
        {uid && (
          <p className="muted">
            To make this account admin, put this UID in <code>backend/.env</code> as
            ADMIN_UID and restart the server:<br /><code>{uid}</code>
          </p>
        )}
      </div>
    );
  }
  return children;
}
