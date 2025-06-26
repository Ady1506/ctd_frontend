import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashCourseCard from '../DashS/DashCourseCard';

const CourseList = ({ selectedTab, searchTerm }) => {
  const [allCourses, setAllCourses] = useState([]);
  const [yourCourses, setYourCourses] = useState([]);
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
  }, [selectedTab, searchTerm, allCourses, yourCourses]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 md:gap-6 p-1 sm:p-2">
      {filteredCourses.length > 0 ? (
        filteredCourses.map((course) => (
          <div key={course.id} className="h-52 md:h-56 lg:h-60">
            <DashCourseCard
              course={course}
            />
          </div>
        ))
      ) : (
        <div className="col-span-full flex justify-center items-center py-8 sm:py-10">
          <p className="text-gray-500 text-sm sm:text-base">No courses available</p>
        </div>
      )}
    </div>
  );
};

export default CourseList;