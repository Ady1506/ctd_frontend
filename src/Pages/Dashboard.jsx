import React from 'react';
import Profo from '../components/Profo';

// Admin Components
import DashNoticeAdmin from '../components/DashA/DashNoticeAdmin';
import DashStudent from '../components/DashA/DashStudent';
import DashCourseAdmin from '../components/DashA/DashCourseAdmin';

import DashCourse from '../components/DashS/DashCourse';
import DashAttendance from '../components/DashS/DashAttendance';
import DashNotice from '../components/DashS/DashNotice';

const Dashboard = () => {
    // Default role is 'admin' if no role is provided
    const userRole = localStorage.getItem('userRole') || 'student';
    return (
        <div className='body flex flex-col w-full h-[100vh] p-4 md:p-10'>
            

            {/* Render content based on role */}
            {userRole === 'admin' && (
                <div className='body flex flex-col w-full h-[100vh] p-0 md:p-0'>
                    <div className='flex flex-row justify-between items-center w-full'>
                        <h1 className='text-2xl md:text-3xl font-semibold text-dblue'>Dashboard</h1>
                        <Profo />
                    </div>
                    <div className="sub-body flex flex-col gap-4 h-[90%] w-full mt-2 px-4 overflow-hidden">
      
                      {/* Courses */}
                      <div className="bg-lblue rounded w-full h-[45%] min-h-[200px] overflow-auto">
                        <DashCourseAdmin />
                      </div>

                      {/* Notice & Attendance */}
                      <div className="flex flex-col md:flex-row gap-4 h-[55%] w-full min-h-[200px]">
                        <div className="bg-lblue rounded w-full md:w-1/2 h-full overflow-auto">
                          <DashNoticeAdmin />
                        </div>
                        <div className="bg-lblue rounded w-full md:w-1/2 h-full overflow-auto">
                          <DashStudent />
                        </div>
                      </div>

                    </div>
                </div>
            )}

            {userRole === 'teacher' && (
                <div>
                    <div className='flex flex-row justify-between items-center w-full'>
                        <h1 className='text-2xl md:text-3xl font-semibold text-dblue'>Dashboard</h1>
                        <Profo />
                    </div>
                </div>
            )}

{userRole === 'student' && (
  <div className="body flex flex-col w-full h-[100%] max-h-screen p-0">
    {/* Header */}
    <div className="flex flex-row justify-between items-center w-full h-[10%] min-h-[60px] px-4">
      <h1 className="text-2xl md:text-3xl font-semibold text-dblue">Recent Courses</h1>
      <Profo />
    </div>

    {/* Main content */}
    <div className="sub-body flex flex-col gap-4 h-[90%] w-full mt-2 px-4 overflow-hidden">
      
      {/* Courses */}
      <div className="bg-lblue rounded w-full h-[45%] min-h-[200px] overflow-auto">
        <DashCourse />
      </div>

      {/* Notice & Attendance */}
      <div className="flex flex-col md:flex-row gap-4 h-[55%] w-full min-h-[200px]">
        <div className="bg-lblue rounded w-full md:w-1/2 h-full overflow-auto">
          <DashNotice />
        </div>
        <div className="bg-lblue rounded w-full md:w-1/2 h-full overflow-auto">
          <DashAttendance />
        </div>
      </div>

    </div>
  </div>
)}

        </div>
    );
};

export default Dashboard;
