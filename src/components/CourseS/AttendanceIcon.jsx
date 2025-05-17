import React from 'react';
import dayjs from 'dayjs';

const AttendanceIcon = ({ marked, sessionName }) => {
  const date = dayjs(sessionName); // Parse the sessionName as a date
  const day = date.format('DD'); // Extract the day (e.g., "18")
  const month = date.format('MMM'); // Extract the month (e.g., "May")

  return (
    <div
      className={`flex flex-col justify-center items-center w-24 h-24 rounded-md shadow-md ${
        marked ? 'bg-dblue text-white' : 'bg-gray-300 text-gray-700'
      }`}
    >
      <h1 className='font-bold text-2xl'>{day}</h1>
      <h2 className='text-xl'>{month}</h2>
    </div>
  );
};

export default AttendanceIcon;