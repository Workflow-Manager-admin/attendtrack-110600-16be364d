import React, { useState } from "react";
import { loginUser } from "../api";
import { useNavigate, Link } from "react-router-dom";

// PUBLIC_INTERFACE
function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.token);
      setMessage("Login successful!");
      navigate("/");
    } catch (err) {
      setMessage(err.message || "Login failed.");
    }
  }

  return (
    <div className="container" style={centerStyle}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
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
        <button type="submit" className="btn btn-large">Login</button>
        {message && <div style={{ color: "red", marginTop: 8 }}>{message}</div>}
        <div style={{ marginTop: 16 }}>
          New user? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}

const centerStyle = { maxWidth: 400, margin: "40px auto", padding: 24 };
const formStyle = { display: "flex", flexDirection: "column", gap: 16 };

export default LoginPage;
