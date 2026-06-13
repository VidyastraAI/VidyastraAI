import React from 'react';

const AIQuiz = () => (
  <div className="p-8 min-h-screen bg-[#0f172a] text-white">
    <h2 className="text-4xl font-black mb-8">AI Adaptive Quiz</h2>
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl">
      <h3 className="text-2xl font-bold mb-6">Question 1 of 10</h3>
      <p className="text-lg mb-8">Which data structure uses LIFO order?</p>
      <div className="space-y-4">
        {['Stack', 'Queue', 'Array', 'Linked List'].map((opt) => (
          <button key={opt} className="w-full text-left p-6 bg-slate-900 border border-slate-700 rounded-2xl hover:border-blue-500 transition">
            {opt}
          </button>
        ))}
      </div>
    </div>
  </div>
);
export default AIQuiz;