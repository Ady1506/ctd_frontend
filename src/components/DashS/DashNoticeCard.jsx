import { FaPaperclip } from 'react-icons/fa';

const DashNoticeCard = ({ date, time, text, hasAttachment, course, isExpanded, onViewDetails, hideViewDetails, onAttachmentClick }) => {
  const truncateText = (text, limit) => {
    const words = text.split(' ');
    return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text;
  };
  

  return (
    <div className='p-4 border flex flex-col justify-between rounded-lg shadow-md min-w-56 h-full hover:shadow-lg transition-shadow duration-300 bg-gray-100'>
      <div>
        <div className='text-sm text-gray-500 mb-1 flex justify-between'>
          <span>{date}</span>
          <span>{time}</span>
        </div>
        <div className='font-bold text-[#173061] text-lg mb-2 truncate'>{course}</div>
        <div className='text-sm text-gray-700 mb-3 leading-relaxed'>
          {isExpanded ? text : truncateText(text, 25)}
        </div>
      </div>
      <div className='flex items-center justify-between mt-2'>
        <div 
          className={`text-xs flex items-center ${hasAttachment ? 'text-blue-500 cursor-pointer' : 'text-gray-400'}`} 
          onClick={hasAttachment ? onAttachmentClick : undefined}
        >
          <FaPaperclip className={`mr-1 ${hasAttachment ? 'hover:text-blue-700' : ''}`} />
        </div>
        {!hideViewDetails && (
          <button
            onClick={onViewDetails}
            className='text-xs text-white bg-blue-500 hover:bg-blue-700 ml-1 px-2 py-1 rounded transition-colors duration-300'
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default DashNoticeCard;