import React, { useState } from "react";
import {
  // Navigation Icon
  ArrowRightOnRectangleIcon, 
  // Icon for Priority Alerts & Quick Tips
  CheckCircleIcon, 
  // 🔑 New Icons for Overview Cards 
  ArchiveBoxIcon,           // For Total Products
  ExclamationTriangleIcon,  // For Low Stock Items (using a warning triangle)
  ClipboardDocumentCheckIcon, // For Tasks Completed
} from '@heroicons/react/24/outline'; 

const WorkerDashboard = () => {
  const initialProducts = [
    { id: "PROD001", name: "Wireless Mouse", category: "Accessories", stock: 45, min: 20, price: "$39.99" },
    { id: "PROD002", name: "Keyboard", category: "Electronics", stock: 8, min: 15, price: "$59.99" },
    { id: "PROD003", name: "USB-C Cable", category: "Electronics", stock: 20, min: 30, price: "$12.99" },
    { id: "PROD004", name: "Office Chair", category: "Furniture", stock: 22, min: 10, price: "$249.99" },
    { id: "PROD005", name: "Desk Lamp", category: "Office Supplies", stock: 0, min: 12, price: "$19.99" },
    { id: "PROD006", name: "Laptop Stand", category: "Accessories", stock: 35, min: 15, price: "$30.99" },
    { id: "PROD007", name: "Notebook (pack of 5)", category: "Office Supplies", stock: 120, min: 50, price: "$14.99" },
    { id: "PROD008", name: "Wireless Headphones", category: "Electronics", stock: 18, min: 20, price: "$89.99" },
    { id: "PROD009", name: "Monitor 24\"", category: "Electronics", stock: 12, min: 8, price: "$199.99" },
    { id: "PROD010", name: "Printer Paper", category: "Office Supplies", stock: 85, min: 40, price: "$8.99" },
  ];

  const [products, setProducts] = useState(initialProducts);

  // Chapter 2: Static Priority Alerts
  const [priorityAlerts] = useState(
    initialProducts.filter((p) => p.stock < p.min)
  );

  const getStatus = (stock, min) => {
    if (stock <= 0)
      return { label: "Out of stock", color: "bg-[#D4183D] text-white" };
    if (stock < min)
      return { label: "Low stock", color: "bg-[#ECEEF2] text-black" };
    return { label: "In Stock", color: "bg-black text-white" };
  };

  const updateStock = (id, change) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stock: Math.max(0, p.stock + change) } : p
      )
    );
  };

  return (
    <div className="bg-[#F8FAFC] text-[#111827] leading-relaxed font-['Inter',sans-serif] min-h-screen">
      
      {/* ===== NAVBAR (Previous Header) ===== */}
      <header className="flex items-center justify-between bg-white border-b border-[#E5E5E5] px-4 py-3 mb-8">
        <div className="flex flex-col items-start gap-[6px]">
          <h1 className="text-xl font-semibold text-[#4f46e5]">
            Worker Dashboard
          </h1>
          <p className="text-sm text-[#717182]">Welcome, Ade</p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 px-3 py-2 border border-[#E5E5E5] bg-white rounded-md text-sm font-semibold text-[#030213] hover:bg-[#f9fafb]"
        >
          <ArrowRightOnRectangleIcon className="w-4 h-4" />
          LogOut
        </button>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main>
        <section className="px-4">
          <div className="max-w-[1250px] mx-auto">
            {/* ===== OVERVIEW GRID - Icons and Uniformity Added ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              
              {/* Total Products Card */}
              <div className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-base font-semibold text-[#374151]">
                    Total Products
                  </h3>
                  {/* 🔑 ICON ADDED: Archive Box for inventory count */}
                  <ArchiveBoxIcon className="w-6 h-6 text-[#4f46e5]" />
                </div>
                <p className="text-2xl font-medium mt-1">
                  {products.length}
                </p>
                <p className="text-sm text-[#6b7280] mt-1">
                  Items in inventory
                </p>
              </div>

              {/* Low Stock Items Card */}
              <div className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-base font-semibold text-[#374151]">
                    Low Stock Items
                  </h3>
                  {/* 🔑 ICON ADDED: Exclamation Triangle for warnings */}
                  <ExclamationTriangleIcon className="w-6 h-6 text-[#ca8a04]" />
                </div>
                <p className="text-2xl font-medium text-[#ca8a04] mt-1">
                  {products.filter((p) => p.stock > 0 && p.stock < p.min).length}
                </p>
                <p className="text-sm text-[#6b7280] mt-1">
                  Items need Attention
                </p>
              </div>

              {/* Tasks Completed Card */}
              <div className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-base font-semibold text-[#374151]">
                    Tasks Completed
                  </h3>
                  {/* 🔑 ICON ADDED: Clipboard Check for tasks */}
                  <ClipboardDocumentCheckIcon className="w-6 h-6 text-[#10B981]" />
                </div>
                <p className="text-2xl font-medium mt-1">12</p>
                <p className="text-sm text-[#6b7280] mt-1">This week</p>
              </div>
            </div>

            {/* ===== PRIORITY ALERTS (Unchanged) ===== */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] p-6 mt-6">
              <h3 className="text-base font-semibold mb-[0.1rem]">
                Priority Alerts
              </h3>
              <p className="text-sm text-[#6b7280] mb-4">
                Items requiring immediate attention (captured on load)
              </p>

              <div className="flex flex-col gap-3">
                {priorityAlerts.length > 0 ? (
                  priorityAlerts.map((item) => {
                    const status = getStatus(item.stock, item.min);
                    return (
                      <div
                        key={item.id}
                        className="flex justify-between items-center border-b border-[#e5e7eb] py-2"
                      >
                        <div>
                          <p className="font-medium text-[#111827]">
                            {item.name}
                          </p>
                          <p className="text-sm text-[#6b7280]">
                            Current Stock: {item.stock} units (min: {item.min})
                          </p>
                        </div>
                        <span
                          className={`text-xs font-semibold px-2 py-[0.15rem] rounded-full ${status.color}`}
                        >
                          {status.label}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-[#6b7280] italic py-2">
                    No alerts at this time.
                  </p>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* ===== INVENTORY SECTION (Unchanged) ===== */}
        <section
          id="inventory"
          className="max-w-[1250px] mx-auto mt-6 px-4 py-8 border border-[#E5E5E5] rounded-xl mb-8"
        >
          <h2 className="text-base font-semibold text-[#111827]">
            Inventory
          </h2>
          <p className="text-[#6b7280] mb-7 text-sm">
            View and Update Product Stock Levels
          </p>

          <div className="overflow-x-auto bg-white border border-[#E5E5E5] rounded-xl shadow-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f9fafb] text-left text-sm font-semibold text-[#374151]">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Product Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Min Stock</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {products.map((product) => {
                  const status = getStatus(product.stock, product.min);
                  return (
                    <tr
                      key={product.id}
                      className="border-b border-[#e5e7eb]"
                    >
                      <td className="px-4 py-3">{product.id}</td>
                      <td className="px-4 py-3">{product.name}</td>
                      <td className="px-4 py-3">{product.category}</td>
                      <td className="px-4 py-3">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => updateStock(product.id, -1)}
                            className="w-8 h-8 border border-[#e5e7eb] bg-white text-[#111827] rounded-md flex items-center justify-center text-lg hover:bg-gray-50 transition-colors"
                          >
                            −
                          </button>
                          <span className="min-w-[36px] text-center font-semibold inline-block text-base">
                            {product.stock}
                          </span>
                          <button
                            onClick={() => updateStock(product.id, 1)}
                            className="w-8 h-8 border border-[#e5e7eb] bg-white text-[#111827] rounded-md flex items-center justify-center text-lg hover:bg-gray-50 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3">{product.min}</td>
                      <td className="px-4 py-3">{product.price}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-semibold px-2 py-[0.2rem] rounded-full ${status.color}`}
                        >
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ===== QUICK TIPS SECTION (Unchanged) ===== */}
        <section className="section1 max-w-[1250px] mx-auto mt-6 px-4 mb-8">
          <div className="card1 recent-tips bg-white border border-[#E5E5E5] rounded-xl p-6">
            <h3 className="text-base font-semibold mb-3">Quick Tips</h3>

            {[
              "Update Stock Levels Immediately after receiving shipments",
              "Report any damaged items to your supervisor",
              "Ensure product descriptions, prices, and images are accurate",
              "Aim to reply to messages within 24 hours",
            ].map((tip, i) => (
              <p
                key={i}
                className={`items1 text-sm text-[#6b7280] flex items-start gap-2 ${
                  i !== 3 ? "mb-2" : ""
                }`}
              >
                <CheckCircleIcon className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                {tip}
              </p>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default WorkerDashboard;