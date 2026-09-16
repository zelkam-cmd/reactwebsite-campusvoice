import React, { useState, useEffect } from 'react';
import { DEPARTMENTS, CIVIL_STATUSES, YEAR_LEVELS } from '../data/initialStudents';

export default function StudentModal({ isOpen, mode, student, onClose, onSave }) {
  const [formData, setFormData] = useState({
    accountNumber: '',
    name: '',
    civilStatus: 'Single',
    department: 'College of Information and Communications Technology (CICT)',
    yearLevel: '1st Year',
    section: '',
    contact: '',
    email: '',
    status: 'Active'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student && (mode === 'edit' || mode === 'view')) {
      setFormData({
        accountNumber: student.accountNumber || student.id || '',
        name: student.name || '',
        civilStatus: student.civilStatus || 'Single',
        department: student.department || DEPARTMENTS[0],
        yearLevel: student.yearLevel || '1st Year',
        section: student.section || '',
        contact: student.contact || '',
        email: student.email || '',
        status: student.status || 'Active'
      });
    } else if (mode === 'add') {
      // Auto-generate next account number matching original database
      const randomSuffix = String(Math.floor(7 + Math.random() * 90)).padStart(3, '0');
      setFormData({
        accountNumber: `STU-2024-${randomSuffix}`,
        name: '',
        civilStatus: 'Single',
        department: 'College of Information and Communications Technology (CICT)',
        yearLevel: '1st Year',
        section: '',
        contact: '',
        email: '',
        status: 'Active'
      });
    }
    setErrors({});
  }, [student, mode, isOpen]);

  if (!isOpen) return null;

  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';
  const isAddMode = mode === 'add';

  const validate = () => {
    const newErrors = {};
    if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Account # / Student ID is required';
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.contact.trim()) newErrors.contact = 'Contact Number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isViewMode) {
      onClose();
      return;
    }
    if (!validate()) return;

    onSave({
      id: student?.id || formData.accountNumber,
      ...formData
    });
  };

  const modalTitle = isViewMode
    ? 'Student / Member Profile Details'
    : isEditMode
    ? 'Edit Student Record'
    : 'Add New Student / Member';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <h2 className="modal-title">{modalTitle}</h2>
            <span className="modal-subtitle">
              {isViewMode
                ? 'Complete student record dossier'
                : 'Fill in the information below to save student record'}
            </span>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-body">
            {/* Form grid */}
            <div className="form-grid">
              {/* Account Number */}
              <div className="form-field">
                <label className="field-label">Account # / Student ID <span className="req">*</span></label>
                {isViewMode ? (
                  <div className="view-value font-mono">{formData.accountNumber}</div>
                ) : (
                  <input
                    type="text"
                    className={`form-input ${errors.accountNumber ? 'has-error' : ''}`}
                    placeholder="e.g. 2026-0001"
                    value={formData.accountNumber}
                    disabled={isEditMode}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  />
                )}
                {errors.accountNumber && <span className="field-error">{errors.accountNumber}</span>}
              </div>

              {/* Full Name */}
              <div className="form-field">
                <label className="field-label">Full Name <span className="req">*</span></label>
                {isViewMode ? (
                  <div className="view-value font-bold">{formData.name}</div>
                ) : (
                  <input
                    type="text"
                    className={`form-input ${errors.name ? 'has-error' : ''}`}
                    placeholder="e.g. Juan Dela Cruz"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                )}
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>

              {/* Civil Status */}
              <div className="form-field">
                <label className="field-label">Civil Status</label>
                {isViewMode ? (
                  <div className="view-value">{formData.civilStatus}</div>
                ) : (
                  <select
                    className="form-select"
                    value={formData.civilStatus}
                    onChange={(e) => setFormData({ ...formData, civilStatus: e.target.value })}
                  >
                    {CIVIL_STATUSES.map((cs) => (
                      <option key={cs} value={cs}>{cs}</option>
                    ))}
                  </select>
                )}
              </div>

              {/* Contact Number */}
              <div className="form-field">
                <label className="field-label">Contact Number <span className="req">*</span></label>
                {isViewMode ? (
                  <div className="view-value">{formData.contact}</div>
                ) : (
                  <input
                    type="text"
                    className={`form-input ${errors.contact ? 'has-error' : ''}`}
                    placeholder="e.g. 0917-234-5678"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  />
                )}
                {errors.contact && <span className="field-error">{errors.contact}</span>}
              </div>

              {/* Email Address */}
              <div className="form-field">
                <label className="field-label">Email Address</label>
                {isViewMode ? (
                  <div className="view-value">{formData.email || '—'}</div>
                ) : (
                  <input
                    type="email"
                    className="form-input"
                    placeholder="e.g. juan@student.bulsu.edu.ph"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                )}
              </div>

              {/* Year Level */}
              <div className="form-field">
                <label className="field-label">Year Level</label>
                {isViewMode ? (
                  <div className="view-value">{formData.yearLevel}</div>
                ) : (
                  <select
                    className="form-select"
                    value={formData.yearLevel}
                    onChange={(e) => setFormData({ ...formData, yearLevel: e.target.value })}
                  >
                    {YEAR_LEVELS.map((yl) => (
                      <option key={yl} value={yl}>{yl}</option>
                    ))}
                  </select>
                )}
              </div>

              {/* Section */}
              <div className="form-field">
                <label className="field-label">Year & Section</label>
                {isViewMode ? (
                  <div className="view-value">{formData.section || '—'}</div>
                ) : (
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. BSIT 3A"
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  />
                )}
              </div>

              {/* Status */}
              <div className="form-field">
                <label className="field-label">Account Status</label>
                {isViewMode ? (
                  <div className="view-value">
                    <span className={`status-pill ${formData.status.toLowerCase()}`}>
                      {formData.status}
                    </span>
                  </div>
                ) : (
                  <select
                    className="form-select"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                )}
              </div>

              {/* Department / College (Full width) */}
              <div className="form-field full-width">
                <label className="field-label">Department / College</label>
                {isViewMode ? (
                  <div className="view-value">{formData.department}</div>
                ) : (
                  <select
                    className="form-select"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-modal-cancel" onClick={onClose}>
              {isViewMode ? 'Close Dossier' : 'Cancel'}
            </button>
            {!isViewMode && (
              <button type="submit" className="btn-modal-submit">
                {isAddMode ? 'Add Student' : 'Save Changes'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
