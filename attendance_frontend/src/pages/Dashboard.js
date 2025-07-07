import React, { useState, useEffect } from "react";

// PUBLIC_INTERFACE
function Dashboard({
  username,
  onCheckIn,
  onCheckOut,
  onLogout,
  attendanceStatus,
  attendanceMessage,
  reloadStatus,
}) {
  /** Dashboard page: actions for check-in/check-out, shows status, and logout. */
  return (
    <div className="container" style={{ maxWidth: 500, margin: "2.5em auto", textAlign: "center" }}>
      <h2 className="title" style={{ marginBottom: 8 }}>
        Welcome, <span style={{ color: "var(--text-secondary)" }}>{username}</span>
      </h2>
      <div>
        <button
          className="btn"
          style={{
            margin: 8,
            minWidth: 120,
            background: attendanceStatus === "checked_in" ? "#43A047" : "var(--button-bg)",
            color: "var(--button-text)",
          }}
          onClick={onCheckIn}
          disabled={attendanceStatus === "checked_in"}
        >
          Check In
        </button>
        <button
          className="btn"
          style={{
            margin: 8,
            minWidth: 120,
            background: attendanceStatus === "checked_out" ? "#888" : "#D32F2F",
            color: "var(--button-text)",
          }}
          onClick={onCheckOut}
          disabled={attendanceStatus === "checked_out"}
        >
          Check Out
        </button>
      </div>
      <div style={{ marginTop: 16 }}>
        <p>
          Status:{" "}
          <span
            style={{
              fontWeight: "bold",
              color:
                attendanceStatus === "checked_in"
                  ? "#43A047"
                  : attendanceStatus === "checked_out"
                  ? "#888"
                  : "#1976D2",
            }}
          >
            {attendanceStatus === "checked_in"
              ? "Checked in"
              : attendanceStatus === "checked_out"
              ? "Checked out"
              : "Not checked in"}
          </span>
        </p>
        <button className="btn" style={{ margin: 8, padding: "4px 20px" }} onClick={reloadStatus}>
          Refresh Status
        </button>
      </div>
      {attendanceMessage && (
        <div
          style={{
            background: "#f3f3e6",
            margin: "18px auto",
            padding: 12,
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            color: "#5f5f2e",
            width: "90%",
            fontSize: 16,
          }}
        >
          {attendanceMessage}
        </div>
      )}
      <button
        className="btn"
        style={{
          marginTop: 36,
          background: "#424242",
          color: "#fff",
          width: 160,
        }}
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
