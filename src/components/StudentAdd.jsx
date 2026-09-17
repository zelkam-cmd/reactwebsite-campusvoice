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
      mustChangePassword: true,
      references: [
        { name: 'Faculty Adviser', affiliation: 'Faculty / Instructor', contact: '09170000000' },
        { name: 'Department Chair', affiliation: 'College Department', contact: '09180000000' }
      ],
      dependents: [],
      lastUpdated: 'Just now',
      createdAt: 'Today',
      updatedAt: 'Just now'
    });
  };

  return (
    <div className="student-add-page" style={{ width: '100%', maxWidth: '800px' }}>
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <div className="breadcrumb-item"><a href="#dashboard" onClick={(e) => e.preventDefault()}>Dashboard</a></div>
        <span className="breadcrumb-separator">▸</span>
        <div className="breadcrumb-item"><a href="#registry" onClick={(e) => { e.preventDefault(); onCancel(); }}>Student Registry</a></div>
        <span className="breadcrumb-separator">▸</span>
        <div className="breadcrumb-item active">Add Student</div>
      </div>

      <div style={{ maxWidth: '800px' }}>
        <div className="card glass-card">
          <div className="card-header">
            <h2 className="card-title">Add New Student Account & Registry Record</h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              Creates the student profile. Default password will equal the Student ID Number.
            </p>
          </div>
          <div className="card-body">
            {error && (
              <div className="alert alert-error" style={{ marginBottom: 'var(--space-5)' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Student ID / Account Number */}
              <div className="form-group">
                <label htmlFor="student_number" className="form-label">
                  Student ID / Account Number <span className="required">*</span>
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
                />
                <div className="form-hint" style={{ fontSize: '12px', color: '#64748B', marginTop: '6px' }}>
                  Used as login username. Initial default password will equal this ID.
                </div>
              </div>

              {/* Names Breakdown */}
              <div className="form-row" style={{ display: 'flex', gap: '14px', marginBottom: '20px' }}>
                <div className="form-group" style={{ flex: '1.2', marginBottom: 0 }}>
                  <label htmlFor="first_name" className="form-label">First Name <span className="required">*</span></label>
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
                  />
                </div>
                <div className="form-group" style={{ flex: '1', marginBottom: 0 }}>
                  <label htmlFor="middle_name" className="form-label">Middle Name</label>
                  <input
                    type="text"
                    id="middle_name"
                    name="middle_name"
                    className="form-input"
                    placeholder="e.g. Santos"
                    value={formData.middleName}
                    onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ flex: '1.2', marginBottom: 0 }}>
                  <label htmlFor="last_name" className="form-label">Last Name <span className="required">*</span></label>
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
                  />
                </div>
                <div className="form-group" style={{ flex: '0.6', marginBottom: 0 }}>
                  <label htmlFor="extension_name" className="form-label">Ext</label>
                  <input
                    type="text"
                    id="extension_name"
                    name="extension_name"
                    className="form-input"
                    placeholder="e.g. Jr."
                    value={formData.extensionName}
                    onChange={(e) => setFormData({ ...formData, extensionName: e.target.value })}
                  />
                </div>
              </div>

              {/* Civil Status & Birthdate */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="civil_status" className="form-label">Civil Status <span className="required">*</span></label>
                  <select
                    id="civil_status"
                    name="civil_status"
                    className="form-select"
                    value={formData.civilStatus}
                    onChange={(e) => setFormData({ ...formData, civilStatus: e.target.value })}
                    required
                  >
                    {CIVIL_STATUSES.map((cs) => (
                      <option key={cs} value={cs}>{cs}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="birthdate" className="form-label">Birthdate</label>
                  <input
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    className="form-input"
                    value={formData.birthdate}
                    onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                    min="1900-01-01"
                    max="2030-12-31"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="form-group">
                <label htmlFor="address" className="form-label">Permanent Address</label>
                <textarea
                  id="address"
                  name="address"
                  className="form-textarea"
                  rows={2}
                  placeholder="e.g. Malolos, Bulacan"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              {/* Department and Year Level */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="department" className="form-label">Department / College</label>
                  <select
                    id="department"
                    name="department"
                    className="form-select"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  >
                    <option value="" disabled>Select College</option>
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="year_level" className="form-label">Year Level</label>
                  <select
                    id="year_level"
                    name="year_level"
                    className="form-select"
                    value={formData.yearLevel}
                    onChange={(e) => setFormData({ ...formData, yearLevel: e.target.value })}
                  >
                    {YEAR_LEVELS.map((yl) => (
                      <option key={yl} value={yl}>{yl}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contact & Email */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact_number" className="form-label">Mobile Number</label>
                  <input
                    type="text"
                    id="contact_number"
                    name="contact_number"
                    className="form-input"
                    placeholder="e.g. 09171234567"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact_info" className="form-label">Additional Contact Info</label>
                  <input
                    type="text"
                    id="contact_info"
                    name="contact_info"
                    className="form-input"
                    placeholder="e.g. Alternate phone, Facebook URL"
                    value={formData.contactInfo}
                    onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
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
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
                <button type="submit" className="btn btn-primary btn-lg">Create Student Account</button>
                <button type="button" className="btn btn-secondary btn-lg" onClick={onCancel}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
