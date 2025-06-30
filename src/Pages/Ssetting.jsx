import React, { useEffect, useState } from 'react';

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
        const res = JSON.parse(localStorage.getItem('userData'));
        console.log('Fetched user data:', res);
        setUserData({
          display_name: res.display_name || '',
          email: res.email || '',
          roll_number: res.roll || '',
          branch: res.branch || '',
          year: res.year || '',
          mobile: res.mobile || '',
        });
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="body flex flex-col w-full h-screen p-4 md:p-6 lg:p-8 overflow-hidden">
      {/* Fixed Header */}
      <div className='flex-shrink-0 mb-4'>
        <h1 className='text-[#173061] text-xl sm:text-2xl lg:text-3xl font-semibold mb-4'>Profile Settings</h1>
      </div>

      {/* Scrollable Content */}
      <div className='flex-1 overflow-y-auto pr-2 
                    [&::-webkit-scrollbar]:[width:4px]
                    [&::-webkit-scrollbar-thumb]:bg-[#173061]
                    [&::-webkit-scrollbar-thumb]:rounded-full'>
        <div className='pb-16 lg:pb-4 flex justify-center'>
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
            
            <div className="space-y-4 sm:space-y-6">
              {/* Display Name */}
              <div>
                <label className="block text-[#173061] font-semibold mb-2 text-sm sm:text-base">Display Name</label>
                <input
                  type="text"
                  value={userData.display_name}
                  disabled
                  className="w-full rounded-lg border border-gray-300 shadow-sm bg-gray-100 p-2 sm:p-3 text-gray-600 text-sm sm:text-base"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[#173061] font-semibold mb-2 text-sm sm:text-base">Email</label>
                <input
                  type="text"
                  value={userData.email}
                  disabled
                  className="w-full rounded-lg border border-gray-300 shadow-sm bg-gray-100 p-2 sm:p-3 text-gray-600 text-sm sm:text-base"
                />
              </div>

              {/* Roll Number */}
              <div>
                <label className="block text-[#173061] font-semibold mb-2 text-sm sm:text-base">Roll Number</label>
                <input
                  type="text"
                  value={userData.roll_number}
                  disabled
                  className="w-full rounded-lg border border-gray-300 shadow-sm bg-gray-100 p-2 sm:p-3 text-gray-600 text-sm sm:text-base"
                />
              </div>

              {/* Branch */}
              <div>
                <label className="block text-[#173061] font-semibold mb-2 text-sm sm:text-base">Branch</label>
                <input
                  type="text"
                  value={userData.branch}
                  disabled
                  className="w-full rounded-lg border border-gray-300 shadow-sm bg-gray-100 p-2 sm:p-3 text-gray-600 text-sm sm:text-base"
                />
              </div>

              {/* Year */}
              <div>
                <label className="block text-[#173061] font-semibold mb-2 text-sm sm:text-base">Year</label>
                <input
                  type="text"
                  value={userData.year}
                  disabled
                  className="w-full rounded-lg border border-gray-300 shadow-sm bg-gray-100 p-2 sm:p-3 text-gray-600 text-sm sm:text-base"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-[#173061] font-semibold mb-2 text-sm sm:text-base">Mobile</label>
                <input
                  type="text"
                  value={userData.mobile}
                  disabled
                  className="w-full rounded-lg border border-gray-300 shadow-sm bg-gray-100 p-2 sm:p-3 text-gray-600 text-sm sm:text-base"
                />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 text-center mt-6 sm:mt-8">
              For any discrepancies/changes, contact{' '}
              <span className="text-[#173061] font-semibold underline">varleen.kaur@thapar.edu</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ssetting;
