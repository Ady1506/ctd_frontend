import React from 'react'
import DashAttendanceCard from './DashAttendanceCard'
const DashAttendance = () => {
  return (
    <div className='h-full w-full flex flex-col gap-3 p-4 '>
      <div className='flex justify-between w-full text-[#173061]'>
        <div className='font-bold text-[1.4rem] cursor-default'>Attendance</div>
        <div className='underline cursor-pointer'>view all</div>
      </div>
      <div className='flex flex-col gap-2 w-full h-full'>
        <DashAttendanceCard />
        <DashAttendanceCard />
        <DashAttendanceCard />
      </div>
    </div>
  )
}

export default DashAttendance