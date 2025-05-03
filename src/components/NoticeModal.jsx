// src/components/NoticeModal.jsx
import React, { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = 'http://localhost:8000/api';

const NoticeModal = ({ isOpen, onClose, courseId, courseName }) => {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newNoticeContent, setNewNoticeContent] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState(null);

  const fetchNotices = useCallback(async () => {
    if (!courseId) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/notices?course_id=${courseId}`, {
         method: 'GET',
         headers: {
             // Add Authorization header if needed
         },
         credentials: 'include', // For cookie auth
      });
      if (!response.ok) {
          let errorMsg = `Fetch failed: ${response.status}`;
          try { const errData = await response.json(); errorMsg = errData.detail || errData.message || errorMsg } catch(e){}
          throw new Error(errorMsg);
      }
      const data = await response.json();

      // --- FIX: Check if data is an array before sorting ---
      if (Array.isArray(data)) {
        // Sort only if it's a valid array
        const sortedData = data.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
        setNotices(sortedData);
      } else {
        // If data is null, undefined, or not an array, set notices to empty
        console.warn("API did not return an array for notices, received:", data);
        setNotices([]); // Set state to an empty array
      }
      // --- End FIX ---

    } catch (err) {
      console.error("Failed to fetch notices:", err);
      setError(err.message || 'Could not load notices.');
       setNotices([]); // Ensure notices is empty on error too
    } finally {
      setIsLoading(false);
    }
  }, [courseId]); // Dependency array includes courseId

  // Fetch notices when the modal opens or courseId changes
  useEffect(() => {
    if (isOpen && courseId) {
      fetchNotices();
    } else {
        // Clear state if modal closes or courseId is invalid
        setNotices([]);
        setError(null);
        setNewNoticeContent('');
        setCreateError(null);
    }
  }, [isOpen, courseId, fetchNotices]);

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    if (!newNoticeContent.trim() || !courseId) return;

    setIsCreating(true);
    setCreateError(null);
    try {
      const payload = {
        course_id: courseId,
        content: newNoticeContent.trim(),
      };

      const response = await fetch(`${API_BASE_URL}/notices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add Authorization header if needed
        },
        credentials: 'include', // for cookie auth
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMsg = `Create failed: ${response.status}`;
        // Add more detailed error parsing if needed
        try { const errData = await response.json(); errorMsg = errData.detail || errData.message || errorMsg } catch(e){}
        throw new Error(errorMsg);
      }

      // const createdNotice = await response.json(); // Get the created notice if needed

      // Success: clear the form and re-fetch notices
      setNewNoticeContent('');
      await fetchNotices(); // Refresh the list

    } catch (err) {
      console.error("Failed to create notice:", err);
      setCreateError(err.message || 'Could not create notice.');
    } finally {
      setIsCreating(false);
    }
  };

    const formatNoticeDate = (dateString) => {
        if (!dateString) return '';
        try {
            return new Date(dateString).toLocaleString('en-US', {
                dateStyle: 'short', // 'M/D/YY'
                timeStyle: 'short', // 'h:mm A'
            });
        } catch (e) {
            return '';
        }
    };


  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xl max-h-[85vh] flex flex-col z-50 transform transition-transform duration-300 ease-in-out scale-95 opacity-0 animate-modal-appear"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4 flex-shrink-0">
          <h2 className="text-lg font-semibold text-dblue">Notices for {courseName || 'Course'}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Notice List Area */}
        <div className="flex-grow overflow-y-auto mb-4 pr-1">
          {isLoading && <p className="text-center text-gray-500">Loading notices...</p>}
          {error && <p className="text-center text-red-600">{error}</p>}
          {!isLoading && !error && notices.length === 0 && (
            <p className="text-center text-gray-500">No notices found for this course.</p>
          )}
          {!isLoading && !error && notices.length > 0 && (
            <ul className="space-y-3">
              {notices.map((notice) => (
                <li key={notice.id || notice._id} className="p-3 bg-gray-50 border rounded shadow-sm">
                  <p className="text-gray-800 text-sm whitespace-pre-wrap">{notice.content}</p>
                  <p className="text-xs text-gray-500 mt-1 text-right">{formatNoticeDate(notice.created_at)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Create Notice Form */}
        <div className="border-t pt-4 flex-shrink-0">
          <form onSubmit={handleCreateNotice} className="space-y-2">
             <label htmlFor="new-notice-content" className="block text-sm font-medium text-gray-700">Add New Notice</label>
            <textarea
              id="new-notice-content"
              rows="3"
              value={newNoticeContent}
              onChange={(e) => setNewNoticeContent(e.target.value)}
              placeholder="Enter notice content..."
              required
              disabled={isCreating}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-dblue focus:border-dblue text-sm disabled:bg-gray-100"
            ></textarea>
             {createError && <p className="text-red-600 text-xs">{createError}</p>}
            <div className="text-right">
              <button
                type="submit"
                disabled={isCreating || !newNoticeContent.trim()}
                className="px-4 py-2 bg-dblue text-white rounded shadow hover:bg-blue-900 transition duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]" // Added min-width
              >
                {isCreating ? (
                   <>
                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                     Posting...
                   </>
                ) : 'Post Notice'}
              </button>
            </div>
          </form>
        </div>
        {/* Animation Style */}
        <style jsx global>{`
          @keyframes modal-appear { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
          .animate-modal-appear { animation: modal-appear 0.3s ease-out forwards; }
          .whitespace-pre-wrap { white-space: pre-wrap; }
        `}</style>
      </div>
    </div>
  );
};

export default NoticeModal;