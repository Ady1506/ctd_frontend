import React from 'react'
import { useNavigate } from 'react-router-dom';
const DashCourseCard = () => {
    const navigate = useNavigate();
    const handleCourseClick = () => {
        navigate('/CourseDescription')
    }
    return (
        <div onClick={handleCourseClick} className=' cursor-pointer flex flex-col h-[full] w-[full] bg-[#DDE4F0] px-4 py-2 gap-2'>
            <img src="image.png" className='h-[75%] pt-2' alt="" />
            <div className=' text-[#173061] flex items-center justify-start'>
                <div className='font-semibold text-[1.5rem]'>Advance Finance</div>
            </div>
        </div>
    )
}

export default DashCourseCard