import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profo = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/users/current', {
          withCredentials: true,
        });
        console.log('Fetched data:', res.data);
        setUserName(res.data.display_name);
      } catch (err) {
        console.error('Error fetching user:', err);
        setUserName('Guest');
      }
    };

    fetchUser();
  }, []);

  return (
    <div className='flex flex-row items-center gap-2'>
      <h1 className='text-xl font-medium'>{userName || 'Loading...'}</h1>
      <img
        src='https://img.icons8.com/?size=100&id=84898&format=png&color=173061'
        className='w-10 h-10'
        alt="User Icon"
      />
      <img
        src='https://img.icons8.com/?size=100&id=364&format=png&color=999999'
        className='w-6 h-6'
        alt="Settings"
      />
    </div>
  );
};

export default Profo;
