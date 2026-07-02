import React from 'react';

const LectureLibrary = () => (
  <div className="p-8 min-h-screen bg-[#0f172a] text-white">
    <h2 className="text-4xl font-black mb-8">Lecture Library</h2>
    <div className="space-y-4">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex justify-between items-center">
        <span>DSA: Arrays and Pointers</span>
        <span className="text-blue-400 font-bold">Watch Now</span>
      </div>
    </div>
  </div>
);
export default LectureLibrary;
