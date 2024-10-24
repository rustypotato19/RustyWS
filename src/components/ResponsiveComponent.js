import React, { useState, useEffect } from 'react';

const ResponsiveComponent = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 450);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 450);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
    
  return (
    <div>
      {isMobile ? (
        <a href="/">
            <h1 className="text-white text-4xl font-bold flex justify-center items-center mx-2 sm:mx-0">
            Rusty's Web Services
            </h1>
        </a>
      ) : (
        <h1 className="text-white text-4xl font-bold flex justify-center items-center">
        <a href="/" className='flex flex-row items-center justify-center'>
        <img
            src="/images/logos/home.svg"
            alt="Home"
            className="w-10 h-auto mr-3"
        />
        <p>Rusty's Web Services</p>
        </a>
    </h1>
      )}
    </div>
  );
};

export default ResponsiveComponent;
