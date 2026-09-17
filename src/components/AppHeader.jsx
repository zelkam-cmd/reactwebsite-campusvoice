import React from 'react';

export default function AppHeader({ title = 'Student Information & Registry' }) {
  return (
    <header
      className="app-header"
      style={{
        position: 'sticky',
        top: '16px',
        zIndex: 100,
        height: '70px',
        background: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '7px 24px 0 24px',
        marginBottom: '24px',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div className="header-left" style={{ display: 'flex', alignItems: 'center' }}>
        <h1
          className="header-title"
          style={{
            fontSize: '20px',
            fontWeight: 800,
            color: '#0f172a',
            letterSpacing: '-0.02em',
            margin: 0
          }}
        >
          {title}
        </h1>
      </div>

      <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Notification Bell */}
        <button
          type="button"
          className="header-btn"
          title="Notifications"
          onClick={() => alert('No new notifications')}
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            color: '#64748b',
            position: 'relative',
            background: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            cursor: 'pointer'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '8px',
              height: '8px',
              background: '#ef4444',
              borderRadius: '50%',
              border: '2px solid white'
            }}
          />
        </button>

        {/* Administrator Profile Pill */}
        <div
          className="header-profile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '4px 6px 4px 16px',
            borderRadius: '9999px',
            background: 'rgba(255, 255, 255, 0.6)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            cursor: 'pointer'
          }}
        >
          <div className="header-profile-info" style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Dr. Maria Santos</div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Administrator</div>
          </div>
          <div
            className="avatar"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#0284c7',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '13px'
            }}
          >
            DS
          </div>
        </div>
      </div>
    </header>
  );
}
