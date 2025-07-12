import React from 'react';

// moved to components/Pagination.jsx

import React from 'react';
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 8,
        margin: '32px 0',
      }}>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            background: page === currentPage ? '#ff6600' : '#fff',
            color: page === currentPage ? '#fff' : '#333',
            border: '1px solid #ff6600',
            borderRadius: 4,
            padding: '4px 12px',
            cursor: 'pointer',
            fontWeight: page === currentPage ? 700 : 400,
          }}>
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
