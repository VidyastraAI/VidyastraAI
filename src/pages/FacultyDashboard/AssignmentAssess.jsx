import React from 'react';

const AssignmentAssess = () => (
  <div className="p-8 min-h-screen bg-[#0f172a] text-white">
    <h2 className="text-4xl font-black mb-8">Assignments & Assessments</h2>
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl">
      <div className="flex justify-between items-center py-4 border-b border-white/5">
        <span className="font-bold">Data Structures - Quiz 1</span>
        <button className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-xl font-bold transition">Grade Now</button>
      </div>
    </div>
  </div>
);
export default AssignmentAssess;