import React from 'react'
import DashRCard from './DashRCard'

const DashRecent = () => {
  return (
    <div className='w-full h-full bg-lblue rounded-md flex flex-col p-2 gap-4 '>
        <h1 className='font-semibold text-2xl text-dblue m-2'>Recent Registrations</h1>
        <div className='flex flex-col gap-1 overflow-auto [&::-webkit-scrollbar]:[width:3px]
            [&::-webkit-scrollbar-thumb]:bg-dblue'>
          <DashRCard/>
          <DashRCard/>
          <DashRCard/>
          <DashRCard/>
          <DashRCard/>
          <DashRCard/>
          <DashRCard/>
          <DashRCard/>
          <DashRCard/>
          <DashRCard/>
          <DashRCard/>
          <DashRCard/>
          <DashRCard/>
        </div>
    </div>
  )
}

export default DashRecent
