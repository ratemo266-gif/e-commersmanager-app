import React from 'react';

const LoadingSpinner = ({ size = 'medium' }) => {
  const sizes = {
    small: '24px',
    medium: '40px',
    large: '60px'
  };

  return (
    <div className="spinner-container">
      <div 
        className="spinner" 
        style={{ 
          width: sizes[size], 
          height: sizes[size],
          borderWidth: size === 'small' ? '2px' : '3px'
        }}
      />
    </div>
  );
};

export default LoadingSpinner;