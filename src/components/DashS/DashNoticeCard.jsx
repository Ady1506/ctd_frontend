import { FaPaperclip } from 'react-icons/fa';

const DashNoticeCard = ({ date, time, text, hasAttachment, course }) => {
  const truncateText = (text, limit) => {
    const words = text.split(' ');
    return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text;
  };

  return (
    <div className='p-4 border rounded-lg shadow-md max-h-56 hover:shadow-lg transition-shadow duration-300'>
      <div className='text-sm text-gray-500 mb-1'>{date} - {time}</div>
      <div className='font-bold text-[#173061] text-lg mb-2'>{course}</div>
      <div className='text-sm text-gray-700 mb-3'>{truncateText(text, 10)}</div>
      <div className={`text-xs mt-2 ${hasAttachment ? 'text-blue-500' : 'text-gray-400'} flex items-center`}>
        <FaPaperclip className={`mr-1 ${hasAttachment ? 'hover:text-blue-700 cursor-pointer' : ''}`} />
        {hasAttachment ? 'Attachment' : 'No Attachment'}
      </div>
    </div>
  );
};

export default DashNoticeCard;