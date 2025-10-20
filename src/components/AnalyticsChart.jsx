// src/components/AnalyticsChart.jsx

import React from 'react';
import { PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Data for the "Products by Category" pie chart
const categoryData = [
  { name: 'Electronics', value: 50 },
  { name: 'Accessories', value: 15 },
  { name: 'Office Supplies', value: 25 },
  { name: 'Furniture', value: 10 },
];

// Custom colors for categories (matches the image's palette)
const CATEGORY_COLORS = ['#3f51b5', '#ff9800', '#4caf50', '#e91e63'];

// Data for the "Stock Status Distribution" pie chart
const statusData = [
  { name: 'In Stock', value: 65 },
  { name: 'Low Stock', value: 20 },
  { name: 'Out of Stock', value: 15 },
];

// Custom colors for stock status
const STATUS_COLORS = ['#4caf50', '#ffc107', '#f44336'];

// Data for the "Top 5 Most Valuable Items" bar chart
const valuableItemsData = [
  { name: 'Item A', value: 6000 },
  { name: 'Item B', value: 5200 },
  { name: 'Item C', value: 4500 },
  { name: 'Item D', value: 3900 },
  { name: 'Item E', value: 3100 },
];

const AnalyticsChart = () => {
  return (
    // Removed the background, shadow, and border here, replaced with a wrapper for spacing
    <div className="space-y-6"> 
      
      {/* Top Row: Two Pie Charts Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> 
        
        {/* Chart 1: Products by Category - NOW A SEPARATE CARD */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Products by Category</h4>
          <p className="text-sm text-gray-500 mb-4">Distribution of all inventory items</p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                labelLine={false}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-category-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2: Stock Status Distribution - NOW A SEPARATE CARD */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Stock Status Distribution</h4>
          <p className="text-sm text-gray-500 mb-4">Current inventory health</p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60} // Donut chart style
                paddingAngle={5}
                fill="#82ca9d"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-status-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row: Bar Chart - NOW A SEPARATE CARD */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Top 5 Most Valuable Items</h4>
        <p className="text-sm text-gray-500 mb-4">Based on total inventory value (price × stock)</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={valuableItemsData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" domain={[0, 6000]} />
            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Total Value']} />
            <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default AnalyticsChart;