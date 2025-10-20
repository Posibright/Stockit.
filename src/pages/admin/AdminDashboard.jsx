// src/pages/admin/AdminDashboard.jsx

import React, { useState } from 'react';
import { 
  HiOutlinePlus, 
  HiOutlineCloudArrowDown, 
  HiOutlineChartBar,
  HiOutlineCube, 
  HiOutlineExclamationTriangle, 
  HiOutlineBanknotes, 
  HiOutlineShoppingCart
} from 'react-icons/hi2'; 
import AddProductModal from '../../components/AddProductModal'; 
import InventoryTable from '../../components/InventoryTable'; 
import AnalyticsChart from '../../components/AnalyticsChart'; 


const MetricCard = ({ title, value, description, trend, color, Icon, iconColor }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 relative">
    {Icon && (
      <div className={`absolute top-4 right-4 text-xl ${iconColor || 'text-gray-400'}`}>
        <Icon className="w-5 h-5" />
      </div>
    )}
    
    <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
    <p className={`text-3xl font-bold mt-1 ${color || 'text-gray-900'}`}>{value}</p>
    <div className="text-xs mt-2 text-gray-600">
      {description}
      {trend && <span className="ml-2 text-green-500 font-medium">{trend}</span>}
    </div>
  </div>
);

const QuickActions = ({ onAddClick }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
    <p className="text-sm text-gray-500 mb-6">Common administrative tasks</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      
      <button 
        className="flex items-center justify-center p-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-150"
        onClick={onAddClick} 
      >
        <HiOutlinePlus className="mr-2 text-xl" /> 
        Add New Product
      </button>
      
      <button className="flex items-center justify-center p-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition duration-150">
        <HiOutlineCloudArrowDown className="mr-2 text-xl" /> 
        Export Report
      </button>
      
      <button className="flex items-center justify-center p-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition duration-150">
        <HiOutlineChartBar className="mr-2 text-xl" /> 
        View Analytics
      </button>
      
    </div>
  </div>
);

const RecentActivity = () => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
    
    <div className="space-y-4">
      <div className="flex justify-between items-start pb-4 border-b border-gray-100 last:border-b-0">
        <div>
          <p className="font-medium text-gray-700">Product added: 5 Wireless Mouse</p>
          <p className="text-xs text-gray-500">2 hours ago</p>
        </div>
        <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">New</span>
      </div>
      
      <div className="flex justify-between items-start pb-4 border-b border-gray-100 last:border-b-0">
        <div>
          <p className="font-medium text-gray-700">Stock updated: USB Cable (20 units)</p>
          <p className="text-xs text-gray-500">5 hours ago</p>
        </div>
        <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">Update</span>
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium text-gray-700">Low stock alert: Keyboard</p>
          <p className="text-xs text-gray-500">1 day ago</p>
        </div>
        <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full">Alert</span>
      </div>
      
    </div>
  </div>
);

const AdminProfileDropdown = () => (
  <div className="relative">
    <button 
      className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden border-2 border-transparent hover:border-indigo-500 transition duration-150"
      aria-label="Admin Profile Menu"
    >
      <span className="text-xl text-gray-700 font-semibold">A</span> 
    </button>
  </div>
);


const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('overview'); 

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const TabButton = ({ view, label }) => (
    <button 
      className={`py-2 px-4 text-sm font-medium transition duration-150 
        ${currentView === view 
          ? 'text-indigo-600 border-b-2 border-indigo-600' 
          : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300'}`
      }
      onClick={() => setCurrentView(view)}
    >
      {label}
    </button>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'inventory':
        return <InventoryTable onAddProductClick={openModal} />; 
      case 'analytics': 
        return <AnalyticsChart />; 
      case 'overview':
      default:
        return (
          <div className="space-y-6"> 
            <QuickActions onAddClick={openModal} /> 
            <RecentActivity />
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
        
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard: {currentView === 'overview' ? 'Overview' : currentView === 'inventory' ? 'Inventory' : 'Analytics'}</h1>
              <p className="text-sm text-gray-500">Welcome Back, Akande.</p>
            </div>
            <AdminProfileDropdown />
          </header>

          {/* 1. Metric Cards (Top Row) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard 
              title="Total Products" 
              value="44" 
              description="4 in low or critical inventory"
              trend="10%"
              Icon={HiOutlineCube} 
              iconColor="text-indigo-500"
            />
            <MetricCard 
              title="Low Stock Items" 
              value="4" 
              description="Time to reorder"
              color="text-yellow-600"
              Icon={HiOutlineExclamationTriangle}
              iconColor="text-red-500"
            />
            <MetricCard 
              title="Total Value" 
              value="$15,506.4" 
              description="Inventory worth"
              Icon={HiOutlineBanknotes}
              iconColor="text-green-500"
            />
            <MetricCard 
              title="Out of Stock" 
              value="1" 
              description="Must restock soon"
              color="text-red-600"
              Icon={HiOutlineShoppingCart}
              iconColor="text-red-500"
            />
          </div>

          <div className="flex border-b border-gray-200 mb-8">
            <TabButton view="overview" label="Overview" />
            <TabButton view="inventory" label="Inventory" />
            <TabButton view="analytics" label="Analytics" />
            <TabButton view="users" label="Users" /> 
          </div>
          
          {renderContent()}
          
        </div>
      </main>
      
      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default AdminDashboard;