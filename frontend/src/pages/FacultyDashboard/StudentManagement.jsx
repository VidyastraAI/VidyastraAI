import React from 'react';

const StudentManagement = () => (
  <div className="p-8 min-h-screen bg-[#0f172a] text-white">
    <h2 className="text-4xl font-black mb-8">Student Management</h2>
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-white/5">
          <tr>
            <th className="p-6">Student Name</th>
            <th className="p-6">Progress</th>
            <th className="p-6">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          <tr>
            <td className="p-6">Vikash Kushwah</td>
            <td className="p-6">88%</td>
            <td className="p-6 text-green-400">Active</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
export default StudentManagement;
