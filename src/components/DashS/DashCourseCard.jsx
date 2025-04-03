import React from 'react'
import { useNavigate } from 'react-router-dom';
const DashCourseCard = () => {
    const navigate = useNavigate();
    const handleCourseClick = () => {
        navigate('/CourseDescription')
    }
    return (
        <div onClick={handleCourseClick} className=' cursor-pointer flex flex-col h-full w-full bg-[#DDE4F0] p-4 gap-3'>
            <img src="image.png" className='h-[70%]' alt="" />
            <div className=' text-[#173061] flex items-center justify-center h-[30%]'>
                <div className='font-bold text-lg text-center'>Advance Finance and Accounts</div>
                {/* <div className='text-sm '>Mr Varun Singh</div> */}
            </div>
        </div>
    )
}

export default DashCourseCard