import React from 'react';

export default function AppHeader({ title = 'Student Records & Demographics Registry' }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <button className="hamburger-btn" aria-label="Toggle sidebar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <h1 className="header-title">{title}</h1>
      </div>

      <div className="header-right">
        {/* Notification Bell */}
        <button
          type="button"
          className="header-btn"
          title="Notifications"
          onClick={() => alert('No new notifications')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="notification-dot"></span>
        </button>

        {/* Administrator Profile Dropdown */}
        <div className="dropdown">
          <div className="header-profile dropdown-trigger">
            <div className="header-profile-info">
              <div className="header-profile-name">Dr. Maria Santos</div>
              <div className="header-profile-role">Administrator</div>
            </div>
            <div className="avatar">MS</div>
          </div>
        </div>
      </div>
    </header>
  );
}
