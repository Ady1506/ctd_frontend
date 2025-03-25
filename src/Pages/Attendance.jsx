import React, { useState } from 'react';
import Profo from '../components/Profo';
import OverallAttendance from '../components/AttendanceS/OverallAttendance';
import RecentAttendance from '../components/AttendanceS/RecentAttendance';
import CourseAttendance from '../components/AttendanceS/CourseAttendance';
const Attendance = () => {
    

    return (
        <div className='body flex flex-col w-full h-full p-4 md:p-10 bg-gray-100'>
            {/* Header */}
            <div className='flex flex-row justify-between items-center w-full'>
                <h1 className='text-2xl md:text-3xl font-semibold text-dblue'>Attendance Record</h1>
                <Profo />
            </div>

            <div class="sub-body  sm:flex sm:flex-col lg:grid grid-cols-3 grid-rows-4 w-full bg-[#CFCFCF] m-2 mt-6 h-full lg:h-[75vh] gap-0.5">
            <div className="col-span-2 row-span-1 bg-[#E4E9F0] p-8 flex items-center">
                    <OverallAttendance />
                </div>
                <div className="col-span-1 row-span-4 bg-[#E4E9F0] p-8 py-4 flex flex-col">
                    <RecentAttendance />
                </div>
                <div className="col-span-2 row-span-3 bg-[#E4E9F0] p-8 py-4 flex flex-col">
                    <CourseAttendance />
                </div>
            </div>

        </div>
    );
};

export default Attendance;
