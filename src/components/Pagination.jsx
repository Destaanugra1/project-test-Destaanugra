import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      if (currentPage > 3) {
        pageNumbers.push('...');
      }

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        endPage = 4;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
      }

      // Always show last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className='flex justify-center items-center gap-1 mt-6 mb-8 flex-wrap px-2'>
      {/* Jump to first page */}
      {currentPage > 3 && totalPages > 7 && (
        <button
          onClick={() => onPageChange(1)}
          className='px-2 py-1 rounded border text-gray-700 border-gray-300 hover:bg-gray-50 mr-1'>
          First
        </button>
      )}

      {/* Previous button */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-2 py-1 rounded border ${
          currentPage === 1
            ? 'text-gray-400 border-gray-200'
            : 'text-gray-700 border-gray-300 hover:bg-gray-50'
        }`}>
        &laquo;
      </button>

      {/* Page numbers */}
      {renderPageNumbers().map((page, index) =>
        page === '...' ? (
          <span key={`ellipsis-${index}`} className='px-2 py-1'>
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => onPageChange(page)}
            className={`
              px-2 py-1 min-w-[32px] text-sm rounded border
              ${
                page === currentPage
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }
            `}>
            {page}
          </button>
        )
      )}

      {/* Next button */}
      <button
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className={`px-2 py-1 rounded border ${
          currentPage === totalPages
            ? 'text-gray-400 border-gray-200'
            : 'text-gray-700 border-gray-300 hover:bg-gray-50'
        }`}>
        &raquo;
      </button>

      {/* Jump to last page */}
      {currentPage < totalPages - 2 && totalPages > 7 && (
        <button
          onClick={() => onPageChange(totalPages)}
          className='px-2 py-1 rounded border text-gray-700 border-gray-300 hover:bg-gray-50 ml-1'>
          Last
        </button>
      )}
    </div>
  );
};

export default Pagination;
