// src/components/StudentModal.jsx
import React, { useState } from 'react'; // Import useState
import EnrolledCoursesModal from './EnrolledCoursesModal'; // Import the new modal

const StudentModal = ({ student, isOpen, onClose }) => {
  
  // State to control the visibility of the EnrolledCoursesModal
  const [isCoursesModalOpen, setIsCoursesModalOpen] = useState(false);
  
  if (!isOpen || !student) return null;

  // Function to open the courses modal
  const handleOpenCoursesModal = () => {
    if (student.id) { // Ensure student and student ID exist
       setIsCoursesModalOpen(true);
    } else {
        console.error("Cannot open courses modal: Student ID is missing.");
        // Optionally show an alert to the user
        // alert("Cannot fetch courses: Student ID is missing.");
    }
  };

  // Function to close the courses modal
  const handleCloseCoursesModal = () => {
    setIsCoursesModalOpen(false);
  };

  // Ensure you have the correct student ID field name.
  // Common names are _id, id, student_id. Adjust 'student._id' below if needed.
  const studentIdForApi = student?.id;

  return (
    <> {/* Use Fragment to render both modals */}
      {/* ----- Student Details Modal ----- */}
      {/* Overlay - adjust z-index if needed, should be below courses modal */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 z-10 flex justify-center items-center  pb-12  p-4 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose} // Clicking overlay closes this modal
      >
        {/* Modal Content */}
        <div
          className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto z-50 transform transition-transform duration-300 ease-in-out scale-95 opacity-0 animate-modal-appear"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Student Details</h2>
            <button
              onClick={onClose} // This button closes the student detail modal
              className="text-gray-500 hover:text-gray-800 text-2xl font-bold leading-none"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          {/* Student Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm text-gray-700">
            <div className="font-medium text-gray-500">Name:</div>             <div>{student.display_name || 'N/A'}</div>
            <div className="font-medium text-gray-500">Roll No:</div>          <div>{student.roll || 'N/A'}</div>
            <div className="font-medium text-gray-500">Email:</div>            <div>{student.email || 'N/A'}</div>
            <div className="font-medium text-gray-500">Branch:</div>           <div>{student.branch || 'N/A'}</div>
            <div className="font-medium text-gray-500">Year:</div>             <div>{student.year || 'N/A'}</div>
            <div className="font-medium text-gray-500">Mobile:</div>           <div>{student.mobile || 'N/A'}</div>
            {/* Assuming student object has _id */}
            {/* <div className="font-medium text-gray-500">ID:</div> <div>{student._id || 'N/A'}</div> */}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end space-x-3">
             {/* Enrolled Courses Button */}
             <button
               onClick={handleOpenCoursesModal}
               disabled={!studentIdForApi} // Disable if no ID
               className={`px-4 py-2 bg-dblue text-white rounded hover:bg-blue-900 transition duration-200 text-sm ${!studentIdForApi ? 'opacity-50 cursor-not-allowed' : ''}`}
             >
               Enrolled Courses
             </button>
            {/* Original Close Button (Optional, you already have 'X') */}
             
          </div>

        </div>
        {/* Add CSS for the animation */}
        <style jsx global>{`
          @keyframes modal-appear {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-modal-appear {
            animation: modal-appear 0.3s ease-out forwards;
          }
        `}</style>
      </div>

      {/* ----- Enrolled Courses Modal ----- */}
      {/* Render the EnrolledCoursesModal conditionally */}
      <EnrolledCoursesModal
        isOpen={isCoursesModalOpen}
        onClose={handleCloseCoursesModal}
        studentId={studentIdForApi} // Pass the student ID
      />
    </>
  );
};

export default StudentModal;