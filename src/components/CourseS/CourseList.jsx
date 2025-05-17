import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashCourseCard from '../DashS/DashCourseCard';

const CourseList = ({ selectedTab, searchTerm }) => {
  const itemsPerPage = 8;
  const [allCourses, setAllCourses] = useState([]);
  const [yourCourses, setYourCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCourses, setFilteredCourses] = useState([]);

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

  useEffect(() => {
    // Recalculate the filtered courses whenever selectedTab or searchTerm changes
    const source = selectedTab === 'all' ? allCourses : yourCourses;
    if(!source) return;
    const filtered = source.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
    setCurrentPage(1); // Reset to the first page when switching tabs or searching
  }, [selectedTab, searchTerm, allCourses, yourCourses]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / itemsPerPage));
  const start = (currentPage - 1) * itemsPerPage;
  const visible = filteredCourses.slice(start, start + itemsPerPage);

  return (
    <div className="flex flex-col flex-grow px-10 py-5 justify-between">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 min-h-[300px]">
        {visible.length > 0 ? (
          visible.map((course) => (
            <div key={course.id} className="p-2">
              <DashCourseCard course={course} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 font-bold">
            No courses available
          </div>
        )}
        {visible.length > 0 &&
          Array.from({ length: itemsPerPage - visible.length }).map((_, i) => (
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