import React from 'react'
import RecentAttendanceCard from './RecentAttendanceCard'
const RecentAttendance = () => {
  return (
    <div className='flex flex-col h-full w-full p-4 gap-2'>
        <div className='text-[#173061] text-xl font-bold pb-2'>Recently Attended</div>
        <div className="flex-grow overflow-auto pr-2 
                      [&::-webkit-scrollbar]:[width:3px] 
                      [&::-webkit-scrollbar-thumb]:bg-[#173061] flex flex-col gap-2">
        {Array(15).fill(0).map((_, index) => (
          <RecentAttendanceCard key={index} />
        ))}
      </div>
    </div>
  )
}

export default RecentAttendance