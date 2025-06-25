// src/pages/Students.jsx
import React, { useState, useEffect } from 'react';
import StudentCard from '../components/StudentCard';   
import StudentModal from '../components/StudentModal'; 
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Configure your API base URL

const Students = () => {
  const [students, setStudents] = useState([]); // State to hold only student users
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Users on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        const usersData = response.data;

        const studentUsers = usersData.filter(user => user.role && user.role.toLowerCase() === 'student');
        setStudents(studentUsers);

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


  return (
    <div className='body flex flex-col w-full h-screen p-4 md:p-6 lg:p-8 overflow-hidden'>
      {/* Fixed Header */}
      <div className='flex-shrink-0 mb-4'>
        <h1 className='text-[#173061] text-2xl lg:text-3xl font-semibold lg:pl-2 pl-2'>Student Records</h1>
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
          ) : students.length === 0 ? (
            <div className="flex justify-center items-center py-10">
              <p className="text-gray-500">No students found.</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 p-2'>
              {students.map(student => (
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
