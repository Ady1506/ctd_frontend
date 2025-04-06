import React, { useState } from 'react';
import Profo from '../components/Profo';
import CourseList from '../components/CourseS/CourseList';

const Courses = () => {
    const [selectedTab, setSelectedTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className='body flex flex-col w-full h-full p-4 md:p-10 md:pb-0 bg-gray-100'>
            {/* Header */}
            <div className='flex flex-row justify-between items-center w-full'>
                <h1 className='text-2xl md:text-3xl font-semibold text-dblue'>Courses</h1>
                <Profo />
            </div>

            {/* Toggle Buttons & Search */}
            <div className='sub-body flex gap-3 p-2 pt-4 md:pt-4 items-center w-full'>
                <button 
                    onClick={() => setSelectedTab('all')}
                    className={`px-4 py-2 rounded text-sm font-semibold ${selectedTab === 'all' ? 'bg-[#173061] text-white' : 'bg-[#626469] text-white'}`}>
                    All Courses
                </button>
                <button 
                    onClick={() => setSelectedTab('your')}
                    className={`px-4 py-2 rounded text-sm font-semibold ${selectedTab === 'your' ? 'bg-[#173061] text-white' : 'bg-[#626469] text-white'}`}>
                    Your Courses
                </button>

                {/* Search Input */}
                <input 
                    type="text" 
                    placeholder="Search courses..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="ml-auto px-3 py-2 border border-gray-400 rounded text-sm w-48 focus:outline-none focus:ring-2 focus:ring-[#173061]"
                />
            </div>

            {/* Course List */}
            <CourseList selectedTab={selectedTab} searchTerm={searchTerm} />
        </div>
    );
};

export default Courses;
