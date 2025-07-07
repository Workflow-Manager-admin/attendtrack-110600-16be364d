import React, { useState } from "react";

// PUBLIC_INTERFACE
function Register({ onRegister, isLoading }) {
  /** Registration page for user sign up. */
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.username || !form.password) {
      setError("Username and password are required");
      return;
    }
    try {
      await onRegister(form.username, form.password);
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="container" style={{ maxWidth: 400, margin: "3em auto" }}>
      <h2 className="title">Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ margin: "1em 0" }}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            autoComplete="username"
            onChange={handleChange}
            style={{ width: "100%", padding: 10, fontSize: 16 }}
          />
        </div>
        <div style={{ margin: "1em 0" }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            autoComplete="new-password"
            onChange={handleChange}
            style={{ width: "100%", padding: 10, fontSize: 16 }}
          />
        </div>
        {error && <p style={{ color: "red", margin: 0 }}>{error}</p>}
        <button
          type="submit"
          className="btn"
          style={{ width: "100%", marginTop: "1em", background: "var(--button-bg)" }}
          disabled={isLoading}
        >
          {isLoading ? "Registering…" : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;
