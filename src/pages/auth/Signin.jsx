import React, { useState } from 'react';
// 🔑 1. Import useNavigate
import { Link, useNavigate } from 'react-router-dom'; 
import { 
    HiOutlineLockClosed, 
    HiOutlineUser, 
    HiOutlineEnvelope, 
    HiOutlineKey,
    HiOutlineShieldCheck 
} from 'react-icons/hi2';

const SignIn = () => {
  // 🔑 2. Initialize the navigate hook
  const navigate = useNavigate();
    
  // State to manage the active role (worker or admin)
  const [role, setRole] = useState('worker');
    
  // State to manage form inputs
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    secretKey: '', // Included for Admin sign-in
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // --- Authentication Simulation and Redirection ---
    
    // In a real application, you would make an API call here.
    // If the API call is successful, you would then check the user's role
    // and execute the navigation below.
    
    // For now, we simulate success and redirect immediately:

    // Logic for Worker (only needs email, password)
    if (role === 'worker') {
      const { email, password } = formData;
      console.log(`Signing in as Worker:`, { email, password });
      
      // 🚀 Redirect Worker to /worker dashboard
      navigate('/worker');

    } 
    // Logic for Admin (needs email, password, secretKey)
    else if (role === 'admin') {
      console.log(`Signing in as Admin:`, formData);
      
      // 🚀 Redirect Admin to /admin dashboard
      navigate('/admin');
    }
    
    // The previous alert is now removed for a smoother transition
  };

  const RoleToggle = () => (
    <div className="flex bg-gray-100 p-1 rounded-lg text-sm font-medium">
      <button
        className={`flex-1 flex items-center justify-center py-2 rounded-lg transition duration-150 ${
          role === 'worker' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => setRole('worker')}
      >
        <HiOutlineUser className="w-5 h-5 mr-1" />
        Worker
      </button>
      <button
        className={`flex-1 flex items-center justify-center py-2 rounded-lg transition duration-150 ${
          role === 'admin' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => setRole('admin')}
      >
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
            Sign In to Dashboard
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Access your inventory management system
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Role Toggle */}
          <RoleToggle />

          {/* Email Input (Required for both) */}
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

          <div>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
              <HiOutlineKey className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Secret Key Input (Visible ONLY for Admin) */}
          {role === 'admin' && (
            <div>
              <div className="relative">
                <input
                  type="password"
                  name="secretKey"
                  value={formData.secretKey}
                  onChange={handleInputChange}
                  placeholder="Enter Admin Secret Key"
                  required={role === 'admin'}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
                <HiOutlineLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md"
          >
            Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account? 
          <Link to="/signup" className="text-indigo-600 hover:underline ml-1">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;