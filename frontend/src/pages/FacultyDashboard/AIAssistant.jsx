import React from 'react';

const AIAssistant = () => (
  <div className="p-8 min-h-screen bg-[#0f172a] text-white">
    <h2 className="text-4xl font-black mb-8">AI Assistant</h2>
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
      <p className="text-slate-300">How can I help you today, Professor?</p>
      <input className="w-full mt-6 bg-slate-900 border border-slate-700 p-4 rounded-2xl" placeholder="Ask anything about your courses..." />
    </div>
  </div>
);
export default AIAssistant;
