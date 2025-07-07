const TOKEN_KEY = "attendanceToken";
const USERNAME_KEY = "attendanceUser";

// PUBLIC_INTERFACE
export function setToken(token) {
  /** Store JWT token in localStorage */
  localStorage.setItem(TOKEN_KEY, token);
}

// PUBLIC_INTERFACE
export function getToken() {
  /** Retrieve JWT token from localStorage */
  return localStorage.getItem(TOKEN_KEY);
}

// PUBLIC_INTERFACE
export function clearToken() {
  /** Remove JWT and username from localStorage */
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
}

// PUBLIC_INTERFACE
export function setUsername(username) {
  /** Store username in localStorage */
  localStorage.setItem(USERNAME_KEY, username);
}

// PUBLIC_INTERFACE
export function getUsername() {
  /** Retrieve username from localStorage */
  return localStorage.getItem(USERNAME_KEY);
}
