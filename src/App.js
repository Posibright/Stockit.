// src/App.jsx (or your main router file)

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all necessary pages
import AdminDashboard from './pages/admin/AdminDashboard'; 
import SignUp from './pages/auth/Signup'; 
import SignIn from "./pages/auth/Signin"; 
import WorkerDashboard from './pages/user/WorkerDashboard'; 

const App = () => {
  return (
    // Wrap your entire application in the Router
    <Router>
      <Routes>
        
        {/* 🚀 FIX: This ensures the Admin Dashboard loads at the root path (localhost:3000) */}
        <Route path="/" element={<AdminDashboard />} /> 
        
        {/* Route for the Admin Dashboard (kept for clarity, redirects to / if exact is not used) */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Worker Dashboard is correctly mapped to its new path */}
        <Route path="/worker" element={<WorkerDashboard />} />

        {/* New Route for Sign Up */}
        <Route path="/signup" element={<SignUp />} />
        
        {/* Assuming /signin is where the sign-in page is */}
        <Route path="/signin" element={<SignIn />} /> 
        
      </Routes>
    </Router>
  );
};

export default App;