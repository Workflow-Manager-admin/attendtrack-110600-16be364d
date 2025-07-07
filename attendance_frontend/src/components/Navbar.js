import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar({ theme, toggleTheme }) {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedIn = !!localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar" style={{
      display: "flex", alignItems: "center", padding: "1rem", background: "var(--bg-secondary)",
      borderBottom: "1px solid var(--border-color)", justifyContent: "space-between"
    }}>
      <div>
        <Link className="navbar-brand" to="/" style={{ color: "#1976D2", fontWeight: 700, fontSize: 24, textDecoration: "none" }}>
          AttendTrack
        </Link>
        {loggedIn && (
          <>
            <Link className="navbar-link" to="/" style={navLinkStyle(location, "/")}>Dashboard</Link>
            <Link className="navbar-link" to="/attendance" style={navLinkStyle(location, "/attendance")}>Attendance</Link>
            <Link className="navbar-link" to="/history" style={navLinkStyle(location, "/history")}>History</Link>
            <Link className="navbar-link" to="/export" style={navLinkStyle(location, "/export")}>Export</Link>
          </>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        {loggedIn ? (
          <button onClick={handleLogout} className="btn" style={{ marginLeft: 8 }}>Logout</button>
        ) : (
          <>
            <Link className="navbar-link" to="/login" style={navLinkStyle(location, "/login")}>Login</Link>
            <Link className="navbar-link" to="/register" style={navLinkStyle(location, "/register")}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

function navLinkStyle(location, path) {
  return {
    marginLeft: 16,
    color: location.pathname === path ? "#43A047" : "#424242",
    textDecoration: "none",
    fontWeight: location.pathname === path ? "bold" : "normal"
  };
}

export default Navbar;
