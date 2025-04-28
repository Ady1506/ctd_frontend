import React, { useState } from 'react';
import ParticularCourseAttendance from './ParticularCourseAttendance';

const CourseAttendance = ({ subjectWise }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Convert subjectWise object to an array of { courseName, percentage }
  const courses = Object.entries(subjectWise).map(([courseName, percentage]) => ({
    courseName,
    percentage,
  }));

  // Filter courses based on the search term
  const filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex flex-col h-full w-full p-4 gap-2'>
      {/* Header with Search */}
      <div className='flex items-center justify-between w-full'>
        <div className='text-[#173061] text-xl font-bold'>Course Based</div>
        <input
          type='text'
          placeholder='Search course...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#173061]'
        />
      </div>

      {/* Scrollable Grid Layout */}
      <div className='overflow-y-auto max-h-[300px] pr-2 [&::-webkit-scrollbar]:[width:3px]
            [&::-webkit-scrollbar-thumb]:bg-dblue'>
        <div className='grid grid-cols-2 gap-4'>
          {filteredCourses.map((course, index) => (
            <div key={index} className='flex flex-col gap-2'>
              <ParticularCourseAttendance
                courseName={course.courseName}
                percentage={course.percentage}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseAttendance;