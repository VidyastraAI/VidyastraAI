import React from 'react';

const Assignments = () => (
  <div className="p-8 min-h-screen bg-[#0f172a] text-white">
    <h2 className="text-4xl font-black mb-8">My Assignments</h2>
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">Lab Report #3</h3>
          <p className="text-slate-400">Due: June 20, 2026</p>
        </div>
        <button className="px-6 py-2 bg-blue-600 rounded-xl font-bold">Submit</button>
      </div>
    </div>
  </div>
);
export default Assignments;
