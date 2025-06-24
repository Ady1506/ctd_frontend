import React, { useState, useEffect } from 'react';
import DashNoticeCard from './DashNoticeCard.jsx';
import axios from 'axios';
import dayjs from 'dayjs';

// Add custom scrollbar styles
const scrollbarStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;

const DashNotice = () => {
  const [viewDetailsExpanded, setViewDetailsExpanded] = useState(false);
  const [viewAllExpanded, setViewAllExpanded] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/admin/notices',{
            withCredentials: true 
        });
        const formattedNotices = response.data.map((notice) => {
          const createdAt = dayjs(notice.created_at);
          return {
            date: createdAt.format('DD MMM'), // e.g., "23 Apr"
            time: createdAt.format('hh:mm A'), // e.g., "01:20 PM"
            text: notice.content,
            hasAttachment: !!notice.link, // Check if a link exists
            attachmentLink: notice.link,
            course: notice.course_name,
          };
        });
        setNotices(formattedNotices.reverse());
      } catch (error) {
        console.error('Failed to fetch notices:', error);
      }
    };

    fetchNotices();
  }, []);
  const handleViewDetails = (notice) => {
    setSelectedNotice(notice);
    setViewDetailsExpanded(true);
  };

  const handleViewAll = () => {
    setViewAllExpanded(true);
  };

  const handleAttachmentClick = (attachmentLink) => {
    window.open(attachmentLink, '_blank', 'noopener,noreferrer');
  };  return (
    <>
      <style>{scrollbarStyles}</style>
      <div className='h-full w-full flex flex-col gap-2 p-4'>
      <div className='flex flex-row justify-between items-center w-full text-[#173061] mb-2 gap-1'>
        <div className='font-bold text-lg cursor-default'>Recent Notice</div>
        <div className='underline cursor-pointer text-base hover:text-blue-600 transition-colors' onClick={handleViewAll}>
          view all
        </div>
      </div>      {/* Display only the first 3 notices - responsive with horizontal scroll on small screens */}
      <div className='w-full flex-1 overflow-hidden'>
        {/* Desktop/Tablet view - Grid layout */}
        <div className='hidden md:grid grid-cols-3 gap-4 w-full h-full'>
          {notices.slice(0, 3).map((notice, index) => (
            <DashNoticeCard 
              key={index} 
              {...notice} 
              isExpanded={false} 
              onViewDetails={() => handleViewDetails(notice)} 
              onAttachmentClick={() => handleAttachmentClick(notice.attachmentLink)} 
            />
          ))}
        </div>
        
        {/* Mobile/Small screen view - Horizontal scroll */}
        <div className='md:hidden flex gap-3 overflow-x-auto scrollbar-hide pb-2 h-full'>
          {notices.slice(0, 3).map((notice, index) => (
            <div key={index} className='flex-shrink-0 w-[320px]'>
              <DashNoticeCard 
                {...notice} 
                isExpanded={false} 
                onViewDetails={() => handleViewDetails(notice)} 
                onAttachmentClick={() => handleAttachmentClick(notice.attachmentLink)} 
              />
            </div>
          ))}
        </div>
      </div>      {/* Modal for viewing all notices */}
      {viewAllExpanded && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto 
                         [&::-webkit-scrollbar]:[width:4px] [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-track]:m-[4px] 
                         [&::-webkit-scrollbar-thumb]:bg-[#173061] [&::-webkit-scrollbar-thumb]:rounded-full'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-bold text-[#173061]'>All Notices</h2>
              <button 
                onClick={() => setViewAllExpanded(false)} 
                className='text-[#173061] font-bold text-xl hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors'
              >
                ×
              </button>
            </div>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
              {notices.map((notice, index) => (
                <DashNoticeCard 
                  key={index} 
                  {...notice} 
                  isExpanded={true} 
                  // hideViewDetails={true} 
                  onViewDetails={() => handleViewDetails(notice)}
                  onAttachmentClick={() => handleAttachmentClick(notice.attachmentLink)} 
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal for viewing single notice details */}
      {viewDetailsExpanded && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto 
                         [&::-webkit-scrollbar]:[width:4px] [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-track]:m-[4px] 
                         [&::-webkit-scrollbar-thumb]:bg-[#173061] [&::-webkit-scrollbar-thumb]:rounded-full'>
            
            <div className='space-y-4'>
              {/* Course name and close button */}
              <div className='flex justify-between items-start pb-3 border-b border-gray-200'>
                <div>
                  <h3 className='text-lg font-bold text-[#173061] mb-1'>{selectedNotice?.course}</h3>
                  <div className='text-sm text-gray-500 font-medium'>{selectedNotice?.date} - {selectedNotice?.time}</div>
                </div>
                <button 
                  onClick={() => setViewDetailsExpanded(false)} 
                  className='text-[#173061] font-bold text-xl hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors ml-4 flex-shrink-0'
                >
                  ×
                </button>
              </div>
              
              {/* Notice content */}
              <div className='text-gray-700 leading-relaxed text-base py-2'>{selectedNotice?.text}</div>
              
              {/* Attachment button */}
              {selectedNotice?.hasAttachment && (
                <div className='pt-2'>
                  <a
                    href={selectedNotice.attachmentLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-block bg-[#173061] text-white px-4 py-2 rounded-lg hover:bg-[#0f1f42] transition-colors'
                  >
                    View Attachment
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default DashNotice;