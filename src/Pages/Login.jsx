import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Add your authentication logic here
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
      navigate('/dashboard'); // Redirect to the dashboard
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex flex-row h-screen bg-gray-100">
      <img>
      </img>
      <div className="flex flex-col justify-between">
        <div></div>
        <div className='flex flex-col'>
            <h1 className='text-2xl font-bold'>SignIn</h1>
            <h3 className='text-md font-light'>Welcome Back</h3>
            <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)}></input>
            <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}></input>
            <button onClick={handleLogin}>Login</button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Login;