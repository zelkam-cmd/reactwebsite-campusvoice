import React from 'react';

export default function Header({
  onAddClick,
  title = "Student Information & Registry",
  subtitle = "Manage member profiles, view updated records, and maintain student accounts",
  breadcrumb = "Dashboard ▸ Student Registry"
}) {
  return (
    <header className="page-header">
      <div className="header-titles">
        <div className="breadcrumbs">
          <span className="breadcrumb-link">Dashboard</span>
          <span className="breadcrumb-separator">▸</span>
          <span className="breadcrumb-active">Student Registry</span>
        </div>
        <h1 className="header-title">{title}</h1>
        {subtitle && <p className="header-subtitle">{subtitle}</p>}
      </div>

      <div className="header-actions">
        <button
          type="button"
          className="btn-add-student"
          onClick={onAddClick}
        >
          <span className="plus-icon">+</span> Add New Student
        </button>
      </div>
    </header>
  );
}
