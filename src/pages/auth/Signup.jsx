// src/pages/auth/SignUp.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    HiOutlineLockClosed, 
    HiOutlineUser,       // New: User icon for Worker
    HiOutlineEnvelope, 
    HiOutlineKey,
    HiOutlineShieldCheck // New: Shield icon for Admin
} from 'react-icons/hi2';

const SignUp = () => {
  const [role, setRole] = useState('worker');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Signing up as ${role}:`, formData);
    alert(`Attempting to sign up as ${role}. Check console for details.`);
  };

  const RoleToggle = () => (
    <div className="flex bg-gray-100 p-1 rounded-lg text-sm font-medium">
      <button
        className={`flex-1 flex items-center justify-center py-2 rounded-lg transition duration-150 ${
          role === 'worker' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => setRole('worker')}
      >
        {/* Worker Icon */}
        <HiOutlineUser className="w-5 h-5 mr-1" />
        Worker
      </button>
      <button
        className={`flex-1 flex items-center justify-center py-2 rounded-lg transition duration-150 ${
          role === 'admin' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => setRole('admin')}
      >
        {/* Admin Icon */}
        <HiOutlineShieldCheck className="w-5 h-5 mr-1" />
        Admin
      </button>
    </div>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        
        {/* Card Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-indigo-100 rounded-full text-indigo-600 mb-4">
            <HiOutlineLockClosed className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Create an Account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Join the Inventory Management System
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Role Toggle with Icons */}
          <RoleToggle />

          {/* Full Name Input */}
          <div>
            <div className="relative">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
              <HiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          {/* Email Input */}
          <div>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
              <HiOutlineEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a secure password"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
              <HiOutlineKey className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md"
          >
            Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account? 
          <Link to="/signin" className="text-indigo-600 hover:underline ml-1">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;