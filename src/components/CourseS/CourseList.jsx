import React, { useState } from 'react';
import DashCourseCard from '../DashS/DashCourseCard';

const allCourses = Array(32).fill(null); // Simulated all courses
const yourCourses = Array(17).fill(null); // Simulated user-specific courses

const CourseList = ({ selectedTab }) => {
    const itemsPerPage = 8; // Maintain consistent space for 8 items per page
    const courses = selectedTab === 'all' ? allCourses : yourCourses;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.max(1, Math.ceil(courses.length / itemsPerPage));

    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleCourses = courses.slice(startIndex, startIndex + itemsPerPage);

    // Fill remaining spots with placeholders to keep the grid size the same
    const emptySlots = itemsPerPage - visibleCourses.length;

    return (
        <div className="flex flex-col flex-grow px-10 pb-0">
            {/* Course Grid (Maintains Fixed Structure) */}
            <div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
                style={{ minHeight: '300px' }} // Ensure grid never shrinks
            >  
                {visibleCourses.map((_, index) => (
                    <div 
                        key={startIndex + index} 
                        className="w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px] p-2 pb-0"
                    >
                        <DashCourseCard />
                    </div>
                ))}
                
                {/* Invisible placeholders to maintain grid structure */}
                {[...Array(emptySlots)].map((_, index) => (
                    <div 
                        key={`empty-${index}`} 
                        className="w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px] p-2 pb-0 invisible"
                    />
                ))}
            </div>

            {/* Pagination (Only Show When Needed) */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-4 text-lg">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-3 rounded ${
                                currentPage === index + 1 ? 'text-black font-semibold' : 'text-gray-500'
                            }`}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CourseList;
