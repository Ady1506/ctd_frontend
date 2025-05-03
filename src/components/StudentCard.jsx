// src/components/StudentCard.jsx
import React from 'react';

const StudentCard = ({ student, onClick }) => {
  return (
    // Responsive width using Tailwind breakpoints. Adjust numbers if needed.
    // min-w-[260px] prevents cards from getting too squished on small screens before wrapping
    <div
      className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200 cursor-pointer w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.33%-0.66rem)] lg:w-[calc(25%-0.75rem)] xl:w-[calc(20%-0.8rem)] flex flex-col justify-between min-w-[260px]"
      onClick={() => onClick(student)} // Make the whole card clickable
    >
      <div>
        <h3 className="text-lg font-semibold text-dblue mb-2 truncate">{student.display_name || 'No Name'}</h3>
        <div className="space-y-1 text-sm text-gray-600"> {/* Added space-y-1 for slight spacing */}
            <p><strong>Roll No:</strong> {student.roll || 'N/A'}</p>
            <p><strong>Branch:</strong> {student.branch || 'N/A'}</p>
            <p><strong>Year:</strong> {student.year || 'N/A'}</p>
            <p><strong>Mobile:</strong> {student.mobile || 'N/A'}</p>
        </div>
      </div>
      <div className="mt-3 text-right"> {/* Position button at the bottom right */}
          <button
            // No separate onClick needed here if the whole card is clickable
            // onClick={(e) => { e.stopPropagation(); onClick(student); }} // Use this if you *only* want the button to trigger modal
            className="text-sm text-dblue hover:text-blue-900 font-medium"
            aria-label={`View details for ${student.display_name}`}
          >
            View Details →
          </button>
      </div>
    </div>
  );
};

export default StudentCard;
