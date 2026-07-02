import React from 'react';

const ProfileSettings = () => (
  <div className="p-8 min-h-screen bg-[#0f172a] text-white">
    <h2 className="text-4xl font-black mb-8">Profile Settings</h2>
    <div className="max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl">
      <label className="block text-sm text-slate-400 mb-2">Email Address</label>
      <input className="w-full bg-slate-900 p-4 rounded-2xl mb-6 border border-slate-700" value="student@vidyastra.ai" readOnly />
      <button className="px-8 py-4 bg-indigo-600 rounded-2xl font-bold hover:bg-indigo-500">Update Profile</button>
    </div>
  </div>
);
export default ProfileSettings;
