// src/Components/ThemeToggle/ThemeToggle.js
import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.css';

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle-container">
      <button 
        className="theme-toggle-btn" 
        onClick={toggleTheme}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        <div className="toggle-track">
          <div className={`toggle-thumb ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="toggle-icon">
              {isDarkMode ? (
                <i className="bi bi-moon-stars-fill"></i>
              ) : (
                <i className="bi bi-sun-fill"></i>
              )}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

export default ThemeToggle;
