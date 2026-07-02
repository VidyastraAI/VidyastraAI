import React from 'react';

const Notifications = () => (
  <div className="p-8 min-h-screen bg-[#0f172a] text-white">
    <h2 className="text-4xl font-black mb-8">Notifications</h2>
    <div className="space-y-4">
      <div className="bg-white/5 backdrop-blur-xl border border-l-4 border-l-blue-500 border-white/10 p-6 rounded-2xl">
        <h4 className="font-bold">New Quiz Available</h4>
        <p className="text-slate-400 text-sm">Attempt the quiz for Data Structures Module 4.</p>
      </div>
    </div>
  </div>
);
export default Notifications;
