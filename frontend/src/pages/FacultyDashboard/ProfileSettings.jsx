import React from 'react';

const ProfileSettings = () => (
  <div className="p-8 min-h-screen bg-[#0f172a] text-white">
    <h2 className="text-4xl font-black mb-8">Profile Settings</h2>
    <div className="max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl">
      <div className="mb-8">
        <label className="block text-sm text-slate-400 mb-2">Display Name</label>
        <input className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl" placeholder="Prof. Name" />
      </div>
      <button className="px-8 py-4 bg-blue-600 rounded-2xl font-bold hover:bg-blue-500 transition">Save Changes</button>
    </div>
  </div>
);
export default ProfileSettings;
