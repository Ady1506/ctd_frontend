import React, { useState } from 'react';
import StudentCard from '../components/StudentCard';

const studentData = [
    { id: 1, name: 'John Doe', rollNo: '123', batch: '2023', branch: 'CSE', course: 'B.Tech' },
    { id: 2, name: 'Jane Smith', rollNo: '124', batch: '2023', branch: 'ECE', course: 'B.Tech' },
    { id: 1, name: 'John Doe', rollNo: '123', batch: '2023', branch: 'CSE', course: 'B.Tech' },
    { id: 2, name: 'Jane Smith', rollNo: '124', batch: '2023', branch: 'ECE', course: 'B.Tech' },
    { id: 1, name: 'John Doe', rollNo: '123', batch: '2023', branch: 'CSE', course: 'B.Tech' },
    { id: 2, name: 'Jane Smith', rollNo: '124', batch: '2023', branch: 'ECE', course: 'B.Tech' },
    { id: 1, name: 'John Doe', rollNo: '123', batch: '2023', branch: 'CSE', course: 'B.Tech' },
    { id: 2, name: 'Jane Smith', rollNo: '124', batch: '2023', branch: 'ECE', course: 'B.Tech' },
    { id: 1, name: 'John Doe', rollNo: '123', batch: '2023', branch: 'CSE', course: 'B.Tech' },
    { id: 2, name: 'Jane Smith', rollNo: '124', batch: '2023', branch: 'ECE', course: 'B.Tech' },
];

const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState(studentData);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = studentData.filter(student =>
      student.name.toLowerCase().includes(value) ||
      student.rollNo.toLowerCase().includes(value) ||
      student.batch.toLowerCase().includes(value) ||
      student.branch.toLowerCase().includes(value) ||
      student.course.toLowerCase().includes(value)
    );
    setFilteredStudents(filtered);
  };

  return (
    <div className='body flex flex-col w-full h-[100vh] p-4 md:p-10'>
      <h1 className='text-dblue text-2xl font-semibold'>Student Record</h1>
      <input
        type='text'
        placeholder='Search by name, roll no, batch, branch, course'
        value={searchTerm}
        onChange={handleSearch}
        className='mt-4 p-2 border border-gray-300 rounded'
      />
      <div className='student-list flex flex-row flex-wrap gap-2 p-2 mt-4 overflow-auto'>
        {filteredStudents.map(student => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
};

export default Students;
