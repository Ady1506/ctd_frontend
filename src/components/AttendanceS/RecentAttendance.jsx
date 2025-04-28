import React from 'react';
import RecentAttendanceCard from './RecentAttendanceCard';

const RecentAttendance = ({ loading, recentAttendance }) => {
  return (
    <div className='flex flex-col h-full w-full p-4 gap-2'>
        <div className='text-[#173061] text-xl font-bold pb-2'>Recently Attended</div>
        <div className="flex-grow overflow-auto pr-2 
                      [&::-webkit-scrollbar]:[width:3px] 
                      [&::-webkit-scrollbar-thumb]:bg-[#173061] flex flex-col gap-2">
            {loading ? (
                <div>Loading...</div>
            ) : recentAttendance.length === 0 ? (
                <div className="flex justify-center items-center h-full text-gray-500 font-bold">
                    No attendance record
                </div>
            ) : (
                recentAttendance.map((item, index) => (
                    <RecentAttendanceCard key={index} data={item} />
                ))
            )}
        </div>
    </div>
  );
};

export default RecentAttendance;