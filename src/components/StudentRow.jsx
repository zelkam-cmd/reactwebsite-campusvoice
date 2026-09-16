import React from 'react';

export default function StudentRow({ student, onView, onEdit, onDelete }) {
  return (
    <tr className="student-table-row">
      <td className="col-account">
        {student.accountNumber || student.id}
      </td>
      <td className="col-name">
        <span className="student-name">{student.name}</span>
      </td>
      <td className="col-status">
        <span className="civil-status-text">{student.civilStatus || 'Single'}</span>
      </td>
      <td className="col-contact">
        {student.contact || '—'}
      </td>
      <td className="col-actions">
        <div className="action-buttons-group">
          {/* View Button */}
          <button
            type="button"
            className="action-btn btn-view"
            onClick={() => onView(student)}
            title="View Details"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>View</span>
          </button>

          {/* Edit Button */}
          <button
            type="button"
            className="action-btn btn-edit"
            onClick={() => onEdit(student)}
            title="Edit Record"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span>Edit</span>
          </button>

          {/* Delete Button */}
          <button
            type="button"
            className="action-btn btn-delete"
            onClick={() => onDelete(student)}
            title="Delete Record"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
}
