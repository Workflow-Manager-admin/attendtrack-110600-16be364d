import { getToken } from "./auth";

// Update this if your backend is running elsewhere:
const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

// --- PUBLIC_INTERFACE
export async function apiRegister(username, password) {
  /** Call backend API to register new user */
  const res = await fetch(`${BACKEND_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || "Registration failed");
  }
  return res.json();
}

// --- PUBLIC_INTERFACE
export async function apiLogin(username, password) {
  /** Call backend API to login; expects JWT token in response */
  const res = await fetch(`${BACKEND_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || "Login failed");
  }
  return res.json();
}

// --- PUBLIC_INTERFACE
export async function apiCheckIn() {
  /** Backend attendance check-in endpoint, uses JWT */
  const res = await fetch(`${BACKEND_BASE_URL}/attendance/checkin`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || "Check-in failed");
  }
  return res.json();
}

// --- PUBLIC_INTERFACE
export async function apiCheckOut() {
  /** Backend attendance check-out endpoint, uses JWT */
  const res = await fetch(`${BACKEND_BASE_URL}/attendance/checkout`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || "Check-out failed");
  }
  return res.json();
}

// --- PUBLIC_INTERFACE
export async function apiGetStatus() {
  /** Backend: Get user's current attendance status for today, uses JWT */
  const res = await fetch(`${BACKEND_BASE_URL}/attendance/status`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || "Status fetch failed");
  }
  return res.json();
}
