import React from 'react'

const EnrollmentPeriodCard = () => {
  return (
    <div className='mt-2 flex bg-[#DAE1EC] p-2'>
        <div className='flex flex-col flex-[1] items-center'>
            <div className='text-sm font-bold text-dblue pb-1'>Period</div>
            <div className='text-2xl font-bold text-dblue'>6</div>
            <div className='text-sm font-bold text-dblue'>Months</div>
        </div>
        <div className='flex-[2] flex border-l-2 border-[#999999b2]'>
            <div className='flex flex-col flex-[1] items-center'>
                <div className='text-sm  text-dblue pb-1'>From</div>
                <div className='text-2xl font-bold text-dblue'>6</div>
                <div className='text-sm font-bold text-dblue'>Jan</div>
            </div>
            <div className='flex items-center text-3xl text-[#999999b2]'>-</div>
            <div className='flex flex-col flex-[1] items-center'>
                <div className='text-sm  text-dblue pb-1'>To</div>
                <div className='text-2xl font-bold text-dblue'>6</div>
                <div className='text-sm font-bold text-dblue'>Mar</div>
            </div>
        </div>
    </div>
  )
}

export default EnrollmentPeriodCard