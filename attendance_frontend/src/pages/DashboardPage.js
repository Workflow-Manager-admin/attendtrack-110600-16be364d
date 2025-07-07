import React, { useEffect, useState } from "react";
import { getDashboardSummary } from "../api";

// PUBLIC_INTERFACE
function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getDashboardSummary()
      .then(setSummary)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container" style={{ marginTop: 40 }}>Loading dashboard...</div>;
  if (error) return <div className="container" style={{ color: "red", marginTop: 40 }}>{error}</div>;
  if (!summary) return <div className="container" style={{ marginTop: 40 }}>No data.</div>;

  return (
    <div className="container" style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>Dashboard</h2>
      <div style={dashBoxStyle}>
        <div><b>Status:</b> {summary.todays_status || "N/A"}</div>
        <div><b>Check-in:</b> {summary.check_in_time || "—"}</div>
        <div><b>Check-out:</b> {summary.check_out_time || "—"}</div>
        <div><b>Current session:</b> {summary.session_duration || "—"}</div>
      </div>
      <div style={{ marginTop: 24 }}>
        <h4>Month Overview</h4>
        <p>Days Present: {summary.present_days}</p>
        <p>Days Absent: {summary.absent_days}</p>
      </div>
    </div>
  );
}

const dashBoxStyle = {
  padding: 20,
  border: "1px solid var(--border-color)",
  borderRadius: 8,
  marginBottom: 20,
  background: "var(--bg-secondary)"
};

export default DashboardPage;
