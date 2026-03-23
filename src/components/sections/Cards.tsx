import React from 'react';
import { FileText, User, Calendar } from 'lucide-react';

export default function Cards() {
  return (
    <section className="bg-white dark:bg-surface-dark p-8 rounded-lg border border-gray-200 dark:border-border-dark transition-colors">
      <h2 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-100 dark:border-border-dark">Cards & Containers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-surface-dark">
          <p className="text-sm">Conteúdo do card básico sem header</p>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-surface-dark">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 font-medium">Título do Card</div>
          <div className="p-4">
            <p className="text-xs text-gray-500 mb-2">Descrição opcional do card</p>
            <p className="text-sm">Conteúdo principal do card com header e descrição</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-surface-dark flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold dark:text-white">1,234</p>
            <p className="text-xs text-gray-500">Total de Documentos</p>
          </div>
          <FileText className="text-primary w-8 h-8 opacity-20" />
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-surface-dark flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold dark:text-white">567</p>
            <p className="text-xs text-gray-500">Usuários Ativos</p>
          </div>
          <User className="text-green-500 w-8 h-8 opacity-20" />
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-surface-dark flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold dark:text-white">89</p>
            <p className="text-xs text-gray-500">Tarefas Pendentes</p>
          </div>
          <Calendar className="text-yellow-500 w-8 h-8 opacity-20" />
        </div>
      </div>
    </section>
  );
}
