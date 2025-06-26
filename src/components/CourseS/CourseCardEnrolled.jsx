import React from 'react';

const CourseCardEnrolled = ({ course }) => {
  if (!course) return null;

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 p-4 gap-5 h-full w-full'>
      {/* Course image */}
      <div className='w-full h-full overflow-hidden rounded-md bg-gray-200 flex items-center justify-center'>
      <img
        src={course.link || '/placeholder.png'}
        alt={course.name}
        className='w-full h-full object-cover'
      />
    </div>
      <div className='flex flex-col gap-2 h-full py-2 min-h-0'>
        <div className='text-3xl font-bold text-[#173061] flex-shrink-0'>{course.name}</div>
        <div className='flex-1 overflow-y-auto pr-2 
                    [&::-webkit-scrollbar]:[width:4px]
                    [&::-webkit-scrollbar-thumb]:bg-[#173061]
                    [&::-webkit-scrollbar-thumb]:rounded-full'>
          <div className='text-md text-[#173061] pr-2'>{course.description}</div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardEnrolled;
