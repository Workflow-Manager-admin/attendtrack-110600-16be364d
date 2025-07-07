import React, { useState } from "react";
import { exportAttendanceReport } from "../api";

// PUBLIC_INTERFACE
function ExportPage() {
  const [format, setFormat] = useState("csv");
  const [downloading, setDownloading] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleExport(e) {
    e.preventDefault();
    setDownloading(true);
    setMessage(null);
    try {
      const blob = await exportAttendanceReport({ format });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `attendance_report.${format}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setMessage("Report downloaded!");
    } catch (e) {
      setMessage(e.message || "Export failed.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="container" style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Export Attendance Report</h2>
      <form onSubmit={handleExport} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <label>
          Format:
          <select value={format} onChange={e => setFormat(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="csv">CSV</option>
            <option value="pdf">PDF</option>
          </select>
        </label>
        <button type="submit" className="btn btn-large" disabled={downloading}>
          {downloading ? "Downloading..." : "Export"}
        </button>
        {message && <div style={{ color: "green", marginTop: 10 }}>{message}</div>}
      </form>
    </div>
  );
}

export default ExportPage;
