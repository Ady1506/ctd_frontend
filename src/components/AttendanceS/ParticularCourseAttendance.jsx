import React from 'react';

const ParticularCourseAttendance = ({ courseName, percentage }) => {
  return (
    <div className='flex items-center p-4 justify-between h-full w-full bg-[#DDE4F0] rounded-md'>
      <div className='text-[#173061] text-lg'>{courseName}</div>
      <div className='text-[#173061] text-xl font-bold'>{percentage.toFixed(1)}%</div>
    </div>
  );
};

export default ParticularCourseAttendance;