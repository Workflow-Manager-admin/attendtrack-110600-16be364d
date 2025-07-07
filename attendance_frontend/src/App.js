import React, { useState, useEffect } from "react";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import {
  setToken,
  getToken,
  clearToken,
  setUsername,
  getUsername,
} from "./utils/auth";
import {
  apiRegister,
  apiLogin,
  apiCheckIn,
  apiCheckOut,
  apiGetStatus,
} from "./utils/api";

// Simple route manager for public/protected route flow
function usePageRouter(isAuthenticated) {
  // "login" | "register" | "dashboard"
  const [page, setPage] = useState(isAuthenticated ? "dashboard" : "login");
  return [page, setPage];
}

// PUBLIC_INTERFACE
function App() {
  /**
   * React frontend root: Handles theme, routing, auth state, and API integration.
   */
  const [theme, setTheme] = useState("light");
  const [page, setPage] = usePageRouter(!!getToken());
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [username, setUsernameState] = useState(getUsername() || "");
  const [attendanceStatus, setAttendanceStatus] = useState(""); // "checked_in" | "checked_out" | ""
  const [attendanceMessage, setAttendanceMessage] = useState("");

  // On mount, persist theme & check token status
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // On token load, fetch username if available
  useEffect(() => {
    if (getToken()) {
      const user = getUsername();
      if (user) setUsernameState(user);
    }
  }, []);

  // Flow: Registration
  // PUBLIC_INTERFACE
  const handleRegister = async (username, password) => {
    setLoading(true);
    setApiError("");
    try {
      await apiRegister(username, password);
      // Success: Redirect to login, prefill username
      setLoading(false);
      setAttendanceMessage("Registration successful. Please log in.");
      setPage("login");
    } catch (err) {
      setLoading(false);
      setApiError(err.message);
      throw err;
    }
  };

  // PUBLIC_INTERFACE
  const handleLogin = async (username, password) => {
    setLoading(true);
    setApiError("");
    try {
      const { access_token } = await apiLogin(username, password);
      if (!access_token) throw new Error("No token received");
      setToken(access_token);
      setUsername(username);
      setUsernameState(username);
      setLoading(false);
      setApiError("");
      setAttendanceMessage("");
      setPage("dashboard");
      await loadAttendanceStatus();
    } catch (err) {
      setLoading(false);
      setApiError(err.message);
      throw err;
    }
  };

  // PUBLIC_INTERFACE
  const handleLogout = () => {
    clearToken();
    setUsernameState("");
    setAttendanceStatus("");
    setPage("login");
    setAttendanceMessage("");
  };

  // Attendance actions (check-in, check-out)
  // PUBLIC_INTERFACE
  const handleCheckIn = async () => {
    setLoading(true);
    setAttendanceMessage("");
    try {
      const resp = await apiCheckIn();
      setAttendanceStatus("checked_in");
      setAttendanceMessage("Checked in successfully at " + (resp.time || resp.timestamp || "now"));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setAttendanceMessage(err.message || "Check-in failed");
    }
  };

  // PUBLIC_INTERFACE
  const handleCheckOut = async () => {
    setLoading(true);
    setAttendanceMessage("");
    try {
      const resp = await apiCheckOut();
      setAttendanceStatus("checked_out");
      setAttendanceMessage("Checked out successfully at " + (resp.time || resp.timestamp || "now"));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setAttendanceMessage(err.message || "Check-out failed");
    }
  };

  // PUBLIC_INTERFACE
  const loadAttendanceStatus = async () => {
    setLoading(true);
    setAttendanceMessage("");
    try {
      const resp = await apiGetStatus();
      // Expect {status: "checked_in"|"checked_out"|...}
      setAttendanceStatus(resp.status || "");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setAttendanceStatus("");
      setAttendanceMessage("Could not fetch attendance status: " + (err.message || "Error"));
    }
  };

  // Ensure attendance status loaded on landing in dashboard
  useEffect(() => {
    if (page === "dashboard" && getToken()) {
      loadAttendanceStatus();
    }
  }, [page]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // --- Main render: simple routing logic
  return (
    <div className="App">
      <header className="App-header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        {page === "register" ? (
          <>
            <Register onRegister={handleRegister} isLoading={loading} />
            <p style={{ marginTop: 16 }}>
              Already have an account?{" "}
              <button
                className="btn"
                style={{
                  display: "inline-block",
                  background: "transparent",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  border: "none",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => setPage("login")}
                disabled={loading}
              >
                Login here
              </button>
            </p>
          </>
        ) : page === "login" ? (
          <>
            <Login onLogin={handleLogin} isLoading={loading} />
            <p style={{ marginTop: 16 }}>
              No account?{" "}
              <button
                className="btn"
                style={{
                  display: "inline-block",
                  background: "transparent",
                  padding: 0,
                  margin: 0,
                  color: "var(--text-secondary)",
                  border: "none",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => setPage("register")}
                disabled={loading}
              >
                Register
              </button>
            </p>
            {attendanceMessage && (
              <div
                style={{
                  background: "#f8fff8",
                  margin: "22px auto",
                  padding: 12,
                  borderRadius: 8,
                  color: "#1976D2",
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                {attendanceMessage}
              </div>
            )}
          </>
        ) : page === "dashboard" && getToken() ? (
          <Dashboard
            username={username}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
            onLogout={handleLogout}
            attendanceStatus={attendanceStatus}
            attendanceMessage={attendanceMessage}
            reloadStatus={loadAttendanceStatus}
          />
        ) : (
          <div style={{ marginTop: 100 }}>
            <h2>Session expired</h2>
            <button className="btn" onClick={() => setPage("login")}>
              Go to Login
            </button>
          </div>
        )}
        {apiError && (
          <div
            style={{
              background: "#ffebee",
              color: "#B71C1C",
              fontWeight: "bold",
              margin: "24px auto",
              padding: 10,
              borderRadius: 8,
              width: "90%",
              maxWidth: 400,
            }}
          >
            {apiError}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
