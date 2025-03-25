import React, { useState } from 'react';
import ParticularCourseAttendance from './ParticularCourseAttendance';

const CourseAttendance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const courses = [
    'Mathematics', 'Physics', 'Computer Science', 'Electronics',
    'Mechanical', 'Civil', 'AI & ML', 'Data Science',
    'Cyber Security', 'Cloud Computing', 'Blockchain', 'Bioinformatics'
  ];

  const filteredCourses = courses.filter(course =>
    course.toLowerCase().includes(searchTerm.toLowerCase())
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
              <ParticularCourseAttendance courseName={course} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseAttendance;
