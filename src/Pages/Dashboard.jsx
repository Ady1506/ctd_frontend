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

            {userRole === 'student' && (
                <div className='body flex flex-col w-full h-[100vh] p-0 md:p-0'>
                <div className='flex flex-row justify-between items-center w-full'>
                    <h1 className='text-2xl md:text-3xl font-semibold text-dblue'>Recent Courses</h1>
                    <Profo />
                </div>
            <div className='sub-body flex flex-col gap-6 h-full w-full mt-4 md:mt-4 p-2 pb-0'>
                {/* <div className='left flex flex-col h-full w-full md:w-[70%]'>
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
                </div> */}
                <div className='bg-lblue h-[50%] w-full rounded'>
                    <DashCourse />
                </div>
                <div className='flex flex-col md:flex-row gap-6 h-[50%] w-full'>
                            <div className='bg-lblue h-full md:w-[50%] w-full rounded'>
                                <DashAttendance />
                            </div>
                            <div className='bg-lblue h-full md:w-[50%] w-full rounded'>
                                <DashNotice />
                            </div>
                        </div>
            </div>
            </div>
            )}
        </div>
    );
};

export default Dashboard;
