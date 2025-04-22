import React, { useEffect, useState } from 'react';
import axios from 'axios';           
import DashCourseCard from '../DashS/DashCourseCard';

const CourseList = ({ selectedTab, searchTerm }) => {
  const itemsPerPage = 8;
  const [allCourses, setAllCourses]   = useState([]);
  const [yourCourses, setYourCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data: all } = await axios.get('/api/courses');
        setAllCourses(all);

        const { data: enrolled } = await axios.get('/api/enrollments/courses');
        setYourCourses(enrolled);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
      }
    };
    fetchCourses();
  }, []);

  // pick which to show, then search & paginate
  const source = selectedTab === 'all' ? allCourses : yourCourses;
  const filtered = source.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const start = (currentPage - 1) * itemsPerPage;
  const visible = filtered.slice(start, start + itemsPerPage);

  return (
    <div className="flex flex-col flex-grow px-10 pb-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 min-h-[300px]">
        {visible.map(course => (
          <div key={course.id} className="p-2">
            <DashCourseCard course={course} />
          </div>
        ))}
        {Array.from({ length: itemsPerPage - visible.length }).map((_, i) => (
          <div key={i} className="invisible p-2" />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4 text-lg">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 rounded ${
                currentPage === i + 1 ? 'text-black font-semibold' : 'text-gray-500'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
