// src/pages/Students.jsx
import React, { useState, useEffect } from 'react';
import StudentCard from '../components/StudentCard';   
import StudentModal from '../components/StudentModal'; 
import axios from 'axios';


const Students = () => {
  const [students, setStudents] = useState([]); // State to hold only student users
  const [filteredStudents, setFilteredStudents] = useState([]); // State to hold filtered students
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Search state

  // Fetch Users on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/users`);
        const usersData = response.data;

        const studentUsers = usersData.filter(user => user.role && user.role.toLowerCase() === 'student');
        setStudents(studentUsers);
        setFilteredStudents(studentUsers); // Initialize filtered students

      } catch (e) {
        console.error("Failed to fetch students:", e);
        const errorMsg = e.response?.data?.message || e.response?.data || e.message || 'Please try again later.';
        setError(`Failed to load student data. ${errorMsg}`);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Filter students based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(student => 
        student.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [searchTerm, students]);

  // --- Modal Handling ---
  const handleCardClick = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Delay clearing selected student slightly for smoother transition
    setTimeout(() => setSelectedStudent(null), 300); // Match animation duration
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className='body flex flex-col w-full h-screen p-4 md:p-6 lg:p-8 overflow-hidden'>
      {/* Fixed Header */}
      <div className='flex-shrink-0 mb-4 space-y-4'>
        <h1 className='text-[#173061] text-2xl lg:text-3xl font-semibold lg:pl-2 pl-2'>Student Records</h1>
        
        {/* Search Bar */}
        <div className='relative w-full max-w-md mx-auto lg:mx-0 lg:ml-2'>
          <div className='relative'>
            <input
              type="text"
              placeholder="Search students by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full px-4 py-2 pl-10 pr-10 text-sm border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#173061] focus:border-transparent
                         bg-white shadow-sm transition-all duration-200'
            />
            
            {/* Search Icon */}
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <svg className='h-4 w-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
            </div>
            
            {/* Clear Button */}
            {searchTerm && (
              <button
                onClick={clearSearch}
                className='absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors'
                aria-label="Clear search"
              >
                <svg className='h-4 w-4 text-gray-400 hover:text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            )}
          </div>
          
          {/* Search Results Count */}
          {searchTerm && (
            <p className='text-sm text-gray-500 mt-2 pl-1'>
              {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className='flex-1 overflow-y-auto pr-2 
                    [&::-webkit-scrollbar]:[width:4px]
                    [&::-webkit-scrollbar-thumb]:bg-[#173061]
                    [&::-webkit-scrollbar-thumb]:rounded-full'>
        <div className='pb-16 lg:pb-4'>
          {/* Content area with bottom padding for mobile navbar */}
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <p className="text-gray-500">Loading students...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-10 text-red-600">
              <p>{error}</p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="flex justify-center items-center py-10">
              <p className="text-gray-500">
                {searchTerm ? `No students found matching "${searchTerm}"` : 'No students found.'}
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 p-2'>
              {filteredStudents.map(student => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onClick={handleCardClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Student Modal */}
      <StudentModal
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Students;