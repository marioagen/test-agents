import React, { useState } from 'react';
import { Copy, Plus, X } from 'lucide-react';

interface KeyToken {
  id: string;
  name: string;
  value: string;
}

const initialKeys: KeyToken[] = [
  { id: '1', name: 'keyname a', value: 'wkjl371xsFfqRBhdNEqrCCKv2tbBUv5s1SAikGIfjBk=d' },
  { id: '2', name: 'keyname b', value: 'tkkjl371xsFfqRBhdNEqrCCKv2tbBUv5s1SAikGIfjBk=de' },
  { id: '3', name: 'keyname c', value: 'kysjl371xsFfqRBhdNEqrCCKv2tbBUv5s1SAikGIfjBk=y' },
  { id: '4', name: 'keyname d', value: 'abkjl371xsFfqRBhdNEqrCCKv2tbBUv5s1SAikGIfjBk=h' },
  { id: '5', name: 'keyname e', value: 'ZZkjl371xsFfqRBhdNEqrCCKv2tbBUv5s1SAikGIfjBk=y' },
  { id: '6', name: 'keyname f', value: 'YTkjl371xsFfqRBhdNEqrCCKv2tbBUv5s1SAikGIfjBk=l' },
  { id: '7', name: 'keyname g', value: 'wuggjl371xsFfqRBhdNEqrCCKv2tbBUv5s1SAikGIfjBk=zy' },
];

export default function Keys() {
  const [keys, setKeys] = useState<KeyToken[]>(initialKeys);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');

  const toggleSelectAll = () => {
    if (selectedKeys.size === keys.length) {
      setSelectedKeys(new Set());
    } else {
      setSelectedKeys(new Set(keys.map(k => k.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedKeys);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedKeys(newSelected);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    // Generate a random mock token value
    const randomValue = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + "xsFfqRBhdNEqrCCKv2tbBUv";
    
    const newKey: KeyToken = {
      id: Date.now().toString(),
      name: newKeyName,
      value: randomValue,
    };

    setKeys([...keys, newKey]);
    setNewKeyName('');
    setIsModalOpen(false);
  };

  const handleDeleteSelected = () => {
    setKeys(keys.filter(k => !selectedKeys.has(k.id)));
    setSelectedKeys(new Set());
  };

  const getMaskedValue = (value: string) => {
    if (value.length <= 3) return value;
    return value.substring(0, 3) + '*'.repeat(value.length - 3);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[32px] font-medium text-woopi-dark-gray dark:text-white">Chaves</h1>
          <p className="text-[14px] font-normal text-woopi-gray dark:text-gray-400 mt-1">Gerenciar chaves de API e tokens</p>
        </div>
        <div className="flex gap-3">
          {selectedKeys.size > 0 && (
            <button 
              onClick={handleDeleteSelected}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Excluir selecionados ({selectedKeys.size})
            </button>
          )}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col flex-1 overflow-hidden">
        {/* Table header */}
        <div className="flex items-center px-4 py-4 border-b border-gray-200 dark:border-gray-700 font-medium text-gray-900 dark:text-gray-100 bg-white dark:bg-surface-dark">
        <div className="w-12 flex justify-center">
          <input 
            type="checkbox" 
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
            checked={keys.length > 0 && selectedKeys.size === keys.length}
            onChange={toggleSelectAll}
          />
        </div>
        <div className="w-1/4 font-semibold text-[16px]">Key Name</div>
        <div className="w-3/4 font-semibold text-[16px]">Value</div>
      </div>

      {/* Table body */}
      <div className="flex-1 overflow-auto">
        {keys.map((keyItem, index) => (
          <div 
            key={keyItem.id} 
            className={`flex items-center px-4 py-3 group ${
              index % 2 !== 0 
                ? 'bg-gray-50/50 dark:bg-surface-dark/50' 
                : 'bg-white dark:bg-background-dark'
            }`}
          >
            <div className="w-12 flex justify-center">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                checked={selectedKeys.has(keyItem.id)}
                onChange={() => toggleSelect(keyItem.id)}
              />
            </div>
            <div className="w-1/4 text-gray-700 dark:text-gray-300 text-sm">
              {keyItem.name}
            </div>
            <div className="w-3/4 flex justify-between items-center text-gray-700 dark:text-gray-300 text-sm pr-4">
              <span className="truncate mr-4 font-mono">{getMaskedValue(keyItem.value)}</span>
              <button 
                onClick={() => copyToClipboard(keyItem.value)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
                title="Copy to clipboard"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-border-dark">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Add New Key</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-4">
              <div className="mb-4">
                <label htmlFor="keyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Key Name
                </label>
                <input
                  type="text"
                  id="keyName"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Enter key name"
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newKeyName.trim()}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
