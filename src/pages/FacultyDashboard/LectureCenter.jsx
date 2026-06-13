import React from 'react';

const LectureCenter = () => (
  <div className="p-8 min-h-screen bg-[#0f172a] text-white">
    <h2 className="text-4xl font-black mb-8">Lecture Processing Center</h2>
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl">
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
          <span className="font-black text-xl">AI</span>
        </div>
        <div>
          <h3 className="text-xl font-bold">Smart Lecture Transcription</h3>
          <p className="text-slate-400">AI is currently processing your latest lecture upload...</p>
        </div>
      </div>
    </div>
  </div>
);
export default LectureCenter;