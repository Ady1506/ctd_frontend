// src/components/DashQT.jsx
import React, { useRef, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import DashCourseCard from './DashCourseCard';
import CourseDetailModal from '../CourseDetailModal'; // Import the detail modal


const DashQT = () => {
    const scrollRef = useRef(null);
    const [courses, setCourses] = useState([]);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for the detail modal
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const isAtStart = scrollLeft <= 0;
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1;
        const contentOverflows = scrollWidth > clientWidth;

        setShowLeftArrow(!isAtStart && contentOverflows);
        setShowRightArrow(!isAtEnd && contentOverflows);
      }
    };

    const fetchCourses = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
          const res = await axios.get(`api/courses`, { 
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
           setCourses([]);
        } finally {
            setIsLoading(false);
            setTimeout(handleScroll, 0);
        }
    }, []); 

    useEffect(() => {
      fetchCourses();
    }, [fetchCourses]);

    useEffect(() => {
      const scrollContainer = scrollRef.current;
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        handleScroll(); 
      }
      return () => {
        if (scrollContainer) {
          scrollContainer.removeEventListener('scroll', handleScroll);
        }
        window.removeEventListener('resize', handleScroll);
      };
    }, [courses, isLoading]); 

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

    const handleViewDetails = (course) => {
        setSelectedCourse(course);
        setIsDetailModalOpen(true);
    };

    const handleCloseDetailModal = () => {
        setIsDetailModalOpen(false);
        setTimeout(() => setSelectedCourse(null), 300);
    };

    const handleCourseAction = (actionType, courseId) => {
        console.log(`Action ${actionType} performed on course ${courseId} from DashQT`);
        fetchCourses();
    };

    const arrowButtonStyle = "focus:outline-none p-1 rounded-full hover:bg-gray-200 transition-colors duration-150";

    return (
      <>
        <div className="flex w-full h-full items-center">
          {/* Left Arrow */}
          <div className="w-[4%] hidden lg:flex justify-center items-center pr-1">
            {showLeftArrow && (
              <button onClick={scrollLeft} aria-label="Scroll left" className={arrowButtonStyle}>
                  <img
                  className="h-5 w-5"
                  src="https://img.icons8.com/?size=100&id=79025&format=png&color=173061"
                  alt=""
                  style={{ transform: 'rotate(180deg)'}}
                  />
              </button>
            )}
          </div>

          {/* Scrollable Course Container */}
          <div
            ref={scrollRef}
            className=" w-[96%] lg:w-[92%] h-56 flex overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] gap-4 p-2"
          >
            {isLoading ? (
               <div className="flex justify-center items-center w-full text-gray-500">Loading...</div>
            ) : error ? (
               <div className="flex justify-center items-center w-full text-red-500">{error}</div>
            ) : courses.length > 0 ? (
              courses.map((course) => (
                <div
                   key={course.id || course._id}
                   className="flex-shrink-0 w-[23%] min-w-[210px] h-52 cursor-pointer"
                   onClick={() => handleViewDetails(course)} 
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
          <div className="w-[4%] hidden lg:flex justify-center items-center pl-1">
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

        {/* Render the Detail Modal */}
        <CourseDetailModal
            course={selectedCourse}
            isOpen={isDetailModalOpen}
            onClose={handleCloseDetailModal}
            onCourseAction={handleCourseAction} // Pass the action handler
        />
      </>
    );
}

export default DashQT;