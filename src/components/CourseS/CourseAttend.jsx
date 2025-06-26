import React, { useEffect, useState } from 'react';
import AttendanceIcon from './AttendanceIcon';
import axios from 'axios';
import dayjs from 'dayjs';

const CourseAttend = ({ course }) => {
  const [recentAttendance, setRecentAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentAttendance = async () => {
      try {
        console.log(course);
        const response = await axios.get('http://localhost:8000/api/attendances/recent');
        const parsedData = response.data.map(item => ({
          courseName: item.course_name,
          markedAt: item.marked_at,
        }));
        setRecentAttendance(parsedData);
      } catch (error) {
        console.error('Error fetching recent attendance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentAttendance();
  }, []);

  // Generate all session dates based on the course schedule
  const generateSessionDates = () => {
    const { days } = course.schedule || {};
    const { start_date } = course || {};
  
    // Validate schedule properties
    if (!days || !start_date) {
      console.error('Invalid schedule: Missing days or start_date');
      return [];
    }
  
    const startDate = dayjs(start_date); // Start date of the course
    const today = dayjs(); // Today's date
    const sessionDates = [];
  
    if (!startDate.isValid()) {
      console.error('Invalid start_date:', start_date);
      return [];
    }
  
    let currentDate = startDate;
    while (currentDate.isBefore(today.add(1, 'day'))) {
      // Check if the current day matches any day in the schedule's days array
      if (days.includes(currentDate.format('ddd'))) {
        sessionDates.push(currentDate.format('YYYY-MM-DD')); // Add the date in 'YYYY-MM-DD' format
      }
      currentDate = currentDate.add(1, 'day'); // Move to the next day
    }
  
    return sessionDates;
  };

  const sessionDates = generateSessionDates();
  // Filter attendance records for the current course
  const attendedSessions = recentAttendance.filter(record => record.courseName === course.name);

  return (
    <div className='h-full w-full flex flex-col p-4 overflow-hidden'>
      {/* Fixed Header */}
      <div className='flex-shrink-0 mb-3'>
        <div className='font-bold text-lg text-[#173061] cursor-default'>Attendance</div>
      </div>
      
      {/* Scrollable Content */}
      <div className='flex-1 overflow-y-auto pr-2 
                    [&::-webkit-scrollbar]:[width:4px]
                    [&::-webkit-scrollbar-thumb]:bg-[#173061]
                    [&::-webkit-scrollbar-thumb]:rounded-full'>
        <div className='flex flex-row flex-wrap justify-center gap-2'>
          {sessionDates.map((sessionDate, index) => {
            const isMarked = attendedSessions.some(record => dayjs(record.markedAt).isSame(sessionDate, 'day'));
            return <AttendanceIcon key={index} marked={isMarked} sessionName={sessionDate} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseAttend;