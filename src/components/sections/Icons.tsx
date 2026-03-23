import React from 'react';
import { Home, User, Search, Plus, Edit, Trash2, Download, Eye, Settings, FileText } from 'lucide-react';

export default function Icons() {
  return (
    <section className="bg-white dark:bg-surface-dark p-8 rounded-lg border border-gray-200 dark:border-border-dark transition-colors">
      <h2 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-100 dark:border-border-dark">Ícones Básicos</h2>
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-6">
        <div className="flex flex-col items-center gap-1">
          <Home className="text-gray-500 w-6 h-6" />
          <span className="text-[10px] text-gray-400">Home</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <User className="text-gray-500 w-6 h-6" />
          <span className="text-[10px] text-gray-400">User</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Search className="text-gray-500 w-6 h-6" />
          <span className="text-[10px] text-gray-400">Search</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Plus className="text-gray-500 w-6 h-6" />
          <span className="text-[10px] text-gray-400">Plus</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Edit className="text-gray-500 w-6 h-6" />
          <span className="text-[10px] text-gray-400">Edit</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Trash2 className="text-gray-500 w-6 h-6" />
          <span className="text-[10px] text-gray-400">Trash</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Download className="text-gray-500 w-6 h-6" />
          <span className="text-[10px] text-gray-400">Download</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Eye className="text-gray-500 w-6 h-6" />
          <span className="text-[10px] text-gray-400">Eye</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Settings className="text-gray-500 w-6 h-6" />
          <span className="text-[10px] text-gray-400">Settings</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <FileText className="text-gray-500 w-6 h-6" />
          <span className="text-[10px] text-gray-400">File</span>
        </div>
      </div>
    </section>
  );
}
