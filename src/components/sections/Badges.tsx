import React from 'react';

export default function Badges() {
  return (
    <section className="bg-white dark:bg-surface-dark p-8 rounded-lg border border-gray-200 dark:border-border-dark transition-colors">
      <h2 className="text-lg font-semibold mb-8 pb-2 border-b border-gray-100 dark:border-border-dark">Badges & Status</h2>
      <div className="space-y-8">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase mb-4">Badges Básicos</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-white">Default</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300">Secondary</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500 text-white">Destructive</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold border border-gray-300 dark:border-gray-600 text-gray-500">Outline</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500 text-white">Success</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-500 text-white">Warning</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-500 text-white">Orange</span>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase mb-4">Indicadores de Status</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">Ativo</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">Pendente</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400">Atenção</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400">Inativo</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400">Erro</span>
          </div>
        </div>
      </div>
    </section>
  );
}
