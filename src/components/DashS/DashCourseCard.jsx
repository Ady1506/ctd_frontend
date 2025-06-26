import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashCourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleCourseClick = () => {
    navigate(`/CourseDescription/${course.id}`);  // push the ID
  };

  return (
    <div
      onClick={handleCourseClick}
      className="cursor-pointer flex flex-col h-full bg-[#DDE4F0] p-4 gap-3 rounded-lg shadow hover:shadow-md transition"
    >
      <img
        src={course.link || '/placeholder.png'}
        className="h-[70%] w-full object-cover rounded-md"
        alt={course.name}
      />
      <div className="text-[#173061] flex flex-col items-center justify-center h-[30%]">
        <div className="font-bold text-lg text-center line-clamp-2">
          {course.name}
        </div>
      </div>
    </div>
  );
};

export default DashCourseCard;

