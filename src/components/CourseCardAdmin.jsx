// src/components/CourseCard.jsx
import React from 'react';

const CourseCard = ({ course, onClick }) => {
  return (
    <div
      key={course.id}
      className='bg-dblue text-white p-4 md:p-5 rounded-lg shadow-lg flex flex-col justify-between cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-200 min-h-[150px]' // Added min-height
      onClick={() => onClick(course)}
    >
      <div>
        <h2 className='font-semibold text-lg md:text-xl mb-1 truncate'>{course.name || 'Untitled Course'}</h2>
        <p className='text-sm font-light text-blue-200 mb-2'>{course.subject || 'No Subject'}</p>
        {/* Optionally add a short description preview */}
        <p className='text-xs font-light line-clamp-2'>{course.description || 'No description available.'}</p>
      </div>
      <div className="text-right mt-3">
        <span className='text-xs font-medium bg-white text-dblue py-1 px-2 rounded-sm shadow'>
            View Details →
        </span>
      </div>
    </div>
  );
};

export default CourseCard;