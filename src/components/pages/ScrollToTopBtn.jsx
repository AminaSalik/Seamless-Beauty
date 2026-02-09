import React, { useState, useEffect } from 'react';
import "../../assets/style/ScrollToTopBtn.css";

const ScrollToTopBtn = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {

      if (window.pageYOffset > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <a
      href="#"
      onClick={scrollToTop}
      className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        cursor: 'pointer'
      }}
    >
      <svg viewBox="0 0 448 512" width="20" height="20">
        <path
          fill="currentColor"
          d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L256 165.4V464c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V165.4L53.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
        />
      </svg>
    </a>
  );
};

export default ScrollToTopBtn;