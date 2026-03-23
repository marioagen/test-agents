import React from 'react';
import { Search, Users, Plus, MoreHorizontal, Paperclip, MessageSquare } from 'lucide-react';

export default function Kanban() {
  return (
    <section className="bg-white dark:bg-surface-dark p-8 rounded-lg border border-gray-200 dark:border-border-dark transition-colors">
      <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-100 dark:border-border-dark">Kanban Board</h2>
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1.5 text-gray-400 w-4 h-4" />
            <input className="pl-8 pr-4 py-1.5 text-xs border border-gray-200 dark:border-gray-700 bg-transparent rounded w-64 focus:ring-1 focus:ring-primary outline-none" placeholder="Buscar tarefas..." type="text"/>
          </div>
          <select className="text-xs border border-gray-200 dark:border-gray-700 bg-transparent rounded py-1.5 px-3 focus:ring-1 focus:ring-primary outline-none">
            <option>Todas as tarefas</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-1.5 text-xs text-gray-600 dark:text-gray-400 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded flex items-center gap-1 transition-colors">
            <Users className="w-3.5 h-3.5" /> Gerenciar equipe
          </button>
          <button className="px-4 py-1.5 text-xs bg-primary text-white font-medium rounded flex items-center gap-1 hover:bg-blue-600 transition-colors">
            <Plus className="w-3.5 h-3.5" /> Nova tarefa
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* In Progress Column */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-100 dark:border-blue-900/20">
          <div className="flex justify-between items-center mb-3 px-1">
            <h3 className="text-xs font-bold text-blue-800 dark:text-blue-300">In Progress</h3>
            <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer" />
          </div>
          <div className="space-y-3">
            <div className="bg-white dark:bg-surface-dark p-3 rounded shadow-sm border border-gray-100 dark:border-gray-700">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-bold mb-2 inline-block">UX</span>
              <h4 className="text-xs font-medium mb-3">Research FAQ page UX</h4>
              <div className="flex justify-between items-center text-[10px] text-gray-400">
                <div className="flex gap-2">
                  <span className="flex items-center gap-0.5"><Paperclip className="w-3 h-3" /> 4</span>
                  <span className="flex items-center gap-0.5"><MessageSquare className="w-3 h-3" /> 12</span>
                </div>
                <div className="flex -space-x-1.5">
                  <div className="w-5 h-5 rounded-full bg-blue-500 border border-white text-[8px] flex items-center justify-center text-white">JS</div>
                  <div className="w-5 h-5 rounded-full bg-indigo-500 border border-white text-[8px] flex items-center justify-center text-white">MS</div>
                </div>
              </div>
            </div>
            <button className="w-full py-2 text-[10px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 border border-dashed border-gray-300 dark:border-gray-700 rounded flex items-center justify-center gap-1 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Add New Item
            </button>
          </div>
        </div>

        {/* In Review Column */}
        <div className="bg-amber-50/50 dark:bg-amber-900/10 p-3 rounded-lg border border-amber-100 dark:border-amber-900/20">
          <div className="flex justify-between items-center mb-3 px-1">
            <h3 className="text-xs font-bold text-amber-800 dark:text-amber-300">In Review</h3>
            <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer" />
          </div>
          <div className="space-y-3">
            <div className="bg-white dark:bg-surface-dark p-3 rounded shadow-sm border border-gray-100 dark:border-gray-700">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-bold mb-2 inline-block">Info</span>
              <h4 className="text-xs font-medium mb-2">Review completed Apps</h4>
              <div className="flex justify-between items-center text-[10px] text-gray-400">
                <div className="flex gap-2">
                  <span className="flex items-center gap-0.5"><Paperclip className="w-3 h-3" /> 8</span>
                  <span className="flex items-center gap-0.5"><MessageSquare className="w-3 h-3" /> 17</span>
                </div>
                <div className="flex -space-x-1.5">
                  <div className="w-5 h-5 rounded-full bg-indigo-500 border border-white text-[8px] flex items-center justify-center text-white">CS</div>
                  <div className="w-5 h-5 rounded-full bg-teal-500 border border-white text-[8px] flex items-center justify-center text-white">PL</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Done Column */}
        <div className="bg-green-50/50 dark:bg-green-900/10 p-3 rounded-lg border border-green-100 dark:border-green-900/20">
          <div className="flex justify-between items-center mb-3 px-1">
            <h3 className="text-xs font-bold text-green-800 dark:text-green-300">Done</h3>
            <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer" />
          </div>
          <div className="space-y-3">
            <div className="bg-white dark:bg-surface-dark p-3 rounded shadow-sm border border-gray-100 dark:border-gray-700 opacity-60">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 font-bold mb-2 inline-block">App</span>
              <h4 className="text-xs font-medium mb-2">Forms & Tables section</h4>
              <div className="flex justify-between items-center text-[10px] text-gray-400">
                <div className="flex gap-2">
                  <span className="flex items-center gap-0.5"><Paperclip className="w-3 h-3" /> 1</span>
                  <span className="flex items-center gap-0.5"><MessageSquare className="w-3 h-3" /> 4</span>
                </div>
                <div className="flex -space-x-1.5">
                  <div className="w-5 h-5 rounded-full bg-pink-500 border border-white text-[8px] flex items-center justify-center text-white">AC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
