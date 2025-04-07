import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashCourseCard = ({ course }) => {
    const navigate = useNavigate();

    const handleCourseClick = () => {
        navigate('/CourseDescription', { state: { course } }); // Pass the full course object
    };

    return (
        <div onClick={handleCourseClick} className='cursor-pointer flex flex-col h-full w-full bg-[#DDE4F0] p-4 gap-3 rounded-lg shadow hover:shadow-md transition'>
            {/* Cover Image or Placeholder */}
            <img 
                src={course.cover_pic_url || '/placeholder.png'} 
                className='h-[70%] w-full object-cover rounded-md' 
                alt={course.name} 
            />

            {/* Course Info */}
            <div className='text-[#173061] flex flex-col items-center justify-center h-[30%]'>
                <div className='font-bold text-lg text-center line-clamp-2'>{course.name}</div>
                {/* Optional: You could show teacher or subject here */}
                {/* <div className='text-sm text-center'>{course.subject}</div> */}
            </div>
        </div>
    );
};

export default DashCourseCard;

// import React from 'react'
// import { useNavigate } from 'react-router-dom';
// const DashCourseCard = () => {
//     const navigate = useNavigate();
//     const handleCourseClick = () => {
//         navigate('/CourseDescription')
//     }
//     return (
//         <div onClick={handleCourseClick} className=' cursor-pointer flex flex-col h-full w-full bg-[#DDE4F0] p-4 gap-3'>
//             <img src="image.png" className='h-[70%]' alt="" />
//             <div className=' text-[#173061] flex items-center justify-center h-[30%]'>
//                 <div className='font-bold text-lg text-center'>Advance Finance and Accounts</div>
//                 {/* <div className='text-sm '>Mr Varun Singh</div> */}
//             </div>
//         </div>
//     )
// }

// export default DashCourseCard