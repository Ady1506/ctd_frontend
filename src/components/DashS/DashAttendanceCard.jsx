import React from 'react';
import dayjs from 'dayjs';

const DashAttendanceCard = ({ data }) => {
  const { courseName, markedAt } = data;
  const formattedDate = dayjs(markedAt).format('DD MMM'); 

  return (
    <div className='flex items-center px-4 py-1 justify-between w-full bg-[#DDE4F0] rounded-md'>
      <div className='text-[#173061] text-lg font-bold'>{courseName}</div>
      <div className='text-[#173061] text-xl font-bold flex flex-col items-center'>
        {formattedDate.split(' ')[0]} <span className='font-normal text-lg'>{formattedDate.split(' ')[1]}</span>
      </div>
    </div>
  );
};

export default DashAttendanceCard;