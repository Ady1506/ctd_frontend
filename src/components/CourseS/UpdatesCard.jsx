import React from "react";
import dayjs from "dayjs";

const UpdatesCard = ({ content, link, createdAt }) => {
  const formattedDate = dayjs(createdAt).format("DD MMM YYYY"); // Format date as "14 May 2025"

  return (
    <div className="flex flex-col w-full justify-between h-[49%] bg-[#DDE4F0] rounded-lg p-3 shadow-md gap-2">
      <div className="flex justify-between w-full text-[#173061]">
        <h1 className="text-dblue font-bold">{formattedDate}</h1>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 underline"
          >
            <button className="text-blue-700 hover:text-blue-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5-6.5a3 3 0 0 0-6-6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5-6.5"
                />
              </svg>
            </button>
          </a>
        )}
      </div>
      <div>
        <p className="text-gray-800 p-2 text-sm">{content}</p>
      </div>
    </div>
  );
};

export default UpdatesCard;
