// src/pages/CourseDescription.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Profo from '../Profo';
import CourseCard from './CourseCard';
import EnrollCard from './EnrollCard';
import CourseCardEnrolled from './CourseCardEnrolled';
import Updates from './Updates';
import Upcoming from './Upcoming';
import Certificates from './Certificates';
import CourseAttend from './CourseAttend';

const CourseDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // 1) load all courses and pick ours
        const coursesRes = await axios.get('http://localhost:8000/api/courses', {
          withCredentials: true,
        });
        const found = coursesRes.data.find(c => c.id === id) || null;
        setCourse(found);

        // 2) check enrollment
        const enrollRes = await axios.get('http://localhost:8000/api/enrollments/courses', {
          withCredentials: true,
        });
        const enrolledIds = enrollRes.data.map(c => c.id);
        setIsEnrolled(enrolledIds.includes(id));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);
  console.log(course);
  if (loading) return <p className="p-4">Loading…</p>;
  if (!course)  return <p className="p-4 text-red-500">Course not found.</p>;

  return (
    <div className='body flex flex-col w-full h-full p-4 md:p-10 bg-gray-100 overflow-y-auto pr-2 
                    [&::-webkit-scrollbar]:[width:4px]
                    [&::-webkit-scrollbar-thumb]:bg-[#173061]
                    [&::-webkit-scrollbar-thumb]:rounded-full'>
      <div className='flex flex-row justify-between items-center w-full'>
        <div className='flex flex-row items-center gap-3'>
          <div
            className='flex items-center bg-[#DDE4F0] py-1 px-2 text-xs font-bold justify-center rounded cursor-pointer'
            onClick={() => navigate(-1)}
          >
            &lt;BACK
          </div>
          <h1 className='text-2xl md:text-3xl font-semibold text-dblue'>
            {course.name}
          </h1>
        </div>
        <Profo />
      </div>

      {isEnrolled ? (
        <div className='sub-body flex flex-col flex-grow w-full lg:h-[70%] mt-4 p-2 gap-2 rounded-lg pb-16 lg:pb-2'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-2 h-full w-full'>
            <div className='row-span-2 sm:row-span-1 col-span-1 sm:col-span-2 bg-[#E4E9F0] rounded max-h-[600px] sm:max-h-[300px]'>
              <CourseCardEnrolled course={course}/>
            </div>
            <div className='col-span-1 bg-[#E4E9F0] rounded max-h-[300px]'>
              <Upcoming course={course}/>
            </div>
            <div className='col-span-1 bg-[#E4E9F0] rounded max-h-[300px]'>
              <Updates course={course}/>
            </div>
            <div className='col-span-1 bg-[#E4E9F0] rounded max-h-[300px]'>
              <CourseAttend course={course}/>
            </div>
            <div className='col-span-1 bg-[#E4E9F0] rounded max-h-[300px]'>
              <Certificates course={course}/>
            </div>
          </div>
        </div>
      ) : (
        <div className='sub-body flex flex-col flex-grow w-full md:h-full mt-2 p-2 gap-2 rounded-lg pb-16 md:pb-6 lg:pb-2'>
          <div className='flex flex-col md:grid md:grid-cols-3 md:auto-rows-fr gap-2 h-full w-full'>
            <div className='=md:row-span-1 md:col-span-2 bg-[#E4E9F0] rounded max-h-600px lg:max-h-full'>
              <CourseCard course={course}/>
            </div>
            <div className='md:col-span-1 bg-[#E4E9F0] rounded max-h-[400px] md:max-h-full'>
              <EnrollCard course={course} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default CourseDescription;

