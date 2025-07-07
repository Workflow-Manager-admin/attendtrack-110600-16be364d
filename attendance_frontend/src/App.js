import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Theme toggle for light/dark mode */}
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <img src={logo} className="App-logo" alt="AttendTrack logo" />
        <div className="title">AttendTrack</div>
        <div className="subtitle">Effortless Attendance Management</div>
        <div className="desc">
          Welcome to <strong>AttendTrack</strong> – your modern solution to track, manage, and report user or employee attendance.<br />
          Experience a sleek, professional interface designed for productivity and clarity.
        </div>
        <div className="card">
          <div>
            <span role="img" aria-label="features">🗒️</span> <b>Features</b>
            <ul style={{margin: '12px 0 10px 19px', fontSize: '1.1em', color: 'var(--text-light)'}}>
              <li>User login &amp; registration</li>
              <li>Attendance check-in / check-out</li>
              <li>Attendance history and reports</li>
              <li>Dashboard attendance summary</li>
              <li>Modern responsive design</li>
            </ul>
          </div>
        </div>
        <div className="info" style={{ marginTop: 20 }}>
          <span>Current theme: <strong>{theme.charAt(0).toUpperCase() + theme.slice(1)}</strong></span>
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
