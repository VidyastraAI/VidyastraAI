import React from 'react';
import AdminLayout from './AdminLayout';

const AdminHome = () => {
  return (
    <AdminLayout>
      <h2 className="text-4xl font-bold mb-8">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Unique Neon Card Design */}
        <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-blue-500 transition-all shadow-2xl">
          <p className="text-blue-400 font-semibold mb-2">Total Students</p>
          <h3 className="text-5xl font-extrabold text-white">12,845</h3>
        </div>
        {/* Repeat for other stats */}
      </div>
    </AdminLayout>
  );
};
export default AdminHome;
