import React, { useState, useEffect } from 'react';
import { DEPARTMENTS, CIVIL_STATUSES, YEAR_LEVELS } from '../data/initialStudents';

export default function StudentEdit({ student, onSave, onCancel, onNavigateDashboard }) {
  const [formData, setFormData] = useState({
    accountNumber: student?.accountNumber || student?.studentNumber || student?.id || '',
    firstName: student?.firstName || student?.name?.split(' ')[0] || '',
    middleName: student?.middleName || '',
    lastName: student?.lastName || student?.name?.split(' ').slice(-1)[0] || '',
    extensionName: student?.extensionName || '',
    civilStatus: student?.civilStatus || 'Single',
    birthdate: student?.birthdate || '2003-09-01',
    computedAge: student?.age || 22,
    address: student?.address || 'City of Malolos, Bulacan',
    department: student?.department || DEPARTMENTS[6] || 'College of Industrial Technology (CIT)',
    yearLevel: student?.yearLevel || 'Postgraduate',
    contact: student?.contact || student?.contactNumber || '',
    contactInfo: student?.contactInfo || '',
    email: student?.email || '',
    occupation: student?.occupation || 'Student',
    employer: student?.employer || '',
    employerAddress: student?.employerAddress || '',
    fatherName: student?.fatherName || '',
    motherName: student?.motherName || '',
    spouseName: student?.spouseName || '',
    spouseOccupation: student?.spouseOccupation || '',
    spouseEmployer: student?.spouseEmployer || '',
    status: student?.status || 'active'
  });

  const [children, setChildren] = useState(
    student?.dependents && student.dependents.length > 0
      ? student.dependents
      : [{ name: '', age: '' }]
  );

  const [references, setReferences] = useState(
    student?.references && student.references.length > 0
      ? student.references
      : [
          { name: 'Faculty Adviser', affiliation: 'Faculty / Instructor', contact: '09170000000' },
          { name: 'Department Chair', affiliation: 'College Department', contact: '09180000000' }
        ]
  );

  const [photoPreview, setPhotoPreview] = useState(student?.avatar || null);
  const [signaturePreview, setSignaturePreview] = useState(student?.signature || null);
  const [error, setError] = useState('');

  // Recalculate age when birthdate changes
  useEffect(() => {
    if (formData.birthdate) {
      const birth = new Date(formData.birthdate);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      setFormData((prev) => ({ ...prev, computedAge: Math.max(0, age) }));
    }
  }, [formData.birthdate]);

  const handleAddChild = () => {
    setChildren([...children, { name: '', age: '' }]);
  };

  const handleRemoveChild = (index) => {
    if (children.length > 1) {
      setChildren(children.filter((_, i) => i !== index));
    } else {
      setChildren([{ name: '', age: '' }]);
    }
  };

  const handleChildChange = (index, field, value) => {
    const updated = [...children];
    updated[index] = { ...updated[index], [field]: value };
    setChildren(updated);
  };

  const handleReferenceChange = (index, field, value) => {
    const updated = [...references];
    updated[index] = { ...updated[index], [field]: value };
    setReferences(updated);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  const handleSignatureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSignaturePreview(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('First Name and Last Name are required.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const fullNameParts = [
      formData.firstName.trim(),
      formData.middleName.trim(),
      formData.lastName.trim(),
      formData.extensionName.trim()
    ].filter(Boolean);
    const fullName = fullNameParts.join(' ');

    onSave({
      ...student,
      id: student.id || formData.accountNumber,
      accountNumber: formData.accountNumber,
      studentNumber: formData.accountNumber,
      name: fullName,
      firstName: formData.firstName.trim(),
      middleName: formData.middleName.trim(),
      lastName: formData.lastName.trim(),
      extensionName: formData.extensionName.trim(),
      civilStatus: formData.civilStatus,
      birthdate: formData.birthdate,
      age: formData.computedAge,
      address: formData.address.trim(),
      department: formData.department,
      yearLevel: formData.yearLevel,
      contact: formData.contact.trim(),
      contactNumber: formData.contact.trim(),
      contactInfo: formData.contactInfo.trim(),
      email: formData.email.trim(),
      occupation: formData.occupation.trim(),
      employer: formData.employer.trim(),
      employerAddress: formData.employerAddress.trim(),
      fatherName: formData.fatherName.trim(),
      motherName: formData.motherName.trim(),
      spouseName: formData.spouseName.trim(),
      spouseOccupation: formData.spouseOccupation.trim(),
      spouseEmployer: formData.spouseEmployer.trim(),
      status: formData.status,
      avatar: photoPreview,
      signature: signaturePreview,
      dependents: children.filter((c) => c.name && c.name.trim()),
      references: references,
      updatedAt: 'Just now',
      lastUpdated: 'Just now'
    });
  };

  return (
    <div className="student-edit-page">
      {/* Embedded CSS matching CampusVoice edit.php 1:1 */}
      <style>{`
        .names-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr 1.2fr 0.6fr;
          gap: 16px;
          margin-bottom: 18px;
        }
        .civil-bday-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 16px;
          margin-bottom: 18px;
        }
        .two-col-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 18px;
        }
        .reference-person-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
        }
        .reference-person-title {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 16px;
          padding-bottom: 10px;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ref-fields-grid {
          display: grid;
          grid-template-columns: 1.2fr 1.2fr 1fr;
          gap: 18px;
        }
        .upload-responsive-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
          margin-top: 14px;
        }
        .upload-item-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-width: 0;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
        }
        .upload-item-content {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }
        .photo-preview-box {
          width: 110px;
          height: 110px;
          border-radius: 12px;
          border: 2px dashed #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #f8fafc;
          flex-shrink: 0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .photo-preview-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .signature-preview-box {
          width: 160px;
          height: 80px;
          border-radius: 10px;
          border: 2px dashed #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #f8fafc;
          flex-shrink: 0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .signature-preview-box img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .upload-item-actions {
          flex: 1 1 180px;
          min-width: 0;
        }
        .upload-item-actions input[type="file"] {
          width: 100%;
          max-width: 100%;
          font-size: 13px;
          box-sizing: border-box;
        }
        @media (max-width: 900px) {
          .names-grid { grid-template-columns: 1fr 1fr; }
          .ref-fields-grid { grid-template-columns: 1fr; gap: 14px; }
        }
        @media (max-width: 768px) {
          .civil-bday-grid, .two-col-grid, .upload-responsive-grid { grid-template-columns: 1fr; }
          .reference-person-card, .upload-item-card { padding: 18px; }
        }
        @media (max-width: 576px) {
          .names-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <div className="breadcrumb-item">
          <a href="#dashboard" onClick={(e) => e.preventDefault()}>Dashboard</a>
        </div>
        <span className="breadcrumb-separator">▸</span>
        <div className="breadcrumb-item">
          <a href="#registry" onClick={(e) => { e.preventDefault(); onCancel(); }}>Student Registry</a>
        </div>
        <span className="breadcrumb-separator">▸</span>
        <div className="breadcrumb-item">
          <a href="#detail" onClick={(e) => { e.preventDefault(); onCancel(); }}>{student?.name}</a>
        </div>
        <span className="breadcrumb-separator">▸</span>
        <div className="breadcrumb-item active">Edit Profile</div>
      </div>

      <div className="content-header">
        <div>
          <h2 className="content-title">Edit Student Information Sheet</h2>
          <p className="content-subtitle">Update demographic records, contact details, family background, and references</p>
        </div>
      </div>

      {error && (
        <div className="alert alert-error" style={{ marginBottom: '24px' }}>
          {error}
        </div>
      )}

      <div className="card glass-card">
        <div className="card-body" style={{ padding: '28px' }}>
          <form onSubmit={handleSubmit} noValidate>
            {/* Identification & Status Header */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: 20, marginBottom: 28 }}>
              <div className="two-col-grid" style={{ marginBottom: 0 }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Student ID Number (Immutable)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.accountNumber}
                    readOnly
                    style={{ background: '#e2e8f0', fontWeight: 700, color: '#0369a1' }}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="status" className="form-label">Account Status</label>
                  <select
                    id="status"
                    name="status"
                    className="form-select"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive / Suspended</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION I: PERSONAL INFORMATION */}
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '18px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>
              I. Personal & Demographic Details
            </h4>

            <div className="names-grid">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="first_name" className="form-label">First Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  className="form-input"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="middle_name" className="form-label">Middle Name</label>
                <input
                  type="text"
                  id="middle_name"
                  name="middle_name"
                  className="form-input"
                  value={formData.middleName}
                  onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="last_name" className="form-label">Last Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="form-input"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="extension_name" className="form-label">Ext (Jr/Sr)</label>
                <input
                  type="text"
                  id="extension_name"
                  name="extension_name"
                  className="form-input"
                  value={formData.extensionName}
                  onChange={(e) => setFormData({ ...formData, extensionName: e.target.value })}
                />
              </div>
            </div>

            <div className="civil-bday-grid">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="civil_status" className="form-label">Civil Status <span className="required">*</span></label>
                <select
                  id="civil_status"
                  name="civil_status"
                  className="form-select"
                  value={formData.civilStatus}
                  onChange={(e) => setFormData({ ...formData, civilStatus: e.target.value })}
                  required
                >
                  {CIVIL_STATUSES.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="birthdate" className="form-label">Birthdate <span className="required">*</span></label>
                <input
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  className="form-input"
                  value={formData.birthdate}
                  min="1900-01-01"
                  max="2026-12-31"
                  onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="age_display" className="form-label">Computed Age</label>
                <input
                  type="text"
                  id="age_display"
                  className="form-input"
                  value={`${formData.computedAge} years old`}
                  readOnly
                  style={{ background: '#f1f5f9' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '18px' }}>
              <label htmlFor="address" className="form-label">Permanent Address</label>
              <textarea
                id="address"
                name="address"
                className="form-textarea"
                rows={2}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="two-col-grid">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="department" className="form-label">Department / College <span className="required">*</span></label>
                <select
                  id="department"
                  name="department"
                  className="form-select"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  required
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="year_level" className="form-label">Year Level <span className="required">*</span></label>
                <select
                  id="year_level"
                  name="year_level"
                  className="form-select"
                  value={formData.yearLevel}
                  onChange={(e) => setFormData({ ...formData, yearLevel: e.target.value })}
                  required
                >
                  {YEAR_LEVELS.map((yl) => (
                    <option key={yl} value={yl}>{yl}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="two-col-grid">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="contact_number" className="form-label">Mobile Number</label>
                <input
                  type="text"
                  id="contact_number"
                  name="contact_number"
                  className="form-input"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="contact_info" className="form-label">Additional Contact Info</label>
                <input
                  type="text"
                  id="contact_info"
                  name="contact_info"
                  className="form-input"
                  value={formData.contactInfo}
                  onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                  placeholder="e.g. Alternate phone, Facebook URL"
                />
              </div>
            </div>

            <div className="two-col-grid" style={{ marginTop: '16px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="two-col-grid" style={{ marginTop: '16px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="occupation" className="form-label">Occupation</label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  className="form-input"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="employer" className="form-label">Employer Name</label>
                <input
                  type="text"
                  id="employer"
                  name="employer"
                  className="form-input"
                  value={formData.employer}
                  onChange={(e) => setFormData({ ...formData, employer: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="employer_address" className="form-label">Employer Address</label>
              <input
                type="text"
                id="employer_address"
                name="employer_address"
                className="form-input"
                value={formData.employerAddress}
                onChange={(e) => setFormData({ ...formData, employerAddress: e.target.value })}
              />
            </div>

            {/* SECTION II: FAMILY & DEPENDENTS */}
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-primary)', marginTop: '32px', marginBottom: '18px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>
              II. Family Background & Dependents
            </h4>

            <div className="two-col-grid">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="father_name" className="form-label">Father's Full Name</label>
                <input
                  type="text"
                  id="father_name"
                  name="father_name"
                  className="form-input"
                  value={formData.fatherName}
                  onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="mother_name" className="form-label">Mother's Maiden Name</label>
                <input
                  type="text"
                  id="mother_name"
                  name="mother_name"
                  className="form-input"
                  value={formData.motherName}
                  onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                />
              </div>
            </div>

            <div className="two-col-grid">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="spouse_name" className="form-label">Spouse Full Name</label>
                <input
                  type="text"
                  id="spouse_name"
                  name="spouse_name"
                  className="form-input"
                  value={formData.spouseName}
                  onChange={(e) => setFormData({ ...formData, spouseName: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="spouse_occupation" className="form-label">Spouse Occupation</label>
                <input
                  type="text"
                  id="spouse_occupation"
                  name="spouse_occupation"
                  className="form-input"
                  value={formData.spouseOccupation}
                  onChange={(e) => setFormData({ ...formData, spouseOccupation: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="spouse_employer" className="form-label">Spouse Employer</label>
              <input
                type="text"
                id="spouse_employer"
                name="spouse_employer"
                className="form-input"
                value={formData.spouseEmployer}
                onChange={(e) => setFormData({ ...formData, spouseEmployer: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontWeight: 700, fontSize: '14px' }}>Children / Dependents</span>
              <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddChild}>
                + Add Child Row
              </button>
            </div>

            <div className="data-table-responsive" style={{ marginBottom: '24px' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Child Full Name</th>
                    <th style={{ width: '140px' }}>Age</th>
                    <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {children.map((child, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Child's Full Name"
                          value={child.name || ''}
                          onChange={(e) => handleChildChange(index, 'name', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-input"
                          placeholder="Age"
                          min="0"
                          max="100"
                          value={child.age || ''}
                          onChange={(e) => handleChildChange(index, 'age', e.target.value)}
                        />
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm text-error"
                          onClick={() => handleRemoveChild(index)}
                        >
                          &times;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* SECTION III: REFERENCES & ID PHOTO */}
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-primary)', marginTop: '32px', marginBottom: '8px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>
              III. Character / Member References
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
              Contact details for two references on record.
            </p>

            <div className="reference-person-card">
              <div className="reference-person-title">
                <span>Reference Person 1</span>
                <span className="required">*</span>
              </div>
              <div className="ref-fields-grid">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Full Name <span className="required">*</span></label>
                  <input
                    type="text"
                    className="form-input"
                    value={references[0]?.name || ''}
                    onChange={(e) => handleReferenceChange(0, 'name', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Affiliation / Relationship</label>
                  <input
                    type="text"
                    className="form-input"
                    value={references[0]?.affiliation || 'Faculty / Instructor'}
                    onChange={(e) => handleReferenceChange(0, 'affiliation', e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Contact Number <span className="required">*</span></label>
                  <input
                    type="text"
                    className="form-input"
                    value={references[0]?.contact || ''}
                    onChange={(e) => handleReferenceChange(0, 'contact', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="reference-person-card">
              <div className="reference-person-title">
                <span>Reference Person 2</span>
                <span className="required">*</span>
              </div>
              <div className="ref-fields-grid">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Full Name <span className="required">*</span></label>
                  <input
                    type="text"
                    className="form-input"
                    value={references[1]?.name || ''}
                    onChange={(e) => handleReferenceChange(1, 'name', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Affiliation / Relationship</label>
                  <input
                    type="text"
                    className="form-input"
                    value={references[1]?.affiliation || 'Department Chair / Member'}
                    onChange={(e) => handleReferenceChange(1, 'affiliation', e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Contact Number <span className="required">*</span></label>
                  <input
                    type="text"
                    className="form-input"
                    value={references[1]?.contact || ''}
                    onChange={(e) => handleReferenceChange(1, 'contact', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Photo & Signature Upload */}
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-primary)', marginTop: '28px', marginBottom: '8px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>
              Passport / 2×2 Student ID Photo & Signature Upload
            </h4>

            <div className="upload-responsive-grid">
              <div className="upload-item-card">
                <label className="form-label" style={{ fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
                  Update 2×2 Student ID Photo
                </label>
                <div className="upload-item-content">
                  <div className="photo-preview-box">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Avatar" />
                    ) : (
                      <span style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', padding: '8px' }}>No Photo</span>
                    )}
                  </div>
                  <div className="upload-item-actions">
                    <input type="file" className="form-input" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoChange} />
                    <div className="form-hint" style={{ marginTop: '8px', fontSize: '12px' }}>Accepted: JPG, PNG, WEBP (Max: 3MB)</div>
                  </div>
                </div>
              </div>

              <div className="upload-item-card">
                <label className="form-label" style={{ fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
                  Update Digital Signature
                </label>
                <div className="upload-item-content">
                  <div className="signature-preview-box">
                    {signaturePreview ? (
                      <img src={signaturePreview} alt="Signature" />
                    ) : (
                      <span style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', padding: '8px' }}>No Signature</span>
                    )}
                  </div>
                  <div className="upload-item-actions">
                    <input type="file" className="form-input" accept="image/jpeg,image/png,image/webp" onChange={handleSignatureChange} />
                    <div className="form-hint" style={{ marginTop: '8px', fontSize: '12px' }}>Accepted: JPG, PNG, WEBP</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px', borderTop: '2px solid #f1f5f9', paddingTop: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <button type="button" className="btn btn-secondary" onClick={onCancel}>
                ← Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-lg" style={{ minWidth: '200px' }}>
                Save Record Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
