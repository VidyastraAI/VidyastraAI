import React from 'react';
import AdminLayout from './AdminLayout';

const UserManagement = () => (
  <AdminLayout>
    <h2 className="text-4xl font-bold mb-8 text-white">User Management</h2>
    <div className="grid grid-cols-2 gap-8">
      <div className="p-8 rounded-3xl bg-blue-600/20 border border-blue-500/30">
        <h3 className="text-blue-300">Total Students</h3>
        <p className="text-5xl font-bold">12,845</p>
      </div>
      <div className="p-8 rounded-3xl bg-purple-600/20 border border-purple-500/30">
        <h3 className="text-purple-300">Active Users</h3>
        <p className="text-5xl font-bold">11,327</p>
      </div>
    </div>
  </AdminLayout>
);
export default UserManagement;
