import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth, friendlyError } from "../AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(location.state?.message || "");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      await login(form.email, form.password);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      setError(friendlyError(err));
    }
  };

  return (
    <div className="card narrow">
      <h2>Log in</h2>
      {success && <p className="msg success">{success}</p>}
      {error && <p className="msg error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required />
        <button className="btn" type="submit">Log in</button>
      </form>
      <p className="muted">New here? <Link to="/signup">Create an account</Link></p>
    </div>
  );
}
