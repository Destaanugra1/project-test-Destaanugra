import React, { useState, useEffect } from 'react';
import Logo from '../assets/Logo.png';

const Header = () => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentPage, setCurrentPage] = useState('Ideas');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? 'down' : 'up';

      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction);
      }

      setScrollPosition(scrollY);
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener('scroll', updateScrollDirection);

    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [scrollDirection]);

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrollDirection === 'down' && scrollPosition > 100
      ? '-translate-y-full'
      : 'translate-y-0'
  } ${
    scrollPosition > 50
      ? 'bg-orange-500/90 backdrop-blur-sm shadow-md'
      : 'bg-orange-500'
  }`;

  return (
    <>
      <div className='h-14'></div>

      <header className={headerClasses}>
        <div className='max-w-7xl mx-auto flex items-center justify-between h-14 px-4'>
          <div className='flex items-center text-white'>
            <img src={Logo} alt='Suitmedia' className='h-25' />
          </div>
          <nav className='flex'>
            {['Work', 'About', 'Services', 'Ideas', 'Careers', 'Contact'].map(
              (item) => (
                <a
                  key={item}
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item);
                  }}
                  className={`text-white no-underline text-sm px-3 py-1 transition-all duration-200 ${
                    item === currentPage
                      ? 'font-bold border-b-2 border-white'
                      : 'font-normal hover:border-b-2 hover:border-white/50'
                  }`}>
                  {item}
                </a>
              )
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
