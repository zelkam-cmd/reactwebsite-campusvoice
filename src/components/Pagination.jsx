import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages || 1 }, (_, i) => i + 1);

  return (
    <div className="pagination-container">
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={`page-badge ${currentPage === p ? 'active' : ''}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
