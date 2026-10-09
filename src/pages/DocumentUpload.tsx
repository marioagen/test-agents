import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Upload, X, Check, Search, Building2, 
  AlertTriangle, CheckCircle2, Loader2, Info, ChevronDown, 
  Trash2, FileText, ChevronUp, FileCode
} from 'lucide-react';

export interface WorkflowItem {
  id: string | number;
  name: string;
  department?: string;
  teams?: string[];
  description?: string;
}

const mockWorkflows: WorkflowItem[] = [
  { 
    id: '1', 
    name: 'Workflow Aprovação de Notas Fiscais', 
    department: 'Financeiro', 
    teams: ['Equipe Financeiro', 'Equipe Operações'], 
    description: 'Triagem, validação fiscal e aprovação de pagamentos' 
  },
  { 
    id: '2', 
    name: 'Revisão Automática de Contratos SLA', 
    department: 'Jurídico', 
    teams: ['Equipe Jurídico', 'Equipe Operações'], 
    description: 'Análise de cláusulas, rescisões e vigência' 
  },
  { 
    id: '3', 
    name: 'Triagem e Onboarding de Colaboradores', 
    department: 'Recursos Humanos', 
    teams: ['Equipe Recursos Humanos'], 
    description: 'Recebimento de documentos de admissão e conferência de dados' 
  },
  { 
    id: '4', 
    name: 'Validação e Análise de Comprovantes Fiscais', 
    department: 'Financeiro', 
    teams: ['Equipe Financeiro'], 
    description: 'Extração de dados de recibos, boletos e cupons fiscais' 
  },
  { 
    id: '5', 
    name: 'Auditoria de Processos e Risco Operacional', 
    department: 'Governança', 
    teams: ['Equipe Auditoria Interna'], 
    description: 'Conferência de conformidade e detecção de anomalias' 
  },
  { 
    id: '6', 
    name: 'Processamento de Boletos e Faturas', 
    department: 'Financeiro', 
    teams: ['Equipe Financeiro'], 
    description: 'Leitura de código de barras, vencimentos e conciliação bancária' 
  }
];

const ACCEPTED_FORMAT_LEGEND = [
  'PDF', 'DOCX', 'PPTX', 'XLS', 'XLSX', 'TXT', 'CSV', 
  'PNG', 'JPG', 'JPEG', 'HTML', 'HTM', 'MP3', 'WAV', 
  'OPUS', 'OGG', 'OGA'
];

interface UploadedFileItem {
  id: string;
  name: string;
  size: number;
  extension: string;
  isPdf: boolean;
  accepted: boolean;
  error?: string;
}

// 4 Initial simulated pre-uploaded files (2 PDF, 1 DOCX, 1 TXT)
const INITIAL_PRELOADED_FILES: UploadedFileItem[] = [
  {
    id: 'sim-doc-1',
    name: 'Contrato-Prestacao-Servicos-2026.pdf',
    size: 2516582, // 2.4 MB
    extension: 'PDF',
    isPdf: true,
    accepted: true
  },
  {
    id: 'sim-doc-2',
    name: 'Nota-Fiscal-Servicos-Demo.pdf',
    size: 1887436, // 1.8 MB
    extension: 'PDF',
    isPdf: true,
    accepted: true
  },
  {
    id: 'sim-doc-3',
    name: 'Minuta-Contratual-Aditivo.docx',
    size: 865485, // 845.2 KB
    extension: 'DOCX',
    isPdf: false,
    accepted: true
  },
  {
    id: 'sim-doc-4',
    name: 'Observacoes-para-analise.txt',
    size: 14848, // 14.5 KB
    extension: 'TXT',
    isPdf: false,
    accepted: true
  }
];

const EXTRACTION_OPTIONS = [
  {
    id: 'default',
    label: 'Extração padrão',
    tooltip: 'Faz a extração de texto sem uso de OCR'
  },
  {
    id: 'force',
    label: 'Extração por OCR',
    tooltip: 'Faz a extração usando reconhecimento de texto em imagem'
  },
  {
    id: 'fallback',
    label: 'OCR somente em caso de falha',
    tooltip: 'Se a extração de texto padrão falhar, aplica OCR'
  }
];

export default function DocumentUpload() {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const extractionDropdownRef = useRef<HTMLDivElement>(null);

  // Parse query params (e.g. ?workflowId=3)
  const queryParams = new URLSearchParams(location.search);
  const initialWorkflowId = queryParams.get('workflowId') || '3';

  // Files State - initialized with simulated 2 PDF, 1 DOCX, 1 TXT
  const [filesList, setFilesList] = useState<UploadedFileItem[]>(INITIAL_PRELOADED_FILES);
  const [isDragOver, setIsDragOver] = useState(false);
  const [description, setDescription] = useState(
    'Documentos de demonstração para visualização do fluxo de upload e processamento da esteira.'
  );
  const [selectedWorkflowIds, setSelectedWorkflowIds] = useState<string[]>([initialWorkflowId]);
  const [workflowSearch, setWorkflowSearch] = useState('');
  
  // PDF Processing Options
  const [selectedOrganization, setSelectedOrganization] = useState<'separate' | 'batch' | 'merge'>('separate');
  const [selectedPdfExtraction, setSelectedPdfExtraction] = useState<'default' | 'force' | 'fallback'>('default');
  const [isExtractionOpen, setIsExtractionOpen] = useState(false);
  const [processingNotice, setProcessingNotice] = useState<string>('');

  // Modals & Submitting
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Sync initialWorkflowId when query param changes
  useEffect(() => {
    if (initialWorkflowId && !selectedWorkflowIds.includes(initialWorkflowId)) {
      setSelectedWorkflowIds(prev => Array.from(new Set([...prev, initialWorkflowId])));
    }
  }, [initialWorkflowId]);

  // Close extraction dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        extractionDropdownRef.current && 
        !extractionDropdownRef.current.contains(event.target as Node)
      ) {
        setIsExtractionOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Derived file stats
  const pdfFiles = filesList.filter(f => f.isPdf && f.accepted);
  const otherFiles = filesList.filter(f => !f.isPdf && f.accepted);
  const validFiles = filesList.filter(f => f.accepted);
  const hasRejectedFiles = filesList.some(f => !f.accepted);

  // Watch PDF files: reset organization if fewer than 2 PDFs (like the reference app)
  useEffect(() => {
    if (pdfFiles.length < 2 && (selectedOrganization === 'batch' || selectedOrganization === 'merge')) {
      setSelectedOrganization('separate');
      setProcessingNotice('Organização alterada para Manter separados: são necessários pelo menos 2 PDFs para lote ou mesclagem.');
    }
  }, [pdfFiles.length, selectedOrganization]);

  // File size formatter (KB, MB, B)
  const formatSize = (bytes: number) => {
    if (bytes >= 1048576) {
      return `${(bytes / 1048576).toFixed(1)} MB`;
    }
    if (bytes >= 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${bytes} B`;
  };

  // Helper for file extension
  const getFileExtension = (filename: string) => {
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop()!.toUpperCase() : 'ARQ';
  };

  // Handle files added
  const handleFilesAdded = (incomingFiles: FileList | File[]) => {
    setProcessingNotice('');
    const newItems: UploadedFileItem[] = [];

    Array.from(incomingFiles).forEach(file => {
      const ext = getFileExtension(file.name);
      const isPdf = ext === 'PDF';
      
      let accepted = true;
      let error = undefined;

      if (file.size === 0) {
        accepted = false;
        error = 'Este arquivo está vazio. Remova-o e selecione um arquivo com conteúdo.';
      } else if (file.size > 50 * 1024 * 1024) {
        accepted = false;
        error = 'O arquivo excede o limite de tamanho (50 MB). Remova-o e selecione um arquivo menor.';
      } else if (!ACCEPTED_FORMAT_LEGEND.includes(ext)) {
        accepted = false;
        error = 'Formato ou tipo de arquivo incompatível. Use PDF, TXT, DOCX, PNG, JPG, XLS ou HTML.';
      }

      newItems.push({
        id: `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: file.name,
        size: file.size,
        extension: ext,
        isPdf,
        accepted,
        error
      });
    });

    setFilesList(prev => [...prev, ...newItems]);
  };

  const removeFile = (id: string) => {
    setProcessingNotice('');
    setFilesList(prev => prev.filter(f => f.id !== id));
  };

  const removeAllFiles = () => {
    setProcessingNotice('');
    setFilesList([]);
    setIsClearModalOpen(false);
  };

  // Workflow selection
  const toggleWorkflow = (id: string) => {
    setSelectedWorkflowIds(prev => 
      prev.includes(id) ? prev.filter(wId => wId !== id) : [...prev, id]
    );
  };

  const selectAllWorkflows = () => {
    setSelectedWorkflowIds(mockWorkflows.map(w => String(w.id)));
  };

  const clearWorkflowSelection = () => {
    setSelectedWorkflowIds([]);
  };

  const filteredWorkflows = mockWorkflows.filter(w => 
    w.name.toLowerCase().includes(workflowSearch.toLowerCase()) ||
    (w.department && w.department.toLowerCase().includes(workflowSearch.toLowerCase())) ||
    (w.description && w.description.toLowerCase().includes(workflowSearch.toLowerCase()))
  );

  const selectedWorkflowsList = mockWorkflows.filter(w => selectedWorkflowIds.includes(String(w.id)));

  // Can save check
  const canSave = validFiles.length > 0 && selectedWorkflowIds.length > 0 && description.length <= 250 && !hasRejectedFiles;

  // Selected extraction label
  const currentExtractionOption = EXTRACTION_OPTIONS.find(o => o.id === selectedPdfExtraction) || EXTRACTION_OPTIONS[0];

  // Dynamic upload summary according to woopiai-ui
  const getUploadSummaryText = () => {
    if (validFiles.length === 0) {
      return 'Nenhum arquivo escolhido';
    }

    if (pdfFiles.length === 0) {
      return otherFiles.length === 1 
        ? '1 arquivo será enviado sem opções de PDF.' 
        : `${otherFiles.length} arquivos serão enviados sem opções de PDF.`;
    }

    let pdfSummary = '';
    if (selectedOrganization === 'merge') {
      pdfSummary = `${pdfFiles.length} PDFs serão mesclados em um único PDF.`;
    } else if (selectedOrganization === 'batch') {
      pdfSummary = `${pdfFiles.length} PDFs serão enviados em lote.`;
    } else {
      pdfSummary = pdfFiles.length === 1 
        ? '1 PDF será enviado separadamente.' 
        : `${pdfFiles.length} PDFs serão enviados separadamente.`;
    }

    const extractionSummary = currentExtractionOption.label;
    const otherSummary = otherFiles.length > 0 
      ? ` ${otherFiles.length === 1 ? 'O outro arquivo será enviado sem estas opções.' : `Os outros ${otherFiles.length} arquivos serão enviados sem estas opções.`}` 
      : '';

    return `${pdfSummary} ${extractionSummary}.${otherSummary}`;
  };

  // Handle submit simulation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSave || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitProgress(20);

    const interval = setInterval(() => {
      setSubmitProgress(prev => {
        if (prev >= 85) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 250);

    setTimeout(() => {
      clearInterval(interval);
      setSubmitProgress(100);
      setSubmitSuccess(true);
      setTimeout(() => {
        navigate('/esteiras');
      }, 1500);
    }, 1200);
  };

  return (
    <div className="min-h-screen py-4 px-2 sm:px-4 max-w-5xl mx-auto space-y-6">
      {/* Top Navigation Header */}
      <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
        <button 
          type="button"
          onClick={() => navigate('/esteiras')}
          className="flex items-center justify-center w-9 h-9 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-950/40 transition-colors shadow-2xs cursor-pointer"
          title="Voltar para esteiras de processamento"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
            Novo Documento
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Faça upload de novos documentos para análise
          </p>
        </div>
      </div>

      {/* Main Upload Box Card */}
      <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-lg shadow-xs overflow-hidden">
        {/* Card Header */}
        <div className="px-6 py-3.5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/20">
          <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">
            Preparar envio
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-7">
          {/* SECTION 1: ADICIONAR ARQUIVOS */}
          <section className="space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Adicionar arquivos
              </h3>
              {filesList.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsClearModalOpen(true)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 hover:underline cursor-pointer transition-colors"
                >
                  Remover todos
                </button>
              )}
            </div>

            {/* Dropzone Area */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                if (e.dataTransfer.files) {
                  handleFilesAdded(e.dataTransfer.files);
                }
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-7 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2.5 ${
                isDragOver 
                  ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-900/30' 
                  : 'border-blue-200 dark:border-blue-900/40 hover:border-blue-400 bg-blue-50/20 dark:bg-blue-950/10'
              }`}
            >
              <div className="w-11 h-11 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                Arraste seus arquivos aqui ou selecione no dispositivo.
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="px-3.5 py-1.5 border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded text-xs font-semibold transition-colors cursor-pointer"
              >
                Selecionar arquivos
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) {
                    handleFilesAdded(e.target.files);
                    e.target.value = '';
                  }
                }}
              />
            </div>

            {/* Formatos Aceitos */}
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-semibold text-gray-700 dark:text-gray-300 text-xs">Formatos aceitos:</span>
                {ACCEPTED_FORMAT_LEGEND.map(fmt => (
                  <span 
                    key={fmt}
                    className="px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[11px] font-mono font-medium text-gray-600 dark:text-gray-400"
                  >
                    {fmt}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 pt-1">
                As opções de lote, mesclagem e extração são exclusivas para PDFs.
              </p>
            </div>

            {/* Lista de Arquivos Selecionados */}
            {filesList.length > 0 && (
              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
                  Arquivos selecionados
                </label>
                <ul className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-surface-dark max-h-64 overflow-y-auto">
                  {filesList.map((item) => (
                    <li 
                      key={item.id}
                      className={`flex items-center justify-between px-3 py-2.5 text-xs transition-colors ${
                        !item.accepted 
                          ? 'bg-red-50/70 dark:bg-red-950/20 border-l-4 border-l-red-500' 
                          : 'hover:bg-gray-50/80 dark:hover:bg-gray-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1 pr-3">
                        <span className={`w-11 py-1 text-center rounded text-[11px] font-bold tracking-tight shrink-0 ${
                          item.isPdf 
                            ? 'bg-[#155dfc] text-white' 
                            : item.extension === 'DOCX'
                              ? 'border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
                              : 'border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}>
                          {item.extension}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900 dark:text-gray-100 truncate text-xs">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                            {formatSize(item.size)} · {!item.accepted ? (
                              <span className="text-red-600 dark:text-red-400 font-semibold">Não será enviado</span>
                            ) : (
                              <span className="text-gray-600 dark:text-gray-300">Pronto para enviar</span>
                            )}
                          </p>
                          {!item.accepted && item.error && (
                            <p className="text-[11px] text-red-600 dark:text-red-400 mt-0.5">
                              {item.error}
                            </p>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFile(item.id)}
                        className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 p-1 rounded transition-colors cursor-pointer"
                        title={`Remover ${item.name}`}
                        aria-label={`Remover ${item.name}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Status Bar */}
                <div className="px-3 py-2 rounded border border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-800/40 text-xs text-gray-600 dark:text-gray-300 flex items-center justify-between">
                  <span>
                    Prontos para enviar: <strong className="text-gray-900 dark:text-white">{validFiles.length}</strong> · PDFs: <strong className="text-gray-900 dark:text-white">{pdfFiles.length}</strong> · Outros formatos: <strong className="text-gray-900 dark:text-white">{otherFiles.length}</strong>
                  </span>
                  {processingNotice && (
                    <span className="text-amber-700 dark:text-amber-400 font-medium text-[11px]">
                      {processingNotice}
                    </span>
                  )}
                  {hasRejectedFiles && (
                    <span className="text-red-600 dark:text-red-400 font-semibold flex items-center gap-1 text-[11px]">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Remova os arquivos com erro para enviar os demais.
                    </span>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* SECTION 2: OPÇÕES PARA PDFS (Visible when PDFs exist) */}
          {pdfFiles.length > 0 ? (
            <section className="p-4 border border-blue-200 dark:border-blue-900/60 rounded-lg bg-blue-50/20 dark:bg-blue-950/20 space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  Opções para PDFs
                </h3>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#155dfc] text-white">
                  {pdfFiles.length} {pdfFiles.length === 1 ? 'PDF' : 'PDFs'}
                </span>
              </div>

              <div className="text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
                <p>
                  Estas configurações serão aplicadas somente {pdfFiles.length === 1 ? 'ao PDF selecionado.' : `aos ${pdfFiles.length} PDFs.`}
                </p>
                {otherFiles.length > 0 && (
                  <p>
                    {otherFiles.length === 1 
                      ? 'O outro arquivo será enviado sem estas opções.' 
                      : `Os outros ${otherFiles.length} arquivos serão enviados sem estas opções.`}
                  </p>
                )}
              </div>

              {/* Organização dos PDFs (Radio Cards) */}
              <fieldset className="space-y-2">
                <legend className="text-xs font-bold text-gray-900 dark:text-gray-100">
                  Organização dos PDFs
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Opção 1: Manter separados */}
                  <label 
                    className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-start gap-2.5 ${
                      selectedOrganization === 'separate' 
                        ? 'border-blue-600 bg-white dark:bg-surface-dark shadow-xs ring-1 ring-blue-600' 
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="pdf-organization" 
                      value="separate"
                      checked={selectedOrganization === 'separate'}
                      onChange={() => setSelectedOrganization('separate')}
                      className="mt-0.5 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <div>
                      <strong className="text-xs font-semibold text-gray-900 dark:text-gray-100 block">
                        Manter separados
                      </strong>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400 block mt-1">
                        Envia cada PDF como um documento independente.
                      </span>
                    </div>
                  </label>

                  {/* Opção 2: PDFs em lote */}
                  <label 
                    className={`p-3.5 rounded-lg border transition-all flex items-start gap-2.5 ${
                      pdfFiles.length < 2 
                        ? 'opacity-50 cursor-not-allowed border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-background-dark/30' 
                        : selectedOrganization === 'batch'
                          ? 'border-blue-600 bg-white dark:bg-surface-dark shadow-xs ring-1 ring-blue-600 cursor-pointer'
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="pdf-organization" 
                      value="batch"
                      disabled={pdfFiles.length < 2}
                      checked={selectedOrganization === 'batch'}
                      onChange={() => setSelectedOrganization('batch')}
                      className="mt-0.5 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <div>
                      <strong className="text-xs font-semibold text-gray-900 dark:text-gray-100 block">
                        PDFs em lote
                      </strong>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400 block mt-1">
                        Envia somente os PDFs deste envio em um lote.
                      </span>
                      {pdfFiles.length < 2 && (
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium block mt-1">
                          Adicione pelo menos 2 PDFs.
                        </span>
                      )}
                    </div>
                  </label>

                  {/* Opção 3: Mesclar PDFs */}
                  <label 
                    className={`p-3.5 rounded-lg border transition-all flex items-start gap-2.5 ${
                      pdfFiles.length < 2 
                        ? 'opacity-50 cursor-not-allowed border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-background-dark/30' 
                        : selectedOrganization === 'merge'
                          ? 'border-blue-600 bg-white dark:bg-surface-dark shadow-xs ring-1 ring-blue-600 cursor-pointer'
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="pdf-organization" 
                      value="merge"
                      disabled={pdfFiles.length < 2}
                      checked={selectedOrganization === 'merge'}
                      onChange={() => setSelectedOrganization('merge')}
                      className="mt-0.5 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <div>
                      <strong className="text-xs font-semibold text-gray-900 dark:text-gray-100 block">
                        Mesclar PDFs
                      </strong>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400 block mt-1">
                        Combina os PDFs selecionados em um único PDF.
                      </span>
                      {pdfFiles.length < 2 && (
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium block mt-1">
                          Adicione pelo menos 2 PDFs.
                        </span>
                      )}
                    </div>
                  </label>
                </div>

                {selectedOrganization === 'merge' && (
                  <p className="text-[11px] text-blue-700 dark:text-blue-300 mt-2 flex items-center gap-1.5 bg-blue-100/60 dark:bg-blue-900/30 p-2 rounded">
                    <Info className="w-3.5 h-3.5 shrink-0 text-blue-600 dark:text-blue-400" />
                    <span>Os PDFs serão mesclados na ordem em que aparecem na lista. Outros formatos não entram na mesclagem.</span>
                  </p>
                )}
              </fieldset>

              {/* Extração de Texto dos PDFs (Dropdown customizado como no original) */}
              <div className="space-y-1.5 pt-2" ref={extractionDropdownRef}>
                <label className="text-xs font-bold text-gray-900 dark:text-gray-100 block">
                  Extração de texto dos PDFs
                </label>
                
                <div className="relative max-w-lg">
                  <button
                    type="button"
                    onClick={() => setIsExtractionOpen(!isExtractionOpen)}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-surface-dark text-xs text-gray-900 dark:text-gray-100 hover:border-blue-500 transition-colors cursor-pointer text-left shadow-2xs"
                    aria-expanded={isExtractionOpen}
                  >
                    <div>
                      <strong className="block font-semibold text-gray-900 dark:text-gray-100">
                        {currentExtractionOption.label}
                      </strong>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400 block">
                        {currentExtractionOption.tooltip}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isExtractionOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Options */}
                  {isExtractionOpen && (
                    <div className="absolute left-0 right-0 top-full mt-1 z-30 p-1.5 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg space-y-1 animate-in fade-in zoom-in-95 duration-100">
                      {EXTRACTION_OPTIONS.map((opt) => {
                        const isSelected = selectedPdfExtraction === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              setSelectedPdfExtraction(opt.id as 'default' | 'force' | 'fallback');
                              setIsExtractionOpen(false);
                            }}
                            className={`w-full flex items-center justify-between p-2.5 rounded text-left transition-colors cursor-pointer ${
                              isSelected 
                                ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold' 
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200'
                            }`}
                          >
                            <div className="pr-2">
                              <p className="text-xs font-semibold">
                                {opt.label}
                              </p>
                              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-normal">
                                {opt.tooltip}
                              </p>
                            </div>
                            {isSelected && (
                              <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </section>
          ) : validFiles.length > 0 ? (
            <div className="p-3 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800/20 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <Info className="w-4 h-4 text-gray-400 shrink-0" />
              <span>Nenhum PDF selecionado. As opções de PDF não se aplicam a estes arquivos.</span>
            </div>
          ) : null}

          {/* SECTION 3: DESCRIÇÃO / OBSERVAÇÕES */}
          <div className="space-y-1">
            <label htmlFor="descId" className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Observações do documento:
            </label>
            <textarea
              id="descId"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Adicione observações para análise do documento..."
              className={`w-full px-3.5 py-2 text-xs rounded-md border bg-white dark:bg-background-dark focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                description.length > 250 
                  ? 'border-red-500 text-red-900 dark:text-red-200' 
                  : 'border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
              }`}
            />
            <div className="flex justify-end">
              <span className={`text-[11px] ${
                description.length > 250 
                  ? 'text-red-600 dark:text-red-400 font-semibold' 
                  : 'text-gray-400'
              }`}>
                {250 - description.length} {250 - description.length === 1 ? 'caractere' : 'caracteres'}
              </span>
            </div>
          </div>

          {/* SECTION 4: ASSOCIAR A ESTEIRA DE PROCESSAMENTO */}
          <div className={`p-4 border rounded-lg space-y-3.5 transition-colors ${
            selectedWorkflowIds.length === 0 
              ? 'border-red-400 dark:border-red-700 bg-red-50/20 dark:bg-red-950/10' 
              : 'border-gray-300 dark:border-gray-700 bg-[#f8f9fa] dark:bg-gray-800/30'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <label className="text-xs font-bold text-gray-900 dark:text-gray-100">
                  Associar a Esteira de Processamento
                </label>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                {selectedWorkflowIds.length} {selectedWorkflowIds.length === 1 ? 'selecionada' : 'selecionadas'}
              </span>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Selecione pelo menos uma esteira de processamento para associar ao documento.
            </p>

            {selectedWorkflowIds.length === 0 && (
              <p className="text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
                <span className="text-red-600 font-bold">*</span>
                <span>Este campo é obrigatório</span>
              </p>
            )}

            {/* Chips de Esteiras Selecionadas */}
            {selectedWorkflowsList.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
                  Lista de seleção:
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedWorkflowsList.map(workflow => (
                    <div 
                      key={workflow.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#155dfc] text-white rounded-full text-xs font-medium shadow-2xs"
                    >
                      <Building2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{workflow.name}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWorkflow(String(workflow.id));
                        }}
                        className="ml-1 text-white/80 hover:text-white rounded-full p-0.5 transition-colors cursor-pointer"
                        title="Remover esta esteira da seleção"
                        aria-label="Remover esta esteira da seleção"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Campo de Busca */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={workflowSearch}
                onChange={(e) => setWorkflowSearch(e.target.value)}
                placeholder="Buscar esteira de processamento..."
                className="w-full pl-9 pr-8 py-1.5 text-xs border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-background-dark text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {workflowSearch && (
                <button
                  type="button"
                  onClick={() => setWorkflowSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Ações Rápidas de Seleção */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={selectAllWorkflows}
                className="flex items-center gap-1 px-2.5 py-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-surface-dark hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 rounded text-xs font-medium transition-colors cursor-pointer"
              >
                <Check className="w-3 h-3 text-blue-600" />
                <span>Selecionar todos</span>
              </button>
              <button
                type="button"
                onClick={clearWorkflowSelection}
                className="flex items-center gap-1 px-2.5 py-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-surface-dark hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 rounded text-xs font-medium transition-colors cursor-pointer"
              >
                <X className="w-3 h-3 text-gray-400" />
                <span>Limpar seleção</span>
              </button>
            </div>

            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              A esteira de processamento não apareceu na lista? É porque seus times não tem uma esteira associada a eles.
            </p>

            {/* Lista Scrollável de Esteiras com Checkbox */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden max-h-48 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-background-dark">
              {filteredWorkflows.length > 0 ? (
                filteredWorkflows.map(workflow => {
                  const isSelected = selectedWorkflowIds.includes(String(workflow.id));
                  return (
                    <label
                      key={workflow.id}
                      className={`px-3 py-2 text-xs flex items-center justify-between cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-blue-50/60 dark:bg-blue-900/20' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleWorkflow(String(workflow.id))}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900 dark:text-gray-100 text-xs">
                            {workflow.name}
                          </p>
                          {workflow.description && (
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate mt-0.5">
                              {workflow.description}
                            </p>
                          )}
                        </div>
                      </div>
                      {workflow.department && (
                        <span className="text-[11px] text-gray-400 font-medium shrink-0 ml-2">
                          {workflow.department}
                        </span>
                      )}
                    </label>
                  );
                })
              ) : (
                <div className="p-4 text-center text-xs text-gray-400">
                  Nenhuma esteira de processamento encontrada para "{workflowSearch}".
                </div>
              )}
            </div>
          </div>

          {/* SECTION 5: FOOTER ACTIONS */}
          <div className="pt-5 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <strong className="text-xs font-bold text-gray-900 dark:text-gray-100 block">
                Resumo do envio
              </strong>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {getUploadSummaryText()}
              </p>
              {hasRejectedFiles && (
                <p className="text-xs text-red-600 dark:text-red-400 font-semibold mt-1">
                  Remova os arquivos com erro para enviar os demais.
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => navigate('/esteiras')}
                className="px-4 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!canSave || isSubmitting}
                className={`px-4 py-2 text-xs font-semibold rounded transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  !canSave || isSubmitting
                    ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                    : 'bg-[#155dfc] hover:bg-blue-700 text-white shadow-2xs'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Enviando ({submitProgress}%)...</span>
                  </>
                ) : (
                  <span>
                    Enviar {validFiles.length > 0 ? `${validFiles.length} ${validFiles.length === 1 ? 'arquivo' : 'arquivos'}` : 'arquivos'}
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* CONFIRM MODAL: REMOVER TODOS OS ARQUIVOS */}
      {isClearModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-lg max-w-md w-full p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
                <Trash2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-gray-900 dark:text-gray-100">
                Remover todos os arquivos
              </h4>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Essa ação removerá todos os arquivos selecionados para upload. Deseja continuar?
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsClearModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={removeAllFiles}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded transition-colors shadow-sm cursor-pointer"
              >
                Confirmar remoção
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL / TOAST NOTIFICATION */}
      {submitSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark border border-emerald-300 dark:border-emerald-700/60 rounded-lg max-w-sm w-full p-6 shadow-2xl text-center space-y-3 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-gray-900 dark:text-white">
              Documentos enviados!
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Seus documentos foram vinculados à esteira com sucesso e já estão na fila de processamento.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
