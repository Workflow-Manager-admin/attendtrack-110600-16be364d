import React, { useEffect, useState } from "react";
import { getAttendanceHistory } from "../api";

// PUBLIC_INTERFACE
function HistoryPage() {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getAttendanceHistory({ page })
      .then(data => {
        setRecords(data.records || data.data || []);
        setTotalPages(data.total_pages || 1);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="container" style={{ maxWidth: 700, margin: "40px auto" }}>
      <h2>Attendance History</h2>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
        <thead>
          <tr style={{ background: "#f1f1f1" }}>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Check-in</th>
            <th style={thStyle}>Check-out</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec, i) => (
            <tr key={i} style={{ textAlign: "center", background: i % 2 ? "#fafafa" : "#fff" }}>
              <td style={tdStyle}>{rec.date || rec.attendance_date}</td>
              <td style={tdStyle}>{rec.check_in || rec.check_in_time || "—"}</td>
              <td style={tdStyle}>{rec.check_out || rec.check_out_time || "—"}</td>
              <td style={tdStyle}>{rec.status || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 18 }}>
        <button
          className="btn"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          style={{ marginRight: 8 }}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          className="btn"
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          style={{ marginLeft: 8 }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

const thStyle = { padding: 10, border: "1px solid #ccc" };
const tdStyle = { padding: 8, border: "1px solid #ccc" };

export default HistoryPage;
