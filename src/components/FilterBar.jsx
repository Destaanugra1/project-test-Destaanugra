import React from 'react';

const FilterBar = ({
  pageSize,
  setPageSize,
  sort,
  setSort,
  filter,
  setFilter,
}) => {
  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    console.log('Setting page size to:', newSize);
    setPageSize(newSize);
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    console.log('Setting sort to:', newSort);
    setSort(newSort);
  };

  return (
    <div className='flex flex-wrap items-center mb-6 py-3 justify-between'>
      <div className='flex items-center'>
        <span className='mr-2 text-gray-700 text-sm'>Show per page:</span>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className='mr-6 py-1 px-2 rounded border border-gray-300 text-sm focus:outline-none focus:border-orange-500 bg-white appearance-none cursor-pointer'>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span className='mr-2 text-gray-700 text-sm'>Sort by:</span>
        <select
          value={sort}
          onChange={handleSortChange}
          className='mr-4 py-1 px-2 rounded border border-gray-300 text-sm focus:outline-none focus:border-orange-500 bg-white appearance-none cursor-pointer'>
          <option value='-published_at'>Newest</option>
          <option value='published_at'>Oldest</option>
        </select>
      </div>
      <input
        type='text'
        placeholder='Filter by title...'
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className='py-1 px-3 rounded border border-gray-300 text-sm focus:outline-none focus:border-orange-500 min-w-[240px]'
      />
    </div>
  );
};

export default FilterBar;
