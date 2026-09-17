import React, { useState, useEffect } from 'react';
import { DEPARTMENTS, CIVIL_STATUSES, YEAR_LEVELS } from '../data/initialStudents';

export default function StudentEdit({ student, onSave, onCancel, onNavigateDashboard }) {
  const [formData, setFormData] = useState({
    accountNumber: student?.accountNumber || student?.id || '',
    firstName: student?.firstName || student?.name?.split(' ')[0] || '',
    middleName: student?.middleName || '',
    lastName: student?.lastName || student?.name?.split(' ').slice(-1)[0] || '',
    extensionName: student?.extensionName || '',
    civilStatus: student?.civilStatus || 'Single',
    birthdate: student?.birthdate || '2003-09-01',
    computedAge: student?.age || 22,
    address: student?.address || 'City of Malolos, Bulacan',
    department: student?.department || DEPARTMENTS[6], // College of Industrial Technology (CIT)
    yearLevel: student?.yearLevel || 'Postgraduate',
    contact: student?.contact || '',
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

  const [photoPreview, setPhotoPreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);

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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSignatureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSignaturePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullNameParts = [formData.firstName, formData.middleName, formData.lastName, formData.extensionName].filter(Boolean);
    const fullName = fullNameParts.join(' ');

    onSave({
      ...student,
      id: student.id || formData.accountNumber,
      accountNumber: formData.accountNumber,
      name: fullName,
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      extensionName: formData.extensionName,
      civilStatus: formData.civilStatus,
      birthdate: formData.birthdate,
      age: formData.computedAge,
      address: formData.address,
      department: formData.department,
      yearLevel: formData.yearLevel,
      contact: formData.contact,
      contactInfo: formData.contactInfo,
      email: formData.email,
      occupation: formData.occupation,
      employer: formData.employer,
      employerAddress: formData.employerAddress,
      fatherName: formData.fatherName,
      motherName: formData.motherName,
      spouseName: formData.spouseName,
      spouseOccupation: formData.spouseOccupation,
      spouseEmployer: formData.spouseEmployer,
      status: formData.status,
      dependents: children.filter((c) => c.name && c.name.trim()),
      references: references,
      updatedAt: 'Just now',
      lastUpdated: 'Just now'
    });
  };

  return (
    <div className="student-edit-page">
      {/* Breadcrumbs matching Image 2 */}
      <div className="breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', marginBottom: '14px' }}>
        <div className="breadcrumb-item">
          <span style={{ color: '#0284c7', cursor: 'default', fontWeight: 600 }}>Dashboard</span>
        </div>
        <span className="breadcrumb-separator" style={{ color: '#94a3b8' }}>▸</span>
        <div className="breadcrumb-item">
          <span style={{ color: '#0284c7', cursor: 'pointer', fontWeight: 600 }} onClick={onCancel}>Student Registry</span>
        </div>
        <span className="breadcrumb-separator" style={{ color: '#94a3b8' }}>▸</span>
        <div className="breadcrumb-item">
          <span style={{ color: '#0284c7', cursor: 'pointer', fontWeight: 600 }} onClick={onCancel}>{student?.name}</span>
        </div>
        <span className="breadcrumb-separator" style={{ color: '#94a3b8' }}>▸</span>
        <div className="breadcrumb-item active" style={{ color: '#64748b', fontWeight: 600 }}>
          Edit Profile
        </div>
      </div>

      {/* Bigger Header Titles matching Image 2 */}
      <div className="content-header" style={{ marginBottom: '24px' }}>
        <div>
          <h1 className="content-title" style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
            Edit Student Information Sheet
          </h1>
          <p className="content-subtitle" style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
            Update demographic records, contact details, family background, and references
          </p>
        </div>
      </div>

      {/* Main Glass Form Card */}
      <div
        className="card glass-card"
        style={{
          background: 'rgba(255, 255, 255, 0.84)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.95)',
          boxShadow: '0 14px 36px -6px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
          padding: '28px 32px'
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* Top Header Box: Immutable ID & Account Status */}
          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '28px'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Student ID Number (Immutable)
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.accountNumber}
                  readOnly
                  style={{
                    width: '100%',
                    background: '#e2e8f0',
                    fontWeight: 700,
                    color: '#0369a1',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    border: '1px solid #cbd5e1'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Account Status
                </label>
                <select
                  className="form-select"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={{
                    width: '100%',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff'
                  }}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive / Suspended</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION I: Personal & Demographic Details */}
          <h4
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#0284c7',
              marginBottom: '18px',
              borderBottom: '2px solid #e2e8f0',
              paddingBottom: '8px'
            }}
          >
            I. Personal & Demographic Details
          </h4>

          {/* Names Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.2fr 0.8fr', gap: '16px', marginBottom: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                First Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                className="form-input"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1', background: '#ffffff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Middle Name
              </label>
              <input
                type="text"
                className="form-input"
                value={formData.middleName}
                onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1', background: '#ffffff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Last Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                className="form-input"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1', background: '#ffffff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Ext (Jr/Sr)
              </label>
              <input
                type="text"
                className="form-input"
                value={formData.extensionName}
                onChange={(e) => setFormData({ ...formData, extensionName: e.target.value })}
                style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1', background: '#ffffff' }}
              />
            </div>
          </div>

          {/* Civil Status, Birthdate, Computed Age */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Civil Status <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <select
                className="form-select"
                required
                value={formData.civilStatus}
                onChange={(e) => setFormData({ ...formData, civilStatus: e.target.value })}
                style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1', background: '#ffffff' }}
              >
                {CIVIL_STATUSES.map((cs) => (
                  <option key={cs} value={cs}>{cs}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Birthdate <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="date"
                className="form-input"
                required
                value={formData.birthdate}
                onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1', background: '#ffffff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Computed Age
              </label>
              <input
                type="text"
                className="form-input"
                value={formData.computedAge}
                readOnly
                style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1', background: '#f1f5f9', fontWeight: 600 }}
              />
            </div>
          </div>

          {/* Permanent Address */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Permanent Address
            </label>
            <textarea
              className="form-textarea"
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1', resize: 'vertical', background: '#ffffff' }}
            />
          </div>

          {/* Department & Year Level */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Department / College <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <select
                className="form-select"
                required
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1', background: '#ffffff' }}
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Year Level <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <select
                className="form-select"
                required
                value={formData.yearLevel}
                onChange={(e) => setFormData({ ...formData, yearLevel: e.target.value })}
                style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1', background: '#ffffff' }}
              >
                {YEAR_LEVELS.map((yl) => (
                  <option key={yl} value={yl}>{yl}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Number & Additional Contact Info */}
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
                style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1', background: '#ffffff' }}
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
                style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1', background: '#ffffff' }}
              />
            </div>
          </div>

          {/* Email Address */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Email Address
            </label>
            <input
              type="email"
              className="form-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1', background: '#ffffff' }}
            />
          </div>

          {/* Occupation & Employer */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Occupation
              </label>
              <input
                type="text"
                className="form-input"
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1', background: '#ffffff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Employer Name
              </label>
              <input
                type="text"
                className="form-input"
                value={formData.employer}
                onChange={(e) => setFormData({ ...formData, employer: e.target.value })}
                style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1', background: '#ffffff' }}
              />
            </div>
          </div>

          {/* Employer Address */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Employer Address
            </label>
            <input
              type="text"
              className="form-input"
              value={formData.employerAddress}
              onChange={(e) => setFormData({ ...formData, employerAddress: e.target.value })}
              style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1', background: '#ffffff' }}
            />
          </div>

          {/* SECTION II: Family Background & Dependents */}
          <h4
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#0284c7',
              marginTop: '32px',
              marginBottom: '18px',
              borderBottom: '2px solid #e2e8f0',
              paddingBottom: '8px'
            }}
          >
            II. Family Background & Dependents
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Father's Full Name
              </label>
              <input
                type="text"
                className="form-input"
                value={formData.fatherName}
                onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1', background: '#ffffff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Mother's Maiden Name
              </label>
              <input
                type="text"
                className="form-input"
                value={formData.motherName}
                onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1', background: '#ffffff' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Spouse Full Name
              </label>
              <input
                type="text"
                className="form-input"
                value={formData.spouseName}
                onChange={(e) => setFormData({ ...formData, spouseName: e.target.value })}
                style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1', background: '#ffffff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Spouse Occupation
              </label>
              <input
                type="text"
                className="form-input"
                value={formData.spouseOccupation}
                onChange={(e) => setFormData({ ...formData, spouseOccupation: e.target.value })}
                style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1', background: '#ffffff' }}
              />
            </div>
          </div>

          {/* Children / Dependents Table */}
          <div style={{ marginTop: '20px', marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>Children / Dependents</span>
              <button
                type="button"
                onClick={handleAddChild}
                style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '6px 16px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
              >
                + Add Child Row
              </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: '12px', color: '#64748b' }}>Child Full Name</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: '12px', color: '#64748b', width: '140px' }}>Age</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center', fontSize: '12px', color: '#64748b', width: '80px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {children.map((child, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '8px 14px' }}>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Child's Full Name"
                        value={child.name}
                        onChange={(e) => {
                          const updated = [...children];
                          updated[idx].name = e.target.value;
                          setChildren(updated);
                        }}
                        style={{ width: '100%', borderRadius: '8px', padding: '8px 12px', border: '1px solid #cbd5e1', background: '#ffffff' }}
                      />
                    </td>
                    <td style={{ padding: '8px 14px' }}>
                      <input
                        type="number"
                        className="form-input"
                        placeholder="Age"
                        value={child.age}
                        onChange={(e) => {
                          const updated = [...children];
                          updated[idx].age = e.target.value;
                          setChildren(updated);
                        }}
                        style={{ width: '100%', borderRadius: '8px', padding: '8px 12px', border: '1px solid #cbd5e1', background: '#ffffff' }}
                      />
                    </td>
                    <td style={{ padding: '8px 14px', textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={() => handleRemoveChild(idx)}
                        style={{ background: 'transparent', border: 'none', color: '#ef4444', fontSize: '18px', cursor: 'pointer' }}
                      >
                        &times;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SECTION III: Character / Member References matching Image 1 */}
          <h4
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#0284c7',
              marginTop: '32px',
              marginBottom: '6px',
              borderBottom: '2px solid #e2e8f0',
              paddingBottom: '8px'
            }}
          >
            III. Character / Member References
          </h4>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 18px 0' }}>
            Contact details for two references on record.
          </p>

          {references.map((ref, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '22px 24px',
                marginBottom: '18px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '14px' }}>
                Reference Person {idx + 1} <span style={{ color: '#ef4444' }}>*</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                    Full Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={ref.name}
                    onChange={(e) => {
                      const updated = [...references];
                      updated[idx].name = e.target.value;
                      setReferences(updated);
                    }}
                    style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1', background: '#ffffff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                    Affiliation / Relationship
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={ref.affiliation}
                    onChange={(e) => {
                      const updated = [...references];
                      updated[idx].affiliation = e.target.value;
                      setReferences(updated);
                    }}
                    style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1', background: '#ffffff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                    Contact Number <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={ref.contact}
                    onChange={(e) => {
                      const updated = [...references];
                      updated[idx].contact = e.target.value;
                      setReferences(updated);
                    }}
                    style={{ width: '100%', borderRadius: '10px', padding: '10px 14px', border: '1px solid #cbd5e1', background: '#ffffff' }}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* PASSPORT / 2x2 ID PHOTO & DIGITAL SIGNATURE UPLOAD matching Image 1 */}
          <h4
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#0284c7',
              marginTop: '32px',
              marginBottom: '18px',
              borderBottom: '2px solid #e2e8f0',
              paddingBottom: '8px'
            }}
          >
            Passport / 2×2 Student ID Photo & Signature Upload
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '28px' }}>
            {/* Update 2x2 Student ID Photo Card */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '22px 24px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
              }}
            >
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '14px' }}>
                Update 2×2 Student ID Photo
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '12px',
                    border: '2px dashed #94a3b8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    background: '#f8fafc',
                    flexShrink: 0
                  }}
                >
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>No Photo</span>
                  )}
                </div>
                <div style={{ flex: '1 1 180px' }}>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handlePhotoChange}
                    style={{ width: '100%', fontSize: '13px' }}
                  />
                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#64748b' }}>
                    Accepted: JPG, PNG, WEBP (Max: 3MB)
                  </div>
                </div>
              </div>
            </div>

            {/* Update Digital Signature Card */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '22px 24px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
              }}
            >
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '14px' }}>
                Update Digital Signature
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
                <div
                  style={{
                    width: '140px',
                    height: '70px',
                    borderRadius: '10px',
                    border: '2px dashed #94a3b8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    background: '#f8fafc',
                    flexShrink: 0
                  }}
                >
                  {signaturePreview ? (
                    <img src={signaturePreview} alt="Signature" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  ) : (
                    <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>No Signature</span>
                  )}
                </div>
                <div style={{ flex: '1 1 180px' }}>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleSignatureChange}
                    style={{ width: '100%', fontSize: '13px' }}
                  />
                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#64748b' }}>
                    Accepted: JPG, PNG, WEBP
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Action Buttons matching Image 1 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '32px',
              borderTop: '2px solid #f1f5f9',
              paddingTop: '24px',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              style={{
                background: '#ffffff',
                color: '#0f172a',
                border: '1px solid #cbd5e1',
                padding: '10px 24px',
                borderRadius: '9999px',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
              }}
            >
              ← Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{
                background: '#0284c7',
                color: '#ffffff',
                border: 'none',
                padding: '12px 32px',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.3)'
              }}
            >
              Save Record Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
