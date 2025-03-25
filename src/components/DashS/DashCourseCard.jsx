import React from 'react'
import { useNavigate } from 'react-router-dom';
const DashCourseCard = () => {
    const navigate = useNavigate();
    const handleCourseClick = () => {
        navigate('/CourseDescription')
    }
    return (
        <div onClick={handleCourseClick} className=' cursor-pointer flex flex-col h-full w-full bg-[#DDE4F0] p-4 gap-2'>
            <img src="image.png" className='h-[75%]' alt="" />
            <div className=' text-[#173061] flex items-center justify-center'>
                <div className='font-bold text-lg'>Advance Finance</div>
                {/* <div className='text-sm '>Mr Varun Singh</div> */}
            </div>
        </div>
    )
}

export default DashCourseCard