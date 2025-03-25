import React from 'react'
import ToggleItem from './ToggleItem'
const DashQT = () => {
return (
    <div className='w-full h-full bg-lblue flex flex-col justify-between p-4' >
            <h1 className='text-2xl font-semibold text-dblue '>Quick Toggle</h1>
            <div className='grid grid-cols-2 gap-1.5'>
                <ToggleItem/>
                <ToggleItem/>
                <ToggleItem/>
                <ToggleItem/>
                <ToggleItem/>
                <ToggleItem/>
            </div>
    </div>
)
}

export default DashQT
