import React from 'react';

export default function StudentDetail({
  student,
  onEdit,
  onDelete,
  onPrint,
  onResetPassword,
  onBack,
  onNavigateDashboard
}) {
  if (!student) return null;

  const initials = student.name
    ? student.name
        .trim()
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'ST';

  const isPendingPW = !!student.mustChangePassword;
  const isActive = (student.status || 'active').toLowerCase() === 'active';

  // Format birthdate nicely (e.g., Sep 01, 2003)
  const formatBirthdate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const formattedBday = formatBirthdate(student.birthdate);
  const ageDisplay = student.age ? `${student.age} yrs old` : '—';
  const bdayAndAge = student.birthdate ? `${formattedBday} (${ageDisplay})` : ageDisplay;

  const defaultReferences = [
    { name: 'Faculty Adviser', affiliation: 'Faculty / Instructor', contact: '09170000000' },
    { name: 'Department Chair', affiliation: 'College Department', contact: '09180000000' }
  ];
  const referencesList = (student.references && student.references.length > 0) ? student.references : defaultReferences;

  return (
    <div className="student-dossier-page">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <div className="breadcrumb-item">
          <a href="#dashboard" onClick={(e) => e.preventDefault()}>Dashboard</a>
        </div>
        <span className="breadcrumb-separator">▸</span>
        <div className="breadcrumb-item">
          <a href="#registry" onClick={(e) => { e.preventDefault(); onBack(); }}>Student Registry</a>
        </div>
        <span className="breadcrumb-separator">▸</span>
        <div className="breadcrumb-item active">{student.name}</div>
      </div>

      {/* Header Hero Card */}
      <div className="card glass-card mb-6" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                fontWeight: 700,
                color: 'var(--color-primary)',
                border: '2px solid white',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              {student.avatar ? (
                <img src={student.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                initials
              )}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--color-text-primary)', margin: 0 }}>
                  {student.name}
                </h2>
                <span className={`badge ${isActive ? 'badge-success' : 'badge-gray'}`}>
                  {isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <span><strong>Student ID:</strong> {student.accountNumber || student.studentNumber || student.id}</span>
                <span>•</span>
                <span>{student.department || 'College of Information and Communications Technology (CICT)'}</span>
                <span>•</span>
                <span>{student.yearLevel || 'Student'}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => onEdit(student)}
            >
              Edit Record
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => onPrint ? onPrint(student) : window.print()}
            >
              Print SIS
            </button>
            <button
              type="button"
              className="btn btn-warning btn-sm"
              onClick={() => {
                if (onResetPassword) {
                  onResetPassword(student);
                } else {
                  window.confirm(`Reset password for ${student.name} to Student ID?`);
                }
              }}
            >
              Reset Password
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm text-error"
              onClick={() => onDelete(student)}
            >
              Delete Record
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Left Column: Personal, Family & References */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* I. Personal & Demographic Details */}
          <div className="card glass-card">
            <div className="card-header">
              <h3 className="card-title">I. Personal & Demographic Details</h3>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              <div className="data-table-responsive">
                <table className="data-table">
                  <tbody>
                    <tr>
                      <td style={{ width: '25%', fontWeight: 600, background: '#f8fafc' }}>First Name:</td>
                      <td style={{ width: '25%' }}>{student.firstName || student.name?.split(' ')[0] || '—'}</td>
                      <td style={{ width: '25%', fontWeight: 600, background: '#f8fafc' }}>Middle Name:</td>
                      <td style={{ width: '25%' }}>{student.middleName || '—'}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600, background: '#f8fafc' }}>Last Name:</td>
                      <td>{student.lastName || student.name?.split(' ').slice(-1)[0] || '—'}</td>
                      <td style={{ fontWeight: 600, background: '#f8fafc' }}>Extension (Suffix):</td>
                      <td>{student.extensionName || '—'}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600, background: '#f8fafc' }}>Civil Status:</td>
                      <td>{student.civilStatus || 'Single'}</td>
                      <td style={{ fontWeight: 600, background: '#f8fafc' }}>Birthdate & Age:</td>
                      <td>{bdayAndAge}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600, background: '#f8fafc' }}>Permanent Address:</td>
                      <td colSpan={3}>{student.address || '—'}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600, background: '#f8fafc' }}>Mobile Number:</td>
                      <td>{student.contact || student.contactNumber || '—'}</td>
                      <td style={{ fontWeight: 600, background: '#f8fafc' }}>Email Address:</td>
                      <td>{student.email || '—'}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600, background: '#f8fafc' }}>Occupation:</td>
                      <td>{student.occupation || 'Student'}</td>
                      <td style={{ fontWeight: 600, background: '#f8fafc' }}>Employer:</td>
                      <td>{student.employer || '—'}</td>
                    </tr>
                    {student.employerAddress && (
                      <tr>
                        <td style={{ fontWeight: 600, background: '#f8fafc' }}>Employer Address:</td>
                        <td colSpan={3}>{student.employerAddress}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* II. Family Background & Dependents */}
          <div className="card glass-card">
            <div className="card-header">
              <h3 className="card-title">‍‍II. Family Background & Dependents</h3>
            </div>
            <div className="card-body">
              <div className="data-table-responsive" style={{ marginBottom: '16px' }}>
                <table className="data-table">
                  <tbody>
                    <tr>
                      <td style={{ width: '25%', fontWeight: 600, background: '#f8fafc' }}>Father's Name:</td>
                      <td style={{ width: '25%' }}>{student.fatherName || '—'}</td>
                      <td style={{ width: '25%', fontWeight: 600, background: '#f8fafc' }}>Mother's Maiden Name:</td>
                      <td style={{ width: '25%' }}>{student.motherName || '—'}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600, background: '#f8fafc' }}>Spouse Name:</td>
                      <td>{student.spouseName || '—'}</td>
                      <td style={{ fontWeight: 600, background: '#f8fafc' }}>Spouse Occupation:</td>
                      <td>{student.spouseOccupation || '—'}</td>
                    </tr>
                    {student.spouseEmployer && (
                      <tr>
                        <td style={{ fontWeight: 600, background: '#f8fafc' }}>Spouse Employer:</td>
                        <td colSpan={3}>{student.spouseEmployer}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                Registered Children / Dependents:
              </div>
              {(!student.dependents || student.dependents.length === 0) ? (
                <div style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>No dependents registered.</div>
              ) : (
                <div className="data-table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Child Full Name</th>
                        <th style={{ width: '140px' }}>Age</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.dependents.map((dep, idx) => (
                        <tr key={idx}>
                          <td>{dep.name || dep.child_name}</td>
                          <td>{dep.age || dep.child_age} years old</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* III. Character / Faculty References */}
          <div className="card glass-card">
            <div className="card-header">
              <h3 className="card-title">III. Character / Faculty References</h3>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              {referencesList.length === 0 ? (
                <div style={{ padding: '16px', fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>No references listed.</div>
              ) : (
                <div className="data-table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Reference Name</th>
                        <th>Relationship / Affiliation</th>
                        <th>Contact Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referencesList.map((ref, idx) => (
                        <tr key={idx}>
                          <td className="font-semibold">{ref.name || ref.reference_name}</td>
                          <td>{ref.affiliation || ref.relationship_or_affiliation || 'Faculty / Member'}</td>
                          <td>{ref.contact || ref.contact_number}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Account Status & Survey Submissions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Account Status Card */}
          <div className="card glass-card">
            <div className="card-header">
              <h3 className="card-title">Account Status</h3>
            </div>
            <div className="card-body">
              <div className="profile-detail-row">
                <div className="profile-detail-label">Status:</div>
                <div className="profile-detail-value">
                  <span className={`badge ${isActive ? 'badge-success' : 'badge-gray'}`}>
                    {isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="profile-detail-row">
                <div className="profile-detail-label">Must Change PW:</div>
                <div className="profile-detail-value">
                  {isPendingPW ? (
                    <span className="badge badge-warning">Yes (Pending)</span>
                  ) : (
                    <span className="badge badge-success">No (Completed)</span>
                  )}
                </div>
              </div>
              <div className="profile-detail-row">
                <div className="profile-detail-label">Failed Attempts:</div>
                <div className="profile-detail-value">{student.failedAttempts || 0}</div>
              </div>
              <div className="profile-detail-row">
                <div className="profile-detail-label">Account Created:</div>
                <div className="profile-detail-value">{student.createdAt || 'Aug 24, 2026'}</div>
              </div>
              <div className="profile-detail-row">
                <div className="profile-detail-label">Last Profile Update:</div>
                <div className="profile-detail-value">{student.updatedAt || 'Aug 24, 2026 11:06 AM'}</div>
              </div>

              {student.signature && (
                <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>DIGITAL SIGNATURE ON FILE</div>
                  <img src={student.signature} alt="Signature" style={{ maxHeight: '50px', maxWidth: '100%' }} />
                </div>
              )}
            </div>
          </div>

          {/* Survey Submission History */}
          <div className="card glass-card">
            <div className="card-header">
              <h3 className="card-title">Survey Activity History</h3>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              {(!student.history || student.history.length === 0) ? (
                <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
                  No survey responses recorded yet.
                </div>
              ) : (
                <div className="data-table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Survey Title</th>
                        <th>Answered</th>
                        <th>Submitted</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.history.map((hist, idx) => (
                        <tr key={idx}>
                          <td>
                            <div className="font-semibold">{hist.surveyTitle}</div>
                            <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>{hist.category}</div>
                          </td>
                          <td>{hist.answeredQuestions} items</td>
                          <td style={{ fontSize: '12px' }}>{hist.submittedAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
