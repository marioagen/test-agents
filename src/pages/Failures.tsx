import React, { useState, useMemo } from 'react';
import { Search, RefreshCw, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle2, XCircle, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

const mockData = [
  { id: '1', card: 'CARD A', tenant: 'Tenant A', lastModified: '2026-03-26 10:30', stepTools: 'OCR Processing' },
  { id: '2', card: 'CARD B', tenant: 'Tenant B', lastModified: '2026-03-26 09:15', stepTools: 'Data Extraction' },
  { id: '3', card: 'CARD C', tenant: 'Tenant C', lastModified: '2026-03-25 16:45', stepTools: 'Validation' },
  { id: '4', card: 'CARD D', tenant: 'Tenant D', lastModified: '2026-03-25 14:20', stepTools: 'Export' },
  { id: '5', card: 'CARD E', tenant: 'Tenant A', lastModified: '2026-03-24 11:10', stepTools: 'OCR Processing' },
  { id: '6', card: 'CARD F', tenant: 'Tenant B', lastModified: '2026-03-24 09:00', stepTools: 'Validation' },
];

type SortKey = 'card' | 'tenant' | 'lastModified' | 'stepTools';

export default function Failures() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{key: SortKey, direction: 'asc' | 'desc'}>({ key: 'card', direction: 'asc' });
  const [itemStatuses, setItemStatuses] = useState<Record<string, 'processing' | 'success' | 'error'>>({});

  const filteredData = useMemo(() => {
    return mockData
      .filter(item => {
        const search = searchTerm.toLowerCase();
        return item.card.toLowerCase().includes(search) || item.tenant.toLowerCase().includes(search);
      })
      .sort((a, b) => {
        const { key, direction } = sortConfig;
        const modifier = direction === 'asc' ? 1 : -1;
        
        if (key === 'lastModified') {
          const dateA = new Date(a[key]).getTime();
          const dateB = new Date(b[key]).getTime();
          return (dateA - dateB) * modifier;
        }
        
        return a[key].localeCompare(b[key]) * modifier;
      });
  }, [searchTerm, sortConfig]);

  const handleSort = (key: SortKey) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredData.length && filteredData.length > 0) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredData.map(item => item.id));
    }
  };

  const toggleItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const simulateReprocess = (ids: string[]) => {
    setItemStatuses(prev => {
      const next = { ...prev };
      ids.forEach(id => next[id] = 'processing');
      return next;
    });

    setTimeout(() => {
      setItemStatuses(prev => {
        const next = { ...prev };
        ids.forEach(id => {
          // 70% chance of success for demonstration
          next[id] = Math.random() > 0.3 ? 'success' : 'error';
        });
        return next;
      });
    }, 1500);
  };

  const handleReprocessSingle = (id: string) => {
    simulateReprocess([id]);
  };

  const handleReprocessBulk = () => {
    simulateReprocess(selectedItems);
    setSelectedItems([]);
  };

  const SortableHeader = ({ label, sortKey }: { label: string, sortKey: SortKey }) => {
    const isActive = sortConfig.key === sortKey;
    return (
      <th 
        className="px-6 py-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors select-none group"
        onClick={() => handleSort(sortKey)}
      >
        <div className="flex items-center gap-2">
          {label}
          {isActive ? (
            sortConfig.direction === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
          ) : (
            <ArrowUpDown className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
      </th>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            Gerenciamento de Falhas
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Visualize e reprocesse cards que apresentaram falhas durante a execução das esteiras.
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-surface-dark p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-6 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Buscar por nome do card ou tenant..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Bulk Actions Bar (Conditional) */}
      {selectedItems.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
            {selectedItems.length} {selectedItems.length === 1 ? 'item selecionado' : 'itens selecionados'}
          </span>
          <button 
            onClick={handleReprocessBulk}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Reprocessar Selecionados
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                <th className="px-6 py-4 w-12">
                  <input 
                    type="checkbox" 
                    checked={selectedItems.length === filteredData.length && filteredData.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                  />
                </th>
                <SortableHeader label="Card" sortKey="card" />
                <SortableHeader label="Tenant" sortKey="tenant" />
                <SortableHeader label="Última Modificação" sortKey="lastModified" />
                <SortableHeader label="Ferramenta da Etapa" sortKey="stepTools" />
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <input 
                        type="checkbox" 
                        checked={selectedItems.includes(row.id)}
                        onChange={() => toggleItem(row.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{row.card}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                        {row.tenant}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {row.lastModified}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {row.stepTools}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {itemStatuses[row.id] === 'success' && (
                          <CheckCircle2 className="w-4 h-4 text-green-500 animate-in zoom-in duration-300" />
                        )}
                        {itemStatuses[row.id] === 'error' && (
                          <XCircle className="w-4 h-4 text-red-500 animate-in zoom-in duration-300" />
                        )}
                        <button 
                          onClick={() => handleReprocessSingle(row.id)}
                          disabled={itemStatuses[row.id] === 'processing'}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${itemStatuses[row.id] === 'processing' ? 'animate-spin' : ''}`} />
                          {itemStatuses[row.id] === 'processing' ? 'Processando...' : 'Reprocessar'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    Nenhuma falha encontrada com os filtros atuais.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {filteredData.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between bg-white dark:bg-surface-dark">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Mostrando <span className="font-medium text-gray-900 dark:text-gray-100">1</span> a <span className="font-medium text-gray-900 dark:text-gray-100">{filteredData.length}</span> de <span className="font-medium text-gray-900 dark:text-gray-100">{filteredData.length}</span> resultados
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1.5 rounded border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-1">
                <button className="w-8 h-8 rounded bg-blue-600 text-white text-sm font-medium flex items-center justify-center">1</button>
              </div>
              <button className="p-1.5 rounded border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
