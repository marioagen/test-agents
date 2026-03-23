import React from 'react';
import { Search, CloudDownload, Plus, MoreHorizontal, Eye, Globe, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Agents() {
  const navigate = useNavigate();
  const agents = [
    {
      id: 1,
      type: 'orange',
      title: 'Análise de Documentos Jurídicos',
      description: 'Prompt completo para revisar informações referentes a papéis jurídicos, processos extra judiciais, p...',
      date: '16/04/2025',
      owner: 'CS',
      hasEye: true,
    },
    {
      id: 2,
      type: 'orange',
      title: 'Resumo Executivo',
      description: 'Gera resumos executivos concisos de documentos extensos, destacando pontos-chave, decisões necessári...',
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

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Agentes</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Gerenciar agentes de IA do sistema</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
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
            placeholder="Buscar Agente" 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-surface-dark text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="ml-4">
          <select className="border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-surface-dark px-4 py-2 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8 relative">
            <option>Mais recente</option>
            <option>Mais antigo</option>
            <option>A-Z</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md">
          Todos
        </button>
        <button className="px-4 py-1.5 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
          Meus agentes
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {agents.map((agent) => (
          <div 
            key={agent.id} 
            className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg p-5 flex flex-col hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/agentes/${agent.id}`)}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                {agent.type === 'orange' ? (
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                ) : (
                  <Globe className="w-4 h-4 text-blue-500" />
                )}
                <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm">{agent.title}</h3>
              </div>
              <button 
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  // More options logic here
                }}
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 mb-4">
              <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed line-clamp-2 inline">
                {agent.description}
              </p>
              {agent.hasEye && (
                <Eye className="w-3.5 h-3.5 text-gray-400 inline-block ml-1 align-middle" />
              )}
            </div>
            
            <div className="flex justify-between items-end mt-auto pt-4 border-t border-transparent">
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

      {/* Load More */}
      <div className="flex justify-center mt-auto pb-8">
        <button className="px-6 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
          Carregar mais
        </button>
      </div>
    </div>
  );
}
