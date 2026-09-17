import React from 'react';

export default function StudentDetail({ student, onEdit, onDelete, onPrint, onBack, onNavigateDashboard }) {
  if (!student) return null;

  const initials = student.name
    ? student.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'ST';

  const isCompletedPW = true;
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

  return (
    <div className="student-dossier-page">
      {/* Breadcrumbs */}
      <div className="breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '18px' }}>
        <div className="breadcrumb-item">
          <span style={{ color: '#0284c7', cursor: 'pointer', fontWeight: 600 }} onClick={onNavigateDashboard || onBack}>Dashboard</span>
        </div>
        <span className="breadcrumb-separator" style={{ color: '#94a3b8' }}>▸</span>
        <div className="breadcrumb-item">
          <span style={{ color: '#0284c7', cursor: 'pointer', fontWeight: 600 }} onClick={onBack}>Student Registry</span>
        </div>
        <span className="breadcrumb-separator" style={{ color: '#94a3b8' }}>▸</span>
        <div className="breadcrumb-item active" style={{ color: '#64748b', fontWeight: 600 }}>
          {student.name}
        </div>
      </div>

      {/* Hero Header Card with rounded corners and circular pill buttons matching Image 2 */}
      <div
        className="card glass-card hero-dossier-card"
        style={{
          background: 'rgba(255, 255, 255, 0.68)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.9)',
          boxShadow: '0 14px 36px -6px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
          padding: '26px 28px',
          marginBottom: '24px',
          overflow: 'hidden'
        }}
      >
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
                color: '#0284c7',
                border: '2px solid white',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
              }}
            >
              {initials}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.015em' }}>
                  {student.name}
                </h2>
                <span
                  style={{
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: 700,
                    background: isActive ? '#dcfce7' : '#fee2e2',
                    color: isActive ? '#15803d' : '#b91c1c'
                  }}
                >
                  {isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div style={{ fontSize: '14px', color: '#64748b', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span><strong>Student ID:</strong> {student.accountNumber || student.id}</span>
                <span>•</span>
                <span>{student.department || 'College of Industrial Technology (CIT)'}</span>
                <span>•</span>
                <span>{student.yearLevel || 'Postgraduate'}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons with fully circular pill shapes matching Image 2 */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onEdit(student)}
              style={{
                background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '9px 24px',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)'
              }}
            >
              Edit Record
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onPrint ? onPrint(student) : window.print()}
              style={{
                background: 'rgba(255, 255, 255, 0.85)',
                color: '#0f172a',
                border: '1px solid #cbd5e1',
                padding: '9px 20px',
                borderRadius: '9999px',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
              }}
            >
              Print SIS
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                const confirmed = window.confirm('Reset password to Student ID?');
                if (confirmed) {
                  alert(`Password has been reset to Student ID (${student.accountNumber || student.id}).`);
                }
              }}
              style={{
                background: 'transparent',
                color: '#0284c7',
                border: 'none',
                borderRadius: '9999px',
                padding: '9px 14px',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Reset Password
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => onDelete(student)}
              style={{
                background: 'transparent',
                color: '#ef4444',
                border: 'none',
                borderRadius: '9999px',
                padding: '9px 14px',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Delete Record
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.85fr) minmax(0, 1fr)', gap: '24px', alignItems: 'start' }}>
        {/* Left Column: Personal, Family & References */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* I. Personal & Demographic Details Card */}
          <div
            className="card glass-card"
            style={{
              background: 'rgba(255, 255, 255, 0.62)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.9)',
              boxShadow: '0 14px 36px -6px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
              overflow: 'hidden'
            }}
          >
            <div style={{ padding: '24px 26px 16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.01em' }}>
                I. Personal & Demographic Details
              </h3>
            </div>

            <div className="card-body" style={{ padding: 0 }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: '14px' }}>
                  <tbody>
                    <tr>
                      <td style={{ width: '25%', padding: '16px 22px', fontWeight: 600, background: '#ffffff', color: '#475569', borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }}>First Name:</td>
                      <td style={{ width: '25%', padding: '16px 22px', background: 'transparent', color: '#0f172a', borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }}>{student.firstName || student.name?.split(' ')[0] || '—'}</td>
                      <td style={{ width: '25%', padding: '16px 22px', fontWeight: 600, background: '#ffffff', color: '#475569', borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }}>Middle Name:</td>
                      <td style={{ width: '25%', padding: '16px 22px', background: 'transparent', color: '#0f172a', borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }}>{student.middleName || '—'}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '16px 22px', fontWeight: 600, background: '#ffffff', color: '#475569', borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }}>Last Name:</td>
                      <td style={{ padding: '16px 22px', background: 'transparent', color: '#0f172a', borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }}>{student.lastName || student.name?.split(' ').slice(-1)[0] || '—'}</td>
                      <td style={{ padding: '16px 22px', fontWeight: 600, background: '#ffffff', color: '#475569', borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }}>Extension (Suffix):</td>
                      <td style={{ padding: '16px 22px', background: 'transparent', color: '#0f172a', borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }}>{student.extensionName || '—'}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '16px 22px', fontWeight: 600, background: '#ffffff', color: '#475569', borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }}>Civil Status:</td>
                      <td style={{ padding: '16px 22px', background: 'transparent', color: '#0f172a', borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }}>{student.civilStatus || 'Single'}</td>
                      <td style={{ padding: '16px 22px', fontWeight: 600, background: '#ffffff', color: '#475569', borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }}>Birthdate & Age:</td>
                      <td style={{ padding: '16px 22px', background: 'transparent', color: '#0f172a', borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }}>{bdayAndAge}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '16px 22px', fontWeight: 600, background: '#ffffff', color: '#475569', borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }}>Permanent Address:</td>
                      <td colSpan={3} style={{ padding: '16px 22px', background: 'transparent', color: '#0f172a', borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }}>{student.address || '—'}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '16px 22px', fontWeight: 600, background: '#ffffff', color: '#475569', borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }}>Mobile Number:</td>
                      <td style={{ padding: '16px 22px', background: 'transparent', color: '#0f172a', borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }}>{student.contact || '—'}</td>
                      <td style={{ padding: '16px 22px', fontWeight: 600, background: '#ffffff', color: '#475569', borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }}>Email Address:</td>
                      <td style={{ padding: '16px 22px', background: 'transparent', color: '#0f172a', borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }}>{student.email || '—'}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '16px 22px', fontWeight: 600, background: '#ffffff', color: '#475569' }}>Occupation:</td>
                      <td style={{ padding: '16px 22px', background: 'transparent', color: '#0f172a' }}>{student.occupation || 'Student'}</td>
                      <td style={{ padding: '16px 22px', fontWeight: 600, background: '#ffffff', color: '#475569' }}>Employer:</td>
                      <td style={{ padding: '16px 22px', background: 'transparent', color: '#0f172a' }}>{student.employer || '—'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* II. Family Background & Dependents Card */}
          <div
            className="card glass-card"
            style={{
              background: 'rgba(255, 255, 255, 0.62)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.9)',
              boxShadow: '0 14px 36px -6px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
              overflow: 'hidden'
            }}
          >
            <div style={{ padding: '24px 26px 16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.01em' }}>
                II. Family Background & Dependents
              </h3>
            </div>

            <div className="card-body" style={{ padding: 0 }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: '14px' }}>
                  <tbody>
                    <tr>
                      <td style={{ width: '25%', padding: '16px 22px', fontWeight: 600, background: '#ffffff', color: '#475569', borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }}>Father's Name:</td>
                      <td style={{ width: '25%', padding: '16px 22px', background: 'transparent', color: '#0f172a', borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }}>{student.fatherName || '—'}</td>
                      <td style={{ width: '25%', padding: '16px 22px', fontWeight: 600, background: '#ffffff', color: '#475569', borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }}>Mother's Maiden Name:</td>
                      <td style={{ width: '25%', padding: '16px 22px', background: 'transparent', color: '#0f172a', borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }}>{student.motherName || '—'}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '16px 22px', fontWeight: 600, background: '#ffffff', color: '#475569' }}>Spouse Name:</td>
                      <td style={{ padding: '16px 22px', background: 'transparent', color: '#0f172a' }}>{student.spouseName || '—'}</td>
                      <td style={{ padding: '16px 22px', fontWeight: 600, background: '#ffffff', color: '#475569' }}>Spouse Occupation:</td>
                      <td style={{ padding: '16px 22px', background: 'transparent', color: '#0f172a' }}>{student.spouseOccupation || '—'}</td>
                    </tr>
                  </tbody>
                </table>

                <div style={{ padding: '20px 26px', borderTop: '1px solid rgba(226, 232, 240, 0.5)' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Registered Children / Dependents:
                  </div>
                  <div style={{ fontSize: '13px', color: '#94a3b8', fontStyle: 'italic' }}>
                    No dependents registered.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* III. Character / Faculty References Card */}
          <div
            className="card glass-card"
            style={{
              background: 'rgba(255, 255, 255, 0.62)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.9)',
              boxShadow: '0 14px 36px -6px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
              overflow: 'hidden'
            }}
          >
            <div style={{ padding: '24px 26px 16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.01em' }}>
                III. Character / Faculty References
              </h3>
            </div>

            <div className="card-body" style={{ padding: 0 }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: '14px' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '14px 22px', textAlign: 'left', fontSize: '12px', fontWeight: 800, color: '#475569', background: 'rgba(241, 245, 249, 0.8)', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #e2e8f0' }}>REFERENCE NAME</th>
                      <th style={{ padding: '14px 22px', textAlign: 'left', fontSize: '12px', fontWeight: 800, color: '#475569', background: 'rgba(241, 245, 249, 0.8)', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #e2e8f0' }}>RELATIONSHIP / AFFILIATION</th>
                      <th style={{ padding: '14px 22px', textAlign: 'left', fontSize: '12px', fontWeight: 800, color: '#475569', background: 'rgba(241, 245, 249, 0.8)', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #e2e8f0' }}>CONTACT NUMBER</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '16px 22px', fontWeight: 600, color: '#0f172a', borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }}>Faculty Adviser</td>
                      <td style={{ padding: '16px 22px', color: '#475569', borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }}>Faculty / Instructor</td>
                      <td style={{ padding: '16px 22px', color: '#475569', borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }}>09170000000</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '16px 22px', fontWeight: 600, color: '#0f172a' }}>Department Chair</td>
                      <td style={{ padding: '16px 22px', color: '#475569' }}>College Department</td>
                      <td style={{ padding: '16px 22px', color: '#475569' }}>09180000000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Account Status & Survey Activity History */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Account Status Card matching Image 3 and crop_account_status.png */}
          <div
            className="card glass-card"
            style={{
              background: 'rgba(255, 255, 255, 0.62)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.9)',
              boxShadow: '0 14px 36px -6px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
              overflow: 'hidden'
            }}
          >
            <div style={{ padding: '24px 26px 16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.01em' }}>
                Account Status
              </h3>
            </div>

            <div className="card-body" style={{ padding: '0 26px 22px 26px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', fontSize: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(226, 232, 240, 0.45)' }}>
                  <span style={{ width: '160px', color: '#475569', fontWeight: 600, flexShrink: 0 }}>Status:</span>
                  <span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 14px', borderRadius: '9999px', fontSize: '12px', fontWeight: 700, background: '#dcfce7', color: '#15803d' }}>
                      {isActive ? 'Active' : 'Inactive'}
                    </span>
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(226, 232, 240, 0.45)' }}>
                  <span style={{ width: '160px', color: '#475569', fontWeight: 600, flexShrink: 0 }}>Must Change PW:</span>
                  <span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 14px', borderRadius: '9999px', fontSize: '12px', fontWeight: 700, background: '#dcfce7', color: '#15803d' }}>
                      {isCompletedPW ? 'No (Completed)' : 'Yes (Required)'}
                    </span>
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(226, 232, 240, 0.45)' }}>
                  <span style={{ width: '160px', color: '#475569', fontWeight: 600, flexShrink: 0 }}>Failed Attempts:</span>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>0</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(226, 232, 240, 0.45)' }}>
                  <span style={{ width: '160px', color: '#475569', fontWeight: 600, flexShrink: 0 }}>Account Created:</span>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{student.createdAt || 'Aug 24, 2026'}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0' }}>
                  <span style={{ width: '160px', color: '#475569', fontWeight: 600, flexShrink: 0 }}>Last Profile Update:</span>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{student.updatedAt || 'Aug 24, 2026 11:06 AM'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Survey Activity History Card */}
          <div
            className="card glass-card"
            style={{
              background: 'rgba(255, 255, 255, 0.62)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.9)',
              boxShadow: '0 14px 36px -6px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
              overflow: 'hidden'
            }}
          >
            <div style={{ padding: '24px 26px 16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.01em' }}>
                Survey Activity History
              </h3>
            </div>

            <div className="card-body" style={{ textAlign: 'center', padding: '44px 20px 54px' }}>
              <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '16px' }}>No submissions</div>
              <p style={{ color: '#64748b', fontSize: '14px', margin: '6px 0 0 0' }}>No survey responses submitted yet.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div style={{ marginTop: '24px' }}>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onBack}
          style={{
            background: '#ffffff',
            color: '#0f172a',
            border: '1px solid #cbd5e1',
            padding: '9px 22px',
            borderRadius: '9999px',
            fontWeight: 600,
            fontSize: '13px',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
          }}
        >
          ← Back to Registry
        </button>
      </div>
    </div>
  );
}
