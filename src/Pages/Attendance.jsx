import React, { useEffect, useState } from 'react';
import Profo from '../components/Profo';
import OverallAttendance from '../components/AttendanceS/OverallAttendance';
import RecentAttendance from '../components/AttendanceS/RecentAttendance';
import CourseAttendance from '../components/AttendanceS/CourseAttendance';
import axios from 'axios';

const Attendance = () => {
    const [totalPercentage, setTotalPercentage] = useState(0);
    const [subjectWise, setSubjectWise] = useState({});
    const [recentAttendance, setRecentAttendance] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAttendanceSummary = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/attendance/summary');
                setTotalPercentage(response.data.total_percentage);
                setSubjectWise(response.data.subject_wise);
            } catch (error) {
                console.error('Error fetching attendance summary:', error);
            }
        };

        const fetchRecentAttendance = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/attendances/recent');
                const parsedData = response.data.map(item => ({
                    courseName: item.course_name,
                    markedAt: item.marked_at,
                }));
                setRecentAttendance(parsedData);
                console.log(parsedData);

            } catch (error) {
                console.error('Error fetching recent attendance:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendanceSummary();
        fetchRecentAttendance();
    }, []);

    return (
        <div className='body flex flex-col w-full h-full p-4 md:p-10 bg-gray-100'>
            {/* Header */}
            <div className='flex flex-row justify-between items-center w-full '>
                <h1 className='text-2xl md:text-3xl font-semibold text-dblue'>Attendance Record</h1>
                <Profo />
            </div>

            <div className="sub-body flex flex-col w-full bg-[#CFCFCF] m-2 mt-6 h-full lg:grid lg:grid-cols-3 lg:grid-rows-4 gap-0.5">
                <div className="bg-[#E4E9F0] p-8 flex items-center lg:col-span-2 lg:row-span-1">
                    <OverallAttendance totalPercentage={totalPercentage} />
                </div>
                <div className="bg-[#E4E9F0] p-8 py-4 flex flex-col lg:col-span-1 lg:row-span-4">
                    <RecentAttendance loading={loading} recentAttendance={recentAttendance} />
                </div>
                <div className="bg-[#E4E9F0] p-8 py-4 flex flex-col h-full lg:col-span-2 lg:row-span-3">
                    <CourseAttendance subjectWise={subjectWise} />
                </div>
            </div>
        </div>
    );
};

export default Attendance;