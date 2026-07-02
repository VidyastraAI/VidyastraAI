import React from 'react';

const MessagesAnnounce = () => (
  <div className="p-8 min-h-screen bg-[#0f172a] text-white">
    <h2 className="text-4xl font-black mb-8">Messages & Announcements</h2>
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
        <h4 className="font-bold text-blue-400">Important Update</h4>
        <p className="text-slate-300 mt-2">The final exam date has been rescheduled to next Friday.</p>
      </div>
      <button className="w-full py-4 border border-dashed border-white/20 rounded-2xl text-slate-400 hover:text-white transition">
        + Post New Announcement
      </button>
    </div>
  </div>
);
export default MessagesAnnounce;
