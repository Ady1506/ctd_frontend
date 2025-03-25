import React from 'react'

const CourseCardEnrolled = () => {
  return (
    <div className='flex p-4 gap-5 h-full w-full'>
        <img src="image.png" className='flex-[2]' alt="" />
        <div className='flex flex-col flex-[3] gap-2 h-full justify-between py-2'>
          <div className='flex flex-col gap-1'>
            <div className='text-3xl font-bold text-[#173061]'>Advance Finance</div>
            <div className='text-md text-[#173061]'>A small description for the course which will be helpful to the user.</div>
          </div>
          {/* <div className='flex flex-col'>
            <div className='text-sm text-[#173061] '>Tutor</div>
            <div className='text-lg text-[#173061] font-bold'>Mr. Varun Singh</div>
          </div> */}
        </div>
    </div>
  )
}

export default CourseCardEnrolled