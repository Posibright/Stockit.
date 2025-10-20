// src/components/AnalyticsChart.jsx

import React, { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useSpring, animated } from '@react-spring/web';

const useOnScreen = (options) => {
  const ref = useRef();
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // FIX: Set the state based on the current intersection status.
      // This allows the state to become false when the element scrolls out of view.
      setIntersecting(entry.isIntersecting); 
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
};


const categoryData = [
  { name: 'Electronics', value: 50 },
  { name: 'Accessories', value: 15 },
  { name: 'Office Supplies', value: 25 },
  { name: 'Furniture', value: 10 },
];
const CATEGORY_COLORS = ['#3f51b5', '#ff9800', '#4caf50', '#e91e63'];

const statusData = [
  { name: 'In Stock', value: 65 },
  { name: 'Low Stock', value: 20 },
  { name: 'Out of Stock', value: 15 },
];
const STATUS_COLORS = ['#4caf50', '#ffc107', '#f44336'];

const valuableItemsData = [
  { name: 'Item A', value: 6000 },
  { name: 'Item B', value: 5200 },
  { name: 'Item C', value: 4500 },
  { name: 'Item D', value: 3900 },
  { name: 'Item E', value: 3100 },
];

const AnalyticsChart = () => {
  const [barChartRef, isBarChartVisible] = useOnScreen({ threshold: 0.1 }); 

  const barChartSpring = useSpring({
    // If NOT visible, opacity is 0 and it's translated down 50px.
    // If visible, opacity is 1 and it returns to original position (0px).
    opacity: isBarChartVisible ? 1 : 0, 
    transform: isBarChartVisible ? 'translateY(0px)' : 'translateY(50px)',
    config: { tension: 180, friction: 12 },
  });

  return (
    <div className="space-y-6"> 
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> 
        
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
                innerRadius={60}
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

      <animated.div 
        ref={barChartRef} 
        style={barChartSpring} 
        className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
      >
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
      </animated.div>

    </div>
  );
};

export default AnalyticsChart;