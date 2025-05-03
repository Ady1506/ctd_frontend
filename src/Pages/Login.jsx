import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Auth = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    display_name: '',
    roll: '',
    role: 'student', // fixed role
  });
  const [error, setError] = useState('');

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     navigate('/Dashboard');
  //   }
  // }, [navigate]);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/users/current', {
          withCredentials: true, // important for sending cookies
        });

        if (res.data.user) {
          navigate('/dashboard');
        }
      } catch (err) {
        console.log('Not logged in yet.');
      }
    };

    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setIsSignup((prev) => !prev);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignup
      ? 'http://localhost:8000/api/users/signup'
      : 'http://localhost:8000/api/users/signin';
  
    try {
      const { email, password, display_name } = form;
      const payload = isSignup
        ? { email, password, display_name, role: 'student' }
        : { email, password };
  
      const res = await axios.post(endpoint, payload, {
        withCredentials: true, // 👈🏽 Add this line
      });
  
      const { token } = res.data;
  
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(res.data));
      localStorage.setItem('userRole', res.data.role); // Store user role in local storage
      navigate('/Dashboard');
    } catch (err) {
      const msg =
        err.response?.data?.message || 'Something went wrong. Please try again.';
      setError(msg);
    }
  };
  

  return (
    <div className="relative flex min-h-screen w-full bg-[#E4E9F0]">
      {/* Background image for small screens */}
      <div className="absolute inset-0 lg:hidden">
        <img
          src="thapar.png"
          alt="Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>

      {/* Left side image for large screens */}
      <div className="hidden lg:block lg:w-7/12 relative">
        <img
          src="thapar.png"
          alt="Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">Welcome to CTD</h1>
        </div>
      </div>

      {/* Right side form */}
      <div className="w-full lg:w-5/12 flex justify-center items-center min-h-screen p-6 relative z-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white bg-opacity-90 p-8 rounded shadow-lg space-y-4"
        >
          <h2 className="text-2xl text-[#173061] font-semibold mb-4 text-center">
            {isSignup ? 'Sign Up' : 'Login'}
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded">
              {error}
            </div>
          )}

          {isSignup && (
            <>
              <input
                type="text"
                name="display_name"
                placeholder="Name"
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="roll"
                placeholder="Roll Number"
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          {!isSignup && (
            <div className="text-sm text-right text-[#173061] cursor-pointer hover:underline">
              Forgot password?
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#173061] hover:shadow-lg hover:shadow-[#173061]/50 text-white p-2 rounded mt-2"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>

          <p className="text-center text-[#173061] mt-4">
            {isSignup ? (
              <>
                Already have an account?{' '}
                <span
                  onClick={toggleMode}
                  className="cursor-pointer underline hover:opacity-80"
                >
                  Login
                </span>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <span
                  onClick={toggleMode}
                  className="cursor-pointer underline hover:opacity-80"
                >
                  Sign Up
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;