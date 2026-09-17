import React, { useState } from 'react';
import { DEPARTMENTS, CIVIL_STATUSES, YEAR_LEVELS } from '../data/initialStudents';

export default function StudentAdd({ onSave, onCancel, existingStudents = [] }) {
  const [formData, setFormData] = useState({
    studentNumber: '',
    firstName: '',
    middleName: '',
    lastName: '',
    extensionName: '',
    civilStatus: 'Single',
    birthdate: '',
    address: '',
    department: '',
    yearLevel: '1st Year',
    contact: '',
    contactInfo: '',
    email: '',
    status: 'active'
  });

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const sNumber = formData.studentNumber.trim();
    const fName = formData.firstName.trim();
    const lName = formData.lastName.trim();

    if (!sNumber || !fName || !lName) {
      setError('Student ID Number, First Name, and Last Name are required.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Check duplicate student number
    if (existingStudents.some((s) => (s.accountNumber === sNumber || s.id === sNumber || s.studentNumber === sNumber))) {
      setError('A student with this ID Number already exists.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const fullNameParts = [fName, formData.middleName.trim(), lName, formData.extensionName.trim()].filter(Boolean);
    const fullName = fullNameParts.join(' ');

    // Calculate age from birthdate
    let computedAge = 0;
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
      id: sNumber,
      accountNumber: sNumber,
      studentNumber: sNumber,
      name: fullName,
      firstName: fName,
      middleName: formData.middleName.trim(),
      lastName: lName,
      extensionName: formData.extensionName.trim(),
      civilStatus: formData.civilStatus,
      birthdate: formData.birthdate || null,
      age: computedAge || 20,
      address: formData.address.trim(),
      department: formData.department || 'College of Industrial Technology (CIT)',
      yearLevel: formData.yearLevel || '1st Year',
      contact: formData.contact.trim(),
      contactInfo: formData.contactInfo.trim(),
      email: formData.email.trim(),
      occupation: 'Student',
      employer: '',
      status: 'active',
      lastUpdated: 'Just now',
      createdAt: 'Today',
      updatedAt: 'Just now'
    });
  };

  return (
    <div className="student-add-page" style={{ width: '100%', maxWidth: '800px' }}>
      {/* Breadcrumbs */}
      <div
        className="breadcrumbs"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '13.5px',
          fontWeight: 600,
          marginBottom: '18px'
        }}
      >
        <div className="breadcrumb-item">
          <span style={{ color: '#0284c7', cursor: 'pointer' }} onClick={onCancel}>Dashboard</span>
        </div>
        <span className="breadcrumb-separator" style={{ color: '#94a3b8' }}>▸</span>
        <div className="breadcrumb-item">
          <span style={{ color: '#0284c7', cursor: 'pointer' }} onClick={onCancel}>Student Registry</span>
        </div>
        <span className="breadcrumb-separator" style={{ color: '#94a3b8' }}>▸</span>
        <div className="breadcrumb-item active" style={{ color: '#64748b' }}>
          Add Student
        </div>
      </div>

      {/* Main Glass Form Card matching Image 1 & 2 */}
      <div
        className="card glass-card"
        style={{
          background: 'rgba(255, 255, 255, 0.78)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.95)',
          boxShadow: '0 14px 36px -6px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
          overflow: 'hidden'
        }}
      >
        {/* Card Header with Left Title and Right Description matching Image 1 */}
        <div
          className="card-header"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '22px 28px',
            borderBottom: '1px solid rgba(226, 232, 240, 0.75)',
            background: 'transparent',
            gap: '20px'
          }}
        >
          <div style={{ flex: '1 1 auto', maxWidth: '340px' }}>
            <h2
              className="card-title"
              style={{
                fontSize: '18px',
                fontWeight: 800,
                color: '#0f172a',
                letterSpacing: '-0.015em',
                margin: 0,
                lineHeight: 1.35
              }}
            >
              Add New Student Account &amp; Registry Record
            </h2>
          </div>
          <p
            style={{
              fontSize: '13px',
              color: '#64748b',
              margin: 0,
              textAlign: 'right',
              flex: '1 1 auto',
              maxWidth: '380px',
              lineHeight: 1.45
            }}
          >
            Creates the student profile. Default password will equal the Student ID Number.
          </p>
        </div>

        {/* Card Body with Clean Form */}
        <div className="card-body" style={{ padding: '26px 28px 32px 28px' }}>
          {error && (
            <div
              className="alert alert-error"
              style={{
                padding: '12px 18px',
                background: '#fee2e2',
                color: '#b91c1c',
                borderRadius: '12px',
                fontSize: '13.5px',
                fontWeight: 600,
                marginBottom: '22px',
                border: '1px solid #fecaca'
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Student ID / Account Number */}
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label
                htmlFor="student_number"
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: '7px'
                }}
              >
                Student ID / Account Number <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                id="student_number"
                name="student_number"
                className="form-input"
                placeholder="e.g. STU-2024-006"
                value={formData.studentNumber}
                onChange={(e) => {
                  setFormData({ ...formData, studentNumber: e.target.value });
                  if (error) setError('');
                }}
                required
                autoFocus
                style={{
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '12px',
                  padding: '11px 16px',
                  fontSize: '14px',
                  color: '#0f172a',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                Used as login username. Initial default password will equal this ID.
              </div>
            </div>

            {/* Names Breakdown: 4 columns */}
            <div
              className="form-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr 1.2fr 0.6fr',
                gap: '14px',
                marginBottom: '20px'
              }}
            >
              <div>
                <label
                  htmlFor="first_name"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: '7px'
                  }}
                >
                  First Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  className="form-input"
                  placeholder="e.g. Juan"
                  value={formData.firstName}
                  onChange={(e) => {
                    setFormData({ ...formData, firstName: e.target.value });
                    if (error) setError('');
                  }}
                  required
                  style={{
                    width: '100%',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '11px 16px',
                    fontSize: '14px',
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="middle_name"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: '7px'
                  }}
                >
                  Middle Name
                </label>
                <input
                  type="text"
                  id="middle_name"
                  name="middle_name"
                  className="form-input"
                  placeholder="e.g. Santos"
                  value={formData.middleName}
                  onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '11px 16px',
                    fontSize: '14px',
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="last_name"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: '7px'
                  }}
                >
                  Last Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="form-input"
                  placeholder="e.g. Dela Cruz"
                  value={formData.lastName}
                  onChange={(e) => {
                    setFormData({ ...formData, lastName: e.target.value });
                    if (error) setError('');
                  }}
                  required
                  style={{
                    width: '100%',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '11px 16px',
                    fontSize: '14px',
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="extension_name"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: '7px'
                  }}
                >
                  Ext
                </label>
                <input
                  type="text"
                  id="extension_name"
                  name="extension_name"
                  className="form-input"
                  placeholder="e.g. Jr."
                  value={formData.extensionName}
                  onChange={(e) => setFormData({ ...formData, extensionName: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '11px 16px',
                    fontSize: '14px',
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Civil Status & Birthdate: 2 columns */}
            <div
              className="form-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '20px'
              }}
            >
              <div>
                <label
                  htmlFor="civil_status"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: '7px'
                  }}
                >
                  Civil Status <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select
                  id="civil_status"
                  name="civil_status"
                  className="form-select"
                  value={formData.civilStatus}
                  onChange={(e) => setFormData({ ...formData, civilStatus: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '11px 16px',
                    fontSize: '14px',
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  {CIVIL_STATUSES.map((cs) => (
                    <option key={cs} value={cs}>{cs}</option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="birthdate"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: '7px'
                  }}
                >
                  Birthdate
                </label>
                <input
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  className="form-input"
                  value={formData.birthdate}
                  onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                  min="1900-01-01"
                  max="2030-12-31"
                  style={{
                    width: '100%',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '11px 16px',
                    fontSize: '14px',
                    color: formData.birthdate ? '#0f172a' : '#64748b',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Permanent Address */}
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label
                htmlFor="address"
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: '7px'
                }}
              >
                Permanent Address
              </label>
              <textarea
                id="address"
                name="address"
                className="form-textarea"
                rows={2}
                placeholder="e.g. Malolos, Bulacan"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '12px',
                  padding: '11px 16px',
                  fontSize: '14px',
                  color: '#0f172a',
                  outline: 'none',
                  boxSizing: 'border-box',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Department and Year Level: 2 columns */}
            <div
              className="form-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '20px'
              }}
            >
              <div>
                <label
                  htmlFor="department"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: '7px'
                  }}
                >
                  Department / College
                </label>
                <select
                  id="department"
                  name="department"
                  className="form-select"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '11px 16px',
                    fontSize: '14px',
                    color: formData.department ? '#0f172a' : '#64748b',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="" disabled>Select College</option>
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="year_level"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: '7px'
                  }}
                >
                  Year Level
                </label>
                <select
                  id="year_level"
                  name="year_level"
                  className="form-select"
                  value={formData.yearLevel}
                  onChange={(e) => setFormData({ ...formData, yearLevel: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '11px 16px',
                    fontSize: '14px',
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  {YEAR_LEVELS.map((yl) => (
                    <option key={yl} value={yl}>{yl}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Contact & Additional Contact Info: 2 columns */}
            <div
              className="form-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '20px'
              }}
            >
              <div>
                <label
                  htmlFor="contact_number"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: '7px'
                  }}
                >
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="contact_number"
                  name="contact_number"
                  className="form-input"
                  placeholder="e.g. 09171234567"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '11px 16px',
                    fontSize: '14px',
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact_info"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: '7px'
                  }}
                >
                  Additional Contact Info
                </label>
                <input
                  type="text"
                  id="contact_info"
                  name="contact_info"
                  className="form-input"
                  placeholder="e.g. Alternate phone, Facebook URL"
                  value={formData.contactInfo}
                  onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '11px 16px',
                    fontSize: '14px',
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Email Address: spans 50% matching Image 2 */}
            <div
              className="form-row"
              style={{
                maxWidth: 'calc(50% - 8px)',
                marginBottom: '28px'
              }}
            >
              <div className="form-group" style={{ width: '100%' }}>
                <label
                  htmlFor="email"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: '7px'
                  }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="e.g. student@bulsu.edu.ph"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (error) setError('');
                  }}
                  style={{
                    width: '100%',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '11px 16px',
                    fontSize: '14px',
                    color: '#0f172a',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Buttons matching Image 2 */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '11px 26px',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
                  transition: 'all 0.2s ease'
                }}
              >
                Create Student Account
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
                style={{
                  background: '#ffffff',
                  color: '#0f172a',
                  border: '1px solid #cbd5e1',
                  padding: '11px 26px',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.2s ease'
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
