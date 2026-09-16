import React from 'react';

export default function SearchBar({ searchQuery, setSearchQuery, placeholder = "Search by name or account number..." }) {
  return (
    <div className="search-bar-wrapper">
      <div className="search-icon">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={() => setSearchQuery('')}
          title="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}
