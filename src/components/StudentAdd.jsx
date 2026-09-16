import React, { useState } from 'react';
import { DEPARTMENTS, CIVIL_STATUSES, YEAR_LEVELS } from '../data/initialStudents';

export default function StudentAdd({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    studentNumber: `STU-2024-${String(Math.floor(100 + Math.random() * 900))}`,
    firstName: '',
    middleName: '',
    lastName: '',
    extensionName: '',
    civilStatus: 'Single',
    birthdate: '2004-05-15',
    address: 'City of Malolos, Bulacan',
    department: DEPARTMENTS[5], // CICT
    yearLevel: '1st Year',
    contact: '',
    contactInfo: '',
    email: '',
    status: 'active'
  });

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studentNumber.trim()) {
      setError('Student ID Number is required.');
      return;
    }
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('First Name and Last Name are required.');
      return;
    }

    const fullNameParts = [formData.firstName, formData.middleName, formData.lastName, formData.extensionName].filter(Boolean);
    const fullName = fullNameParts.join(' ');

    // Calculate age from birthdate
    let computedAge = 20;
    if (formData.birthdate) {
      const birth = new Date(formData.birthdate);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      computedAge = Math.max(0, age);
    }

    onSave({
      id: formData.studentNumber,
      accountNumber: formData.studentNumber,
      studentNumber: formData.studentNumber,
      name: fullName,
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      extensionName: formData.extensionName,
      civilStatus: formData.civilStatus,
      birthdate: formData.birthdate,
      age: computedAge,
      address: formData.address,
      department: formData.department,
      yearLevel: formData.yearLevel,
      contact: formData.contact,
      contactInfo: formData.contactInfo,
      email: formData.email,
      status: formData.status,
      lastUpdated: 'Just now',
      createdAt: 'Today',
      updatedAt: 'Just now'
    });
  };

  return (
    <div className="student-add-page" style={{ maxWidth: '850px', margin: '0 auto' }}>
      {/* Breadcrumbs */}
      <div className="breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', marginBottom: '16px' }}>
        <div className="breadcrumb-item">
          <span style={{ color: '#0284c7', cursor: 'pointer', fontWeight: 600 }} onClick={onCancel}>Dashboard</span>
        </div>
        <span className="breadcrumb-separator" style={{ color: '#94a3b8' }}>▸</span>
        <div className="breadcrumb-item">
          <span style={{ color: '#0284c7', cursor: 'pointer', fontWeight: 600 }} onClick={onCancel}>Student Registry</span>
        </div>
        <span className="breadcrumb-separator" style={{ color: '#94a3b8' }}>▸</span>
        <div className="breadcrumb-item active" style={{ color: '#64748b', fontWeight: 600 }}>
          Add Student
        </div>
      </div>

      {/* Main Glass Form Card */}
      <div
        className="card glass-card"
        style={{
          background: 'rgba(255, 255, 255, 0.78)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.9)',
          boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.08)',
          overflow: 'hidden'
        }}
      >
        <div style={{ padding: '24px 28px', borderBottom: '1px solid #f1f5f9', background: 'rgba(248, 250, 252, 0.5)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
            Add New Student Account & Registry Record
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            Creates the student profile. Default password will equal the Student ID Number.
          </p>
        </div>

        <div style={{ padding: '28px 32px' }}>
          {error && (
            <div style={{ padding: '12px 16px', background: '#fee2e2', color: '#b91c1c', borderRadius: '10px', fontSize: '13px', fontWeight: 600, marginBottom: '20px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Student ID / Account Number */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Student ID / Account Number <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. STU-2024-006"
                value={formData.studentNumber}
                onChange={(e) => setFormData({ ...formData, studentNumber: e.target.value })}
                required
                style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1' }}
              />
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                Used as login username. Initial default password will equal this ID.
              </div>
            </div>

            {/* Names Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.2fr 0.6fr', gap: '14px', marginBottom: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  First Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Juan"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Middle Name
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Santos"
                  value={formData.middleName}
                  onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                  style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Last Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Dela Cruz"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                  style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Ext
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Jr."
                  value={formData.extensionName}
                  onChange={(e) => setFormData({ ...formData, extensionName: e.target.value })}
                  style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1' }}
                />
              </div>
            </div>

            {/* Civil Status & Birthdate */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Civil Status <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select
                  className="form-select"
                  value={formData.civilStatus}
                  onChange={(e) => setFormData({ ...formData, civilStatus: e.target.value })}
                  required
                  style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1' }}
                >
                  {CIVIL_STATUSES.map((cs) => (
                    <option key={cs} value={cs}>{cs}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Birthdate
                </label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.birthdate}
                  onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                  style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1' }}
                />
              </div>
            </div>

            {/* Address */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Permanent Address
              </label>
              <textarea
                className="form-textarea"
                rows={2}
                placeholder="e.g. Malolos, Bulacan"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1', resize: 'vertical' }}
              />
            </div>

            {/* Department & Year Level */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Department / College
                </label>
                <select
                  className="form-select"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1' }}
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Year Level
                </label>
                <select
                  className="form-select"
                  value={formData.yearLevel}
                  onChange={(e) => setFormData({ ...formData, yearLevel: e.target.value })}
                  style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1' }}
                >
                  {YEAR_LEVELS.map((yl) => (
                    <option key={yl} value={yl}>{yl}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Contact & Additional Contact Info */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Mobile Number
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 09171234567"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Additional Contact Info
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Alternate phone, Facebook URL"
                  value={formData.contactInfo}
                  onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                  style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1' }}
                />
              </div>
            </div>

            {/* Email Address */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Email Address
              </label>
              <input
                type="email"
                className="form-input"
                placeholder="e.g. student@bulsu.edu.ph"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1' }}
              />
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '14px', marginTop: '24px' }}>
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{
                  background: '#0284c7',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 28px',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(2, 132, 199, 0.3)'
                }}
              >
                Create Student Account
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={onCancel}
                style={{
                  background: '#ffffff',
                  color: '#0f172a',
                  border: '1px solid #cbd5e1',
                  padding: '12px 24px',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
