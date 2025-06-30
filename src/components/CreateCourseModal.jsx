// src/components/CreateCourseModal.jsx
import React, { useState } from 'react';
import axios from 'axios';
const CREATED_BY_ID = '644b2f5e6f2c3d4e5f123456'; // Replace with actual user ID or use auth

// --- Helper Functions for Time Conversion ---
const formatTimeToAmPm = (timeString_HHMM) => {
  if (!timeString_HHMM) return '';
  const [hoursStr, minutesStr] = timeString_HHMM.split(':');
  if (hoursStr === undefined || minutesStr === undefined) {
    console.warn("Invalid time format received for formatting:", timeString_HHMM);
    return '';
  }
  let H = parseInt(hoursStr, 10);
  const M = minutesStr;
  const ampm = H >= 12 ? 'PM' : 'AM';
  H = H % 12;
  H = H ? H : 12; // Hour '0' should be '12' for AM
  const paddedMinute = String(M).padStart(2, '0');
  return `${H}:${paddedMinute} ${ampm}`;
};

// Convert 12-hour time to 24-hour format for HTML time input
const convertTo24Hour = (time12h, period) => {
  if (!time12h) return '';
  const [hours, minutes] = time12h.split(':');
  let hour24 = parseInt(hours, 10);
  
  if (period === 'AM' && hour24 === 12) {
    hour24 = 0;
  } else if (period === 'PM' && hour24 !== 12) {
    hour24 += 12;
  }
  
  return `${String(hour24).padStart(2, '0')}:${minutes}`;
};

// Convert 24-hour time to 12-hour format
const convertTo12Hour = (time24h) => {
  if (!time24h) return { time: '', period: 'AM' };
  const [hours, minutes] = time24h.split(':');
  let hour12 = parseInt(hours, 10);
  const period = hour12 >= 12 ? 'PM' : 'AM';
  
  if (hour12 === 0) {
    hour12 = 12;
  } else if (hour12 > 12) {
    hour12 -= 12;
  }
  
  return {
    time: `${String(hour12).padStart(2, '0')}:${minutes}`,
    period: period
  };
};
// --- End Helper Functions ---

// Remove the incorrect handleTimeChange and handlePeriodChange from the global scope

const CreateCourseModal = ({ isOpen, onClose, onCourseCreated }) => {
  // --- Add start_period and end_period to initial state ---
  const initialFormData = {
    name: '',
    subject: '',
    description: '',
    schedule: {
      days: [],
      start_time: '', // Stores 12-hour format time for display
      start_period: 'AM', // Stores 'AM' or 'PM'
      end_time: '',   // Stores 12-hour format time for display
      end_period: 'AM',   // Stores 'AM' or 'PM'
    },
    duration_weeks: '',
    meeting_link: '',
    link: '',
    start_date: '',
    end_date: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const ampmOptions = ['AM', 'PM'];

  // --- Consolidated and Corrected handleChange ---
  // This single handler will manage all form inputs correctly
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setError(null);
    setSuccessMessage('');

    // Check if the field belongs to the schedule object
    const isScheduleField = ['days', 'start_time', 'start_period', 'end_time', 'end_period'].includes(name);

    if (isScheduleField) {
      setFormData((prev) => {
        const newSchedule = { ...prev.schedule };
        if (name === 'days') {
          newSchedule.days = checked
            ? [...prev.schedule.days, value]
            : prev.schedule.days.filter((day) => day !== value);
        } else if (name === 'start_time' || name === 'end_time') {
          // Convert 24-hour input to 12-hour format for display
          const { time, period } = convertTo12Hour(value);
          newSchedule[name] = time;
          if (name === 'start_time') {
            newSchedule.start_period = period;
          } else {
            newSchedule.end_period = period;
          }
        } else {
          // Handle period changes (AM/PM)
          newSchedule[name] = value;
        }
        return { ...prev, schedule: newSchedule };
      });
    } else if (name === 'start_date' || name === 'end_date') {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (name === 'duration_weeks') {
      setFormData((prev) => ({
        ...prev,
        [name]: value === '' ? '' : parseInt(value, 10) || 0,
      }));
    } else {
      // Handle top-level fields (name, subject, etc.)
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  // --- End Consolidated handleChange ---

  // --- handleSubmit remains largely the same ---
  // It correctly uses formatTimeToAmPm with the HH:MM state
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage('');

    if (!formData.name || !formData.subject) {
      setError('Course Name and Subject are required.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.schedule.start_time || !formData.schedule.end_time) {
      setError('Please select both start and end times.');
      setIsSubmitting(false);
      return;
    }

    // Convert 12-hour time to proper format for backend
    const startTime24 = convertTo24Hour(formData.schedule.start_time, formData.schedule.start_period);
    const endTime24 = convertTo24Hour(formData.schedule.end_time, formData.schedule.end_period);
    
    // Format the time using the helper function just before sending
    const formattedStartTime = formatTimeToAmPm(startTime24);
    const formattedEndTime = formatTimeToAmPm(endTime24);

    // Final check on formatted times
    if (!formattedStartTime || !formattedEndTime) {
      setError('Invalid time value entered. Please check start and end times.');
      setIsSubmitting(false);
      console.error("Time formatting failed for payload. Raw times:", formData.schedule.start_time, formData.schedule.end_time);
      return;
    }

    const payload = {
      name: formData.name,
      subject: formData.subject,
      description: formData.description,
      duration_weeks: Number(formData.duration_weeks) || 0,
      meeting_link: formData.meeting_link,
      link: formData.link,
      schedule: {
        days: formData.schedule.days || [],
        start_time: formattedStartTime, // Use formatted time
        end_time: formattedEndTime,     // Use formatted time
      },
      start_date: formData.start_date ? new Date(formData.start_date).toISOString() : null,
      end_date: formData.end_date ? new Date(formData.end_date).toISOString() : null,
      created_by: CREATED_BY_ID, // Using hardcoded ID
    };

    if (!payload.start_date) delete payload.start_date;
    if (!payload.end_date) delete payload.end_date;

     console.log("Sending Payload:", JSON.stringify(payload, null, 2)); // Debug log

    try {
        const response = await axios.post(`api/courses`, payload);

        const newCourse = response.data;
        setSuccessMessage('Course created successfully!');
        if (onCourseCreated) {
            onCourseCreated(newCourse);
        }
        setFormData(initialFormData); // Reset form

        setTimeout(() => {
            onClose();
            setSuccessMessage('');
        }, 1500);

    } catch (err) {
        console.error('Create course failed:', err);
        const errorMsg = err.response?.data?.message || err.response?.data || err.message || 'Unexpected error occurred.';
        setError(errorMsg);
    } finally {
        setIsSubmitting(false);
    }
  };
  // --- End handleSubmit ---

  if (!isOpen) return null;

  // --- JSX ---
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 pb-20 lg:pb-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto z-50 
                   [&::-webkit-scrollbar]:[width:4px] [&::-webkit-scrollbar-thumb]:bg-[#173061] [&::-webkit-scrollbar-thumb]:rounded-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-3 mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-[#173061]">Create New Course</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl sm:text-2xl font-bold"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Course Name & Subject */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Course Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange} // Use consolidated handler
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#173061] focus:border-[#173061]"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange} // Use consolidated handler
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#173061] focus:border-[#173061]"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange} // Use consolidated handler
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#173061] focus:border-[#173061]"
            ></textarea>
          </div>

          {/* Schedule */}
          <fieldset className="border p-4 rounded-md">
            <legend className="text-sm font-medium text-gray-700 px-1">Schedule</legend>
            {/* Days */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">Days</label>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {daysOfWeek.map((day) => (
                  <div key={day} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`day-${day}`}
                      name="days"
                      value={day}
                      checked={formData.schedule.days.includes(day)}
                      onChange={handleChange} // Use consolidated handler
                      className="h-4 w-4 text-[#173061] focus:ring-[#173061] border-gray-300 rounded"
                    />
                    <label htmlFor={`day-${day}`} className="ml-2 block text-sm text-gray-700">{day}</label>
                  </div>
                ))}
              </div>
            </div>
            {/* Times */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Start Time */}
              <div>
                <label htmlFor="start_time" className="block text-xs font-medium text-gray-600 mb-1">Start Time <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    id="start_time"
                    name="start_time"
                    value={convertTo24Hour(formData.schedule.start_time, formData.schedule.start_period)}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-2 py-1 border-gray-300 shadow-sm focus:ring-[#173061] focus:border-[#173061] [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    step="900"
                  />
                  <select
                    name="start_period"
                    id="start_period"
                    value={formData.schedule.start_period}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 bg-white border-gray-300 shadow-sm focus:ring-[#173061] focus:border-[#173061]"
                  >
                    {ampmOptions.map(p => <option key={`start-${p}`} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              {/* End Time */}
              <div>
                <label htmlFor="end_time" className="block text-xs font-medium text-gray-600 mb-1">End Time <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    id="end_time"
                    name="end_time"
                    value={convertTo24Hour(formData.schedule.end_time, formData.schedule.end_period)}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-2 py-1 border-gray-300 shadow-sm focus:ring-[#173061] focus:border-[#173061] [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    step="900"
                  />
                  <select
                    name="end_period"
                    id="end_period"
                    value={formData.schedule.end_period}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 bg-white border-gray-300 shadow-sm focus:ring-[#173061] focus:border-[#173061]"
                  >
                    {ampmOptions.map(p => <option key={`end-${p}`} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </fieldset>

          {/* Duration, Meeting Link, Image URL */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="duration_weeks" className="block text-sm font-medium text-gray-700 mb-1">Duration (Weeks)</label>
              <input
                type="number"
                id="duration_weeks"
                name="duration_weeks"
                value={formData.duration_weeks}
                onChange={handleChange} // Use consolidated handler
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#173061] focus:border-[#173061]"
              />
            </div>
            <div>
              <label htmlFor="meeting_link" className="block text-sm font-medium text-gray-700 mb-1">Meeting Link</label>
              <input
                type="url"
                id="meeting_link"
                name="meeting_link"
                value={formData.meeting_link}
                onChange={handleChange} // Use consolidated handler
                placeholder="https://example.com/meet"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#173061] focus:border-[#173061]"
              />
            </div>
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="url"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange} // Use consolidated handler
                placeholder="https://example.com/image.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#173061] focus:border-[#173061]"
              />
            </div>
          </div>

          {/* Start/End Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange} // Use consolidated handler
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#173061] focus:border-[#173061]"
              />
            </div>
            <div>
              <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange} // Use consolidated handler
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#173061] focus:border-[#173061]"
              />
            </div>
          </div>

          {/* Error/Success Messages */}
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}

          {/* Submission Buttons */}
           <div className="flex justify-end space-x-3 pt-5 border-t mt-6">
             <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-200 text-sm disabled:opacity-50"
             >
                 Cancel
             </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#173061] text-white rounded shadow hover:bg-[#0f1f42] transition duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                 <>
                   <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
                   Submitting...
                 </>
              ) : ( 'Create Course' )}
            </button>
          </div>
        </form>
      </div>
      {/* Animation Style - Add if missing */}
       <style jsx global>{`
         @keyframes modal-appear { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
         .animate-modal-appear { animation: modal-appear 0.3s ease-out forwards; }
       `}</style>
    </div>
  );
};

export default CreateCourseModal;