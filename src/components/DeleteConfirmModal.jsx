import React from 'react';

export default function DeleteConfirmModal({ isOpen, student, onConfirm, onCancel }) {
  if (!isOpen || !student) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-container delete-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Confirm Action</h3>
          <button type="button" className="modal-close-btn" onClick={onCancel}>
            ×
          </button>
        </div>

        <div className="modal-body" style={{ padding: '24px' }}>
          <p style={{ color: '#334155', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>
            Are you sure you want to permanently delete student <strong>{student.name}</strong> ({student.accountNumber || student.id})?
          </p>
        </div>

        <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button type="button" className="btn-modal-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className="btn-modal-delete-confirm"
            onClick={() => onConfirm(student.id)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
