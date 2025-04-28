import React from 'react';
import dayjs from 'dayjs';

const RecentAttendanceCard = ({ data }) => {
  const { courseName, markedAt } = data;
  const formattedDate = dayjs(markedAt).format('DD MMM');

  return (
    <div className='flex border-l-2 border-[#173061] items-center p-4 justify-between w-full bg-[#DDE4F0] rounded-md'>
        <div className='text-[#173061] text-lg font-bold'>{courseName}</div>
        <div className='text-[#173061] text-xl font-bold flex flex-col items-center'>
            {formattedDate.split(' ')[0]} <br /> <span className='font-normal text-lg'>{formattedDate.split(' ')[1]}</span>
        </div>
    </div>
  );
};

export default RecentAttendanceCard;