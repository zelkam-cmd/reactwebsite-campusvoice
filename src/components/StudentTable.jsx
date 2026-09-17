import React, { useState } from 'react';
import { DEPARTMENTS, CIVIL_STATUSES } from '../data/initialStudents';

export default function StudentTable({
  students,
  onView,
  onEdit,
  onDelete,
  onAdd,
  onPrint
}) {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [civilFilter, setCivilFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Filter students
  const filteredStudents = students.filter((stu) => {
    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchId = (stu.accountNumber || stu.id || '').toLowerCase().includes(q);
      const matchName = (stu.name || '').toLowerCase().includes(q);
      const matchEmail = (stu.email || '').toLowerCase().includes(q);
      const matchContact = (stu.contact || '').toLowerCase().includes(q);
      if (!matchId && !matchName && !matchEmail && !matchContact) return false;
    }

    // Department filter
    if (deptFilter && stu.department !== deptFilter) {
      return false;
    }

    // Civil status filter
    if (civilFilter && stu.civilStatus !== civilFilter) {
      return false;
    }

    // Status filter
    if (statusFilter) {
      const stuStatus = (stu.status || 'active').toLowerCase();
      if (stuStatus !== statusFilter.toLowerCase()) return false;
    }

    return true;
  });

  // Sort students
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === 'name') {
      return (a.name || '').localeCompare(b.name || '');
    }
    if (sortBy === 'id') {
      return (a.accountNumber || a.id || '').localeCompare(b.accountNumber || b.id || '');
    }
    if (sortBy === 'updated') {
      return (b.updatedAt || '').localeCompare(a.updatedAt || '');
    }
    return 0;
  });

  // Helper to extract initials
  const getInitials = (name) => {
    if (!name) return 'ST';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="student-registry-page">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <div className="breadcrumb-item"><a href="#dashboard" onClick={(e) => e.preventDefault()}>Dashboard</a></div>
        <span className="breadcrumb-separator">▸</span>
        <div className="breadcrumb-item active">Student Registry</div>
      </div>

      {/* Content Header with Add New Student button */}
      <div className="content-header">
        <div>
          <h2 className="content-title">Student Information & Registry</h2>
          <p className="content-subtitle">Manage member profiles, view updated records, print demographic sheets, and maintain accounts</p>
        </div>
        <div className="content-actions">
          <button className="btn btn-primary" onClick={onAdd} style={{ borderRadius: '9999px', padding: '10px 22px' }}>
            + Add New Student
          </button>
        </div>
      </div>

      {/* Table Glass Card with Solid Frosted White Background (Matching Image 2) */}
      <div
        className="data-table-wrapper glass-card"
        style={{
          background: 'rgba(255, 255, 255, 0.82)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          boxShadow: '0 14px 36px -6px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
          overflow: 'hidden',
          width: '100%'
        }}
      >
        {/* Search & Filters Row */}
        <div
          className="data-table-header"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 24px',
            background: 'transparent',
            borderBottom: '1px solid rgba(226, 232, 240, 0.8)'
          }}
        >
          {/* Search Box */}
          <div className="search-bar" style={{ flex: '1 1 280px', minWidth: '240px', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              type="text"
              className="form-input"
              style={{
                width: '100%',
                paddingLeft: '40px',
                borderRadius: '12px',
                height: '42px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                fontSize: '13px',
                color: '#1e293b',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
              }}
              placeholder="Search ID, name, email, or mobile..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter Dropdowns */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Sort Filter */}
            <select
              className="form-select"
              style={{
                width: 'auto',
                fontSize: '13px',
                height: '42px',
                borderRadius: '12px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                padding: '0 14px',
                color: '#334155',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
              }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">⏱ Newest Added</option>
              <option value="updated">Recently Updated</option>
              <option value="name">Name (A-Z)</option>
              <option value="id">Student ID</option>
            </select>

            {/* Department Filter */}
            <select
              className="form-select"
              style={{
                width: 'auto',
                fontSize: '13px',
                height: '42px',
                borderRadius: '12px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                padding: '0 14px',
                color: '#334155',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
              }}
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
            >
              <option value="">All Colleges</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            {/* Civil Status Filter */}
            <select
              className="form-select"
              style={{
                width: 'auto',
                fontSize: '13px',
                height: '42px',
                borderRadius: '12px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                padding: '0 14px',
                color: '#334155',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
              }}
              value={civilFilter}
              onChange={(e) => setCivilFilter(e.target.value)}
            >
              <option value="">All Civil Status</option>
              {CIVIL_STATUSES.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              className="form-select"
              style={{
                width: 'auto',
                fontSize: '13px',
                height: '42px',
                borderRadius: '12px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                padding: '0 14px',
                color: '#334155',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
              }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="data-table-responsive" style={{ overflowX: 'auto' }}>
          <table className="data-table" style={{ width: '100%', minWidth: '950px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(248, 250, 252, 0.5)', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ width: '55px', padding: '14px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>PHOTO</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>STUDENT ID</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>FULL NAME & CONTACT</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>ACTIONS</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>DEPARTMENT / COLLEGE</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CIVIL STATUS & AGE</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>STATUS</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>LAST UPDATED</th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '48px 16px' }}>
                    <div className="empty-state">
                      <div className="empty-state-title" style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b' }}>No student records found</div>
                      <p className="empty-state-description" style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Try adjusting your search criteria or add a new student.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                sortedStudents.map((stu) => {
                  const studentId = stu.accountNumber || stu.id;
                  const initials = getInitials(stu.name);
                  const isSingle = (stu.civilStatus || 'Single');
                  const ageDisplay = stu.age ? `${stu.age} yrs old` : '—';
                  const isActive = (stu.status || 'active').toLowerCase() === 'active';

                  return (
                    <tr key={studentId} style={{ borderBottom: '1px solid rgba(226, 232, 240, 0.7)' }} className="student-table-row">
                      {/* Photo */}
                      <td style={{ padding: '14px 20px' }}>
                        <div
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '8px',
                            background: '#e0f2fe',
                            color: '#0284c7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '12px'
                          }}
                        >
                          {initials}
                        </div>
                      </td>

                      {/* Student ID */}
                      <td style={{ padding: '14px 20px' }}>
                        <span
                          style={{ fontWeight: 700, color: '#0284c7', cursor: 'pointer', fontSize: '13px' }}
                          onClick={() => onView(stu)}
                        >
                          {studentId}
                        </span>
                      </td>

                      {/* Full Name & Contact */}
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>{stu.name}</div>
                        <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                          {stu.email || 'No email'} • {stu.contact || 'No mobile'}
                        </div>
                      </td>

                      {/* Actions (View, Edit, Print, Reset matching Image 2) */}
                      <td style={{ padding: '14px 20px', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => onView(stu)}
                            style={{
                              padding: '5px 14px',
                              fontSize: '12px',
                              fontWeight: 600,
                              borderRadius: '9999px',
                              background: '#ffffff',
                              border: '1px solid #e2e8f0',
                              color: '#0f172a',
                              boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                            }}
                            title="View Full Dossier"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => onEdit(stu)}
                            style={{
                              padding: '5px 14px',
                              fontSize: '12px',
                              fontWeight: 600,
                              borderRadius: '9999px',
                              background: '#ffffff',
                              border: '1px solid #e2e8f0',
                              color: '#0f172a',
                              boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                            }}
                            title="Edit Student Profile"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm text-primary"
                            onClick={() => onPrint ? onPrint(stu) : window.print()}
                            style={{
                              padding: '4px 6px',
                              fontSize: '12px',
                              fontWeight: 600,
                              color: '#0284c7',
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                            title="Print Official Information Sheet"
                          >
                            Print
                          </button>
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm text-warning"
                            onClick={() => {
                              const confirmed = window.confirm(`Reset password for ${stu.name} to Student ID?`);
                              if (confirmed) {
                                alert(`Password for ${stu.name} has been reset to Student ID (${studentId}).`);
                              }
                            }}
                            style={{
                              padding: '4px 6px',
                              fontSize: '12px',
                              fontWeight: 600,
                              color: '#ea580c',
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                            title="Reset password to Student ID"
                          >
                            Reset
                          </button>
                        </div>
                      </td>

                      {/* Department / College */}
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{stu.department || '—'}</div>
                        <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{stu.yearLevel || 'Student'}</div>
                      </td>

                      {/* Civil Status & Age */}
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ fontSize: '13px', color: '#0f172a', fontWeight: 500 }}>{isSingle}</div>
                        <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{ageDisplay}</div>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '14px 20px' }}>
                        <span
                          className="badge"
                          style={{
                            display: 'inline-block',
                            padding: '4px 12px',
                            borderRadius: '9999px',
                            fontSize: '11px',
                            fontWeight: 700,
                            background: isActive ? '#dcfce7' : '#fee2e2',
                            color: isActive ? '#15803d' : '#b91c1c'
                          }}
                        >
                          {isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>

                      {/* Last Updated */}
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>
                          {stu.lastUpdated || 'Original record'}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
