// src/pages/Courses.jsx
import React, { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCardAdmin.jsx';
import CourseDetailModal from '../components/CourseDetailModal';
import CreateCourseModal from '../components/CreateCourseModal.jsx';
import CourseArchiveDetailModal from '../components/CourseArchiveDetailModal';
import axios from 'axios';


const API_BASE_URL = 'http://localhost:8000/api';

const Forms = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('active');

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isArchiveDetailModalOpen, setIsArchiveDetailModalOpen] = useState(false);

    // --- Updated fetchCourses (always includes credentials) ---
    const fetchCourses = async (tab) => {
        setLoading(true);
        setError(null);
        setCourses([]);

        const url = tab === 'active'
           ? `${API_BASE_URL}/courses`
           : `${API_BASE_URL}/courses/archived`;

        console.log(`Fetching courses from: ${url} (Tab: ${tab})`);

        try {
            const response = await axios.get(url);
            const data = response.data;
            if (Array.isArray(data)) {
                setCourses(data);
            } else {
                setCourses([]);
            }
        } catch (e) {
            console.error("Failed to fetch courses:", e);
            const errorMsg = e.response?.data?.message || e.response?.data || e.message || "Failed to load courses.";
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses(activeTab);
    }, [activeTab]);

    const handleViewDetails = (course) => {
        setSelectedCourse(course);
        if (course.archived) {
            setIsArchiveDetailModalOpen(true);
            setIsDetailModalOpen(false);
        } else {
            setIsDetailModalOpen(true);
            setIsArchiveDetailModalOpen(false);
        }
    };

    const handleCloseDetailModal = () => {
        setIsDetailModalOpen(false);
        setTimeout(() => setSelectedCourse(null), 300);
    };

    const handleCloseArchiveDetailModal = () => {
        setIsArchiveDetailModalOpen(false);
        setTimeout(() => setSelectedCourse(null), 300);
    };

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true);
    };
    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
    };
    const handleCourseCreated = (newCourse) => {
        if (activeTab === 'active') {
            setCourses(prevCourses => [newCourse, ...prevCourses]);
        }
    };

    const handleCourseAction = (actionType, courseId) => {
        console.log(`Action ${actionType} performed on course ${courseId}`);
        fetchCourses(activeTab);
    };

    let content;
    if (loading) {
        content = <div className="flex justify-center items-center py-10"><p className="text-gray-500">Loading courses...</p></div>;
    } else if (error) {
        content = <div className="flex justify-center items-center py-10 text-red-600"><p>{error}</p></div>;
    } else if (courses.length === 0) {
        const message = activeTab === 'active'
           ? "No active courses found. Click '+' to create one!"
           : "No archived courses found.";
        content = <div className="flex justify-center items-center py-10"><p className="text-gray-500">{message}</p></div>;
    } else {
        content = (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-4'>
                {courses.map((course) => (
                    <CourseCard
                        key={course.id || course._id}
                        course={course}
                        onClick={handleViewDetails}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className='body flex flex-col w-full h-screen p-4 md:p-6 lg:p-8 overflow-hidden'>
            {/* Fixed Header */}
            <div className='flex-shrink-0 mb-4'>
                <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold mb-3 text-dblue'>Courses Dashboard</h1>

                <div className="flex space-x-4 mb-4 border-b border-gray-300">
                    <button
                        onClick={() => setActiveTab('active')}
                        className={`px-4 py-2 text-sm font-medium transition-colors duration-150 ${activeTab === 'active'
                            ? 'border-b-2 border-dblue text-dblue'
                            : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'}`}
                    >
                        Active Courses
                    </button>
                    <button
                        onClick={() => setActiveTab('archived')}
                        className={`px-4 py-2 text-sm font-medium transition-colors duration-150 ${activeTab === 'archived'
                            ? 'border-b-2 border-dblue text-dblue'
                            : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'}`}
                    >
                        Archived Courses
                    </button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className='flex-1 overflow-y-auto pr-2 
                          [&::-webkit-scrollbar]:[width:4px]
                          [&::-webkit-scrollbar-thumb]:bg-[#173061]
                          [&::-webkit-scrollbar-thumb]:rounded-full'>
                <div className='pb-16 lg:pb-0'>
                    {content}
                </div>
            </div>

            {activeTab === 'active' && (
                <button
                    onClick={handleOpenCreateModal}
                    className='fixed bottom-20 lg:bottom-8 right-8 bg-[#173061] text-white text-3xl w-16 h-16 rounded-full shadow-2xl border-4 border-[#eaeff3] flex items-center justify-center hover:bg-[#0f1f42] hover:scale-110 transition-all duration-200 z-30'
                    title="Create New Course"
                    aria-label="Create New Course"
                    style={{ lineHeight: '1' }}
                >
                    +
                </button>
            )}

            <CourseDetailModal
                course={selectedCourse}
                isOpen={isDetailModalOpen}
                onClose={handleCloseDetailModal}
                onCourseAction={handleCourseAction}
            />

            <CourseArchiveDetailModal
                 course={selectedCourse}
                 isOpen={isArchiveDetailModalOpen}
                 onClose={handleCloseArchiveDetailModal}
                 onCourseAction={handleCourseAction}
            />

            <CreateCourseModal
                isOpen={isCreateModalOpen}
                onClose={handleCloseCreateModal}
                onCourseCreated={handleCourseCreated}
            />
        </div>
    );
};

export default Forms;

