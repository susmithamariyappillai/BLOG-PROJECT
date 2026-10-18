import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, friendlyError } from "../AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      await signup(form.name, form.email, form.password);
      setSuccess("Account created! Redirecting...");
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      setError(friendlyError(err));
    }
  };

  return (
    <div className="card narrow">
      <h2>Create account</h2>
      {success && <p className="msg success">{success}</p>}
      {error && <p className="msg error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} required />
        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
        <label>Password (min 6 characters)</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={6} />
        <button className="btn" type="submit">Sign up</button>
      </form>
      <p className="muted">Already have an account? <Link to="/login">Log in</Link></p>
    </div>
  );
}
