import React, { useState } from "react";
import { registerUser } from "../api";
import { useNavigate, Link } from "react-router-dom";

// PUBLIC_INTERFACE
function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    try {
      await registerUser(form);
      setMessage("Registration successful! Please login.");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setMessage(err.message || "Registration failed.");
    }
  }

  return (
    <div className="container" style={centerStyle}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          name="name"
          placeholder="Full name"
          required
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
        />
        <button type="submit" className="btn btn-large">Register</button>
        {message && <div style={{ color: "red", marginTop: 8 }}>{message}</div>}
        <div style={{ marginTop: 16 }}>
          Already a user? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

const centerStyle = { maxWidth: 400, margin: "40px auto", padding: 24 };
const formStyle = { display: "flex", flexDirection: "column", gap: 16 };

export default RegisterPage;
