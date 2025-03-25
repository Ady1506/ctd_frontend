import React from 'react'
import EnrollmentPeriodCard from './EnrollmentPeriodCard'
const EnrollCard = () => {
  return (
    <div className='flex flex-col gap-2 w-full h-[75vh] p-5 px-8'>
      <div className='text-2xl  font-semibold text-dblue'>Enrollment</div>
      <div className='flex flex-col h-full justify-between mt-2'>
        <EnrollmentPeriodCard />
        <div className='bg-dblue text-white rounded-md flex justify-center p-2 cursor-pointer' >Enroll</div>
      </div>
    </div>
  )
}

export default EnrollCard