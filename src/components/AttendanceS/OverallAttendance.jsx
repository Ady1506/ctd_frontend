import React from 'react'

const OverallAttendance = ({totalPercentage}) => {
  return (
    <div className='flex items-center p-4 justify-between h-full w-full bg-[#DDE4F0] rounded-md'>
        <div className='text-[#173061] text-xl font-bold'>Overall Attendance</div>
        <div className='text-[#173061] text-xl font-bold'>{totalPercentage.toFixed(1)} %</div>
    </div>
  )
}

export default OverallAttendance