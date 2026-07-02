import React from 'react';
import AdminLayout from './AdminLayout';

const ContentModeration = () => {
  // Sample data of flagged items
  const flaggedItems = [
    { id: 1, title: 'Introduction to Arrays', reason: 'Copyright Issue' },
    { id: 2, title: 'DBMS Fundamentals', reason: 'Inappropriate Language' },
  ];

  return (
    <AdminLayout>
      <h2 className="text-4xl font-bold mb-8 text-white">Content Moderation</h2>
      
      <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 uppercase text-sm border-b border-white/5">
              <th className="pb-4">Content Title</th>
              <th className="pb-4">Flagged Reason</th>
              <th className="pb-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {flaggedItems.map((item) => (
              <tr key={item.id}>
                <td className="py-6 font-semibold text-white">{item.title}</td>
                <td className="py-6 text-slate-300">{item.reason}</td>
                <td className="py-6 text-right space-x-3">
                  <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/40 transition">
                    Approve
                  </button>
                  <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/40 transition">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ContentModeration;
