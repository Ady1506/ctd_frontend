import React from 'react'
import UpdatesCard from './UpdatesCard'
const Updates = () => {
  return (
    <div className='h-full w-full flex flex-col gap-3 p-4 '>
      <div className='flex justify-between w-full text-[#173061]'>
        <div className='font-bold text-lg cursor-default'>Updates</div>
        <div className='underline cursor-pointer'>view all</div>
      </div>
      <div className='flex flex-col gap-2 w-full h-full'>
        <UpdatesCard />
        <UpdatesCard />
        <UpdatesCard />
      </div>
    </div>
  )
}

export default Updates