import React from 'react';
import { Trash2, Edit } from 'lucide-react';

const tableData = [
  { id: 1, name: 'João Silva', email: 'joao.silva@empresa.com', status: 'Administrador', date: '2024-03-20', avatar: 'JS' },
  { id: 2, name: 'Maria Santos', email: 'maria.santos@empresa.com', status: 'Gestor', date: '2024-03-19', avatar: 'MA' },
  { id: 3, name: 'Pedro Costa', email: 'pedro.costa@empresa.com', status: 'Analista', date: '2024-03-18', avatar: 'PE' },
  { id: 4, name: 'Ana Oliveira', email: 'ana.oliveira@empresa.com', status: 'Gestor', date: '2024-03-17', avatar: 'AN' },
];

export default function Tables() {
  return (
    <section id="tables" className="bg-white dark:bg-surface-dark p-8 rounded-lg border border-gray-200 dark:border-border-dark transition-colors">
      <h2 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-100 dark:border-border-dark">Tabelas</h2>
      
      <div className="border border-gray-200 dark:border-border-dark rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-border-dark text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Usuário</th>
                <th className="px-6 py-3">Perfil</th>
                <th className="px-6 py-3">Times</th>
                <th className="px-6 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-border-dark">
              {tableData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-active-dark transition-colors group">
                  <td className="px-6 py-4 text-xs font-medium dark:text-gray-300">{row.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-bold">
                        {row.avatar}
                      </div>
                      <div>
                        <div className="text-xs font-medium dark:text-white">{row.name}</div>
                        <div className="text-[10px] text-gray-500 dark:text-gray-400">{row.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded text-[10px] font-medium bg-primary text-white">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-[10px] dark:text-gray-300">
                      TI
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 text-gray-400 hover:text-primary">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
