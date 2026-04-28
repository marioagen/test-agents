import React, { useState } from 'react';
import { ArrowLeft, Search, Globe, Eye, ChevronDown, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ImportAgents() {
  const navigate = useNavigate();
  const [selectedAgents, setSelectedAgents] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [modalTemplate, setModalTemplate] = useState<{title: string, prompt: string} | null>(null);

  const templates = [
    {
      id: 1,
      title: '[Jurídico] Análise de Contratos',
      description: 'Prompt para análise detalhada de contratos, identificando cláusulas importantes, riscos e obrigações',
      prompt: 'Você é um assistente jurídico especializado em análise de contratos. Analise o documento fornecido e identifique: 1) Cláusulas principais e suas implicações legais, 2) Riscos potenciais e pontos de atenção críticos, 3) Obrigações das partes envolvidas com seus prazos, multas e condições de rescisão, 4) Assinaturas, datas e averbações. Formate os resultados em tópicos claros e objetivos.',
    },
    {
      id: 2,
      title: '[Compliance] Verificação de Conformidade',
      description: 'Verificação de documentos para conformidade com normas regulatórias e políticas internas',
      prompt: 'Analise o documento fornecido quanto à conformidade com normas regulatórias aplicáveis (LGPD, ISO 27001, SOX, etc). Verifique: 1) Adequação às políticas internas da organização, 2) Conformidade com legislação vigente no Brasil, 3) Identificação de não conformidades (com nível de criticidade). Caso encontre problemas, sugira o ajuste no texto.',
    },
    {
      id: 3,
      title: '[Financeiro] Auditoria de Despesas',
      description: 'Análise de relatórios de despesas para encontrar inconsistências e violações da política.',
      prompt: 'Atue como um auditor financeiro sênior. Revise o relatório de despesas anexo e sinalize quaisquer gastos que não estejam em conformidade com as diretrizes financeiras padrão. Destaque anomalias, valores excessivos e categorizações incorretas. Agrupe os problemas encontrados por centro de custo e sugira questionamentos a serem feitos aos responsáveis.',
    },
    {
      id: 4,
      title: '[RH] Triagem de Currículos',
      description: 'Avaliação inicial de currículos baseada na descrição da vaga e requisitos essenciais.',
      prompt: 'Analise os currículos fornecidos com base na seguinte descrição de vaga: [INSERIR VAGA]. Extraia as seguintes informações para cada candidato: experiência relevante, aderência às habilidades obrigatórias e pontos fortes. Classifique a compatibilidade geral em formato de ranking de 1 a 10. Descarte sumariamente aqueles que não possuem os requisitos obrigatórios documentados.',
    }
  ];

  const filteredTemplates = templates.filter(t => {
    const query = searchQuery.toLowerCase();
    return t.title.toLowerCase().includes(query) || 
           t.description.toLowerCase().includes(query) || 
           t.prompt.toLowerCase().includes(query);
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedAgents(new Set(filteredTemplates.map(t => t.id)));
    } else {
      setSelectedAgents(new Set());
    }
  };

  const handleSelect = (id: number) => {
    const newSelected = new Set(selectedAgents);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedAgents(newSelected);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-background-dark">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/agentes')}
            className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-woopi-dark-gray dark:text-white">Importar agentes</h1>
            <p className="text-sm text-woopi-gray dark:text-gray-400 mt-0.5">Selecione agentes pré-definidos do sistema</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/agentes')}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-woopi-gray dark:text-gray-300 bg-white dark:bg-surface-dark rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancelar
          </button>
          <button 
            className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedAgents.size === 0}
          >
            Importar ({selectedAgents.size})
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Search and Sort */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar nome de agente e palavras chave dos prompts" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-surface-dark text-sm text-woopi-dark-gray dark:text-white focus:outline-none focus:border-primary"
            />
          </div>
          <div className="relative w-64">
            <select className="w-full appearance-none pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-surface-dark text-sm text-woopi-dark-gray dark:text-white focus:outline-none focus:border-primary">
              <option>Mais recente</option>
              <option>Mais antigo</option>
              <option>A-Z</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Select All */}
        <div className="flex items-center gap-2 mb-6">
          <input 
            type="checkbox" 
            id="selectAll"
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
            checked={selectedAgents.size === filteredTemplates.length && filteredTemplates.length > 0}
            onChange={handleSelectAll}
          />
          <label htmlFor="selectAll" className="text-sm font-medium text-woopi-dark-gray dark:text-gray-200 cursor-pointer">
            Selecionar todos os templates
          </label>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {filteredTemplates.map(template => (
            <div 
              key={template.id} 
              className={`bg-white dark:bg-surface-dark border rounded-lg p-5 flex flex-col transition-colors cursor-pointer ${
                selectedAgents.has(template.id) 
                  ? 'border-primary shadow-sm dark:border-primary/50' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => handleSelect(template.id)}
            >
              <div className="flex items-start gap-3 mb-3">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 mt-1 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                  checked={selectedAgents.has(template.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleSelect(template.id);
                  }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary" />
                    <h3 className="font-bold text-woopi-dark-gray dark:text-white text-base">
                      {template.title}
                    </h3>
                  </div>
                  <p className="text-woopi-gray dark:text-gray-400 text-sm leading-relaxed mt-2">
                    {template.description}
                  </p>
                </div>
              </div>

              <div className="mt-2 ml-7 bg-gray-50 dark:bg-gray-800/50 rounded-md p-3 border border-gray-100 dark:border-gray-700">
                <p className="text-woopi-gray dark:text-gray-400 text-sm leading-relaxed mb-2 line-clamp-2">
                  {template.prompt}
                </p>
                {template.prompt.length > 100 && (
                  <button 
                    className="flex items-center gap-1.5 text-primary hover:text-primary-dark text-sm font-medium transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalTemplate(template);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                    Ver completo
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Ver Completo */}
      {modalTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark rounded-lg shadow-xl w-full max-w-2xl flex flex-col max-h-[80vh]">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-woopi-dark-gray dark:text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                {modalTemplate.title}
              </h2>
              <button 
                onClick={() => setModalTemplate(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <h3 className="text-sm font-medium text-woopi-dark-gray dark:text-white mb-2">Prompt configurado:</h3>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-md p-4 border border-gray-100 dark:border-gray-700">
                <p className="text-woopi-gray dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {modalTemplate.prompt}
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button 
                onClick={() => setModalTemplate(null)}
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
