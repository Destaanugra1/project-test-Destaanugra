import React from 'react';

const Carousel = () => (
  <div
    style={{
      width: '100%',
      height: 180,
      background: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 32,
      borderRadius: 12,
    }}>
    <h2 style={{ color: '#ff6600', fontWeight: 700, fontSize: 32 }}>
      Ideas
      <br />
      <span style={{ color: '#333', fontWeight: 400, fontSize: 18 }}>
        Where all great things begin
      </span>
    </h2>
  </div>
);

// moved to components/Carousel.jsx
export default Carousel;
