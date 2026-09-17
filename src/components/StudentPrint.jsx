import React from 'react';

export default function StudentPrint({ student, onBack }) {
  if (!student) return null;

  // Format birthdate
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
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="print-preview-container" style={{ minHeight: '100vh', background: '#f1f5f9', margin: '-18px', padding: '0 0 40px 0' }}>
      {/* Top Black Navigation Bar matching Image 2 */}
      <div
        className="no-print-bar"
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          background: '#0f172a',
          color: '#ffffff',
          padding: '12px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}
      >
        <button
          type="button"
          onClick={onBack}
          style={{
            color: '#94a3b8',
            background: 'transparent',
            border: 'none',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            padding: '6px 10px'
          }}
        >
          ← Back to Student Record
        </button>

        <div style={{ fontWeight: 700, fontSize: '14px', color: '#ffffff', letterSpacing: '0.02em' }}>
          Administrator SIS Print Preview
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          style={{
            background: '#0284c7',
            color: '#ffffff',
            border: 'none',
            padding: '8px 18px',
            fontWeight: 700,
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px',
            boxShadow: '0 2px 6px rgba(2, 132, 199, 0.4)'
          }}
        >
          Print / Save as PDF
        </button>
      </div>

      {/* Spacing for preview */}
      <div style={{ height: '30px' }} />

      {/* Official White A4 Document Sheet matching Image 2 & print.php */}
      <div
        className="print-page"
        style={{
          maxWidth: '820px',
          margin: '0 auto',
          background: '#ffffff',
          padding: '40px 48px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          borderRadius: '8px',
          color: '#1e293b',
          fontFamily: "'Inter', sans-serif"
        }}
      >
        {/* Institutional Header */}
        <div style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '14px', marginBottom: '20px' }}>
          <div style={{ fontSize: '16pt', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a' }}>
            BULACAN STATE UNIVERSITY
          </div>
          <div style={{ fontSize: '11pt', fontWeight: 600, color: '#334155', marginTop: '3px' }}>
            College of Information and Communications Technology
          </div>
          <div style={{ fontSize: '13pt', fontWeight: 800, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '8px' }}>
            OFFICIAL STUDENT INFORMATION SHEET (SIS)
          </div>
          <div style={{ fontSize: '9pt', color: '#64748b', marginTop: '4px' }}>
            Student Records & Registry Dossier • Generated on {currentDate}
          </div>
        </div>

        {/* Identification / Meta Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: '20px', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10pt' }}>
              <tbody>
                <tr>
                  <td style={{ width: '35%', padding: '6px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', fontWeight: 600, color: '#475569' }}>
                    Student ID / Account:
                  </td>
                  <td style={{ width: '65%', padding: '6px 10px', border: '1px solid #e2e8f0', fontWeight: 700, color: '#0369a1', fontSize: '11pt' }}>
                    {student.accountNumber || student.id}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', fontWeight: 600, color: '#475569' }}>
                    Full Name:
                  </td>
                  <td style={{ padding: '6px 10px', border: '1px solid #e2e8f0', fontWeight: 700, color: '#0f172a' }}>
                    {student.name}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', fontWeight: 600, color: '#475569' }}>
                    College / Dept:
                  </td>
                  <td style={{ padding: '6px 10px', border: '1px solid #e2e8f0', color: '#0f172a' }}>
                    {student.department || 'College of Industrial Technology (CIT)'}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', fontWeight: 600, color: '#475569' }}>
                    Year Level:
                  </td>
                  <td style={{ padding: '6px 10px', border: '1px solid #e2e8f0', color: '#0f172a' }}>
                    {student.yearLevel || 'Postgraduate'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 2x2 Photo Box */}
          <div
            style={{
              width: '120px',
              height: '120px',
              border: '2px solid #0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f1f5f9',
              flexShrink: 0,
              textAlign: 'center',
              fontSize: '10pt',
              fontWeight: 700,
              color: '#64748b'
            }}
          >
            2×2 ID PHOTO
          </div>
        </div>

        {/* Section I: Personal Information */}
        <div
          style={{
            background: '#f1f5f9',
            borderLeft: '4px solid #0369a1',
            padding: '5px 12px',
            fontSize: '10.5pt',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#0f172a',
            margin: '16px 0 8px 0'
          }}
        >
          I. PERSONAL INFORMATION
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10pt', marginBottom: '14px' }}>
          <tbody>
            <tr>
              <td style={{ width: '25%', padding: '6px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', fontWeight: 600, color: '#475569' }}>Last Name:</td>
              <td style={{ width: '25%', padding: '6px 10px', border: '1px solid #e2e8f0', color: '#0f172a' }}>{student.lastName || student.name?.split(' ').slice(-1)[0] || '—'}</td>
              <td style={{ width: '25%', padding: '6px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', fontWeight: 600, color: '#475569' }}>First Name:</td>
              <td style={{ width: '25%', padding: '6px 10px', border: '1px solid #e2e8f0', color: '#0f172a' }}>{student.firstName || student.name?.split(' ')[0] || '—'}</td>
            </tr>
            <tr>
              <td style={{ padding: '6px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', fontWeight: 600, color: '#475569' }}>Middle Name:</td>
              <td style={{ padding: '6px 10px', border: '1px solid #e2e8f0', color: '#0f172a' }}>{student.middleName || '—'}</td>
              <td style={{ padding: '6px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', fontWeight: 600, color: '#475569' }}>Extension Name:</td>
              <td style={{ padding: '6px 10px', border: '1px solid #e2e8f0', color: '#0f172a' }}>{student.extensionName || '—'}</td>
            </tr>
            <tr>
              <td style={{ padding: '6px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', fontWeight: 600, color: '#475569' }}>Civil Status:</td>
              <td style={{ padding: '6px 10px', border: '1px solid #e2e8f0', color: '#0f172a' }}>{student.civilStatus || 'Single'}</td>
              <td style={{ padding: '6px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', fontWeight: 600, color: '#475569' }}>Birthdate & Age:</td>
              <td style={{ padding: '6px 10px', border: '1px solid #e2e8f0', color: '#0f172a' }}>{bdayAndAge}</td>
            </tr>
            <tr>
              <td style={{ padding: '6px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', fontWeight: 600, color: '#475569' }}>Permanent Address:</td>
              <td colSpan={3} style={{ padding: '6px 10px', border: '1px solid #e2e8f0', color: '#0f172a' }}>{student.address || '—'}</td>
            </tr>
            <tr>
              <td style={{ padding: '6px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', fontWeight: 600, color: '#475569' }}>Contact Number:</td>
              <td style={{ padding: '6px 10px', border: '1px solid #e2e8f0', color: '#0f172a' }}>{student.contact || '—'}</td>
              <td style={{ padding: '6px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', fontWeight: 600, color: '#475569' }}>Email Address:</td>
              <td style={{ padding: '6px 10px', border: '1px solid #e2e8f0', color: '#0f172a' }}>{student.email || '—'}</td>
            </tr>
            <tr>
              <td style={{ padding: '6px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', fontWeight: 600, color: '#475569' }}>Occupation:</td>
              <td style={{ padding: '6px 10px', border: '1px solid #e2e8f0', color: '#0f172a' }}>{student.occupation || 'Student'}</td>
              <td style={{ padding: '6px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', fontWeight: 600, color: '#475569' }}>Employer:</td>
              <td style={{ padding: '6px 10px', border: '1px solid #e2e8f0', color: '#0f172a' }}>{student.employer || '—'}</td>
            </tr>
          </tbody>
        </table>

        {/* Section II: Family Background & Dependents */}
        <div
          style={{
            background: '#f1f5f9',
            borderLeft: '4px solid #0369a1',
            padding: '5px 12px',
            fontSize: '10.5pt',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#0f172a',
            margin: '16px 0 8px 0'
          }}
        >
          II. FAMILY BACKGROUND & DEPENDENTS
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10pt', marginBottom: '8px' }}>
          <tbody>
            <tr>
              <td style={{ width: '25%', padding: '6px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', fontWeight: 600, color: '#475569' }}>Father's Name:</td>
              <td style={{ width: '25%', padding: '6px 10px', border: '1px solid #e2e8f0', color: '#0f172a' }}>{student.fatherName || '—'}</td>
              <td style={{ width: '25%', padding: '6px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', fontWeight: 600, color: '#475569' }}>Mother's Maiden Name:</td>
              <td style={{ width: '25%', padding: '6px 10px', border: '1px solid #e2e8f0', color: '#0f172a' }}>{student.motherName || '—'}</td>
            </tr>
            <tr>
              <td style={{ padding: '6px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', fontWeight: 600, color: '#475569' }}>Spouse Name:</td>
              <td style={{ padding: '6px 10px', border: '1px solid #e2e8f0', color: '#0f172a' }}>{student.spouseName || '—'}</td>
              <td style={{ padding: '6px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', fontWeight: 600, color: '#475569' }}>Spouse Occupation:</td>
              <td style={{ padding: '6px 10px', border: '1px solid #e2e8f0', color: '#0f172a' }}>{student.spouseOccupation || '—'}</td>
            </tr>
          </tbody>
        </table>

        {/* Children / Dependents */}
        <div style={{ fontSize: '9.5pt', fontWeight: 700, color: '#334155', margin: '6px 0 2px 0' }}>
          Children / Dependents:
        </div>
        {student.dependents && student.dependents.filter((d) => d.name && d.name.trim()).length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9.5pt', marginBottom: '14px' }}>
            <thead>
              <tr style={{ background: '#f1f5f9' }}>
                <th style={{ width: '70%', padding: '6px 10px', border: '1px solid #cbd5e1', textAlign: 'left', fontWeight: 700 }}>
                  Child / Dependent Full Name
                </th>
                <th style={{ width: '30%', padding: '6px 10px', border: '1px solid #cbd5e1', textAlign: 'left', fontWeight: 700 }}>
                  Age
                </th>
              </tr>
            </thead>
            <tbody>
              {student.dependents.filter((d) => d.name && d.name.trim()).map((dep, idx) => (
                <tr key={idx}>
                  <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1' }}>{dep.name}</td>
                  <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1' }}>{dep.age} years old</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ fontSize: '9pt', color: '#64748b', fontStyle: 'italic', marginBottom: '14px', padding: '4px 0' }}>
            No dependents registered.
          </div>
        )}

        {/* Section III: Character / Member References */}
        <div
          style={{
            background: '#f1f5f9',
            borderLeft: '4px solid #0369a1',
            padding: '5px 12px',
            fontSize: '10.5pt',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#0f172a',
            margin: '16px 0 8px 0'
          }}
        >
          III. CHARACTER / MEMBER REFERENCES
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9.5pt', marginBottom: '20px' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ width: '40%', padding: '6px 10px', border: '1px solid #cbd5e1', textAlign: 'left', fontWeight: 700 }}>
                Reference Person Full Name
              </th>
              <th style={{ width: '35%', padding: '6px 10px', border: '1px solid #cbd5e1', textAlign: 'left', fontWeight: 700 }}>
                Affiliation / Relationship
              </th>
              <th style={{ width: '25%', padding: '6px 10px', border: '1px solid #cbd5e1', textAlign: 'left', fontWeight: 700 }}>
                Contact Number
              </th>
            </tr>
          </thead>
          <tbody>
            {(student.references && student.references.length > 0
              ? student.references
              : [
                  { name: 'Faculty Adviser', affiliation: 'Faculty / Instructor', contact: '09170000000' },
                  { name: 'Department Chair', affiliation: 'College Department', contact: '09180000000' }
                ]
            ).map((ref, idx) => (
              <tr key={idx}>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1', fontWeight: 600 }}>{ref.name}</td>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1' }}>{ref.affiliation || 'Faculty / Member'}</td>
                <td style={{ padding: '6px 10px', border: '1px solid #cbd5e1' }}>{ref.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Certification Clause */}
        <div
          style={{
            fontSize: '9pt',
            color: '#475569',
            marginTop: '20px',
            padding: '10px 14px',
            background: '#f8fafc',
            borderLeft: '3px solid #cbd5e1',
            lineHeight: 1.4,
            fontStyle: 'italic'
          }}
        >
          "Official Certified Student Information Sheet from the CampusVoice Student Records System. Maintained for institutional accreditation, safety and academic records."
        </div>

        {/* Signatures */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '36px', paddingTop: '10px' }}>
          <div style={{ textAlign: 'center', width: '220px' }}>
            <div style={{ borderBottom: '1.5px solid #0f172a', marginBottom: '4px', height: '35px' }} />
            <div style={{ fontSize: '10pt', fontWeight: 700, textTransform: 'uppercase' }}>
              {student.name}
            </div>
            <div style={{ fontSize: '8.5pt', color: '#64748b' }}>
              Student / Member Signature
            </div>
          </div>

          <div style={{ textAlign: 'center', width: '220px' }}>
            <div style={{ borderBottom: '1.5px solid #0f172a', marginBottom: '4px', height: '35px' }} />
            <div style={{ fontSize: '10pt', fontWeight: 700, textTransform: 'uppercase' }}>
              AUTHORIZED REGISTRAR
            </div>
            <div style={{ fontSize: '8.5pt', color: '#64748b' }}>
              Verified & Certified by Administrator
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
