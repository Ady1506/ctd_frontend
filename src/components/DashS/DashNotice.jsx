import React, { useState } from 'react';
import DashNoticeCard from './DashNoticeCard';

const DashNotice = () => {
  const [expanded, setExpanded] = useState(false);

  const notices = [
    { date: '17 Feb', time: '10:30 AM', text: 'Meeting at 3 PM regarding project updates.Meeting at 3 PM regarding project updates.Meeting at 3 PM regarding project updates.Meeting at 3 PM regarding project updates.Meeting at 3 PM regarding project updates.', hasAttachment: true, course: 'Project Management' },
    { date: '16 Feb', time: '12:00 PM', text: 'Submit your assignments by Friday.', hasAttachment: false, course: 'Data Structures' },
    { date: '15 Feb', time: '09:00 AM', text: 'Workshop on React.js in Room 204.', hasAttachment: true, course: 'Web Development' },
    { date: '14 Feb', time: '02:00 PM', text: 'Team meeting for project discussion.', hasAttachment: false, course: 'Software Engineering' },
    { date: '13 Feb', time: '04:30 PM', text: 'New course enrollment deadline.', hasAttachment: true, course: 'General' },
    { date: '12 Feb', time: '11:00 AM', text: 'Reminder: Monthly report submission.', hasAttachment: false, course: 'Business Analytics' },
    { date: '11 Feb', time: '01:00 PM', text: 'Company webinar on industry trends.', hasAttachment: true, course: 'Industry Trends' },
    { date: '10 Feb', time: '05:00 PM', text: 'Hackathon registration ends soon.', hasAttachment: false, course: 'Hackathon' },
    { date: '09 Feb', time: '03:30 PM', text: 'Security policy update session.', hasAttachment: true, course: 'Cybersecurity' },
  ];

  return (
    <div className='h-full w-full flex flex-col gap-3 p-4'>
      <div className='flex justify-between w-full text-[#173061] mb-4'>
        <div className='font-bold text-lg cursor-default'>Recent Notice</div>
        <div className='underline cursor-pointer' onClick={() => setExpanded(true)}>view all</div>
      </div>
      
      {/* Display only the first 3 notices */}
      <div className='grid grid-cols-3 gap-4 w-full'>
        {notices.slice(0, 3).map((notice, index) => (
          <DashNoticeCard key={index} {...notice} />
        ))}
      </div>
      
      {/* Modal for all notices */}
      {expanded && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-3/4 max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:[width:3px] [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-track]:m-[4px] 
                      [&::-webkit-scrollbar-thumb]:bg-[#173061]'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-lg font-bold text-[#173061]'>All Notices</h2>
              <button onClick={() => setExpanded(false)} className='text-[#173061] font-bold'>X</button>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              {notices.map((notice, index) => (
                <DashNoticeCard key={index} {...notice} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashNotice;