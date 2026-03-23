import React from 'react';
import { Plus, Edit, Eye, Trash2, Download, Settings } from 'lucide-react';

export default function Buttons() {
  return (
    <section className="bg-white dark:bg-surface-dark p-8 rounded-lg border border-gray-200 dark:border-border-dark transition-colors">
      <h2 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-100 dark:border-border-dark">Botões</h2>
      <div className="flex flex-wrap gap-4 items-center">
        <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded text-sm font-medium flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Botão Primário
        </button>
        <button className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-white dark:text-gray-900 text-white px-6 py-2 rounded text-sm font-medium flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Botão Secundário
        </button>
        <button className="bg-white dark:bg-transparent border border-gray-300 dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-2 rounded text-sm font-medium flex items-center gap-2 transition-colors">
          <Edit className="w-4 h-4" />
          Botão Outline
        </button>
        <button className="text-gray-500 hover:text-primary dark:hover:text-primary px-4 py-2 rounded text-sm font-medium flex items-center gap-2 transition-colors">
          <Eye className="w-4 h-4" />
          Botão Ghost
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded text-sm font-medium flex items-center gap-2 transition-colors">
          <Trash2 className="w-4 h-4" />
          Botão Destrutivo
        </button>
        <button className="bg-primary text-white px-3 py-1 text-xs rounded flex items-center gap-1">
          <Download className="w-3 h-3" />
          Pequeno
        </button>
        <button className="bg-primary text-white px-8 py-3 text-lg rounded flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Grande
        </button>
      </div>
    </section>
  );
}
