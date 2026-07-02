import React from 'react';

const MyCourses = () => (
  <div className="p-8 min-h-screen bg-[#0f172a] text-white">
    <h2 className="text-4xl font-black mb-8">My Courses</h2>
    <div className="grid md:grid-cols-2 gap-6">
      {['Network Forensics', 'Malware Analysis'].map((course) => (
        <div key={course} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
          <h3 className="text-xl font-bold">{course}</h3>
          <div className="h-2 w-full bg-slate-800 rounded-full mt-4">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default MyCourses;
