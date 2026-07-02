import React from 'react';
import AdminLayout from './AdminLayout';

const CourseManagement = () => (
  <AdminLayout>
    <h2 className="text-4xl font-bold mb-8">Course Management</h2>
    <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
      <table className="w-full text-left">
        <thead>
          <tr className="text-slate-400 uppercase text-sm">
            <th className="pb-4">Course Name</th>
            <th className="pb-4">Faculty</th>
            <th className="pb-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          <tr>
            <td className="py-6 font-bold">Data Structures</td>
            <td className="py-6 text-slate-300">Prof. Amit</td>
            <td className="py-6"><span className="px-4 py-1 rounded-full bg-green-500/20 text-green-400">Active</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </AdminLayout>
);
export default CourseManagement;
