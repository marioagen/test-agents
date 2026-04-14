import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Info, RefreshCw, ChevronLeft, ChevronRight, ChevronDown, Check } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
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
        <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 py-1 max-h-60 overflow-y-auto custom-scrollbar">
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
          {options.map(opt => {
            const isSelected = selected.includes(opt.id);
            return (
              <div 
                key={opt.id}
                className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-3 text-sm"
                onClick={() => handleToggle(opt.id)}
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300 dark:border-gray-600'}`}>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-gray-700 dark:text-gray-300">{opt.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  // Draft states (UI only)
  const [period, setPeriod] = useState('Este mês');
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
    <div className="flex flex-col h-full space-y-6">
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
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex flex-wrap items-center gap-3">
          <select 
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Este mês</option>
            <option>Mês passado</option>
            <option>Últimos 30 dias</option>
          </select>
          
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

      {/* Total WTC */}
      <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center shadow-sm">
        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mb-2">
          Total WTC <Info className="w-4 h-4" />
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
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"><ChevronLeft className="w-4 h-4" /></button>
              <span>{model}</span>
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
          
          <div className="border border-gray-100 dark:border-gray-800 rounded-lg p-4 mb-6 bg-gray-50/50 dark:bg-gray-800/20">
            <div className="text-sm text-gray-600 dark:text-gray-400">Total de Tokens Consumidos</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{totals.tokens}</div>
            <div className="text-xs text-gray-500 mt-1">Valor unitário no plano atual: {UNIT_COSTS.tokens}</div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400">Totalizador no Período</div>
              <div className="text-xl font-bold text-blue-600 mt-1">{totalizers.tokens.toFixed(7)}</div>
            </div>
          </div>

          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Consumo Diário de Tokens</div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                <Bar dataKey="tokens" fill="#334155" radius={[2, 2, 0, 0]} maxBarSize={80} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 2: Páginas Processadas */}
        <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm flex flex-col">
          <div className="flex items-center gap-1 font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Páginas de Documento Processadas (Agente Digitalizador) <Info className="w-4 h-4 text-gray-400" />
          </div>
          
          <div className="border border-gray-100 dark:border-gray-800 rounded-lg p-4 mb-6 bg-gray-50/50 dark:bg-gray-800/20">
            <div className="text-sm text-gray-600 dark:text-gray-400">Total de Páginas Processadas</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{totals.pages}</div>
            <div className="text-xs text-gray-500 mt-1">Valor unitário no plano atual: {UNIT_COSTS.pages}</div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400">Totalizador no Período</div>
              <div className="text-xl font-bold text-blue-600 mt-1">{totalizers.pages.toFixed(7)}</div>
            </div>
          </div>

          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Consumo Diário</div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                <Bar dataKey="pages" fill="#334155" radius={[2, 2, 0, 0]} maxBarSize={80} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 3: Execuções de Esteira de Automação */}
        <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm flex flex-col">
          <div className="flex items-center gap-1 font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Execuções de Esteira de Automação de IA <Info className="w-4 h-4 text-gray-400" />
          </div>
          
          <div className="border border-gray-100 dark:border-gray-800 rounded-lg p-4 mb-6 bg-gray-50/50 dark:bg-gray-800/20">
            <div className="text-sm text-gray-600 dark:text-gray-400">Execuções de Esteira de Automação de IA</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{totals.automation}</div>
            <div className="text-xs text-gray-500 mt-1">Valor unitário no plano atual: {UNIT_COSTS.automation}</div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400">Totalizador no Período</div>
              <div className="text-xl font-bold text-blue-600 mt-1">{totalizers.automation.toFixed(7)}</div>
            </div>
          </div>

          <div className="h-64 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                <Bar dataKey="automation" fill="#334155" radius={[2, 2, 0, 0]} maxBarSize={80} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 4: Execuções de Esteiras de Processamento */}
        <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm flex flex-col">
          <div className="flex items-center gap-1 font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Execuções de Esteiras de Processamento Woopi AI <Info className="w-4 h-4 text-gray-400" />
          </div>
          
          <div className="border border-gray-100 dark:border-gray-800 rounded-lg p-4 mb-6 bg-gray-50/50 dark:bg-gray-800/20">
            <div className="text-sm text-gray-600 dark:text-gray-400">Execuções de Esteiras de Processamento Woopi AI</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{totals.processing}</div>
            <div className="text-xs text-gray-500 mt-1">Valor unitário no plano atual: {UNIT_COSTS.processing}</div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400">Totalizador no Período</div>
              <div className="text-xl font-bold text-blue-600 mt-1">{totalizers.processing.toFixed(7)}</div>
            </div>
          </div>

          <div className="h-64 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                <Bar dataKey="processing" fill="#334155" radius={[2, 2, 0, 0]} maxBarSize={80} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
