import React from 'react';

const AINotes = () => (
  <div className="p-8 min-h-screen bg-[#0f172a] text-white">
    <h2 className="text-4xl font-black mb-8">AI-Generated Notes</h2>
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
      <h3 className="text-xl font-bold text-blue-400 mb-4">Summary: Module 4</h3>
      <ul className="list-disc list-inside space-y-2 text-slate-300">
        <li>Key takeaway: Complexity analysis of Big O notation.</li>
        <li>Memory management in heap vs. stack.</li>
        <li>Optimization techniques for recursive functions.</li>
      </ul>
      <button className="mt-8 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200">
        Export to PDF
      </button>
    </div>
  </div>
);
export default AINotes;
