import React, { useState } from 'react';
import Profo from '../components/Profo';
import CourseList from '../components/CourseS/CourseList';

const Courses = () => {
    const [selectedTab, setSelectedTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className='body flex flex-col w-full h-screen p-2 sm:p-4 md:p-6 lg:p-8 overflow-hidden'>
            {/* Fixed Header */}
            <div className='flex-shrink-0 mb-2 sm:mb-4'>
                {/* Header */}
                <div className='flex flex-row justify-between items-center w-full'>
                    <h1 className='text-lg sm:text-xl lg:text-2xl font-semibold text-[#173061]'>Courses</h1>
                    <Profo />
                </div>

                {/* Toggle Buttons & Search */}
                <div className='flex flex-col sm:flex-row gap-2 sm:gap-3 p-1 sm:p-2 pt-2 sm:pt-4 md:pt-4 items-start sm:items-center w-full'>
                    <div className='flex gap-2'>
                        <button 
                            onClick={() => setSelectedTab('all')}
                            className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-semibold transition-colors ${selectedTab === 'all' ? 'bg-[#173061] text-white' : 'bg-[#626469] text-white hover:bg-[#173061]'}`}>
                            All Courses
                        </button>
                        <button 
                            onClick={() => setSelectedTab('your')}
                            className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-semibold transition-colors ${selectedTab === 'your' ? 'bg-[#173061] text-white' : 'bg-[#626469] text-white hover:bg-[#173061]'}`}>
                            Your Courses
                        </button>
                    </div>

                    {/* Search Input */}
                    <input 
                        type="text" 
                        placeholder="Search courses..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className="w-full sm:w-48 sm:ml-auto px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-400 rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#173061] focus:border-[#173061] transition-colors"
                    />
                </div>
            </div>

            {/* Scrollable Content */}
            <div className='flex-1 overflow-y-auto pr-1 sm:pr-2 
                          [&::-webkit-scrollbar]:[width:4px]
                          [&::-webkit-scrollbar-thumb]:bg-[#173061]
                          [&::-webkit-scrollbar-thumb]:rounded-full'>
                <div className='pb-12 sm:pb-16 lg:pb-0'>
                    {/* Course List */}
                    <CourseList selectedTab={selectedTab} searchTerm={searchTerm} />
                </div>
            </div>
        </div>
    );
};

export default Courses;
