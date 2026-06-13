import React from 'react';

const MyCourses = () => (
  <div className="p-8 min-h-screen bg-[#0f172a] text-white">
    <h2 className="text-4xl font-black mb-8">My Courses</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:border-blue-500/50 transition">
        <h3 className="text-2xl font-bold">Data Structures & Algo</h3>
        <p className="text-slate-400 mt-2">Section A • 142 Students</p>
        <button className="mt-6 w-full py-3 bg-white/10 rounded-xl hover:bg-blue-600 transition font-bold">Manage Course</button>
      </div>
    </div>
  </div>
);
export default MyCourses;