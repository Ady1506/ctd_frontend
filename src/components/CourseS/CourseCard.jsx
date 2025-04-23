import React from 'react'

const CourseCard = ({course}) => {
  return (
    <div className='flex flex-col gap-2 h-[75vh]'>
        <img src={course.link || '/placeholder.png'} className='h-[55%] w-full p-4 px-8' alt="" />
        <div className='flex flex-col gap-2 p-4 pt-0 px-8 h-full justify-between'>
          <div className='flex flex-col gap-2'>
            <div className='text-3xl font-bold text-[#173061]'>{course.name}</div>
            <div className='text-md text-[#173061]'>{course.description}</div>
          </div>
          {/* <div className='flex flex-col items-end'>
            <div className='text-sm text-[#173061] '>Tutor</div>
            <div className='text-lg text-[#173061] font-bold'>Mr. Varun Singh</div>
          </div> */}
        </div>
    </div>
  )
}

export default CourseCard