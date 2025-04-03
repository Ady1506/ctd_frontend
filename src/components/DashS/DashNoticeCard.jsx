// import React from 'react'

// const DashNoticeCard = () => {
//   return (
//     <div className='w-full h-[60px] bg-[#DDE4F0] rounded-lg p-3 shadow-md'>
//       {/* Attendance Card Content */}
//     </div>
//   )
// }

// export default DashNoticeCard
import React from 'react';
import { FaPaperclip } from 'react-icons/fa';

const DashNoticeCard = ({ date, time, text, hasAttachment }) => {
  return (
    <div className='w-full h-[180px] bg-[#DDE4F0] rounded-lg p-4 shadow-lg relative flex flex-col items-center justify-center text-[#173061]'>
      {/* Date and Time */}
      <div className='absolute top-2 left-2'>
        <div className='text-l font-bold'>{date}</div>
        <div className='text-xs'>{time}</div>
      </div>
      {/* Notice Text */}
      {/* <div className='text-sm font-semibold text-center px-2'>{text.length > 50 ? text.substring(0, 50) + '...' : text}</div> */}
      <div className='text-sm font-semibold text-center px-2 overflow-hidden line-clamp-2'>{text}</div>

      {/* Attachment Icon */}
      <FaPaperclip className={`absolute top-2 right-2 text-${hasAttachment ? '[#173061]' : 'gray'}-500 cursor-pointer`} />
    </div>
  );
};

export default DashNoticeCard;
