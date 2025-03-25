import { motion } from 'framer-motion';

const StudentCard = ({ student }) => (
    <motion.div 
        className='card bg-dblue shadow-lg w-[24%] rounded-lg p-6 mb-6 transform transition duration-500 hover:scale-105'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <h2 className='text-xl font-bold text-white mb-2'>{student.name}</h2>
        <p className='text-white mb-1'><span className='font-semibold'>Roll No:</span> {student.rollNo}</p>
        <p className='text-white mb-1'><span className='font-semibold'>ID:</span> {student.id}</p>
        <p className='text-white mb-1'><span className='font-semibold'>Batch:</span> {student.batch}</p>
        <p className='text-white mb-1'><span className='font-semibold'>Branch:</span> {student.branch}</p>
        <div className='bg-lblue p-3 rounded mt-4'>
            <h3 className='text-lg font-semibold text-dblue'>Courses Enrolled:</h3>
            {/* Add course details here */}
        </div>
    </motion.div>
);

export default StudentCard;