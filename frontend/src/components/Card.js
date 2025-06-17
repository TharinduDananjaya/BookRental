
import React from 'react';

const Card = ({ children, className = '', hover = true, ...props }) => {
  const baseClasses = 'bg-white rounded-lg shadow-md overflow-hidden';
  const hoverClasses = hover ? 'hover:shadow-xl transition-shadow duration-300' : '';
  const classes = `${baseClasses} ${hoverClasses} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;
