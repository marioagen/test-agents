import React, { useState } from 'react';
import { ArrowLeft, Save, Copy, Sparkles, Plug, Search, Play, Loader2, Trash2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AgentForm() {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [promptContent, setPromptContent] = useState('');
  const [contextText, setContextText] = useState('');
  const [testOutput, setTestOutput] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [externalQueryEnabled, setExternalQueryEnabled] = useState(false);
  const [selectedEndpoints, setSelectedEndpoints] = useState<string[]>([]);

  const endpoints = [
    { id: '1', name: 'Get User Details', method: 'GET', url: 'https://api.example.com/v1/users/{id}' },
    { id: '2', name: 'User OCR Processing', method: 'POST', url: 'https://api.ocr.com/v2/process' },
    { id: '3', name: 'Validate Document', method: 'POST', url: 'https://api.example.com/v1/docs/validate' },
    { id: '4', name: 'Fetch Contract Data', method: 'GET', url: 'https://api.example.com/v1/contracts' },
  ];

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setTagInput('');
  };

  const toggleEndpoint = (id: string) => {
    setSelectedEndpoints(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const selectAll = () => setSelectedEndpoints(endpoints.map(e => e.id));
  const clearSelection = () => setSelectedEndpoints([]);

  const handleTestPrompt = () => {
    if (!promptContent || !contextText) return;
    setIsTesting(true);
    // Simulação de chamada de API
    setTimeout(() => {
      setTestOutput("Análise concluída com sucesso.\n\nPontos principais extraídos do documento:\n- O contrato menciona uma multa de 10% por atraso (Cláusula 4.2).\n- O foro eleito é o da comarca de São Paulo.\n- Não há menção a renovação automática.\n\nO prompt foi aplicado corretamente ao contexto fornecido.");
      setIsTesting(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/agentes')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Voltar</span>
          </button>
          <div className="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Novo Prompt</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Criar um novo prompt de IA</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
          <Save className="w-4 h-4" />
          Salvar
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Coluna da Esquerda - Formulário */}
        <div className="w-full lg:w-7/12 space-y-6">
          {/* Informações Básicas */}
          <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">Informações Básicas</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nome do Prompt <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Digite o nome do prompt" 
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-surface-dark text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Descrição
                </label>
                <textarea 
                  placeholder="Descreva o propósito e uso do prompt" 
                  rows={3}
                  maxLength={500}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-surface-dark text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <div className="text-right text-xs text-gray-400 mt-1 mb-4">
                  {description.length}/500
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tags
                </label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Adicionar nova tag" 
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-surface-dark text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button 
                    type="button" 
                    onClick={addTag}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Adicionar
                  </button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 shadow-sm"
                      >
                        {tag}
                        <button 
                          onClick={() => setTags(tags.filter(t => t !== tag))}
                          className="text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Separe as tags com a tecla Enter ou clique no botão Adicionar.
                </p>
              </div>
            </div>
          </div>

          {/* Conteúdo do Prompt */}
          <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">Conteúdo do Prompt</h2>
              <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-sm font-medium transition-colors">
                <Copy className="w-4 h-4" />
                Copiar
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Conteúdo do Prompt <span className="text-red-500">*</span>
                </label>
                <textarea 
                  placeholder="Digite o conteúdo do prompt." 
                  rows={6}
                  value={promptContent}
                  onChange={(e) => setPromptContent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-surface-dark text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono resize-y"
                />
              </div>
              
              <button className="flex items-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                <Sparkles className="w-4 h-4" />
                Refinar Prompt
              </button>
            </div>
          </div>

          {/* Consulta Externa da IA */}
          <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Plug className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">Consulta Externa da IA</h2>
            </div>
            
            <label className="flex items-center gap-3 cursor-pointer mb-4">
              <input 
                type="checkbox" 
                checked={externalQueryEnabled}
                onChange={(e) => setExternalQueryEnabled(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Habilitar consulta externa da IA neste agente
              </span>
            </label>

            {externalQueryEnabled && (
              <div className="mt-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-surface-dark p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Endpoints Selecionados ({selectedEndpoints.length})
                  </span>
                  <div className="flex gap-2">
                    <button 
                      onClick={selectAll}
                      className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark text-gray-700 dark:text-gray-300 text-xs font-medium rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      Selecionar Todos
                    </button>
                    <button 
                      onClick={clearSelection}
                      className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark text-gray-700 dark:text-gray-300 text-xs font-medium rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      Limpar Seleção
                    </button>
                  </div>
                </div>

                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="Buscar endpoints..." 
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-surface-dark text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {endpoints.map((endpoint) => (
                    <label 
                      key={endpoint.id}
                      className="flex items-start gap-3 p-3 hover:bg-white dark:hover:bg-gray-800 rounded-md cursor-pointer transition-colors"
                    >
                      <input 
                        type="checkbox" 
                        checked={selectedEndpoints.includes(endpoint.id)}
                        onChange={() => toggleEndpoint(endpoint.id)}
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-800 dark:text-gray-100">
                          {endpoint.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {endpoint.method} · {endpoint.url}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Coluna da Direita - Área de Teste (Playground) */}
        <div className="w-full lg:w-5/12 lg:sticky lg:top-24 space-y-6">
          <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col h-[calc(100vh-8rem)] min-h-[600px]">
            <div className="flex items-center gap-2 mb-4">
              <Play className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">Área de Teste (Playground)</h2>
            </div>
            
            {/* Contexto */}
            <div className="flex flex-col flex-1 mb-4 min-h-[200px]">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Contexto (Texto do PDF)
                </label>
                {contextText && (
                  <button 
                    onClick={() => setContextText('')}
                    className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    Limpar
                  </button>
                )}
              </div>
              <textarea 
                value={contextText}
                onChange={(e) => setContextText(e.target.value)}
                placeholder="Cole aqui o texto longo extraído do documento para servir de contexto..." 
                className="flex-1 w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-surface-dark text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none custom-scrollbar"
              />
            </div>

            {/* Botão de Ação */}
            <button 
              onClick={handleTestPrompt}
              disabled={isTesting || !promptContent || !contextText}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-md text-sm font-medium transition-colors mb-4"
            >
              {isTesting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              {isTesting ? 'Processando...' : 'Testar Prompt no Contexto'}
            </button>

            {/* Resultado */}
            <div className="flex flex-col flex-1 min-h-[200px]">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Resultado (Output)
                </label>
                {testOutput && (
                  <button 
                    onClick={() => setTestOutput('')}
                    className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  >
                    Limpar
                  </button>
                )}
              </div>
              <div className="flex-1 w-full p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800/50 text-sm overflow-y-auto custom-scrollbar">
                {testOutput ? (
                  <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                    {testOutput}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                    <Sparkles className="w-8 h-8 mb-2 opacity-50" />
                    <p className="text-center px-4">
                      Preencha o prompt e o contexto, depois clique em testar para ver o resultado da IA aqui.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
