import {React,useState} from 'react'
import Profo from '../Profo'
import CourseCard from './CourseCard'
import EnrollCard from './EnrollCard'
import CourseCardEnrolled from './CourseCardEnrolled'
import Updates from './Updates'
import Upcoming from './Upcoming'
import Certificates from './Certificates'
const CourseDescription = () => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  return (
    <div className='body flex flex-col w-full h-full p-4 md:p-10 bg-gray-100'>
      <div className='flex flex-row justify-between items-center w-full'>
        <div className='flex flex-row items-center gap-3'>
          <div className='flex items-center bg-[#DDE4F0] py-1 px-2 text-xs font-bold justify-center rounded cursor-pointer'>&lt; BACK</div>
          <h1 className='text-2xl md:text-3xl font-semibold text-dblue'>Course Description</h1>
        </div>
        <Profo />
      </div>
      {isEnrolled ? (
        <div className='sub-body flex flex-col flex-grow w-full h-[75vh] mt-4 md:mt-4 p-2 gap-2'>
          <div className='flex w-full h-[50%] gap-2'>
            <div className='flex-[2] bg-[#E4E9F0] rounded'>
              <CourseCardEnrolled />
            </div>
            <div className='flex-[1] bg-[#E4E9F0] rounded'>
              <Upcoming />
            </div>
          </div>
          <div className='flex w-full h-[50%] gap-2'>
            <div className='flex-[2] flex gap-2'>
              <div className='flex-[1] bg-[#E4E9F0] rounded'>
                <Updates />
              </div>
              <div className='flex-[1] bg-[#E4E9F0] rounded'></div>
            </div>
            
            <div className='flex-[1] bg-[#E4E9F0] rounded'>
              <Certificates />
            </div>
          </div>
          
        </div>
      ) : (
            <div className='sub-body flex flex-grow w-full h-full mt-4 md:mt-4 p-2 gap-2'>
              <div className='bg-[#E4E9F0] flex-[2] rounded'>
                <CourseCard />
              </div>
              <div className='bg-[#E4E9F0] flex-[1] rounded'>
                <EnrollCard />
              </div>
              
            </div>
      )}
    </div>
  )
}

export default CourseDescription