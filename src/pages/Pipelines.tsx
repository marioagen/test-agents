import React, { useState } from 'react';
import { 
  Search, Filter, Plus, List, LayoutGrid, ChevronDown, ChevronRight, 
  Trash2, Check, User as UserIcon, Building2, Calendar, FileText, ChevronUp, UserCheck, XCircle, MoreHorizontal, Play, ArrowRight
} from 'lucide-react';

interface CardData {
  id: string;
  type: string;
  title: string;
  status: string;
  statusType: 'blue' | 'green' | 'red' | 'gray';
  description: string;
  requester: string;
  date: string;
  owner: string;
  column: string;
}

const columns = [
  { id: 'recebimento', title: 'Recebimento', count: 11, color: 'border-t-blue-500' },
  { id: 'verificacao', title: 'Verificação Financeira', count: 12, color: 'border-t-purple-500' },
  { id: 'aprovacao', title: 'Aprovação de Pagamento', count: 7, color: 'border-t-orange-500' },
  { id: 'concluido', title: 'Pagos e Concluídos', count: 18, color: 'border-t-green-500' },
];

const mockCards: CardData[] = [
  {
    id: '#5627',
    type: 'Nota Fiscal',
    title: 'Nota Fiscal #5627',
    status: 'Aguardando análise',
    statusType: 'blue',
    description: 'Compra de material de limpeza e higiene',
    requester: 'Roberto Silva',
    date: '14/12/2024',
    owner: 'Ana Costa',
    column: 'recebimento'
  },
  {
    id: '#5674',
    type: 'Nota Fiscal',
    title: 'Nota Fiscal #5674',
    status: 'Analisado !',
    statusType: 'green',
    description: 'Serviços de consultoria em TI',
    requester: 'Marina Peixoto',
    date: '15/12/2024',
    owner: 'Pedro Oliveira',
    column: 'recebimento'
  },
  {
    id: '#88821',
    type: 'Nota Fiscal',
    title: 'Nota Fiscal #88821',
    status: 'Aguardando análise',
    statusType: 'blue',
    description: 'Aquisição de licenças de software',
    requester: 'João Ferreira',
    date: '16/12/2024',
    owner: 'Silvia Ramos',
    column: 'recebimento'
  },
  {
    id: '#88822',
    type: 'Nota Fiscal',
    title: 'Nota Fiscal #88822',
    status: 'FALHA',
    statusType: 'red',
    description: 'Inconsistência de valores detectada',
    requester: 'Carlos Silva',
    date: '16/12/2024',
    owner: 'Silvia Ramos',
    column: 'recebimento'
  },
  {
    id: '#3214',
    type: 'Nota Fiscal',
    title: 'Nota Fiscal #3214',
    status: 'Esperando aprovação',
    statusType: 'blue',
    description: 'Compra de insumos operacionais',
    requester: 'Thiago Costa',
    date: '11/12/2024',
    owner: 'Ana Costa',
    column: 'aprovacao'
  },
  {
    id: '#2345',
    type: 'Boleto',
    title: 'Boleto #2345',
    status: 'Finalizado',
    statusType: 'gray',
    description: 'Pagamento de aluguel do espaço',
    requester: 'Viviane Duarte',
    date: '08/12/2024',
    owner: 'Pedro Oliveira',
    column: 'concluido'
  },
  {
    id: '#2346',
    type: 'Boleto',
    title: 'Boleto #2346',
    status: 'Finalizado',
    statusType: 'gray',
    description: 'Pagamento de energia elétrica',
    requester: 'Wagner Souza',
    date: '05/12/2024',
    owner: 'Ana Costa',
    column: 'concluido'
  },
  {
    id: '#2347',
    type: 'Boleto',
    title: 'Boleto #2347',
    status: 'Finalizado',
    statusType: 'gray',
    description: 'Pagamento de fornecedor de matéria-prima',
    requester: 'José Carlos',
    date: '04/12/2024',
    owner: 'Pedro Oliveira',
    column: 'concluido'
  },
  {
    id: '#2348',
    type: 'Boleto',
    title: 'Boleto #2348',
    status: 'Finalizado',
    statusType: 'gray',
    description: 'Pagamento de internet corporativa',
    requester: 'Yara Cunha',
    date: '04/12/2024',
    owner: 'Silvia Ramos',
    column: 'concluido'
  },
  {
    id: '#2349',
    type: 'Boleto',
    title: 'Boleto #2349',
    status: 'Finalizado',
    statusType: 'gray',
    description: 'Pagamento de impostos municipais',
    requester: 'Zélia Ramos',
    date: '04/12/2024',
    owner: 'Ana Costa',
    column: 'concluido'
  },
  {
    id: '#2350',
    type: 'Boleto',
    title: 'Boleto #2350',
    status: 'Finalizado',
    statusType: 'gray',
    description: 'Taxa de folha de pagamento',
    requester: 'Alberto Mendes',
    date: '03/12/2024',
    owner: 'Pedro Oliveira',
    column: 'concluido'
  },
  {
    id: '#2351',
    type: 'Boleto',
    title: 'Boleto #2351',
    status: 'Finalizado',
    statusType: 'gray',
    description: 'Pagamento de plano de saúde',
    requester: 'Bianca Moura',
    date: '03/12/2024',
    owner: 'Silvia Ramos',
    column: 'concluido'
  },
  {
    id: '#2352',
    type: 'Boleto',
    title: 'Boleto #2352',
    status: 'Finalizado',
    statusType: 'gray',
    description: 'Assinatura de plataforma SaaS',
    requester: 'Caio Andrade',
    date: '02/12/2024',
    owner: 'Ana Costa',
    column: 'concluido'
  },
  {
    id: '#2353',
    type: 'Boleto',
    title: 'Boleto #2353',
    status: 'Finalizado',
    statusType: 'gray',
    description: 'Material de escritório mensal',
    requester: 'Eliane Leal',
    date: '01/12/2024',
    owner: 'Pedro Oliveira',
    column: 'concluido'
  },
  {
    id: '#2354',
    type: 'Boleto',
    title: 'Boleto #2354',
    status: 'Finalizado',
    statusType: 'gray',
    description: 'Serviço de limpeza terceirizada',
    requester: 'Felipe Santos',
    date: '01/12/2024',
    owner: 'Silvia Ramos',
    column: 'concluido'
  }
];

export default function Pipelines() {
  const [activeTab, setActiveTab] = useState('board');
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    recebimento: true,
    verificacao: false,
    aprovacao: false,
    concluido: false
  });
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const toggleGroup = (id: string) => {
    setExpandedGroups(prev => {
      const nextGroups: Record<string, boolean> = {};
      Object.keys(prev).forEach(key => {
        nextGroups[key] = false;
      });
      nextGroups[id] = !prev[id];
      return nextGroups;
    });
  };

  const toggleSelectItem = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const toggleSelectGroup = (colId: string) => {
    const groupItems = mockCards.filter(c => c.column === colId).map(c => c.id);
    const allSelected = groupItems.every(id => selectedItems.has(id));
    
    const newSelected = new Set(selectedItems);
    if (allSelected) {
      groupItems.forEach(id => newSelected.delete(id));
    } else {
      groupItems.forEach(id => newSelected.add(id));
    }
    setSelectedItems(newSelected);
  };

  const getStatusBadge = (status: string, type: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      red: 'bg-red-50 text-red-700 border-red-200',
      gray: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium border ${colors[type as keyof typeof colors]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="flex flex-col bg-gray-50/50 dark:bg-background-dark -m-8 p-8">
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Esteiras de processamento</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Visualize o fluxo de documentos através das etapas da esteira de processamento
          </p>
        </div>

        {/* Top Tabs */}
        <div className="flex items-center gap-1 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveTab('board')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'board' 
                ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Board Esteira de processamento
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'list' 
                ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <List className="w-4 h-4" />
            Lista de Documentos
          </button>
        </div>
      </div>

      {activeTab === 'board' && (
        <div className="flex flex-col">
          {/* Filters Bar */}
          <div className="flex items-center justify-between bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-lg p-3 mb-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Visualizando workflow:</span>
                <select className="border-none bg-transparent text-sm font-medium text-gray-900 dark:text-gray-200 focus:ring-0 cursor-pointer w-48 truncate">
                  <option>Time Financeiro - Proc...</option>
                </select>
              </div>
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-200">Processamento de Notas Fiscais</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              
              <div className="relative ml-4">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Buscar por nome, descrição ou solicitante..."
                  className="pl-9 pr-4 py-1.5 w-80 text-sm border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden bg-gray-50 dark:bg-gray-800 p-0.5">
                <button 
                  onClick={() => setViewMode('kanban')}
                  title="Visualização Kanban"
                  className={`flex items-center justify-center p-1.5 rounded transition-all ${
                    viewMode === 'kanban' 
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('table')}
                  title="Visualização em Tabela"
                  className={`flex items-center justify-center p-1.5 rounded transition-all ${
                    viewMode === 'table' 
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                <Plus className="w-4 h-4" />
                Novo
              </button>
            </div>
          </div>

          {/* Floating Actions for Table Mode */}
          {viewMode === 'table' && selectedItems.size > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4 flex items-center justify-between text-blue-800 dark:text-blue-300 shadow-sm transition-all">
              <div className="flex items-center gap-3 font-medium">
                <div className="w-6 h-6 bg-blue-600 text-white rounded flex items-center justify-center text-xs font-bold">
                  {selectedItems.size}
                </div>
                documentos selecionados
              </div>
              <div className="flex items-center gap-2">
                {Array.from(selectedItems).some(id => mockCards.find(c => c.id === id)?.column === 'concluido') && (
                  <button title="Finalizar" className="flex items-center justify-center bg-transparent hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 border border-green-200 dark:border-green-800 p-2 rounded-md transition-colors">
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button title="Atribuir" className="flex items-center justify-center bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 border border-blue-200 dark:border-blue-800 p-2 rounded-md transition-colors">
                  <UserCheck className="w-4 h-4" />
                </button>
                <button title="Reprovar" className="flex items-center justify-center bg-transparent hover:bg-red-50 dark:hover:bg-red-900/20 text-[#EA001B] border border-red-200 dark:border-red-800 p-2 rounded-md transition-colors">
                  <XCircle className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1"></div>
                <button title="Excluir" className="flex items-center justify-center bg-transparent hover:bg-red-50 dark:hover:bg-red-900/20 text-[#EA001B] border border-red-200 dark:border-red-800 p-2 rounded-md transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Content Area */}
          <div className="flex-1">
            {viewMode === 'kanban' ? (
              <div className="flex gap-4 min-w-max pb-4 overflow-x-auto items-start">
                {columns.map(column => (
                  <div key={column.id} className="w-80 flex flex-col shrink-0 flex-1">
                    <div className={`flex items-center justify-between p-3 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm mb-3 border-t-4 ${column.color}`}>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">{column.title}</h3>
                      <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-medium px-2 py-1 rounded-full">
                        {mockCards.filter(c => c.column === column.id).length}
                      </span>
                    </div>
                    
                    <div className="flex-1 pr-1 space-y-3">
                      {mockCards.filter(c => c.column === column.id).map(card => (
                        <div key={card.id} className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm p-4 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                              {card.title}
                            </h4>
                            {getStatusBadge(card.status, card.statusType)}
                          </div>
                          
                          <p className="text-gray-500 dark:text-gray-400 text-xs mb-4 line-clamp-2">
                            <FileText className="w-3.5 h-3.5 inline mr-1 text-gray-400" />
                            {card.description}
                          </p>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                              <UserIcon className="w-3.5 h-3.5" />
                              <span className="font-medium text-gray-700 dark:text-gray-300">Solicitante:</span> {card.requester}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                              <Calendar className="w-3.5 h-3.5" />
                              <span className="font-medium text-gray-700 dark:text-gray-300">Carregado em:</span> {card.date}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                              <Building2 className="w-3.5 h-3.5" />
                              <span className="font-medium text-gray-700 dark:text-gray-300">Responsável:</span> {card.owner}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-1.5 rounded transition-colors flex items-center justify-center gap-1">
                              Analisar
                            </button>
                            <button className="flex-1 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium py-1.5 rounded transition-colors flex items-center justify-center gap-1">
                              Avançar
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
                {columns.map(column => {
                  const groupCards = mockCards.filter(c => c.column === column.id);
                  const isExpanded = expandedGroups[column.id];
                  const allSelectedInGroup = groupCards.length > 0 && groupCards.every(c => selectedItems.has(c.id));
                  const someSelectedInGroup = groupCards.some(c => selectedItems.has(c.id));

                  return (
                    <div key={column.id} className="border-b border-gray-200 dark:border-gray-800 last:border-0">
                      <div className={`flex items-center gap-3 p-3 cursor-pointer select-none ${column.id === 'concluido' ? 'bg-green-50/50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40' : 'bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-800/60'} transition-colors ${!isExpanded ? 'border-b-0' : ''}`} onClick={() => toggleGroup(column.id)}>
                        {isExpanded ? <ChevronDown className={column.id === 'concluido' ? 'w-4 h-4 text-green-600' : 'w-4 h-4 text-gray-500'} /> : <ChevronRight className={column.id === 'concluido' ? 'w-4 h-4 text-green-600' : 'w-4 h-4 text-gray-500'} />}
                        <h3 className={`font-semibold text-sm ${column.id === 'concluido' ? 'text-green-800 dark:text-green-400' : 'text-gray-800 dark:text-gray-200'}`}>{column.title}</h3>
                        <span className={`border text-xs font-medium px-2 py-0.5 rounded-full ${column.id === 'concluido' ? 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700' : 'bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 border-gray-200 dark:border-gray-600'}`}>
                          {groupCards.length}
                        </span>
                      </div>
                      
                      {isExpanded && groupCards.length > 0 && (
                        <div>
                          <div className="flex bg-gray-50 dark:bg-gray-800/50 text-xs font-medium text-gray-500 dark:text-gray-400 p-3 border-y border-gray-200 dark:border-gray-800">
                            <div className="w-10 flex justify-center">
                              <input 
                                type="checkbox" 
                                className="w-4 h-4 rounded border-gray-300 text-blue-600"
                                checked={allSelectedInGroup}
                                ref={el => { if (el) el.indeterminate = someSelectedInGroup && !allSelectedInGroup; }}
                                onChange={(e) => { e.stopPropagation(); toggleSelectGroup(column.id); }}
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                            <div className="w-24">ID</div>
                            <div className="flex-1">Documento</div>
                            <div className="flex-1">Descrição</div>
                            <div className="w-32">Data</div>
                            <div className="w-40">Status</div>
                            <div className="w-40">Solicitante</div>
                            <div className="w-40">Responsável</div>
                            <div className="w-10"></div>
                          </div>
                          <div className="divide-y divide-gray-100 dark:divide-gray-800">
                            {groupCards.map(card => (
                              <div key={card.id} className={`flex items-center p-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${selectedItems.has(card.id) ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                                <div className="w-10 flex justify-center">
                                  <input 
                                    type="checkbox" 
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600"
                                    checked={selectedItems.has(card.id)}
                                    onChange={() => toggleSelectItem(card.id)}
                                  />
                                </div>
                                <div className="w-24 text-blue-600 font-medium">{card.id}</div>
                                <div className="flex-1 font-medium text-gray-900 dark:text-gray-200 flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-gray-400" />
                                  {card.title}
                                </div>
                                <div className="flex-1 text-gray-500 truncate pr-4" title={card.description}>{card.description}</div>
                                <div className="w-32 text-gray-600 dark:text-gray-400">{card.date}</div>
                                <div className="w-40">{getStatusBadge(card.status, card.statusType)}</div>
                                <div className="w-40 text-gray-600 dark:text-gray-400">{card.requester}</div>
                                <div className="w-40 text-gray-600 dark:text-gray-400">{card.owner}</div>
                                <div className="w-10 relative">
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveMenuId(activeMenuId === card.id ? null : card.id);
                                    }}
                                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500 dark:text-gray-400"
                                  >
                                    <MoreHorizontal className="w-4 h-4" />
                                  </button>
                                  
                                  {activeMenuId === card.id && (
                                    <>
                                      <div 
                                        className="fixed inset-0 z-10" 
                                        onClick={() => setActiveMenuId(null)}
                                      />
                                      <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl z-20 py-1 overflow-hidden animate-in fade-in zoom-in duration-150">
                                        {column.id === 'concluido' && (
                                          <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-green-700 dark:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                                            <Check className="w-4 h-4" />
                                            Finalizar
                                          </button>
                                        )}
                                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                          <Play className="w-4 h-4 text-blue-600" />
                                          Analisar
                                        </button>
                                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                          <ArrowRight className="w-4 h-4 text-purple-600" />
                                          Avançar
                                        </button>
                                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                          <UserCheck className="w-4 h-4 text-blue-500" />
                                          Atribuir
                                        </button>
                                        <div className="h-px bg-gray-100 dark:bg-gray-800 my-1" />
                                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#EA001B] hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                          <XCircle className="w-4 h-4" />
                                          Reprovar
                                        </button>
                                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#EA001B] hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                          <Trash2 className="w-4 h-4" />
                                          Excluir
                                        </button>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'list' && (
        <div className="flex flex-col flex-1 items-center justify-center text-gray-500 py-20">
          <List className="w-16 h-16 text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Lista de Documentos</h2>
          <p>Visão geral de todos os documentos (em breve)</p>
        </div>
      )}
    </div>
  );
}
