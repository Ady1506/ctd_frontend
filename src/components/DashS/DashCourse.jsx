import React, { useRef, useState, useEffect } from 'react';
import DashCourseCard from './DashCourseCard';

const DashCourse = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Scroll Left
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  // Scroll Right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Check scroll position and toggle arrow visibility
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex w-full h-full items-center">
      {/* Left Arrow */}
      <div className="w-[5%] flex justify-center items-center">
        {showLeftArrow && (
          <img
            className="h-6 cursor-pointer rotate-180"
            src="https://img.icons8.com/?size=100&id=79025&format=png&color=173061"
            alt="Left Arrow"
            onClick={scrollLeft}
          />
        )}
      </div>

      {/* Scrollable Course Container */}
      <div
        ref={scrollRef}
        className={`${
          windowWidth >= 1000
            ? 'w-[100%] h-[100%] flex items-center overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:"none"] [scrollbar-width:"none"] gap-6'
            : 'w-[100%] h-[100%] flex items-center justify-center'
        }`}
      >
        {windowWidth >= 1000
          ? Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="min-w-[375px]">
                <DashCourseCard />
              </div>
            ))
          : (
            <div className="min-w-[375px]">
              <DashCourseCard />
            </div>
          )}
      </div>

      {/* Right Arrow */}
      <div className="w-[5%] flex justify-center items-center">
        {showRightArrow && (
          <img
            className="h-6 cursor-pointer"
            src="https://img.icons8.com/?size=100&id=79025&format=png&color=173061"
            alt="Right Arrow"
            onClick={scrollRight}
          />
        )}
      </div>
    </div>
  );
};

export default DashCourse;
