import React from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const DashRCard = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleCard = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            className={`w-full ${isOpen ? 'h-26' : 'h-12'} bg-[#DAE1EC] rounded-s flex flex-col justify-between items-center px-3 cursor-pointer transition-all duration-300 ease-in-out`}
            onClick={toggleCard}
        >
            <div className='flex flex-row justify-between items-center w-full'>
                <img src='https://img.icons8.com/?size=100&id=11781&format=png&color=173061' className='w-8 h-8' />
                <div className='flex flex-row items-center gap-2'>
                <div className='flex flex-col justify-center items-end h-full '>
                    <h1 className='font-semibold text-lg'>Jasdeep Singh</h1>
                    <h2 className='text-sm font-medium text-gray-500'>102218011</h2>
                </div>
                <div className='ml-2'>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                </div>
            </div>
            {isOpen && (
                <div className='flex flex-col justify-center items-start w-full mt-2'>
                    <h3 className='text-md font-medium'>Course Name: Example Course</h3>
                    <h4 className='text-sm font-medium text-gray-500'>Time: 10:00 AM - 11:00 AM</h4>
                </div>
            )}
        </div>
    );
};

export default DashRCard;
