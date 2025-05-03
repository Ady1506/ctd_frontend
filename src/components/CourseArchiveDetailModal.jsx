// src/components/CourseArchiveDetailModal.jsx
import React, { useState } from 'react';
import CourseStudentsModal from './CourseStudentsModal.jsx';

// Assuming API_BASE_URL is defined elsewhere or passed as prop if needed for unarchive later
// const API_BASE_URL = 'http://localhost:8000/api';

const CourseArchiveDetailModal = ({ course, isOpen, onClose, onCourseAction }) => {
  const [isUnarchiving, setIsUnarchiving] = useState(false);
  const [actionError, setActionError] = useState(null);
  const [showStudentsModal, setShowStudentsModal] = useState(false);
  
  if (!isOpen || !course) return null;

  const handleUnarchive = async () => {
    // --- Placeholder for Unarchive API Call ---
    // You will replace this with your actual API call logic later
    if (!course?.id) return;
    const confirmUnarchive = window.confirm(`Are you sure you want to unarchive the course "${course.name}"?`);
    if (!confirmUnarchive) return;

    setIsUnarchiving(true);
    setActionError(null);
    console.log(`Attempting to unarchive course ID: ${course.id}`);

    // --- !!! Replace this block with your API call !!! ---
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    const success = true; // Simulate success/failure
    // const success = false; // Simulate failure
    // --- End Placeholder ---

    if (success) {
        alert('Course unarchived successfully! (Placeholder)');
        if (onCourseAction) onCourseAction('unarchive', course.id); // Notify parent
        onClose(); // Close this modal
    } else {
        const errorMsg = 'Failed to unarchive course. (Placeholder - Check API)';
        console.error("Unarchive failed:", errorMsg);
        setActionError(errorMsg);
        setIsUnarchiving(false); // Re-enable button on failure
    }
    // --- API call logic ends here ---

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
        className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center p-4 transition-opacity duration-300 ease-in-out"
        onClick={onClose}
      >
        {/* Modal Content */}
        <div
          className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] flex flex-col z-50 transform transition-transform duration-300 ease-in-out scale-95 opacity-0 animate-modal-appear"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-3 mb-4 flex-shrink-0">
            <h2 className="text-xl font-semibold text-dblue">{course.name} <span className="text-sm text-gray-500">(Archived)</span></h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl font-bold leading-none" aria-label="Close modal">×</button>
          </div>

          {/* Scrollable Body (Same as CourseDetailModal) */}
          <div className="flex-grow overflow-y-auto pr-2 text-sm space-y-3">
              <div><strong className="text-gray-600 w-24 inline-block">Subject:</strong> {course.subject || 'N/A'}</div>
              <div><strong className="text-gray-600 w-24 inline-block">Duration:</strong> {course.duration_weeks ? `${course.duration_weeks} weeks` : 'N/A'}</div>
              <div><strong className="text-gray-600 w-24 inline-block">Schedule:</strong> {formatSchedule(course.schedule)}</div>
              <div><strong className="text-gray-600 w-24 inline-block">Start Date:</strong> {formatDate(course.start_date)}</div>
              <div><strong className="text-gray-600 w-24 inline-block">End Date:</strong> {formatDate(course.end_date)}</div>

              {course.meeting_link && (
                 <div><strong className="text-gray-600 w-24 inline-block">Meeting Link:</strong> <a href={course.meeting_link} target="_blank" rel="noopener noreferrer" className="text-dblue hover:underline break-all">{course.meeting_link}</a></div>
              )}

              {course.link && (
                 <div >
                     <strong className="text-gray-600 w-24 inline-block align-top">Image:</strong>
                     <img src={course.link} alt={`${course.name} preview`} className="inline-block max-w-xs h-auto rounded border max-h-48 object-contain ml-2" onError={(e) => e.target.style.display='none'} />
                 </div>
              )}

              <div className=""><strong className="text-gray-600 block mb-1">Description:</strong>
                <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-2 rounded border">{course.description || 'N/A'}</p>
              </div>

               {actionError && <p className="text-red-600 text-sm mt-2">{actionError}</p>}

          </div>

          {/* Footer with ONLY Unarchive Button */}
          <div className="border-t pt-4 mt-4 flex justify-end gap-2 flex-shrink-0">
          <button
                onClick={handleStudents}
                className="px-4 py-2 bg-dblue text-white rounded hover:bg-blue-900 transition duration-200 text-sm"
            >
                Students
            </button>
            <button
                onClick={handleUnarchive}
                disabled={isUnarchiving}
                className="px-4 py-2 bg-dblue text-white rounded hover:bg-blue-900 transition duration-200 text-sm disabled:opacity-50 flex items-center" // Use a different color for unarchive
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
      `}</style>
    </>
  );
};

export default CourseArchiveDetailModal;