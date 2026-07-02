import React from 'react';
import AdminLayout from './AdminLayout';

const SystemLogs = () => {
  const logs = ["[18:02:01] User #4521 logged in", "[18:02:15] AI Engine optimized", "[18:03:40] New course registered: DSA-Array"];
  
  return (
    <AdminLayout>
      <h2 className="text-4xl font-bold mb-8 text-white">System Logs</h2>
      <div className="bg-black p-8 rounded-3xl border border-slate-700 font-mono text-green-500 shadow-2xl">
        {logs.map((log, i) => (
          <p key={i} className="mb-2">➤ {log}</p>
        ))}
      </div>
    </AdminLayout>
  );
};
export default SystemLogs;
