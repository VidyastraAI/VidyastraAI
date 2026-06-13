import React from 'react';
import AdminLayout from './AdminLayout';

const NotificationsMgt = () => (
  <AdminLayout>
    <h2 className="text-4xl font-bold mb-8 text-white">Notification Management</h2>
    <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 space-y-4">
      {/* Example Notification Item */}
      <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-700">
        <div>
          <p className="font-semibold">New Course Approval Request</p>
          <p className="text-sm text-slate-400">System generated alert</p>
        </div>
        <button className="text-blue-400 hover:text-blue-300 font-bold">View</button>
      </div>
    </div>
  </AdminLayout>
);
export default NotificationsMgt;