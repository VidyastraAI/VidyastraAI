import React from 'react';
import AdminLayout from './AdminLayout';

const Settings = () => (
  <AdminLayout>
    <h2 className="text-4xl font-bold mb-8 text-white">Platform Settings</h2>
    <div className="bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10">
      <div className="flex justify-between items-center mb-8">
        <p className="text-lg">Maintenance Mode</p>
        <div className="w-16 h-8 bg-slate-700 rounded-full p-1 cursor-pointer">
          <div className="w-6 h-6 bg-white rounded-full"></div>
        </div>
      </div>
      <button className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-slate-200">
        Save Changes
      </button>
    </div>
  </AdminLayout>
);
export default Settings;
