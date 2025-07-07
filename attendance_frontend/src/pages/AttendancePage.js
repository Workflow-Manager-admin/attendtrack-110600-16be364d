import React, { useState, useEffect } from "react";
import { checkIn, checkOut, getDashboardSummary } from "../api";

// PUBLIC_INTERFACE
function AttendancePage() {
  const [status, setStatus] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refreshStatus() {
    setLoading(true);
    try {
      const summary = await getDashboardSummary();
      setStatus(summary.todays_status || "");
      setCheckInTime(summary.check_in_time || "");
      setCheckOutTime(summary.check_out_time || "");
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setMessage("Failed to fetch attendance status.");
    }
  }

  useEffect(() => {
    refreshStatus();
  }, []);

  async function doCheckIn() {
    setMessage(null);
    try {
      await checkIn();
      setMessage("Checked in successfully.");
      refreshStatus();
    } catch (e) {
      setMessage(e.message || "Check-in failed.");
    }
  }

  async function doCheckOut() {
    setMessage(null);
    try {
      await checkOut();
      setMessage("Checked out successfully.");
      refreshStatus();
    } catch (e) {
      setMessage(e.message || "Check-out failed.");
    }
  }

  return (
    <div className="container" style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Attendance Marking</h2>
      {loading ? (
        <p>Loading status...</p>
      ) : (
        <>
          <div style={statusBoxStyle}>
            <div><b>Status:</b> {status || "N/A"}</div>
            <div><b>Check-in:</b> {checkInTime || "—"}</div>
            <div><b>Check-out:</b> {checkOutTime || "—"}</div>
          </div>
          <div style={{ marginTop: 24, display: "flex", gap: 16 }}>
            <button
              className="btn btn-large"
              onClick={doCheckIn}
              disabled={status === "Present" || !!checkInTime}
            >
              Check In
            </button>
            <button
              className="btn btn-large"
              onClick={doCheckOut}
              disabled={!checkInTime || !!checkOutTime}
            >
              Check Out
            </button>
          </div>
          {message && <div style={{ color: "green", marginTop: 12 }}>{message}</div>}
        </>
      )}
    </div>
  );
}

const statusBoxStyle = {
  padding: 16,
  border: "1px solid var(--border-color)",
  borderRadius: 8,
  background: "var(--bg-secondary)"
};

export default AttendancePage;
