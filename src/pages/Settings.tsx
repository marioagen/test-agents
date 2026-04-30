import React, { useState } from 'react';
import { Settings as SettingsIcon, Cpu, Scan, Key, Save, Copy, Plus, X, Trash2 } from 'lucide-react';

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

export default function Settings() {
  const [activeTab, setActiveTab] = useState('geral');
  
  // Keys State
  const [keys, setKeys] = useState<KeyToken[]>(initialKeys);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
  };

  const handleAddKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

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

  const confirmDeleteSelected = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSelected = () => {
    setKeys(keys.filter(k => !selectedKeys.has(k.id)));
    setSelectedKeys(new Set());
    setIsDeleteModalOpen(false);
  };

  const getMaskedValue = (value: string) => {
    if (value.length <= 3) return value;
    return value.substring(0, 3) + '*'.repeat(value.length - 3);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 min-h-[calc(100vh-8rem)]">
      {/* Internal Sidebar */}
      <div className="w-full md:w-64 flex flex-col gap-1">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Configurações</h2>
        <nav className="flex flex-col gap-1">
          <button
            onClick={() => setActiveTab('geral')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
              activeTab === 'geral' 
              ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-active-dark'
            }`}
          >
            <SettingsIcon className="w-4 h-4" />
            Geral
          </button>
          <button
            onClick={() => setActiveTab('modelos')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
              activeTab === 'modelos' 
              ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-active-dark'
            }`}
          >
            <Cpu className="w-4 h-4" />
            Modelos de IA
          </button>
          <button
            onClick={() => setActiveTab('ocr')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
              activeTab === 'ocr' 
              ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-active-dark'
            }`}
          >
            <Scan className="w-4 h-4" />
            OCR
          </button>
          <button
            onClick={() => setActiveTab('chaves')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
              activeTab === 'chaves' 
              ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-active-dark'
            }`}
          >
            <Key className="w-4 h-4" />
            Chaves
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl p-6 shadow-sm">
        {activeTab === 'geral' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 pb-4">
              Configurações Gerais
            </h3>
            <div className="space-y-4 max-w-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nome da Empresa
                </label>
                <input 
                  type="text" 
                  defaultValue="Woopi Tecnologia"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-background-dark text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fuso Horário
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-background-dark text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>America/Sao_Paulo (UTC-03:00)</option>
                  <option>America/New_York (UTC-05:00)</option>
                  <option>Europe/London (UTC+00:00)</option>
                </select>
              </div>
              <div className="pt-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors">
                  <Save className="w-4 h-4" />
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'modelos' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 pb-4">
              Modelos de IA
            </h3>
            <div className="space-y-4 max-w-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Modelo Principal padrão
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-background-dark text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>gpt-4</option>
                  <option>gpt-3.5-turbo</option>
                  <option>gemini-pro</option>
                  <option>gemini-1.5-pro</option>
                  <option>claude-3-opus</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Temperature Padrão (Criatividade)
                </label>
                <input 
                  type="range" 
                  min="0" max="2" step="0.1" defaultValue="0.7"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Preciso (0.0)</span>
                  <span>Criativo (2.0)</span>
                </div>
              </div>
              <div className="pt-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors">
                  <Save className="w-4 h-4" />
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ocr' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 pb-4">
              Configurações de OCR
            </h3>
            <div className="space-y-4 max-w-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Provider de OCR
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-background-dark text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Google Cloud Vision</option>
                  <option>AWS Textract</option>
                  <option>Tesseract (Local)</option>
                </select>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <input type="checkbox" id="auto-ocr" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                <label htmlFor="auto-ocr" className="text-sm text-gray-700 dark:text-gray-300">
                  Extrair texto automaticamente ao importar documentos em PDF/Imagem
                </label>
              </div>
              <div className="pt-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors">
                  <Save className="w-4 h-4" />
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chaves' && (
          <div className="space-y-6 flex flex-col h-full">
            <div className="flex justify-between items-end border-b border-gray-200 dark:border-gray-800 pb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Gerenciar Chaves de API e Tokens
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Configure aqui suas chaves de acesso aos provedores e serviços externos.
                </p>
              </div>
              <div className="flex gap-3">
                {selectedKeys.size > 0 && (
                  <button 
                    onClick={confirmDeleteSelected}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Excluir selecionados ({selectedKeys.size})
                  </button>
                )}
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col overflow-hidden max-h-[600px]">
              {/* Table header */}
              <div className="flex items-center px-4 py-4 border-b border-gray-200 dark:border-gray-700 font-medium text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800/50 text-sm">
                <div className="w-12 flex justify-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    checked={keys.length > 0 && selectedKeys.size === keys.length}
                    onChange={toggleSelectAll}
                  />
                </div>
                <div className="w-1/4 font-semibold">Nome da Chave</div>
                <div className="w-3/4 font-semibold">Valor</div>
              </div>

              {/* Table body */}
              <div className="flex-1 overflow-auto">
                {keys.map((keyItem, index) => (
                  <div 
                    key={keyItem.id} 
                    className={`flex items-center px-4 py-3 group border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors`}
                  >
                    <div className="w-12 flex justify-center">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        checked={selectedKeys.has(keyItem.id)}
                        onChange={() => toggleSelect(keyItem.id)}
                      />
                    </div>
                    <div className="w-1/4 text-gray-700 dark:text-gray-300 text-sm font-medium">
                      {keyItem.name}
                    </div>
                    <div className="w-3/4 flex justify-between items-center text-gray-700 dark:text-gray-300 text-sm pr-4">
                      <span className="truncate mr-4 font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-400">
                        {getMaskedValue(keyItem.value)}
                      </span>
                      <button 
                        onClick={() => copyToClipboard(keyItem.value)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        title="Copiar para área de transferência"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {keys.length === 0 && (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    Nenhuma chave configurada.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-border-dark">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Adicionar nova chave</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddKey} className="p-4">
              <div className="mb-4">
                <label htmlFor="keyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nome da Chave
                </label>
                <input
                  type="text"
                  id="keyName"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-background-dark text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: OpenAI API Key"
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!newKeyName.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Criar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark rounded-lg shadow-xl w-full max-w-md p-6 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4 text-red-600 dark:text-red-400">
              <Trash2 className="w-6 h-6" />
            </div>
            
            <h2 className="text-lg font-medium text-gray-900 dark:text-white leading-tight mb-2">
              Deletar chaves selecionadas?
            </h2>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Você está prestes a excluir {selectedKeys.size} chave(s). Esta ação não poderá ser desfeita.
            </p>
            
            <div className="flex justify-center gap-3 w-full">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md font-medium text-sm transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteSelected}
                className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium text-sm transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
