import React from 'react';

const ProgressAnalytics = () => (
  <div className="p-8 min-h-screen bg-[#0f172a] text-white">
    <h2 className="text-4xl font-black mb-8">Progress & Analytics</h2>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl">
        <h3 className="text-slate-400">Total Hours Spent</h3>
        <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">142h</p>
      </div>
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl">
        <h3 className="text-slate-400">Course Completion</h3>
        <p className="text-6xl font-black text-white">82%</p>
      </div>
    </div>
  </div>
);
export default ProgressAnalytics;