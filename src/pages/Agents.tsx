import React, { useState } from 'react';
import { Search, CloudDownload, Plus, MoreHorizontal, Eye, Globe, Edit, Copy, Trash2, X, LayoutGrid, List, ChevronUp, ChevronDown, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Agents() {
  const navigate = useNavigate();
  const currentUser = 'WA'; // Mock current user
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'mine'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalAgent, setModalAgent] = useState<{title: string, prompt: string} | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  const [groupBy, setGroupBy] = useState<string>('');

  const agents = [
    {
      id: 1,
      type: 'orange',
      title: 'Análise de Documentos Jurídicos',
      description: 'Prompt completo para revisar informações referentes a papéis jurídicos, processos extra judiciais, p...',
      prompt: 'Prompt completo para revisar informações referentes a papéis jurídicos, processos extra judiciais, penalidades e conformidade com as normas legais vigentes no País. Analise detalhadamente cada parágrafo e identifique possíveis pontos de atenção, passivos ocultos e cláusulas abusivas.',
      date: '16/04/2025',
      owner: 'CS',
      hasEye: true,
    },
    {
      id: 2,
      type: 'orange',
      title: 'Resumo Executivo',
      description: 'Gera resumos executivos concisos de documentos extensos, destacando pontos-chave, decisões necessári...',
      prompt: 'Gera resumos executivos concisos de documentos extensos, destacando pontos-chave, decisões necessárias, prazos e os responsáveis por cada pauta. O resumo deve ter no máximo 1 página e ser direcionado para diretores não-técnicos.',
      date: '16/04/2025',
      owner: 'AO',
      hasEye: true,
    },
    {
      id: 3,
      type: 'orange',
      title: 'Prompt Name',
      description: 'Item para revisar informações referentes a papéis jurídicos, extra judiciais, penalidades, etc',
      date: '16/04/2025',
      owner: 'CS',
      hasEye: false,
    },
    {
      id: 4,
      type: 'orange',
      title: 'Prompt Name',
      description: 'Item para revisar informações referentes a papéis jurídicos, extra judiciais, penalidades, etc',
      date: '16/04/2025',
      owner: 'MC',
      hasEye: false,
    },
    {
      id: 5,
      type: 'orange',
      title: 'Prompt Name',
      description: 'Item para revisar informações referentes a papéis jurídicos, extra judiciais, penalidades, etc',
      date: '16/04/2025',
      owner: 'RM',
      hasEye: false,
    },
    {
      id: 6,
      type: 'orange',
      title: 'Prompt Name',
      description: 'Item para revisar informações referentes a papéis jurídicos, extra judiciais, penalidades, etc',
      date: '16/04/2025',
      owner: 'JS',
      hasEye: false,
    },
    {
      id: 7,
      type: 'blue',
      title: '[Jurídico] Análise de Contratos',
      description: 'Prompt para análise detalhada de contratos empresariais, identificando cláusulas importantes, riscos...',
      prompt: 'Você é um assistente jurídico especializado em análise de contratos empresariais. Analise o documento fornecido e identifique: 1) Cláusulas principais e suas implicações legais, 2) Riscos potenciais e pontos de atenção críticos, 3) Obrigações das partes envolvidas com seus prazos, multas e condições de rescisão, 4) Assinaturas, datas e averbações. Formate os resultados em tópicos claros e objetivos.',
      date: '15/01/2025',
      owner: 'WA',
      hasEye: true,
    },
    {
      id: 8,
      type: 'blue',
      title: '[Compliance] Verificação de Conformidade',
      description: 'Verificação de documentos para conformidade com normas regulatórias e políticas internas',
      date: '10/01/2025',
      owner: 'WA',
      hasEye: false,
    },
    {
      id: 9,
      type: 'blue',
      title: '[Financeiro] Extração de Dados Fiscais',
      description: 'Extração automática de informações fiscais de notas fiscais e documentos contábeis',
      date: '08/01/2025',
      owner: 'WA',
      hasEye: false,
    },
  ];

  const filteredAgents = agents.filter(agent => {
    // 1. Filter by owner (Tudo / Meus agentes)
    if (filter === 'mine' && agent.owner !== currentUser) return false;

    // 2. Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return agent.title.toLowerCase().includes(query) || 
             agent.description.toLowerCase().includes(query) ||
             (agent.prompt && agent.prompt.toLowerCase().includes(query));
    }

    return true;
  });

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aValue = String(a[key as keyof typeof a]).toLowerCase();
    const bValue = String(b[key as keyof typeof b]).toLowerCase();
    
    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const groupedAgents = groupBy ? sortedAgents.reduce((acc, agent) => {
    const key = String(agent[groupBy as keyof typeof agent]);
    if (!acc[key]) acc[key] = [];
    acc[key].push(agent);
    return acc;
  }, {} as Record<string, typeof agents>) : { 'all': sortedAgents };

  const renderSortIcon = (key: string) => {
    if (sortConfig?.key !== key) return <ChevronDown className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />;
    return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4 text-primary" /> : <ChevronDown className="w-4 h-4 text-primary" />;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Agentes</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Gerenciar agentes de IA do sistema</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/agentes/importar')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <CloudDownload className="w-4 h-4" />
            Importar pré-definidos
          </button>
          <button 
            onClick={() => navigate('/agentes/novo')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 max-w-3xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Buscar nome de agente e palavras chave dos prompts" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-surface-dark text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Filters and Views */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 relative z-10">
        <div className="flex gap-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
              filter === 'all' 
                ? 'bg-white dark:bg-surface-dark border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-surface-dark/50'
            }`}
          >
            Tudo
          </button>
          <button 
            onClick={() => setFilter('mine')}
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
              filter === 'mine' 
                ? 'bg-white dark:bg-surface-dark border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-primary' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-surface-dark/50'
            }`}
          >
            Meus agentes
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 pr-4 border-r border-gray-200 dark:border-gray-700">
             <Layers className="w-4 h-4 text-gray-500" />
             <select 
               value={groupBy}
               onChange={(e) => setGroupBy(e.target.value)}
               className="text-sm border-none bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer"
             >
               <option value="">Sem agrupamento</option>
               <option value="owner">Proprietário</option>
               <option value="type">Tipo</option>
             </select>
          </div>
          
          <div className="flex bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg p-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              title="Visualização em Grade"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'table' ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              title="Visualização em Lista"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-0">
        {Object.entries(groupedAgents).map(([groupKey, groupAgents], arrayIndex) => (
          <div key={groupKey} className={arrayIndex < Object.keys(groupedAgents).length - 1 ? "mb-8 relative z-0" : "mb-0 relative z-0"}>
            {groupBy && (
              <h2 className="text-[13px] font-medium text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2 uppercase tracking-wide">
                <span className="bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-md text-gray-600 dark:text-gray-400">
                  {groupBy === 'owner' ? 'Proprietário' : 'Tipo'}: <span className="font-semibold">{groupKey === 'orange' ? 'Laranja' : groupKey === 'blue' ? 'Azul' : groupKey}</span>
                </span>
                <span className="text-gray-500 font-normal">({groupAgents.length})</span>
              </h2>
            )}

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupAgents.map((agent) => (
                  <div 
                    key={agent.id} 
                    className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg p-5 flex flex-col hover:shadow-md transition-shadow cursor-pointer relative"
                    onClick={() => navigate(`/agentes/${agent.id}`)}
                  >
                    <div className="flex justify-between items-start mb-3 relative z-20">
                      <div className="flex items-center gap-2">
                        {agent.type === 'orange' ? (
                          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        ) : (
                          <Globe className="w-4 h-4 text-blue-500" />
                        )}
                        <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm">{agent.title}</h3>
                      </div>
                      <div className="relative">
                        <button 
                          className={`p-1.5 rounded-md transition-colors ${
                            openMenuId === agent.id 
                              ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100' 
                              : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(openMenuId === agent.id ? null : agent.id);
                          }}
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                        
                        {openMenuId === agent.id && (
                          <>
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(null);
                              }} 
                            />
                            <div className="absolute right-0 top-full mt-1 w-36 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-1 z-30">
                              {agent.owner === currentUser ? (
                                <>
                                  <button 
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2"
                                    onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); navigate(`/agentes/${agent.id}`); }}
                                  >
                                    <Edit className="w-4 h-4" /> Editar
                                  </button>
                                  <button 
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2"
                                    onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); }}
                                  >
                                    <Copy className="w-4 h-4" /> Clonar
                                  </button>
                                  <button 
                                    className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error/10 flex items-center gap-2"
                                    onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); }}
                                  >
                                    <Trash2 className="w-4 h-4" /> Excluir
                                  </button>
                                </>
                              ) : (
                                <button 
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2"
                                  onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); }}
                                >
                                  <Copy className="w-4 h-4" /> Clonar
                                </button>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1 mb-4 relative z-0">
                      <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed line-clamp-2 inline">
                        {agent.description}
                      </p>
                      {agent.hasEye && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); setModalAgent(agent as any); }}
                          className="inline-flex items-center ml-1 text-primary hover:text-primary-dark transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5 text-gray-400 hover:text-primary cursor-pointer align-middle" />
                        </button>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-end mt-auto pt-4 border-t border-transparent relative z-0">
                      <span className="text-blue-500 text-xs">criação - {agent.date}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 dark:text-gray-400 text-xs">Proprietário:</span>
                        <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-medium">
                          {agent.owner}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden overflow-x-auto relative z-10">
                <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                  <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    <tr>
                      <th className="px-4 py-3 font-medium cursor-pointer group whitespace-nowrap" onClick={() => handleSort('title')}>
                        <div className="flex items-center gap-1">Nome {renderSortIcon('title')}</div>
                      </th>
                      <th className="px-4 py-3 font-medium cursor-pointer group" onClick={() => handleSort('description')}>
                        <div className="flex items-center gap-1">Descrição {renderSortIcon('description')}</div>
                      </th>
                      <th className="px-4 py-3 font-medium cursor-pointer group" onClick={() => handleSort('prompt')}>
                        <div className="flex items-center gap-1">Prompt {renderSortIcon('prompt')}</div>
                      </th>
                      <th className="px-4 py-3 font-medium cursor-pointer group whitespace-nowrap" onClick={() => handleSort('type')}>
                        <div className="flex items-center gap-1">Tipo {renderSortIcon('type')}</div>
                      </th>
                      <th className="px-4 py-3 font-medium cursor-pointer group whitespace-nowrap" onClick={() => handleSort('date')}>
                        <div className="flex items-center gap-1">Criação {renderSortIcon('date')}</div>
                      </th>
                      <th className="px-4 py-3 font-medium cursor-pointer group whitespace-nowrap" onClick={() => handleSort('owner')}>
                        <div className="flex items-center gap-1">Proprietário {renderSortIcon('owner')}</div>
                      </th>
                      <th className="px-4 py-3 font-medium text-right whitespace-nowrap">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupAgents.map((agent) => (
                      <tr 
                        key={agent.id} 
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                        onClick={() => navigate(`/agentes/${agent.id}`)}
                      >
                        <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-100">
                           <div className="flex items-center gap-2 whitespace-nowrap">
                             {agent.type === 'orange' ? (
                               <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                             ) : (
                               <Globe className="w-4 h-4 text-blue-500" />
                             )}
                             {agent.title}
                           </div>
                        </td>
                        <td className="px-4 py-3 min-w-[200px] max-w-[300px]">
                           <span className="line-clamp-1" title={agent.description}>{agent.description}</span>
                        </td>
                        <td className="px-4 py-3 min-w-[250px] max-w-[350px]">
                           <div className="flex items-center">
                             <span className="line-clamp-1 flex-1 text-gray-500 italic" title={agent.prompt}>{agent.prompt || 'Sem prompt configurado.'}</span>
                             {agent.hasEye && agent.prompt && (
                                <button 
                                  onClick={(e) => { e.stopPropagation(); setModalAgent(agent as any); }}
                                  className="ml-2 text-primary hover:text-primary-dark transition-colors shrink-0"
                                  title="Ver prompt completo"
                                >
                                  <Eye className="w-4 h-4 text-gray-400 hover:text-primary" />
                                </button>
                             )}
                           </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium">
                            {agent.type === 'orange' ? 'Laranja' : 'Azul'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-blue-500 whitespace-nowrap text-xs">{agent.date}</td>
                        <td className="px-4 py-3">
                           <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-medium">
                             {agent.owner}
                           </div>
                        </td>
                        <td className="px-4 py-3 text-right relative z-20">
                          <div className="relative inline-block text-left">
                            <button 
                              className={`p-1.5 rounded-md transition-colors ${
                                openMenuId === agent.id 
                                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100' 
                                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(openMenuId === agent.id ? null : agent.id);
                              }}
                            >
                              <MoreHorizontal className="w-5 h-5" />
                            </button>
                            
                            {openMenuId === agent.id && (
                              <>
                                <div 
                                  className="fixed inset-0 z-10" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenMenuId(null);
                                  }} 
                                />
                                <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-1 z-30">
                                  {agent.owner === currentUser ? (
                                    <>
                                      <button 
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2"
                                        onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); navigate(`/agentes/${agent.id}`); }}
                                      >
                                        <Edit className="w-4 h-4" /> Editar
                                      </button>
                                      <button 
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2"
                                        onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); }}
                                      >
                                        <Copy className="w-4 h-4" /> Clonar
                                      </button>
                                      <button 
                                        className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error/10 flex items-center gap-2"
                                        onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); }}
                                      >
                                        <Trash2 className="w-4 h-4" /> Excluir
                                      </button>
                                    </>
                                  ) : (
                                    <button 
                                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2"
                                      onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); }}
                                    >
                                      <Copy className="w-4 h-4" /> Clonar
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-auto pb-8">
        <button className="px-6 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
          Carregar mais
        </button>
      </div>

      {/* Modal Ver Completo */}
      {modalAgent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark rounded-lg shadow-xl w-full max-w-2xl flex flex-col max-h-[80vh]">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-woopi-dark-gray dark:text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                {modalAgent.title}
              </h2>
              <button 
                onClick={() => setModalAgent(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <h3 className="text-sm font-medium text-woopi-dark-gray dark:text-white mb-2">Prompt configurado:</h3>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-md p-4 border border-gray-100 dark:border-gray-700">
                <p className="text-woopi-gray dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {modalAgent.prompt}
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button 
                onClick={() => setModalAgent(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-woopi-dark-gray dark:text-white rounded-md text-sm font-medium transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
