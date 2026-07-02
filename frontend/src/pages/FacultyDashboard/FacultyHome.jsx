import React from 'react';

const FacultyHome = () => (
  <div className="p-8 min-h-screen bg-[#0f172a] text-white">
    <div className="mb-12">
      <h2 className="text-5xl font-black">Welcome Back, Professor</h2>
      <p className="text-slate-400 mt-2">Here is your teaching overview for today.</p>
    </div>
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl">
      <h3 className="text-2xl font-bold mb-6">Upcoming Classes</h3>
      <div className="text-center py-10 border-2 border-dashed border-white/10 rounded-2xl">
        <p className="text-slate-400">No scheduled classes for the next 24 hours.</p>
      </div>
    </div>
  </div>
);
export default FacultyHome;
