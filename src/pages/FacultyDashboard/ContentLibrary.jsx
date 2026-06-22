import React from 'react';

const ContentLibrary = () => (
  <div className="p-8 min-h-screen bg-[#0f172a] text-white">
    <h2 className="text-4xl font-black mb-8">Content Library</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {['Algorithms', 'Data Security', 'Web Development'].map((topic) => (
        <div key={topic} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition">
          <h3 className="text-xl font-bold mb-2">{topic}</h3>
          <p className="text-slate-400 text-sm">12 Resources Available</p>
        </div>
      ))}
    </div>
  </div>
);
export default ContentLibrary;