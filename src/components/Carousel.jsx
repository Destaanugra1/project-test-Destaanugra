import React, { useEffect, useState, useRef } from 'react';

const LazyBackgroundImage = ({ imageUrl, scrollPosition }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      setCurrentSrc(imageUrl);
      setIsLoaded(true);
    };

    img.onerror = () => {
      setCurrentSrc('https://via.placeholder.com/1200x800?text=Banner+Image');
      setIsLoaded(true);
    };

    img.src = imageUrl;

    imgRef.current = img;

    return () => {
      if (imgRef.current) {
        imgRef.current.onload = null;
        imgRef.current.onerror = null;
      }
    };
  }, [imageUrl]);

  return (
    <>
      {!isLoaded && (
        <div className='absolute inset-0 z-10 flex items-center justify-center bg-gray-800'>
          <div className='w-16 h-16 border-t-4 border-b-4 border-orange-500 rounded-full animate-spin'></div>
        </div>
      )}

      <div
        className={`absolute inset-0 z-0 transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: currentSrc ? `url(${currentSrc})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: `center calc(30% + ${scrollPosition * 0.15}px)`,
          backgroundAttachment: 'initial',
          filter: 'brightness(0.4)',
          transform: `translateY(${scrollPosition * 0.15}px) scale(1.1)`,
          transition: 'transform 0.1s ease-out, opacity 0.5s ease',
          height: 'calc(100% + 150px)',
          top: '-75px',
        }}
      />
    </>
  );
};

const Carousel = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='w-full h-[350px] relative mb-0 overflow-hidden'>
      <div
        className='absolute inset-0 z-0 overflow-hidden'
        style={{
          transform: 'skewY(-5deg)',
          transformOrigin: 'bottom left',
        }}>
        <LazyBackgroundImage
          imageUrl='https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'
          scrollPosition={scrollPosition}
        />

        <div className='absolute inset-0 bg-black/30 z-1'></div>
      </div>

      <div className='relative z-10 flex items-center justify-center h-full'>
        <div
          className='text-center text-white pb-6'
          style={{
            transform: `translateY(${scrollPosition * -0.1}px)`,
            transition: 'transform 0.1s ease-out',
          }}>
          <h1 className='text-5xl sm:text-6xl font-bold m-0 drop-shadow-lg'>
            Ideas
          </h1>
          <div className='text-xl sm:text-2xl font-normal mt-3 text-white/90 drop-shadow-md'>
            Where all great things begin
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
