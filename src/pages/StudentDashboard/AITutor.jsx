import React from 'react';

const AITutor = () => (
  <div className="p-8 min-h-screen bg-[#0f172a] text-white">
    <h2 className="text-4xl font-black mb-8">Personal AI Tutor</h2>
    <div className="h-[60vh] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
      <div className="overflow-y-auto space-y-4">
        <div className="p-4 bg-blue-600/20 rounded-2xl self-start w-max">Hello! How can I help you master this concept?</div>
      </div>
      <input 
        className="w-full bg-slate-900 p-5 rounded-2xl border border-slate-700 mt-4 focus:outline-none focus:border-blue-500" 
        placeholder="Type your question here..." 
      />
    </div>
  </div>
);
export default AITutor;