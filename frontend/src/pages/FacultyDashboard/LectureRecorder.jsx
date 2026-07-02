import React, { useState } from 'react';
import { Mic, Video, Upload, Settings, Monitor } from 'lucide-react';

const LectureRecorder = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Record / Upload Lecture</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Course</label>
            <select className="w-full mt-1 p-2 border border-gray-300 rounded-lg">
              <option>Data Structures & Algorithms</option>
            </select>
          </div>
          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
            <Mic size={20} /> Start Recording
          </button>
        </div>

        {/* Preview Section */}
        <div className="bg-gray-900 rounded-xl flex items-center justify-center h-48 text-gray-500">
          <div className="text-center">
            <Video size={48} className="mx-auto mb-2 opacity-50" />
            <p>Recording Preview</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureRecorder;
