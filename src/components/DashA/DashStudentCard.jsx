// src/components/DashStudentCard.jsx
import React from 'react';

const DashStudentCard = ({ student }) => {
  // Provide default values in case properties are missing
  const displayName = student?.display_name || 'N/A';
  const rollNumber = student?.roll || 'No Roll';

  return (
    <div className='flex items-center px-4 py-2 justify-between w-full bg-[#DDE4F0] rounded-md shadow-sm'>
      {/* Student Name */}
      <div className='text-[#173061] text-base font-semibold truncate pr-2' title={displayName}>
        {displayName}
      </div>
      {/* Roll Number */}
      <div className='text-[#173061] text-sm font-medium flex-shrink-0'>
        {rollNumber}
      </div>
    </div>
  );
};

export default DashStudentCard;