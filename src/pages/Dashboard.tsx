import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Info, RefreshCw, ChevronLeft, ChevronRight, ChevronDown, Check, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const mockWorkflows = [
  { id: 'wf-1', name: 'Esteira de Documentos Jurídicos' },
  { id: 'wf-2', name: 'Esteira de RH' },
  { id: 'wf-3', name: 'Esteira Financeira' },
  { id: 'unclassified', name: 'Não classificado' }
];

const rawData = [
  { date: '01/04', tokens: 2000, pages: 450, automation: 0, processing: 2, workflowId: 'wf-1' },
  { date: '02/04', tokens: 3000, pages: 220, automation: 0, processing: 1, workflowId: 'wf-2' },
  { date: '08/04', tokens: 140000, pages: 300, automation: 10, processing: 20, workflowId: 'wf-1' },
  { date: '08/04', tokens: 100000, pages: 240, automation: 4, processing: 16, workflowId: 'wf-3' },
  { date: '09/04', tokens: 7655, pages: 13, automation: 0, processing: 2, workflowId: 'unclassified' },
];

const UNIT_COSTS = {
  tokens: 0.0000552,
  pages: 0.0082873,
  automation: 0.3867403,
  processing: 0.3867403
};

const LLM_MODELS = [
  'gpt-4o',
  'gemini flash',
  'deepseek r1',
  'text-embedding-2'
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-2 rounded shadow-sm text-sm">
        <p className="font-medium text-gray-900 dark:text-gray-100">{`${label}`}</p>
        <p className="text-blue-600">{`Valor: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

function MultiSelect({ options, selected, onChange }: { options: any[], selected: string[], onChange: (val: string[]) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter(item => item !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  const handleSelectAll = () => {
    onChange([]);
  };

  const selectedText = selected.length === 0 
    ? 'Todas as Esteiras' 
    : selected.length === 1 
      ? options.find(o => o.id === selected[0])?.name 
      : `${selected.length} selecionadas`;

  const filteredOptions = options.filter(opt => 
    opt.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-pointer flex items-center justify-between min-w-[220px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate max-w-[180px]">{selectedText}</span>
        <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 py-1 flex flex-col">
          <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar esteiras..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-md pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto custom-scrollbar py-1">
            {searchTerm === '' && (
              <>
                <div 
                  className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-3 text-sm"
                  onClick={handleSelectAll}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${selected.length === 0 ? 'bg-blue-600 border-blue-600' : 'border-gray-300 dark:border-gray-600'}`}>
                    {selected.length === 0 && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className={selected.length === 0 ? 'font-medium text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'}>
                    Todas as Esteiras
                  </span>
                </div>
                <div className="h-px bg-gray-200 dark:bg-gray-700 my-1"></div>
              </>
            )}
            
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                Nenhuma esteira encontrada.
              </div>
            ) : (
              filteredOptions.map(opt => {
                const isSelected = selected.includes(opt.id);
                return (
                  <div 
                    key={opt.id}
                    className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-3 text-sm"
                    onClick={() => handleToggle(opt.id)}
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300 dark:border-gray-600'}`}>
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 select-none">{opt.name}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SearchableSelect({ options, selected, onChange }: { options: string[], selected: string, onChange: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className="flex items-center justify-between gap-2 px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm cursor-pointer min-w-[140px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-700 dark:text-gray-300 truncate font-medium">{selected}</span>
        <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
      </div>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 py-1 flex flex-col">
          <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar modelo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-md pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto custom-scrollbar py-1">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-4 text-center text-xs text-gray-500 dark:text-gray-400">
                Nenhum modelo encontrado.
              </div>
            ) : (
              filteredOptions.map(opt => {
                const isSelected = selected === opt;
                return (
                  <div 
                    key={opt}
                    className={`px-3 py-2 cursor-pointer flex items-center justify-between text-xs ${isSelected ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                    onClick={() => {
                      onChange(opt);
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                  >
                    <span className="select-none inline-block w-full">{opt}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function getDateRangeString(period: string, startDate: string, endDate: string) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };
  
  if (period === 'Personalizado') {
    if (!startDate && !endDate) return 'Selecione as datas';
    const formatStrDate = (str: string) => {
      if (!str) return '...';
      const [y, m, d] = str.split('-');
      return `${d}/${m}/${y}`;
    }
    return `${formatStrDate(startDate)} a ${formatStrDate(endDate)}`;
  }
  
  const today = new Date();
  
  if (period === 'Este mês') {
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return `${formatDate(firstDay)} a ${formatDate(lastDay)}`;
  }
  
  if (period === 'Mês passado') {
    const firstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth(), 0);
    return `${formatDate(firstDay)} a ${formatDate(lastDay)}`;
  }
  
  if (period === 'Últimos 30 dias') {
    const firstDay = new Date(today);
    firstDay.setDate(firstDay.getDate() - 30);
    return `${formatDate(firstDay)} a ${formatDate(today)}`;
  }
  
  return '';
}

export default function Dashboard() {
  // Draft states (UI only)
  const [period, setPeriod] = useState('Este mês');
  const [isCustomDateOpen, setIsCustomDateOpen] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  
  const [model, setModel] = useState('gpt-4o');
  const [selectedWorkflows, setSelectedWorkflows] = useState<string[]>([]);

  // Applied states (used for data calculation)
  const [appliedPeriod, setAppliedPeriod] = useState('Este mês');
  const [appliedWorkflows, setAppliedWorkflows] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  // Calculate filtered data based on APPLIED states
  const { chartData, totals, totalizers } = useMemo(() => {
    const filteredRawData = rawData.filter(item => {
      // Em um cenário real, também filtraríamos por `appliedPeriod` aqui
      // Ex: if (appliedPeriod === 'Este mês' && item.date not in this month) return false;
      
      if (appliedWorkflows.length === 0) return true;
      return appliedWorkflows.includes(item.workflowId);
    });

    const aggregated = filteredRawData.reduce((acc, curr) => {
      if (!acc[curr.date]) {
        acc[curr.date] = { date: curr.date, tokens: 0, pages: 0, automation: 0, processing: 0 };
      }
      acc[curr.date].tokens += curr.tokens;
      acc[curr.date].pages += curr.pages;
      acc[curr.date].automation += curr.automation;
      acc[curr.date].processing += curr.processing;
      return acc;
    }, {} as Record<string, any>);

    const chartDataArray = Object.values(aggregated).sort((a: any, b: any) => a.date.localeCompare(b.date));

    const totalsObj = {
      tokens: chartDataArray.reduce((sum: number, item: any) => sum + item.tokens, 0),
      pages: chartDataArray.reduce((sum: number, item: any) => sum + item.pages, 0),
      automation: chartDataArray.reduce((sum: number, item: any) => sum + item.automation, 0),
      processing: chartDataArray.reduce((sum: number, item: any) => sum + item.processing, 0),
    };

    const totalizersObj = {
      tokens: totalsObj.tokens * UNIT_COSTS.tokens,
      pages: totalsObj.pages * UNIT_COSTS.pages,
      automation: totalsObj.automation * UNIT_COSTS.automation,
      processing: totalsObj.processing * UNIT_COSTS.processing,
    };

    return { chartData: chartDataArray, totals: totalsObj, totalizers: totalizersObj };
  }, [appliedWorkflows, appliedPeriod]);

  // Mock total WTC calculation based on totalizers to match the 707 baseline when all selected
  const sumTotalizers = totalizers.tokens + totalizers.pages + totalizers.automation + totalizers.processing;
  const displayWTC = Math.round(sumTotalizers * 15.588); // Scaling factor to match the baseline 707

  const handleUpdate = () => {
    setIsUpdating(true);
    // Simula o tempo de requisição ao backend
    setTimeout(() => {
      setAppliedPeriod(period);
      setAppliedWorkflows(selectedWorkflows);
      setIsUpdating(false);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Sticky Top Area */}
      <div className="sticky top-16 z-30 bg-gray-50 dark:bg-background-dark pt-8 pb-4 -mt-8 mx-[-2rem] px-[2rem] border-b border-gray-200 dark:border-gray-700 mb-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Dashboard de Consumo e Bilhetagem
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Woopi AI</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-3 text-right">
              <div className="text-xs text-gray-500 dark:text-gray-400">Plano Atual</div>
              <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">QA-SUBSCRIPTION</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">WTCs:0</div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap items-end gap-3">
              <div className="relative flex flex-col items-start gap-1">
                <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium px-1">
                  {getDateRangeString(period, customStartDate, customEndDate)}
                </div>
                <select 
                  value={period}
                  onChange={(e) => {
                    setPeriod(e.target.value);
                    if (e.target.value === 'Personalizado') {
                      setIsCustomDateOpen(true);
                    } else {
                      setIsCustomDateOpen(false);
                    }
                  }}
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
                >
                  <option>Este mês</option>
                  <option>Mês passado</option>
                  <option>Últimos 30 dias</option>
                  <option>Personalizado</option>
                </select>
                
                {isCustomDateOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Data de início</label>
                        <input type="date" value={customStartDate} onChange={(e) => setCustomStartDate(e.target.value)} className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-surface-dark text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Data final</label>
                        <input type="date" value={customEndDate} onChange={(e) => setCustomEndDate(e.target.value)} className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-surface-dark text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                      </div>
                      <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex justify-end gap-3 mt-2">
                        <button onClick={() => { setIsCustomDateOpen(false); setPeriod('Este mês'); }} className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-md transition-colors">Cancelar</button>
                        <button onClick={() => setIsCustomDateOpen(false)} className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">Aplicar</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <MultiSelect 
                options={mockWorkflows} 
                selected={selectedWorkflows} 
                onChange={setSelectedWorkflows} 
              />

              <button 
                onClick={handleUpdate}
                disabled={isUpdating}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
                Atualizar
              </button>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
              Atualização automática a cada 5 minutos
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="space-y-6">
        {/* Total WTC */}
      <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center shadow-sm">
        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mb-2 relative group">
          Total WTC <Info className="w-4 h-4 cursor-help" />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 text-center pointer-events-none">
            WTC (Woopi Total Coins) é a unidade de medida do consumo no período selecionado, seu cálculo é baseado nos multiplicadores do seu plano. Mais informações em nosso site woopi.ai.
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
        <div className="text-4xl font-bold text-blue-600">{displayWTC}</div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: Consumo de Tokens */}
        <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-1 font-semibold text-gray-800 dark:text-gray-200">
              Consumo de Tokens de IA <Info className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <SearchableSelect 
                options={LLM_MODELS}
                selected={model}
                onChange={setModel}
              />
            </div>
          </div>
          
          <div className="border border-gray-100 dark:border-gray-800 rounded-lg p-4 mb-6 bg-gray-50/50 dark:bg-gray-800/20 grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total de Tokens Consumidos</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{totals.tokens}</div>
              <div className="text-xs text-gray-500 mt-1">Valor no plano: {UNIT_COSTS.tokens}</div>
            </div>
            <div className="border-l border-gray-200 dark:border-gray-700 pl-4 flex flex-col justify-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">Totalizador no Período</div>
              <div className="text-xl font-bold text-blue-600 mt-1">{totalizers.tokens.toFixed(7)}</div>
            </div>
          </div>

          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Consumo Diário de Tokens</div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} dy={10} interval="preserveStartEnd" label={{ value: 'Dia do Mês', position: 'insideBottom', offset: -10, fontSize: 11, fill: '#6b7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} domain={[0, 'auto']} label={{ value: 'Volume de Tokens', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' }, offset: 5, fontSize: 11, fill: '#6b7280' }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#6b7280' }} />
                <Bar dataKey="tokens" name="Tokens Processados" fill="#3b82f6" radius={[2, 2, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 2: Páginas Processadas */}
        <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm flex flex-col">
          <div className="flex items-center gap-1 font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Páginas de Documento Processadas (Agente Digitalizador) <Info className="w-4 h-4 text-gray-400" />
          </div>
          
          <div className="border border-gray-100 dark:border-gray-800 rounded-lg p-4 mb-6 bg-gray-50/50 dark:bg-gray-800/20 grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total de Páginas Processadas</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{totals.pages}</div>
              <div className="text-xs text-gray-500 mt-1">Valor no plano: {UNIT_COSTS.pages}</div>
            </div>
            <div className="border-l border-gray-200 dark:border-gray-700 pl-4 flex flex-col justify-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">Totalizador no Período</div>
              <div className="text-xl font-bold text-blue-600 mt-1">{totalizers.pages.toFixed(7)}</div>
            </div>
          </div>

          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Consumo Diário</div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} dy={10} interval="preserveStartEnd" label={{ value: 'Dia do Mês', position: 'insideBottom', offset: -10, fontSize: 11, fill: '#6b7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} domain={[0, 'auto']} label={{ value: 'Páginas Processadas', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' }, offset: 5, fontSize: 11, fill: '#6b7280' }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#6b7280' }} />
                <Bar dataKey="pages" name="Páginas Analisadas" fill="#6366f1" radius={[2, 2, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 3: Execuções de Esteira de Automação */}
        <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm flex flex-col">
          <div className="flex items-center gap-1 font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Execuções de Esteira de Automação de IA <Info className="w-4 h-4 text-gray-400" />
          </div>
          
          <div className="border border-gray-100 dark:border-gray-800 rounded-lg p-4 mb-6 bg-gray-50/50 dark:bg-gray-800/20 grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total de Execuções de IA</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{totals.automation}</div>
              <div className="text-xs text-gray-500 mt-1">Valor no plano: {UNIT_COSTS.automation}</div>
            </div>
            <div className="border-l border-gray-200 dark:border-gray-700 pl-4 flex flex-col justify-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">Totalizador no Período</div>
              <div className="text-xl font-bold text-blue-600 mt-1">{totalizers.automation.toFixed(7)}</div>
            </div>
          </div>

          <div className="h-48 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} dy={10} interval="preserveStartEnd" label={{ value: 'Dia do Mês', position: 'insideBottom', offset: -10, fontSize: 11, fill: '#6b7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} domain={[0, 'auto']} label={{ value: 'Total de Execuções', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' }, offset: 5, fontSize: 11, fill: '#6b7280' }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#6b7280' }} />
                <Bar dataKey="automation" name="Automações de IA" fill="#14b8a6" radius={[2, 2, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 4: Execuções de Esteiras de Processamento */}
        <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm flex flex-col">
          <div className="flex items-center gap-1 font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Execuções de Esteiras de Processamento Woopi AI <Info className="w-4 h-4 text-gray-400" />
          </div>
          
          <div className="border border-gray-100 dark:border-gray-800 rounded-lg p-4 mb-6 bg-gray-50/50 dark:bg-gray-800/20 grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total de Execuções Woopi AI</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{totals.processing}</div>
              <div className="text-xs text-gray-500 mt-1">Valor no plano: {UNIT_COSTS.processing}</div>
            </div>
            <div className="border-l border-gray-200 dark:border-gray-700 pl-4 flex flex-col justify-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">Totalizador no Período</div>
              <div className="text-xl font-bold text-blue-600 mt-1">{totalizers.processing.toFixed(7)}</div>
            </div>
          </div>

          <div className="h-48 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} dy={10} interval="preserveStartEnd" label={{ value: 'Dia do Mês', position: 'insideBottom', offset: -10, fontSize: 11, fill: '#6b7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} domain={[0, 'auto']} label={{ value: 'Total de Execuções', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' }, offset: 5, fontSize: 11, fill: '#6b7280' }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#6b7280' }} />
                <Bar dataKey="processing" name="Execuções Woopi AI" fill="#8b5cf6" radius={[2, 2, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
    </div>
  );
}