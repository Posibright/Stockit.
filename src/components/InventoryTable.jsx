import React from 'react';
import { 
  HiOutlineMagnifyingGlass, 
  HiOutlineAdjustmentsVertical, 
  HiOutlinePencilSquare, 
  HiOutlineTrash,
  HiOutlinePlus 
} from 'react-icons/hi2';

const DUMMY_PRODUCTS = [
  { id: 'PROD001', name: 'Wireless Mouse', category: 'Accessories', stock: 45, minStock: 20, price: 39.99, status: 'In Stock' },
  { id: 'PROD002', name: 'USB Cable', category: 'Electronics', stock: 11, minStock: 30, price: 12.99, status: 'Low Stock' },
  { id: 'PROD003', name: 'Laptop Stand', category: 'Peripherals', stock: 8, minStock: 15, price: 59.99, status: 'Low Stock' },
  { id: 'PROD004', name: 'Office Chair', category: 'Furniture', stock: 27, minStock: 10, price: 349.99, status: 'In Stock' },
  { id: 'PROD005', name: 'Desk Lamp', category: 'Office Supplies', stock: 6, minStock: 12, price: 34.99, status: 'Out of Stock' },
  { id: 'PROD007', name: 'Notebook (Pack of 5)', category: 'Office Supplies', stock: 150, minStock: 50, price: 14.99, status: 'In Stock' },
  { id: 'PROD008', name: 'Webcam Microphone', category: 'Electronics', stock: 19, minStock: 20, price: 89.99, status: 'Low Stock' },
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'In Stock':
      return <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">In Stock</span>;
    case 'Low Stock':
      return <span className="px-2 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full">Low Stock</span>;
    case 'Out of Stock':
      return <span className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">Out of Stock</span>;
    default:
      return null;
  }
};

const InventoryTable = ({ onAddProductClick }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Inventory Management</h3>
          <p className="text-sm text-gray-500">Manage all products in your inventory</p>
        </div>
        <button 
          onClick={onAddProductClick} 
          className="flex items-center p-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-150"
        >
          <HiOutlinePlus className="mr-2 text-xl" />
          Add Product
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-grow">
          <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button className="flex items-center p-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition duration-150">
          <HiOutlineAdjustmentsVertical className="w-5 h-5 mr-2" />
          Filter
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {DUMMY_PRODUCTS.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.minStock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(product.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button title="Edit" className="text-indigo-600 hover:text-indigo-900">
                      <HiOutlinePencilSquare className="w-5 h-5" />
                    </button>
                    <button title="Delete" className="text-red-600 hover:text-red-900">
                      <HiOutlineTrash className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default InventoryTable;