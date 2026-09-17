import React, { useState } from 'react';
import { DEPARTMENTS, CIVIL_STATUSES } from '../data/initialStudents';

export default function StudentTable({
  students,
  onView,
  onEdit,
  onDelete,
  onAdd,
  onPrint,
  onResetPassword,
  onNavigateDashboard
}) {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [civilFilter, setCivilFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Filter students
  const filteredStudents = students.filter((stu) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchId = (stu.accountNumber || stu.studentNumber || stu.id || '').toLowerCase().includes(q);
      const matchName = (stu.name || '').toLowerCase().includes(q);
      const matchEmail = (stu.email || '').toLowerCase().includes(q);
      const matchContact = (stu.contact || '').toLowerCase().includes(q);
      if (!matchId && !matchName && !matchEmail && !matchContact) return false;
    }

    if (deptFilter && stu.department !== deptFilter) {
      return false;
    }

    if (civilFilter && stu.civilStatus !== civilFilter) {
      return false;
    }

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
      return (a.accountNumber || a.studentNumber || a.id || '').localeCompare(b.accountNumber || b.studentNumber || b.id || '');
    }
    if (sortBy === 'updated') {
      return (b.updatedAt || '').localeCompare(a.updatedAt || '');
    }
    return 0;
  });

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
        <div className="breadcrumb-item">
          <a href="#dashboard" onClick={(e) => e.preventDefault()}>Dashboard</a>
        </div>
        <span className="breadcrumb-separator">▸</span>
        <div className="breadcrumb-item active">Student Registry</div>
      </div>

      {/* Content Header */}
      <div className="content-header">
        <div>
          <h2 className="content-title">Student Information & Registry</h2>
          <p className="content-subtitle">Manage member profiles, view updated records, print demographic sheets, and maintain accounts</p>
        </div>
        <div className="content-actions">
          <button type="button" className="btn btn-primary" onClick={onAdd}>
            + Add New Student
          </button>
        </div>
      </div>

      {/* Glass Data Table Card matching CampusVoice 1:1 */}
      <div className="data-table-wrapper glass-card">
        <div className="data-table-header" style={{ flexWrap: 'wrap', gap: '12px' }}>
          <form onSubmit={(e) => e.preventDefault()} className="search-bar" style={{ flex: 1, minWidth: '250px' }}>
            <div className="search-bar-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              type="text"
              name="search"
              placeholder="Search ID, name, email, or mobile..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {/* Sort Filter */}
            <select
              name="sort"
              className="form-select"
              style={{ width: 'auto', fontSize: '13px' }}
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
              name="department"
              className="form-select"
              style={{ width: 'auto', fontSize: '13px' }}
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
              name="civil_status"
              className="form-select"
              style={{ width: 'auto', fontSize: '13px' }}
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
              name="status"
              className="form-select"
              style={{ width: 'auto', fontSize: '13px' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="data-table-responsive">
          <table className="data-table" style={{ minWidth: '860px' }}>
            <thead>
              <tr>
                <th style={{ width: '50px' }}>Photo</th>
                <th>Student ID</th>
                <th>Full Name & Contact</th>
                <th style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>Actions</th>
                <th>Department / College</th>
                <th>Civil Status & Age</th>
                <th>Status</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                    <div className="empty-state" style={{ padding: 0 }}>
                      <div className="empty-state-title">No student records found</div>
                      <p className="empty-state-description">Try adjusting your search criteria or add a new student.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                sortedStudents.map((stu) => {
                  const studentId = stu.accountNumber || stu.studentNumber || stu.id;
                  const initials = getInitials(stu.name);
                  const isActive = (stu.status || 'active').toLowerCase() === 'active';
                  const ageDisplay = stu.age ? `${stu.age} yrs old` : '—';

                  return (
                    <tr key={studentId}>
                      <td>
                        <div style={{ width: '38px', height: '38px', borderRadius: '8px', overflow: 'hidden', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px', color: 'var(--color-primary)' }}>
                          {stu.avatar ? (
                            <img src={stu.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            initials
                          )}
                        </div>
                      </td>
                      <td>
                        <span
                          className="font-semibold"
                          style={{ color: 'var(--color-primary)', cursor: 'pointer', display: 'inline-block' }}
                          onClick={() => onView(stu)}
                        >
                          {studentId && studentId.includes('-') ? (
                            <>
                              {studentId.substring(0, studentId.lastIndexOf('-') + 1)}
                              <br />
                              {studentId.substring(studentId.lastIndexOf('-') + 1)}
                            </>
                          ) : (
                            studentId
                          )}
                        </span>
                      </td>
                      <td>
                        <div className="font-semibold">{stu.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                          {stu.email || 'No email'} • {stu.contact || 'No mobile'}
                        </div>
                      </td>
                      <td style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'inline-flex', gap: '6px', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'nowrap' }}>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            title="View Full Dossier"
                            style={{ padding: '4px 10px', fontWeight: 600, fontSize: '12px' }}
                            onClick={() => onView(stu)}
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            title="Edit Student Profile"
                            style={{ padding: '4px 10px', fontWeight: 600, fontSize: '12px' }}
                            onClick={() => onEdit(stu)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm text-primary"
                            title="Print Official Information Sheet"
                            style={{ padding: '4px 8px', fontWeight: 600, fontSize: '12px' }}
                            onClick={() => onPrint ? onPrint(stu) : window.print()}
                          >
                            Print
                          </button>
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm text-warning"
                            title="Reset password to Student ID"
                            style={{ padding: '4px 8px', fontWeight: 600, fontSize: '12px' }}
                            onClick={() => onResetPassword ? onResetPassword(stu) : null}
                          >
                            Reset
                          </button>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontSize: '13px', fontWeight: 500 }}>{stu.department || '—'}</div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>{stu.yearLevel || 'Student'}</div>
                      </td>
                      <td>
                        <div>{stu.civilStatus || 'Single'}</div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                          {ageDisplay}
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${isActive ? 'badge-success' : 'badge-gray'}`}>
                          {isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontSize: '12px', color: '#475569' }}>
                          {stu.lastUpdated || (stu.updatedAt ? stu.updatedAt : 'Original record')}
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
