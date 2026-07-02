import React from 'react';

const Analytics = () => (
  <div className="p-8 min-h-screen bg-[#0f172a] text-white">
    <h2 className="text-4xl font-black mb-8">Analytics Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl shadow-2xl">
        <h3 className="text-lg opacity-80">Class Attendance</h3>
        <p className="text-6xl font-black mt-2">86%</p>
      </div>
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl">
        <h3 className="text-lg text-slate-400">Assignment Completion</h3>
        <p className="text-6xl font-black mt-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">78%</p>
      </div>
    </div>
  </div>
);
export default Analytics;
