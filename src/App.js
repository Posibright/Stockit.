// src/App.jsx (or your main router file)

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all necessary pages
import AdminDashboard from './pages/admin/AdminDashboard'; 
import SignUp from './pages/auth/Signup'; 
// Assuming you have a SignIn component
import SignIn from "./pages/auth/Signin"; 

const App = () => {
  return (
    // Wrap your entire application in the Router
    <Router>
      <Routes>
        
        {/* Route for the Admin Dashboard (or your home page) */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* New Route for Sign Up */}
        <Route path="/signup" element={<SignUp />} />
        
        {/* Assuming /signin is where the sign-in page is */}
        <Route path="/signin" element={<SignIn />} /> 

        {/* Add more routes here, like the root path */}
        <Route path="/" element={<AdminDashboard />} /> 
      </Routes>
    </Router>
  );
};

export default App;