import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Ssetting = () => {
  const [userData, setUserData] = useState({
    display_name: '',
    email: '',
    roll_number: '',
    branch: '',
    year: '',
    mobile: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/users/current', {
          withCredentials: true,
        });
        console.log('Fetched user data:', res.data);
        setUserData({
          display_name: res.data.display_name || '',
          email: res.data.email || '',
          roll_number: res.data.roll || '',
          branch: res.data.branch || '',
          year: res.data.year || '',
          mobile: res.data.mobile || '',
        });
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="body flex flex-col w-full h-full p-4 md:p-10 justify-center items-center">
      <div className="w-[full] h-full max-w-md bg-white rounded-2xl shadow-lg p-8 py-7">
        <h1 className="text-3xl font-bold text-center text-dblue mb-4">Profile Settings</h1>

        <div className="space-y-4">
          {/* Display Name */}
          <div>
            <label className="text-dblue font-semibold">Display Name</label>
            <input
              type="text"
              value={userData.display_name}
              disabled
              className="w-full rounded-lg border-gray-300 shadow-sm bg-gray-100 p-2 text-gray-600 text-gray-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-dblue font-semibold">Email</label>
            <input
              type="text"
              value={userData.email}
              disabled
              className=" w-full rounded-lg border-gray-300 shadow-sm bg-gray-100 p-2 text-gray-600"
            />
          </div>

          {/* Roll Number */}
          <div>
            <label className="text-dblue font-semibold">Roll Number</label>
            <input
              type="text"
              value={userData.roll_number}
              disabled
              className=" w-full rounded-lg border-gray-300 shadow-sm bg-gray-100 p-2 text-gray-600"
            />
          </div>

          {/* Branch */}
          <div>
            <label className="text-dblue font-semibold">Branch</label>
            <input
              type="text"
              value={userData.branch}
              disabled
              className=" w-full rounded-lg border-gray-300 shadow-sm bg-gray-100 p-2 text-gray-600"
            />
          </div>

          {/* Year */}
          <div>
            <label className="text-dblue font-semibold">Year</label>
            <input
              type="text"
              value={userData.year}
              disabled
              className=" w-full rounded-lg border-gray-300 shadow-sm bg-gray-100 p-2 text-gray-600"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="text-dblue font-semibold">Mobile</label>
            <input
              type="text"
              value={userData.mobile}
              disabled
              className=" w-full rounded-lg border-gray-300 shadow-sm bg-gray-100 p-2 text-gray-600"
            />
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center mt-8">
          For any discrepancies/changes, contact{' '}
          <span className="text-dblue font-semibold underline">varleen@thapar.edu</span>
        </p>
      </div>
    </div>
  );
};

export default Ssetting;
