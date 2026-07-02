import React from 'react';

const StudentHome = () => (
  <div className="p-8 min-h-screen bg-[#0f172a] text-white">
    <h2 className="text-4xl font-black mb-8">Hello, Student</h2>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Quick Access Card */}
      <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 p-8 rounded-3xl col-span-2">
        <h3 className="text-2xl font-bold">Continue Learning</h3>
        <p className="mt-2 opacity-80">Data Structures - Lecture 5</p>
        <button className="mt-6 px-6 py-3 bg-white text-indigo-900 rounded-2xl font-bold">Resume</button>
      </div>
      {/* Mini Stats Card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl">
        <h3 className="text-slate-400">Streak</h3>
        <p className="text-5xl font-black mt-2">12 Days</p>
      </div>
    </div>
  </div>
);
export default StudentHome;
