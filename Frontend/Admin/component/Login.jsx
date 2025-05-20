import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../src/store/authSlice';
import { useDispatch } from 'react-redux';
import authServices from '../src/services/auth.js';
import { useForm } from 'react-hook-form';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const login = async (data) => {
    setError('');
    try {
      const session = await authServices.loginAdmin({ ...data });

      if (session) {
        const adminData = await authServices.getCurruntAdmin();
        if (adminData) {
          dispatch(authLogin(adminData));
          navigate('/');
        }
      }
    } catch (error) {
      setError(error.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-zinc-900">
      <div className="w-full max-w-md bg-zinc-800 p-8 rounded-2xl shadow-lg border border-zinc-700">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white">Sign in to your account</h2>
          <p className="mt-2 text-zinc-400 text-sm">
            Don&apos;t have an account?&nbsp;
            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-300 font-medium transition"
            >
              Sign up
            </Link>
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit(login)} className="space-y-4">
          <div>
            <label className="block text-zinc-300 mb-1 text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('email', {
                required: 'Email is required',
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    'Invalid email format',
                },
              })}
            />
          </div>

          <div>
            <label className="block text-zinc-300 mb-1 text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('password', {
                required: 'Password is required',
              })}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
