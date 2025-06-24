import React from 'react';
import Profo from '../components/Profo';

// Admin Components
import DashNoticeAdmin from '../components/DashA/DashNoticeAdmin';
import DashStudent from '../components/DashA/DashStudent';
import DashCourseAdmin from '../components/DashA/DashCourseAdmin';

// Student Components
import DashCourse from '../components/DashS/DashCourse';
import DashAttendance from '../components/DashS/DashAttendance';
import DashNotice from '../components/DashS/DashNotice';

const Dashboard = () => {
    // Default role is 'student' if no role is provided
    const userRole = localStorage.getItem('userRole') || 'student';
    return (
      <div className="body flex flex-col w-full min-h-screen h-screen p-4 pb-10 md:p-6 lg:p-8 overflow-hidden">
        {userRole === 'admin' && (
          <div className="flex flex-col w-full h-full overflow-hidden">
            <div className="flex flex-row justify-between items-center w-full mb-4 gap-2">
              <h1 className="text-2xl lg:text-3xl font-semibold text-dblue">Dashboard</h1>
              <Profo />
            </div>
            <div className="flex flex-col gap-4 h-[90%]  mb-10 lg:mb-0 overflow-auto pr-2
                      [&::-webkit-scrollbar]:[width:4px]
                      [&::-webkit-scrollbar-thumb]:bg-[#173061]
                      [&::-webkit-scrollbar-thumb]:rounded-full">
              <div className="bg-lblue rounded w-full flex-1 min-h-[250px] overflow-hidden">
                <DashCourseAdmin />
              </div>
              <div className="flex flex-col lg:flex-row gap-4 w-full flex-1 min-h-[300px]">
                <div className="bg-lblue rounded w-full lg:w-1/2 h-full min-h-[300px] overflow-hidden">
                  <DashNoticeAdmin />
                </div>
                <div className="bg-lblue rounded w-full lg:w-1/2 h-full min-h-[250px] overflow-hidden">
                  <DashStudent />
                </div>
              </div>
            </div>
          </div>
        )}        
        {userRole === 'student' && (
          <div className="flex flex-col w-full h-full overflow-hidden">
            <div className="flex flex-row justify-between items-center w-full mb-4 gap-2">
              <h1 className="text-2xl lg:text-3xl font-semibold text-dblue">Recent Courses</h1>
              <Profo />
            </div>
            <div className="flex flex-col gap-4 h-[90%]  mb-10 lg:mb-0 overflow-auto pr-2
                      [&::-webkit-scrollbar]:[width:4px]
                      [&::-webkit-scrollbar-thumb]:bg-[#173061]
                      [&::-webkit-scrollbar-thumb]:rounded-full">
              <div className="bg-lblue rounded w-full flex-1 min-h-[250px] overflow-hidden">
                <DashCourse />
              </div>
              <div className="flex flex-col md:flex-row gap-4 flex-1 min-h-[300px]">
                <div className="bg-lblue rounded w-full md:w-1/2 h-full min-h-[300px] overflow-hidden">
                  <DashNotice />
                </div>
                <div className="bg-lblue rounded w-full md:w-1/2 h-full min-h-[250px] overflow-hidden">
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
