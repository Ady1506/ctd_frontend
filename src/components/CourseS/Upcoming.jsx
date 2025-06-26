import React from 'react';
import UpcomingCard from './UpcomingCard';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const Upcoming = ({ course }) => {
  const isSessionOngoing = () => {
    if (!course || !course.schedule || !course.schedule.start_time || !course.schedule.end_time) {
      return false;
    }

    const now = dayjs();
    const startTime = dayjs(`${now.format('YYYY-MM-DD')} ${course.schedule.start_time}`, 'YYYY-MM-DD h:mm A');
    const endTime = dayjs(`${now.format('YYYY-MM-DD')} ${course.schedule.end_time}`, 'YYYY-MM-DD h:mm A');

    return now.isAfter(startTime) && now.isBefore(endTime);
  };

  const sessionOngoing = isSessionOngoing();

  const handleJoinMeeting = () => {
    if (course.meeting_link) {
      window.open(course.meeting_link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className='flex flex-col gap-4 w-full h-full p-4'>
      <div className='flex-[3] flex justify-between w-full text-[#173061]'>
        <div className='flex-[3] p-4 flex flex-col gap-2'>
          <div className='text-xl font-bold'>
            {sessionOngoing ? 'Ongoing' : 'Upcoming'}
          </div>
          <div className='text-sm'>
            {sessionOngoing
              ? 'Join your ongoing session'
              : 'Prepare for your next session'}
          </div>
        </div>
        <div className='flex-[2] flex items-center justify-end gap-2 p-2'>
          <UpcomingCard course={course} />
        </div>
      </div>
      <div className='flex-[2] flex flex-col gap-2 w-full h-full'>
        <div className='flex-[1] rounded text-[#173061] bg-[#DAE1EC] flex items-center justify-center'>
          {sessionOngoing && course.meeting_link ? (
            <a
              href={course.meeting_link}
              target='_blank'
              rel='noopener noreferrer'
            >
              {course.meeting_link}
            </a>
          ) : (
            'Link will appear here'
          )}
        </div>
        <div
          className={`flex-[1] rounded text-white font-bold ${
            sessionOngoing ? 'bg-green-700 cursor-pointer' : 'bg-gray-400'
          } flex items-center justify-center`}
          onClick={sessionOngoing ? handleJoinMeeting : undefined}
        >
          Click to Join
        </div>
      </div>
    </div>
  );
};

export default Upcoming;