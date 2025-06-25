// src/components/CourseArchiveDetailModal.jsx
import React, { useState } from 'react';
import CourseStudentsModal from './CourseStudentsModal.jsx';
import axios from 'axios';

const CourseArchiveDetailModal = ({ course, isOpen, onClose, onCourseAction }) => {
  const [isUnarchiving, setIsUnarchiving] = useState(false);
  const [actionError, setActionError] = useState(null);
  const [showStudentsModal, setShowStudentsModal] = useState(false);
  
  if (!isOpen || !course) return null;

  const handleUnarchive = async () => {
    if (!course?.id) return;
    const confirmUnarchive = window.confirm(`Are you sure you want to unarchive the course "${course.name}"?`);
    if (!confirmUnarchive) return;

    setIsUnarchiving(true);
    setActionError(null);

    try {
      // Replace placeholder with the actual API call
      await axios.put(`/api/courses/unarchive?id=${course.id}`);
      
      alert('Course unarchived successfully!');
      if (onCourseAction) onCourseAction('unarchive', course.id);
      onClose();

    } catch (err) {
      const errorMsg = err.response?.data || 'Failed to unarchive course.';
      console.error("Unarchive failed:", err);
      setActionError(errorMsg);
    } finally {
      setIsUnarchiving(false);
    }
  };

  const handleStudents = () => {
    // alert(`Student details for course ID: ${course.id} - Functionality to be implemented.`); // Remove or comment out alert
    if (course?.id) {
        setShowStudentsModal(true); // Open the students modal
    } else {
        console.error("Cannot show students: Course ID is missing.");
        setActionError("Cannot show students: Course ID is missing.");
    }
  };

  // --- Formatting Helpers (copied from CourseDetailModal) ---
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
       return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  const formatSchedule = (schedule) => {
    if (!schedule) return 'N/A';
    const days = schedule.days?.join(', ') || 'No specific days';
    const time = (schedule.start_time && schedule.end_time) ? `${schedule.start_time} - ${schedule.end_time}` : 'No specific time';
    return `${days} (${time})`;
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center p-4 pb-20 lg:pb-4 transition-opacity duration-300 ease-in-out"
        onClick={onClose}
      >
        {/* Modal Content */}
        <div
          className="bg-white rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-2xl lg:max-w-3xl max-h-[90vh] flex flex-col z-50 transform transition-transform duration-300 ease-in-out scale-95 opacity-0 animate-modal-appear 
                     [&::-webkit-scrollbar]:[width:4px] [&::-webkit-scrollbar-thumb]:bg-[#173061] [&::-webkit-scrollbar-thumb]:rounded-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-3 mb-4 flex-shrink-0">
            <h2 className="text-lg sm:text-xl font-semibold text-[#173061]">{course.name} <span className="text-xs sm:text-sm text-gray-500">(Archived)</span></h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-xl sm:text-2xl font-bold leading-none ml-2 flex-shrink-0" aria-label="Close modal">×</button>
          </div>

          {/* Scrollable Body (Same as CourseDetailModal) */}
          <div className="flex-grow overflow-y-auto pr-2 text-sm sm:text-base space-y-3 sm:space-y-4
                         [&::-webkit-scrollbar]:[width:4px] [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-track]:m-[4px] 
                         [&::-webkit-scrollbar-thumb]:bg-[#173061] [&::-webkit-scrollbar-thumb]:rounded-full">
              <div className="flex flex-col sm:flex-row sm:items-center"><strong className="text-gray-600 w-full sm:w-24 mb-1 sm:mb-0">Subject:</strong> <span className="text-gray-800">{course.subject || 'N/A'}</span></div>
              <div className="flex flex-col sm:flex-row sm:items-center"><strong className="text-gray-600 w-full sm:w-24 mb-1 sm:mb-0">Duration:</strong> <span className="text-gray-800">{course.duration_weeks ? `${course.duration_weeks} weeks` : 'N/A'}</span></div>
              <div className="flex flex-col sm:flex-row sm:items-center"><strong className="text-gray-600 w-full sm:w-24 mb-1 sm:mb-0">Schedule:</strong> <span className="text-gray-800">{formatSchedule(course.schedule)}</span></div>
              <div className="flex flex-col sm:flex-row sm:items-center"><strong className="text-gray-600 w-full sm:w-24 mb-1 sm:mb-0">Start Date:</strong> <span className="text-gray-800">{formatDate(course.start_date)}</span></div>
              <div className="flex flex-col sm:flex-row sm:items-center"><strong className="text-gray-600 w-full sm:w-24 mb-1 sm:mb-0">End Date:</strong> <span className="text-gray-800">{formatDate(course.end_date)}</span></div>

              {course.meeting_link && (
                 <div className="flex flex-col sm:flex-row md:items-center sm:items-start"><strong className="text-gray-600 w-full sm:w-24 mb-1 sm:mb-0 sm:flex-shrink-0">Meeting Link:</strong> <a href={course.meeting_link} target="_blank" rel="noopener noreferrer" className="text-[#173061] hover:underline break-all md:break-normal">{course.meeting_link}</a></div>
              )}

              {course.link && (
                 <div className="flex flex-col">
                     <strong className="text-gray-600 mb-2">Image:</strong>
                     <img src={course.link} alt={`${course.name} preview`} className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto rounded border max-h-48 object-contain" onError={(e) => e.target.style.display='none'} />
                 </div>
              )}

              <div className=""><strong className="text-gray-600 block mb-1">Description:</strong>
                <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-2 rounded border">{course.description || 'N/A'}</p>
              </div>

               {actionError && <p className="text-red-600 text-sm mt-2">{actionError}</p>}

          </div>

          {/* Footer with Responsive Buttons */}
          <div className="border-t pt-4 mt-4 flex flex-col sm:flex-row justify-end gap-3 sm:gap-2 flex-shrink-0">
          <button
                onClick={handleStudents}
                className="w-full sm:w-auto px-4 py-2 bg-[#173061] text-white rounded hover:bg-[#0f1f42] transition duration-200 text-sm"
            >
                Students
            </button>
            <button
                onClick={handleUnarchive}
                disabled={isUnarchiving}
                className="w-full sm:w-auto px-4 py-2 bg-green-800 text-white rounded hover:bg-green-700 transition duration-200 text-sm disabled:opacity-50 flex items-center justify-center"
            >
                 {isUnarchiving ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Unarchiving...
                    </>
                 ) : 'Unarchive'}
            </button>
          </div>
        </div>
      </div>
      {showStudentsModal && (
        <CourseStudentsModal
          isOpen={showStudentsModal}
          onClose={() => setShowStudentsModal(false)}
          courseId={course?.id}
          courseName={course?.name}
        />
      )}


      <style jsx global>{`
        @keyframes modal-appear { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-modal-appear { animation: modal-appear 0.3s ease-out forwards; }
        .whitespace-pre-wrap { white-space: pre-wrap; }

        /* Custom scrollbar styles (if needed) */
        /* width */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .text-xl { font-size: 1.25rem; } /* Example: Adjusting text size */
          .p-6 { padding: 1.5rem; } /* Example: Adjusting padding */
          /* Add more responsive styles as needed */
        }
      `}</style>
    </>
  );
};

export default CourseArchiveDetailModal;