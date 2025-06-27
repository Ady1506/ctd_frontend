import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Auth = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [form, setForm] = useState({
    email: '',
    roll: '',
    branch: '',
    year: '',
    mobile: '',
    display_name: '',
    password: '',
    role: 'student',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('/api/users/current', {
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

  const resetFormAndMessages = () => {
    setForm({
      email: '', roll: '', branch: '', year: '', mobile: '', display_name: '', password: '', role: 'student',
    });
    setError('');
    setSuccessMessage('');
  };

  const switchToSignup = () => {
    setIsSignup(true);
    setIsForgotPassword(false);
    resetFormAndMessages();
  };

  const switchToLogin = () => {
    setIsSignup(false);
    setIsForgotPassword(false);
    resetFormAndMessages();
  };

  const switchToForgotPassword = () => {
    setIsForgotPassword(true);
    setIsSignup(false);
    resetFormAndMessages();
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setIsForgotPassword(false);
    resetFormAndMessages();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (isForgotPassword) {
      try {
        await axios.post('/api/users/forgot-password', { email: form.email });
        setSuccessMessage('If an account with that email exists, a password reset link has been sent. Please check your inbox.');
        switchToLogin();
      } catch (err) {
        const msg = err.response?.data?.message || 'Failed to send reset link. Please try again.';
        setError(msg);
      }
      return;
    }

    if (isSignup) {
      try {
        const payload = {
          ...form,
          roll: Number(form.roll),
          year: Number(form.year),
          mobile: Number(form.mobile),
        };
        await axios.post('/api/users/signup', payload);
        setSuccessMessage('Signup successful! Please verify your account via email and then login.');
      } catch (err) {
        if (err.response && err.response.status === 409) {
          console.log('account already exists');
          setError('Email already exists.');
        } else {
          const msg = err.response?.data?.message || 'Signup failed.';
          setError(msg);
        }
      }
    } else {
      try {
        const { email, password } = form;
        const res = await axios.post(
          '/api/users/signin',
          { email, password }
        );

        const { token } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(res.data));
        localStorage.setItem('userRole', res.data.role);
        navigate('/Dashboard');
      } catch (err) {
        const msg = err.response?.data?.message || 'Login failed. Please check your credentials or verify your account.';
        setError(msg);
      }
    }
  };

  const getTitle = () => {
    if (isForgotPassword) return 'Reset Password';
    if (isSignup) return 'Sign Up';
    return 'Login';
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
            {getTitle()}
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded">
              {successMessage}
            </div>
          )}

          {isSignup && (
            <>
              <input
                type="text"
                name="display_name"
                placeholder="Name"
                value={form.display_name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="roll"
                placeholder="Roll Number"
                value={form.roll}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="branch"
                placeholder="Branch"
                value={form.branch}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="year"
                placeholder="Year"
                value={form.year}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={form.mobile}
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
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          
          {!isForgotPassword && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          )}

          {!isSignup && !isForgotPassword && (
            <div 
              onClick={switchToForgotPassword}
              className="text-sm text-right text-[#173061] cursor-pointer hover:underline"
            >
              Forgot password?
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#173061] hover:shadow-lg hover:shadow-[#173061]/50 text-white p-2 rounded mt-2"
          >
            {isForgotPassword ? 'Send Reset Link' : (isSignup ? 'Sign Up' : 'Login')}
          </button>

          {isForgotPassword ? (
            <p className="text-center text-[#173061] mt-4">
              Remember your password?{' '}
              <span
                onClick={switchToLogin}
                className="cursor-pointer underline hover:opacity-80"
              >
                Back to Login
              </span>
            </p>
          ) : (
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
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;