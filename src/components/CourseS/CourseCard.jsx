import React from 'react'

const CourseCard = ({course}) => {
  return (
    <div className='flex flex-col gap-2 h-full'>
        <img src={course.link || '/placeholder.png'} className='h-[55%] w-full p-4 px-8 flex-shrink-0' alt="" />
        <div className='flex flex-col gap-2 p-4 pt-0 px-8 flex-1 min-h-0'>
          <div className='flex flex-col gap-2 h-full min-h-0'>
            <div className='text-3xl font-bold text-[#173061] flex-shrink-0'>{course.name}</div>
            <div className='flex-1 overflow-y-auto pr-2 
                    [&::-webkit-scrollbar]:[width:4px]
                    [&::-webkit-scrollbar-thumb]:bg-[#173061]
                    [&::-webkit-scrollbar-thumb]:rounded-full'>
              <div className='text-md text-[#173061]'>{course.description}</div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CourseCard