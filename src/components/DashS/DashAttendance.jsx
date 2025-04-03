import React from 'react'
import DashAttendanceCard from './DashAttendanceCard'
import { useNavigate } from 'react-router-dom';
const DashAttendance = () => {
  const navigate = useNavigate();
  const handleViewAllClick = () => {
    // Navigate to the attendance page
    navigate('/attendance');
  };

  return (
    <div className='h-full w-full flex flex-col gap-3 p-4 '>
      <div className='flex justify-between w-full text-[#173061]'>
        <div className='font-bold text-lg cursor-default'>Attendance</div>
        <div className='underline cursor-pointer' onClick={handleViewAllClick}>view all</div>
      </div>
      <div className="flex-grow overflow-auto pr-2 
                      [&::-webkit-scrollbar]:[width:3px] 
                      [&::-webkit-scrollbar-thumb]:bg-[#173061] flex flex-col gap-2">
        {Array(15).fill(0).map((_, index) => (
          <DashAttendanceCard key={index} />
        ))}
      </div>
    </div>
  );
}

export default DashAttendance