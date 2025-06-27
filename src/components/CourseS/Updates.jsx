import React, { useEffect, useState } from 'react';
import UpdatesCard from './UpdatesCard';
import axios from 'axios';

const Updates = ({ course }) => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('/api/notices/enrolled');
        const filteredNotices = response.data.filter(notice => notice.course_id === course.id);
        setNotices(filteredNotices);
      } catch (error) {
        console.error('Error fetching notices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [course.id]);

  return (
    <div className='h-full w-full flex flex-col p-4 overflow-hidden'>
      {/* Fixed Header */}
      <div className='flex-shrink-0 mb-3'>
        <div className='font-bold text-lg text-[#173061] cursor-default'>Updates</div>
      </div>
      
      {/* Scrollable Content */}
      <div className='flex-1 overflow-y-auto pr-2 
                    [&::-webkit-scrollbar]:[width:4px]
                    [&::-webkit-scrollbar-thumb]:bg-[#173061]
                    [&::-webkit-scrollbar-thumb]:rounded-full'>
        <div className='flex flex-col gap-2'>
          {loading ? (
            <div className='text-gray-500'>Loading...</div>
          ) : notices.length === 0 ? (
            <div className='text-gray-500 font-bold'>No updates available</div>
          ) : (
            notices.map((notice) => (
              <UpdatesCard
                key={notice.id}
                content={notice.content}
                link={notice.link}
                createdAt={notice.created_at}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Updates;