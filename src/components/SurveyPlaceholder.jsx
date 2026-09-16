import React from 'react';

export default function SurveyPlaceholder({ title, onReturnToMembers }) {
  return (
    <div className="placeholder-card">
      <div className="placeholder-content">
        <div className="placeholder-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </div>
        <h2 className="placeholder-title">{title || 'Survey Module'}</h2>
        <p className="placeholder-text">
          As instructed for this React migration activity, the survey management features have been left blank to focus exclusively on the <strong>Student Profiling Module (Add, Edit, View, Delete)</strong>.
        </p>
        <button
          type="button"
          className="btn-add-member"
          onClick={onReturnToMembers}
          style={{ marginTop: '1rem' }}
        >
          ← Return to Member Records
        </button>
      </div>
    </div>
  );
}
