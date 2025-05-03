import React from 'react';
import DashCourseCard from './DashCourseCard'; // Use the new card
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const DashQT = () => {
    const scrollRef = useRef(null);
    const [courses, setCourses] = useState([]);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true); // Initial assumption
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state

    // Define handleScroll once, memoize if needed, but simple definition is fine here
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const isAtStart = scrollLeft <= 0;
        // Check if scroll position is close to the end (within a pixel tolerance)
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1;
        const contentOverflows = scrollWidth > clientWidth;

        setShowLeftArrow(!isAtStart && contentOverflows);
        setShowRightArrow(!isAtEnd && contentOverflows);
      }
    };


    useEffect(() => {
      const fetchCourses = async () => {
        setIsLoading(true);
        setError(null);
        setCourses([]); // Clear previous courses

        try {
          const res = await axios.get('http://localhost:8000/api/courses', {
            withCredentials: true // Include cookies for authentication
          });

          if (Array.isArray(res.data)) {
             setCourses(res.data);
          } else {
             console.warn("API did not return an array for courses:", res.data);
             setCourses([]);
          }

        } catch (err) {
          console.error('Error fetching courses:', err);
           let errorMsg = 'Failed to load courses.';
           if (err.response && (err.response.status === 401 || err.response.status === 403)) {
               errorMsg = 'Authentication failed. Please log in again.';
           } else if (err.message) {
               errorMsg = err.message;
           }
           setError(errorMsg);
           setCourses([]); // Clear courses on error
        } finally {
            setIsLoading(false);
            // Use setTimeout to ensure DOM is updated before calculating scroll
            setTimeout(handleScroll, 0);
        }
      };
      fetchCourses();
    }, []);


    useEffect(() => {
      const scrollContainer = scrollRef.current;
      if (scrollContainer) {
        // Add event listener for scrolling
        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
        // Add event listener for window resize as container width might change
        window.addEventListener('resize', handleScroll);

        // Initial check
        handleScroll();
      }

      // Cleanup listeners on component unmount
      return () => {
        if (scrollContainer) {
          scrollContainer.removeEventListener('scroll', handleScroll);
        }
        window.removeEventListener('resize', handleScroll);
      };
    }, [courses, isLoading]); // Rerun if courses load or loading state changes


    const scrollLeft = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      }
    };

    const scrollRight = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      }
    };

    // Define button style for reuse
    const arrowButtonStyle = "focus:outline-none p-1 rounded-full hover:bg-gray-200 transition-colors duration-150";

    return (
      <div className="flex w-full h-full items-center">
        {/* Left Arrow */}
        <div className="w-[4%] flex justify-center items-center pr-1">
          {showLeftArrow && (
            <button onClick={scrollLeft} aria-label="Scroll left" className={arrowButtonStyle}>
                <img
                className="h-5 w-5" // Use fixed size for icon consistency
                src="https://img.icons8.com/?size=100&id=79025&format=png&color=173061" // Consider hosting icon locally
                alt="" // Alt text can be empty as button has aria-label
                style={{ transform: 'rotate(180deg)'}} // Rotate the icon itself
                />
            </button>
          )}
        </div>

        {/* Scrollable Course Container */}
        <div
          ref={scrollRef}
          // w-[92%] -> container for cards
          // h-[90%] -> Adjust height as needed, e.g., h-56 to contain h-52 cards + padding
          className="w-[92%] h-56 flex overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] gap-4 p-2" // Added padding, adjusted gap
        >
          {isLoading ? (
             <div className="flex justify-center items-center w-full text-gray-500">Loading...</div>
          ) : error ? (
             <div className="flex justify-center items-center w-full text-red-500">{error}</div>
          ) : courses.length > 0 ? (
            courses.map((course) => (
              // Wrapper Div: Enforces size and prevents shrinking
              <div
                 key={course.id || course._id} // Unique key is crucial
                 // Use fixed height (e.g., h-52) and width/min-width. Add flex-shrink-0
                 className="flex-shrink-0 w-[23%] min-w-[210px] h-52 cursor-pointer"
                 // Add onClick handler here if DashCourseCard doesn't need internal clicks
                 // onClick={() => handleCardClick(course)} // Define handleCardClick if needed
               >
                <DashCourseCard course={course} />
              </div>
            ))
          ) : (
             <div className="flex justify-center items-center w-full text-gray-500">
                No courses available.
             </div>
          )}
        </div>

        {/* Right Arrow */}
        <div className="w-[4%] flex justify-center items-center pl-1">
          {showRightArrow && (
             <button onClick={scrollRight} aria-label="Scroll right" className={arrowButtonStyle}>
                <img
                className="h-5 w-5"
                src="https://img.icons8.com/?size=100&id=79025&format=png&color=173061"
                alt=""
                />
             </button>
          )}
        </div>
      </div>
    );
}

export default DashQT;