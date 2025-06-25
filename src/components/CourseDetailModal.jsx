// src/components/CourseDetailModal.jsx
import React, { useState } from 'react';
import UpdateCourseModal from './UpdateCourseModal.jsx'; 
import CourseStudentsModal from './CourseStudentsModal.jsx'; 
import NoticeModal from './NoticeModal.jsx';           
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const CourseDetailModal = ({ course, isOpen, onClose, onCourseAction }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showStudentsModal, setShowStudentsModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [actionError, setActionError] = useState(null);

  if (!isOpen || !course) return null;

  const handleArchive = async () => {
    setIsArchiving(true);
    setActionError(null);
    try {
      await axios.put(`/api/courses/archive?id=${course.id}`);

      alert('Course archived successfully!');
      if (onCourseAction) onCourseAction('archive', course.id);
      onClose();

    } catch (err) {
      console.error("Archive failed:", err);
      const errorMsg = err.response?.data || err.message || 'Archive failed';
      setActionError(errorMsg);
    } finally {
      setIsArchiving(false);
    }
  };

  const handleUpdate = () => {
    setShowUpdateModal(true);
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

  const handleNotice = () => {
    setShowNoticeModal(true);
  };

  const handleCourseUpdated = (updatedCourseData) => {
    setShowUpdateModal(false);
    if (onCourseAction) onCourseAction('update', updatedCourseData);
    onClose();
  }

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 pb-20 lg:pb-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto 
                     [&::-webkit-scrollbar]:[width:4px] [&::-webkit-scrollbar-thumb]:bg-[#173061] [&::-webkit-scrollbar-thumb]:rounded-full">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex justify-between items-center">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#173061] text-justify">{course.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold ml-4 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          
          {/* Course Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <p className="text-sm sm:text-base text-gray-900 bg-gray-50 p-3 rounded text-justify">{course.description || 'No description available'}</p>
          </div>
          
          {/* Course Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
                <p className="text-sm sm:text-base text-gray-900 bg-gray-50 p-2 rounded">{course.code || 'N/A'}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Credits</label>
                <p className="text-sm sm:text-base text-gray-900 bg-gray-50 p-2 rounded">{course.credits || 'N/A'}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <p className="text-sm sm:text-base text-gray-900 bg-gray-50 p-2 rounded">{course.duration || 'N/A'}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <p className="text-sm sm:text-base text-gray-900 bg-gray-50 p-2 rounded">{formatDate(course.startDate)}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <p className="text-sm sm:text-base text-gray-900 bg-gray-50 p-2 rounded">{formatDate(course.endDate)}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
                <p className="text-sm sm:text-base text-gray-900 bg-gray-50 p-2 rounded">{formatSchedule(course.schedule)}</p>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {actionError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
              <strong>Error:</strong> {actionError}
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleUpdate}
              className="w-full bg-[#173061] text-white px-4 py-2 rounded-md hover:bg-[#0f1f42] transition-colors font-medium text-sm"
            >
              Update
            </button>
            
            <button
              onClick={handleStudents}
              className="w-full bg-[#173061] text-white px-4 py-2 rounded-md hover:bg-[#0f1f42] transition-colors font-medium text-sm"
            >
              Students
            </button>
            
            <button
              onClick={handleNotice}
              className="w-full bg-[#173061] text-white px-4 py-2 rounded-md hover:bg-[#0f1f42] transition-colors font-medium text-sm"
            >
              Notice
            </button>
            
            <button
              onClick={handleArchive}
              disabled={isArchiving}
              className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
            >
              {isArchiving ? 'Archiving...' : 'Archive'}
            </button>
          </div>
        </div>
      </div>

      {/* Nested Modals */}
      <UpdateCourseModal
        course={course}
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onCourseUpdated={handleCourseUpdated}
      />

      <CourseStudentsModal
        courseId={course?.id}
        isOpen={showStudentsModal}
        onClose={() => setShowStudentsModal(false)}
      />

      <NoticeModal
        courseId={course?.id}
        isOpen={showNoticeModal}
        onClose={() => setShowNoticeModal(false)}
      />
    </div>
  );
};

export default CourseDetailModal;