import React from 'react'

const DashStat = () => {
    return (
        <div className='h-full w-full bg-lblue rounded-md flex flex-col p-4'>
            <div className='flex flex-row justify-between items-center w-full'>
                <h1 className='text-2xl font-semibold'>Statistics</h1>
                <div className='flex flex-row items-center gap-2'>
                    <select className='font-medium bg-transparent border border-gray-300 rounded-md p-2 focus:outline-none '>
                        <option value="yearly">Yearly</option>
                        <option value="monthly">Monthly</option>
                        <option value="weekly">Weekly</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default DashStat
