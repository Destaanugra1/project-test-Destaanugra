import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Carousel from './components/Carousel';
import Pagination from './components/Pagination';
import FilterBar from './components/FilterBar';
import IdeaCard from './components/IdeaCard';
import axios from 'axios';

const getStoredState = (key, defaultValue) => {
  const stored = localStorage.getItem(key);
  if (stored === null) {
    return defaultValue;
  }
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error(`Error parsing stored value for ${key}:`, error);
    return defaultValue;
  }
};

function App() {
  const [pageSize, setPageSize] = useState(() =>
    getStoredState('pageSize', 10)
  );
  const [currentPage, setCurrentPage] = useState(() =>
    getStoredState('currentPage', 1)
  );
  const [sort, setSort] = useState(() =>
    getStoredState('sort', '-published_at')
  );
  const [filter, setFilter] = useState(() => getStoredState('filter', ''));
  const [initialized, setInitialized] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!initialized) {
      const urlParams = new URLSearchParams(window.location.search);
      const urlPageSize = urlParams.get('pageSize');
      const urlPage = urlParams.get('page');
      const urlSort = urlParams.get('sort');
      const urlFilter = urlParams.get('filter');

      if (urlPageSize) setPageSize(parseInt(urlPageSize, 10));
      if (urlPage) setCurrentPage(parseInt(urlPage, 10));
      if (urlSort) setSort(urlSort);
      if (urlFilter) setFilter(urlFilter);

      setInitialized(true);
    }
  }, [initialized]);

  useEffect(() => {
    if (initialized) {
      const urlParams = new URLSearchParams();
      urlParams.set('pageSize', pageSize.toString());
      urlParams.set('page', currentPage.toString());
      urlParams.set('sort', sort);
      if (filter) urlParams.set('filter', filter);

      const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
      window.history.replaceState({}, '', newUrl);
    }
  }, [pageSize, currentPage, sort, filter, initialized]);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setLoading(true);

        const queryParams = new URLSearchParams();
        queryParams.append('page[number]', currentPage);
        queryParams.append('page[size]', pageSize);
        queryParams.append('append[]', 'small_image');
        queryParams.append('append[]', 'medium_image');
        queryParams.append('sort', sort);

        if (filter) {
          queryParams.append('search', filter);
        }

        const response = await axios.get(
          `/api/ideas?${queryParams.toString()}`
        );
        console.log('API Response:', response.data);

        setIdeas(response.data.data || []);
        setTotalItems(response.data.meta?.total || 0);
        setTotalPages(response.data.meta?.last_page || 1);
        setError(null);
      } catch (err) {
        console.error('Error fetching ideas:', err);
        setError('Failed to fetch ideas. Please try again later.');
        setIdeas([]);
      } finally {
        setLoading(false);
      }
    };

    if (initialized) {
      fetchIdeas();
    }
  }, [currentPage, pageSize, sort, filter, initialized]);

  useEffect(() => {
    localStorage.setItem('pageSize', JSON.stringify(pageSize));
    localStorage.setItem('currentPage', JSON.stringify(currentPage));
    localStorage.setItem('sort', JSON.stringify(sort));
    localStorage.setItem('filter', JSON.stringify(filter));
  }, [pageSize, currentPage, sort, filter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, pageSize]);

  return (
    <div className='bg-white min-h-screen'>
      <Header />
      <Carousel />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-6'>
        <FilterBar
          pageSize={pageSize}
          setPageSize={setPageSize}
          sort={sort}
          setSort={setSort}
          filter={filter}
          setFilter={setFilter}
        />

        {loading ? (
          <div className='text-center py-12'>
            <div className='inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500 mb-4'></div>
            <p>Loading ideas...</p>
          </div>
        ) : error ? (
          <div className='text-center py-8 text-red-600'>
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className='mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition'>
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className='text-gray-600 mb-4 text-sm'>
              Showing {ideas.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}{' '}
              - {Math.min(currentPage * pageSize, totalItems)} of {totalItems}{' '}
              ideas
            </div>

            {ideas.length === 0 ? (
              <div className='text-center py-8'>
                <h3 className='text-xl font-bold text-gray-700'>
                  No ideas found
                </h3>
                <p className='text-gray-500 mt-2'>
                  Try changing filter or page size.
                </p>
              </div>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {ideas.map((idea) => (
                  <IdeaCard key={idea.id} idea={idea} />
                ))}
              </div>
            )}
          </>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default App;
