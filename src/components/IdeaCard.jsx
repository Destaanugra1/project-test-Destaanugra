import React, { useState, useEffect, useRef } from 'react';

const ImageWithFallback = ({ src, alt, className }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  const getFallbackImage = () => {
    const fallbackImages = [
      'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=300&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=300&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=300&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=300&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=300&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=300&h=300&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=300&fit=crop&q=80',
    ];

    const srcHash = src
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = srcHash % fallbackImages.length;

    return fallbackImages[index];
  };

  const handleError = () => {
    if (!hasError) {
      setCurrentSrc(getFallbackImage());
      setHasError(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className='relative w-full h-full overflow-hidden aspect-square'>
      {!isLoaded && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-100'>
          <div className='w-10 h-10 border-t-2 border-orange-500 border-solid rounded-full animate-spin'></div>
        </div>
      )}
      {inView && (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          loading='lazy'
          decoding='async'
          className={`${className} ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-300`}
          onError={handleError}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
};

const IdeaCard = ({ idea }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getImageUrl = () => {
    if (
      idea.small_image &&
      Array.isArray(idea.small_image) &&
      idea.small_image.length > 0
    ) {
      if (idea.small_image[0].url) {
        return idea.small_image[0].url;
      }

      if (typeof idea.small_image[0] === 'string') {
        return idea.small_image[0];
      }
    }

    const categories = [
      'digital-marketing',
      'web-development',
      'ui-ux-design',
      'social-media',
      'content-strategy',
      'mobile-app',
      'data-analytics',
      'branding',
      'e-commerce',
      'tech-trends',
    ];

    const idNum =
      typeof idea.id === 'number' ? idea.id : parseInt(idea.id, 10) || 0;
    const categoryIndex = idNum % categories.length;
    const category = categories[categoryIndex];

    return `https://source.unsplash.com/featured/300x300/?${category}`;
  };

  const getTitle = () => {
    return idea.title || idea.name || 'Untitled Idea';
  };

  return (
    <div className='bg-white mb-4 shadow rounded overflow-hidden hover:shadow-md transition-shadow'>
      <div className='mb-2 w-full aspect-square'>
        <ImageWithFallback
          src={getImageUrl()}
          alt={getTitle() + ' image'}
          className='object-cover w-full h-full'
        />
      </div>
      <div className='p-3'>
        <div className='text-orange-500 text-xs mb-1 font-medium'>
          {formatDate(idea.published_at)}
        </div>
        <h3 className='m-0 text-gray-800 font-bold text-base line-clamp-3 h-[4.5em] overflow-hidden leading-snug'>
          {getTitle()}
        </h3>
      </div>
    </div>
  );
};

export default IdeaCard;
