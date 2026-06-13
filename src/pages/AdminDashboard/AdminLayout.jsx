import React from 'react';
import { SidebarItem } from '../../components/common/SidebarItem';

const AdminLayout = ({ children }) => (
  <div className="flex h-screen bg-[#0f172a] text-white overflow-hidden">
    <aside className="w-72 bg-gradient-to-b from-slate-900 to-black p-8 border-r border-slate-800">
      <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-12">
        VIDYASTRA ADMIN
      </h1>
      <nav className="space-y-4">
        {/* Sidebar Links here */}
      </nav>
    </aside>
    <main className="flex-1 p-10 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 to-[#0f172a]">
      {children}
    </main>
  </div>
);
export default AdminLayout;