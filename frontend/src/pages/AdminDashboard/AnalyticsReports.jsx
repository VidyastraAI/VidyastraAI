import React from 'react';
import AdminLayout from './AdminLayout';

const AnalyticsReports = () => (
  <AdminLayout>
    <h2 className="text-4xl font-bold mb-8 text-white">Platform Analytics</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
        <h3 className="text-slate-400">Total Revenue</h3>
        <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-blue-500">$1,245.30</p>
      </div>
      <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
        <h3 className="text-slate-400">Platform Traffic</h3>
        <p className="text-5xl font-black text-white">18,325</p>
      </div>
    </div>
  </AdminLayout>
);
export default AnalyticsReports;
