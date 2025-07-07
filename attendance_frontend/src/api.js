//
// API utility for attendance backend integration
//

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000";

// Helper to handle fetch with JSON
async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json", ...options.headers };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(API_BASE + path, { ...options, headers });
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new Error(detail.detail || res.statusText);
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function loginUser({ email, password }) {
  /** Login via backend; returns JWT and user. */
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

// PUBLIC_INTERFACE
export async function registerUser({ name, email, password }) {
  /** Register user via backend; returns JWT and user. */
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

// PUBLIC_INTERFACE
export async function getDashboardSummary() {
  /** Get dashboard summary data (today's attendance status, etc) */
  return apiFetch("/attendance/dashboard", { method: "GET" });
}

// PUBLIC_INTERFACE
export async function checkIn() {
  /** Mark attendance check-in for current user. */
  return apiFetch("/attendance/checkin", { method: "POST" });
}

// PUBLIC_INTERFACE
export async function checkOut() {
  /** Mark attendance check-out for current user. */
  return apiFetch("/attendance/checkout", { method: "POST" });
}

// PUBLIC_INTERFACE
export async function getAttendanceHistory({ page = 1, limit = 20 }) {
  /** Get paginated attendance history for the user */
  return apiFetch(`/attendance/history?page=${page}&limit=${limit}`, { method: "GET" });
}

// PUBLIC_INTERFACE
export async function exportAttendanceReport({ format = "csv" }) {
  /** Download attendance report file for user (CSV or PDF) */
  const token = localStorage.getItem("token");
  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/attendance/export?format=${format}`, { headers });
  if (!res.ok) throw new Error("Export failed");
  return res.blob();
}
