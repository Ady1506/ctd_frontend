import React from 'react';
import Profo from '../components/Profo';

// Admin Components
import DashRecent from '../components/DashA/DashRecent';
import DashForm from '../components/DashA/DashForm';
import DashStat from '../components/DashA/DashStat';
import DashQT from '../components/DashA/DashQT';

import DashCourse from '../components/DashS/DashCourse';
import DashAttendance from '../components/DashS/DashAttendance';
import DashNotice from '../components/DashS/DashNotice';

const Dashboard = ({ role }) => {
    // Default role is 'admin' if no role is provided
    const userRole = role || 'student';

    return (
        <div className='body flex flex-col w-full h-[100vh] p-4 md:p-10'>
            

            {/* Render content based on role */}
            {userRole === 'admin' && (
                <div className='body flex flex-col w-full h-[100vh] p-0 md:p-0'>
                    <div className='flex flex-row justify-between items-center w-full'>
                        <h1 className='text-2xl md:text-3xl font-semibold text-dblue'>Dashboard</h1>
                        <Profo />
                    </div>
                <div className='sub-body flex flex-col md:flex-row h-full w-full my-4 md:my-8 p-2'>
                    <div className='left flex flex-col h-full w-full md:w-[70%]'>
                        <div className='left-top flex flex-col md:flex-row w-full h-full md:h-[50%]'>
                            <div className='left-top-left h-full w-full md:w-[60%] p-1'>
                                <DashForm />
                            </div>
                            <div className='left-top-right h-full w-full md:w-[40%] p-1'>
                                <DashStat />
                            </div>
                        </div>
                        <div className='left-bottom w-full h-full md:h-[50%] p-1'>
                            <DashQT />
                        </div>
                    </div>
                    <div className='right flex flex-col h-full md:h-[75vh] w-full md:w-[30%] p-1'>
                        <DashRecent />
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
