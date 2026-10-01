import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, Cpu, Scan, Key, Save, Copy, Plus, X, 
  Trash2, Package, Upload, Download, AlertCircle, RotateCcw, 
  Users, GitMerge, CheckCircle2, ArrowLeft, Search, Check, Info,
  ChevronDown, FileCode, Loader2
} from 'lucide-react';

interface KeyToken {
  id: string;
  name: string;
  value: string;
}

interface MetadataPackage {
  id: string; // Origin_UUID
  name: string;
  slug: string;
  version: string;
  lastUpdated: string;
  pipelineId?: string;
  pipelineName?: string;
  originTeams?: string[]; // Teams associated when generated in origin
  assignedDestinationTeams?: string[]; // Teams associated in destination tenant
  selectedTools?: string[];
  backup?: MetadataPackage;
}

interface PipelineTool {
  id: string;
  name: string;
  type: string;
  details: string;
}

interface PipelineOption {
  id: string;
  name: string;
  description: string;
  originTeams: string[];
  tools: PipelineTool[];
}

const availablePipelines: PipelineOption[] = [
  {
    id: 'pipe-1',
    name: 'Workflow Aprovação de Notas Fiscais',
    description: 'Esteira de validação OCR, conformidade fiscal e alçadas de aprovação financeira.',
    originTeams: ['Equipe Financeiro', 'Equipe Operações'],
    tools: [
      { id: 'tool-1', name: 'Agente Analista Fiscal (GPT-4 / Gemini)', type: 'Agente IA', details: 'Taxonomia de impostos federais e municipais' },
      { id: 'tool-2', name: 'Agente Resumo Contábil', type: 'Agente IA', details: 'Geração automática de relatórios DRE' },
      { id: 'tool-3', name: 'Conector ERP Sankhya (REST)', type: 'Conector', details: 'Autenticação OAuth2 e faturamento' },
      { id: 'tool-4', name: 'Conector Salesforce (API)', type: 'Conector', details: 'Sincronização de contas e clientes' },
      { id: 'tool-5', name: 'Template API - Busca CEP e IBGE', type: 'Template API', details: 'Consulta ViaCEP e BrasilAPI' },
      { id: 'tool-6', name: 'Questionário - Checklist de Conformidade', type: 'Questionário', details: '8 campos de checagem obrigatória' },
      { id: 'tool-17', name: 'Agente Extrator de Impostos Retidos', type: 'Agente IA', details: 'Cálculo de IRRF, PIS, COFINS e CSLL' },
      { id: 'tool-18', name: 'Conector SEFAZ Consulta NF-e', type: 'Conector', details: 'Validação de chave de acesso XML' },
      { id: 'tool-19', name: 'Conector Google Drive - Arquivamento', type: 'Conector', details: 'Backup de notas em nuvem' },
      { id: 'tool-20', name: 'Template API - Validação Sintegra', type: 'Template API', details: 'Checagem cadastral estadual' },
      { id: 'tool-21', name: 'Agente Auditor de Divergências', type: 'Agente IA', details: 'Comparação de valores previstos x realizados' },
      { id: 'tool-22', name: 'Questionário - Justificativa de Exceção', type: 'Questionário', details: 'Aprovação para boletos sem pedido' },
    ]
  },
  {
    id: 'pipe-2',
    name: 'Extração de Dados Cadastrais',
    description: 'Automação para captura e enriquecimento de dados de CNPJ, Receita Federal e dados bancários.',
    originTeams: ['Equipe Financeiro'],
    tools: [
      { id: 'tool-7', name: 'Agente Validador Cadastral', type: 'Agente IA', details: 'Consistência de dados cadastrais e sócios' },
      { id: 'tool-8', name: 'Conector ERP Sankhya (REST)', type: 'Conector', details: 'Integração de fornecedores' },
      { id: 'tool-9', name: 'Template API - Busca CEP e IBGE', type: 'Template API', details: 'Validação de endereços' },
      { id: 'tool-10', name: 'Questionário - Onboarding Fornecedor', type: 'Questionário', details: 'Coleta de dados bancários' },
      { id: 'tool-23', name: 'Agente Consulta CNPJ Receita Federal', type: 'Agente IA', details: 'Situação cadastral ativa' },
      { id: 'tool-24', name: 'Conector Serasa Experian', type: 'Conector', details: 'Análise de crédito e restrições' },
      { id: 'tool-25', name: 'Conector Certidão Negativa de Débitos (CND)', type: 'Conector', details: 'Certidão conjunta da RFB e PGFN' },
      { id: 'tool-26', name: 'Template API - Consulta Simples Nacional', type: 'Template API', details: 'Verificação de enquadramento tributário' },
      { id: 'tool-27', name: 'Agente Score de Confiabilidade', type: 'Agente IA', details: 'Classificação de risco de fornecedores' },
      { id: 'tool-28', name: 'Questionário - Dados Bancários e Chave Pix', type: 'Questionário', details: 'Confirmação de titularidade bancária' },
    ]
  },
  {
    id: 'pipe-3',
    name: 'Revisão Automática de Contratos SLA',
    description: 'Análise de cláusulas críticas, detecção de riscos em minutas contratuais e fluxos de assinatura.',
    originTeams: ['Equipe Jurídico', 'Equipe Operações'],
    tools: [
      { id: 'tool-11', name: 'Agente Extrator de Cláusulas de Rescisão', type: 'Agente IA', details: 'Detecção de multas e prazos contratuais' },
      { id: 'tool-12', name: 'Conector DocuSign Signature', type: 'Conector', details: 'Envio para assinatura digital' },
      { id: 'tool-13', name: 'Questionário - Parecer Jurídico Padrão', type: 'Questionário', details: 'Checklist de riscos contratuais' },
      { id: 'tool-29', name: 'Agente Auditor de Prazos e Vigência', type: 'Agente IA', details: 'Alertas de renovação automática e SLA' },
      { id: 'tool-30', name: 'Conector Adobe Sign', type: 'Conector', details: 'Coleta de assinaturas digitais e carimbo de tempo' },
      { id: 'tool-31', name: 'Conector Sistema Jurídico Projuris', type: 'Conector', details: 'Sincronização de minutas e pastas de processos' },
      { id: 'tool-32', name: 'Template API - Consulta Processos CNJ', type: 'Template API', details: 'Busca de litigiosidade por CNPJ/CPF' },
      { id: 'tool-33', name: 'Agente Matriz de Riscos Contratuais', type: 'Agente IA', details: 'Avaliação de exposição de responsabilidade civil' },
      { id: 'tool-34', name: 'Questionário - Alçadas de Assinatura', type: 'Questionário', details: 'Validação de procurações societárias' },
      { id: 'tool-35', name: 'Conector Arquivamento SharePoint', type: 'Conector', details: 'Repositório de contratos homologados' },
    ]
  },
  {
    id: 'pipe-4',
    name: 'Triagem e Onboarding de Colaboradores',
    description: 'Coleta de documentos de admissão, triagem de currículos e questionários de compliance.',
    originTeams: ['Equipe Operações'],
    tools: [
      { id: 'tool-14', name: 'Agente Analista de Perfis Comportamentais', type: 'Agente IA', details: 'Score de aderência cultural' },
      { id: 'tool-15', name: 'Conector Folha de Pagamento Senior', type: 'Conector', details: 'Cadastro de colaboradores' },
      { id: 'tool-16', name: 'Questionário - Dados Médicos e Benefícios', type: 'Questionário', details: 'Formulário de admissão' },
      { id: 'tool-36', name: 'Agente Validador de Documentos de Admissão', type: 'Agente IA', details: 'Checagem de RG, CPF, CTPS e CNH' },
      { id: 'tool-37', name: 'Conector Gupy Recrutamento', type: 'Conector', details: 'Importação automática de candidatos aprovados' },
      { id: 'tool-38', name: 'Conector Flash Benefícios', type: 'Conector', details: 'Emissão de cartões de benefícios flexíveis' },
      { id: 'tool-39', name: 'Template API - Qualificação Cadastral eSocial', type: 'Template API', details: 'Validação de PIS e NIS' },
      { id: 'tool-40', name: 'Agente Resumo Curricular Inteligente', type: 'Agente IA', details: 'Síntese de experiências e competências' },
      { id: 'tool-41', name: 'Questionário - Termo de Sigilo e LGPD', type: 'Questionário', details: 'Assinatura de termos de confidencialidade' },
      { id: 'tool-42', name: 'Conector Assinatura de Contrato Clicksign', type: 'Conector', details: 'Formalização de contrato de trabalho' },
    ]
  }
];

// Available teams in destination tenant for mapping
const destinationTenantTeams = [
  { id: 'dest-1', name: 'Equipe Financeiro', department: 'Controladoria & Finanças' },
  { id: 'dest-2', name: 'Equipe Operações', department: 'Operações e Monitoramento' },
  { id: 'dest-3', name: 'Equipe Jurídico', department: 'Compliance & Legal' },
  { id: 'dest-4', name: 'Equipe Fiscal e Tributária', department: 'Tax & Compliance' },
  { id: 'dest-5', name: 'Equipe Controladoria', department: 'Auditoria & Contabilidade' },
  { id: 'dest-6', name: 'Equipe Recursos Humanos', department: 'Gente & Gestão' },
  { id: 'dest-7', name: 'Equipe Auditoria Interna', department: 'Governança & Risco' },
  { id: 'dest-8', name: 'Equipe Suporte e TI', department: 'Tecnologia da Informação' },
];

const initialPackages: MetadataPackage[] = [
  { 
    id: 'uuid-pkg-1', 
    name: 'Pacote Financeiro Core', 
    slug: 'pkg-financeiro-core', 
    version: '1.0.0', 
    lastUpdated: '10/07/2026',
    pipelineId: 'pipe-1',
    pipelineName: 'Workflow Aprovação de Notas Fiscais',
    originTeams: ['Equipe Financeiro', 'Equipe Operações'],
    assignedDestinationTeams: ['Equipe Financeiro'],
    selectedTools: ['Agente Analista Fiscal (GPT-4 / Gemini)', 'Agente Resumo Contábil', 'Conector ERP Sankhya (REST)', 'Template API - Busca CEP e IBGE']
  },
  { 
    id: 'uuid-pkg-2', 
    name: 'Automação RH', 
    slug: 'pkg-automacao-rh', 
    version: '1.0.0', 
    lastUpdated: '15/07/2026',
    pipelineId: 'pipe-4',
    pipelineName: 'Triagem e Onboarding de Colaboradores',
    originTeams: ['Equipe Operações'],
    assignedDestinationTeams: ['Equipe Recursos Humanos'],
    selectedTools: ['Agente Analista de Perfis Comportamentais', 'Conector Folha de Pagamento Senior']
  },
  { 
    id: 'uuid-pkg-3', 
    name: 'Processamento Jurídico', 
    slug: 'pkg-processamento-juridico', 
    version: '1.0.0', 
    lastUpdated: '01/08/2026',
    pipelineId: 'pipe-3',
    pipelineName: 'Revisão Automática de Contratos SLA',
    originTeams: ['Equipe Jurídico', 'Equipe Operações'],
    assignedDestinationTeams: ['Equipe Jurídico'],
    selectedTools: ['Agente Extrator de Cláusulas de Rescisão', 'Conector DocuSign Signature']
  },
];

const initialKeys: KeyToken[] = [
  { id: '1', name: 'keyname a', value: 'wkjl371xsFfqRBhdNEqrCCKv2tbBUv5s1SAikGIfjBk=d' },
  { id: '2', name: 'keyname b', value: 'tkkjl371xsFfqRBhdNEqrCCKv2tbBUv5s1SAikGIfjBk=de' },
  { id: '3', name: 'keyname c', value: 'kysjl371xsFfqRBhdNEqrCCKv2tbBUv5s1SAikGIfjBk=y' },
  { id: '4', name: 'keyname d', value: 'abkjl371xsFfqRBhdNEqrCCKv2tbBUv5s1SAikGIfjBk=h' },
  { id: '5', name: 'keyname e', value: 'ZZkjl371xsFfqRBhdNEqrCCKv2tbBUv5s1SAikGIfjBk=y' },
  { id: '6', name: 'keyname f', value: 'YTkjl371xsFfqRBhdNEqrCCKv2tbBUv5s1SAikGIfjBk=l' },
  { id: '7', name: 'keyname g', value: 'wuggjl371xsFfqRBhdNEqrCCKv2tbBUv5s1SAikGIfjBk=zy' },
];

interface SettingsProps {
  initialTab?: string;
  initialView?: 'list' | 'create';
}

export default function Settings({ initialTab = 'geral', initialView = 'list' }: SettingsProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [packageView, setPackageView] = useState<'list' | 'create'>(initialView);
  
  // Keys State
  const [keys, setKeys] = useState<KeyToken[]>(initialKeys);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');

  // Packages State
  const [packages, setPackages] = useState<MetadataPackage[]>(initialPackages);
  
  // Create Package State (Centered on 1 Pipeline + Selected Tools)
  const [newPackageName, setNewPackageName] = useState('Pacote Aprovação de Notas Fiscais');
  const [selectedPipelineId, setSelectedPipelineId] = useState<string>('pipe-1');
  const [selectedToolIds, setSelectedToolIds] = useState<Set<string>>(
    new Set(availablePipelines[0].tools.map(t => t.id))
  );
  const [toolSearchQuery, setToolSearchQuery] = useState('');
  const [pipelineSearchQuery, setPipelineSearchQuery] = useState('');
  const [isPipelineDropdownOpen, setIsPipelineDropdownOpen] = useState(false);

  // Package Modals / States for actions
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importStep, setImportStep] = useState<'reading_file' | 'configure'>('reading_file');
  const [importProgress, setImportProgress] = useState(0);
  const [importFileName, setImportFileName] = useState('pacote-aprovacao-notas-fiscais.json');
  const [importFileSize, setImportFileSize] = useState('38.4 KB');
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const [isPackageDeleteModalOpen, setIsPackageDeleteModalOpen] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState<MetadataPackage | null>(null);
  const [packageToImport, setPackageToImport] = useState<MetadataPackage | null>(null);
  
  // Destination Teams Mapping & Search in Import Modal
  const [destinationTeamSearch, setDestinationTeamSearch] = useState('');
  const [selectedDestinationTeams, setSelectedDestinationTeams] = useState<string[]>(['Equipe Financeiro']);

  const currentSelectedPipeline = availablePipelines.find(p => p.id === selectedPipelineId) || availablePipelines[0];

  const filteredPipelines = availablePipelines.filter(pipe =>
    pipe.name.toLowerCase().includes(pipelineSearchQuery.toLowerCase()) ||
    pipe.description.toLowerCase().includes(pipelineSearchQuery.toLowerCase()) ||
    pipe.originTeams.some(team => team.toLowerCase().includes(pipelineSearchQuery.toLowerCase()))
  );

  const filteredPipelineTools = currentSelectedPipeline.tools.filter(tool => 
    tool.name.toLowerCase().includes(toolSearchQuery.toLowerCase()) ||
    tool.type.toLowerCase().includes(toolSearchQuery.toLowerCase())
  );

  const handlePipelineSelect = (pipelineId: string) => {
    setSelectedPipelineId(pipelineId);
    setToolSearchQuery('');
    const pipe = availablePipelines.find(p => p.id === pipelineId);
    if (pipe) {
      setNewPackageName(`Pacote ${pipe.name}`);
      // By default select all tools of this pipeline, user can deselect
      setSelectedToolIds(new Set(pipe.tools.map(t => t.id)));
    }
  };

  const toggleToolSelection = (toolId: string) => {
    const newSelected = new Set(selectedToolIds);
    if (newSelected.has(toolId)) {
      newSelected.delete(toolId);
    } else {
      newSelected.add(toolId);
    }
    setSelectedToolIds(newSelected);
  };

  const selectAllTools = () => {
    if (toolSearchQuery.trim()) {
      const idsToAdd = filteredPipelineTools.map(t => t.id);
      setSelectedToolIds(new Set([...selectedToolIds, ...idsToAdd]));
    } else {
      setSelectedToolIds(new Set(currentSelectedPipeline.tools.map(t => t.id)));
    }
  };

  const deselectAllTools = () => {
    if (toolSearchQuery.trim()) {
      const filteredIds = new Set(filteredPipelineTools.map(t => t.id));
      setSelectedToolIds(new Set([...selectedToolIds].filter(id => !filteredIds.has(id))));
    } else {
      setSelectedToolIds(new Set());
    }
  };

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

  const handleSimulateImport = () => {
    // Open import modal with JSON file opening simulation first
    const packageSimulated: MetadataPackage = {
      id: 'uuid-pkg-1',
      name: 'Pacote Aprovação de Notas Fiscais',
      slug: 'pkg-aprovacao-notas-fiscais',
      version: '1.0.0',
      lastUpdated: new Date().toLocaleDateString('pt-BR'),
      pipelineId: 'pipe-1',
      pipelineName: 'Workflow Aprovação de Notas Fiscais',
      originTeams: ['Equipe Financeiro', 'Equipe Operações'],
      selectedTools: [
        'Agente Analista Fiscal (GPT-4 / Gemini)', 
        'Agente Resumo Contábil', 
        'Conector ERP Sankhya (REST)', 
        'Conector Salesforce (API)',
        'Template API - Busca CEP e IBGE', 
        'Questionário - Checklist de Conformidade'
      ]
    };

    setPackageToImport(packageSimulated);
    setSelectedDestinationTeams(['Equipe Financeiro']);
    setDestinationTeamSearch('');
    setImportFileName('pacote-aprovacao-notas-fiscais.json');
    setImportFileSize('38.4 KB');
    setImportStep('reading_file');
    setImportProgress(15);
    setIsImportModalOpen(true);

    // Simulate opening and parsing the JSON file
    let current = 15;
    const interval = setInterval(() => {
      current += 28;
      if (current >= 100) {
        setImportProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setImportStep('configure');
        }, 550);
      } else {
        setImportProgress(current);
      }
    }, 180);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImportFileName(file.name);
      setImportFileSize(`${(file.size / 1024).toFixed(1)} KB`);
      setImportStep('reading_file');
      setImportProgress(25);
      setIsImportModalOpen(true);

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          const pkg: MetadataPackage = {
            id: parsed.id || `uuid-pkg-${Date.now().toString(36)}`,
            name: parsed.name || file.name.replace(/\.json$/i, ''),
            slug: parsed.slug || 'pkg-' + Date.now(),
            version: '1.0.0',
            lastUpdated: new Date().toLocaleDateString('pt-BR'),
            pipelineId: parsed.pipeline?.id || 'pipe-1',
            pipelineName: parsed.pipeline?.name || 'Workflow Aprovação de Notas Fiscais',
            originTeams: parsed.originTeams || ['Equipe Financeiro', 'Equipe Operações'],
            selectedTools: parsed.selectedTools || ['Agente Analista Fiscal (GPT-4 / Gemini)', 'Conector ERP Sankhya (REST)']
          };
          setPackageToImport(pkg);
          setSelectedDestinationTeams(pkg.originTeams || ['Equipe Financeiro']);
        } catch {
          // fallback keeps simulated package
        }
        setImportProgress(100);
        setTimeout(() => {
          setImportStep('configure');
        }, 500);
      };
      reader.readAsText(file);
    }
  };

  const toggleDestinationTeam = (teamName: string) => {
    if (selectedDestinationTeams.includes(teamName)) {
      setSelectedDestinationTeams(selectedDestinationTeams.filter(t => t !== teamName));
    } else {
      setSelectedDestinationTeams([...selectedDestinationTeams, teamName]);
    }
  };

  const confirmImport = () => {
    if (packageToImport) {
      const updatedPackage: MetadataPackage = {
        ...packageToImport,
        assignedDestinationTeams: selectedDestinationTeams.length > 0 ? selectedDestinationTeams : ['Equipe Geral']
      };

      setPackages(packages.map(p => {
        if (p.id === packageToImport.id) {
          return updatedPackage;
        }
        return p;
      }));
    }
    setIsImportModalOpen(false);
    setPackageToImport(null);
  };

  const handleCreatePackage = () => {
    const pkgName = newPackageName.trim() || `Pacote ${currentSelectedPipeline.name}`;
    const pkgSlug = 'pkg-' + pkgName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    
    // Selected tools names
    const toolsSelectedNames = currentSelectedPipeline.tools
      .filter(t => selectedToolIds.has(t.id))
      .map(t => t.name);

    const newPkg: MetadataPackage = {
      id: `uuid-pkg-${Date.now().toString(36)}`,
      name: pkgName,
      slug: pkgSlug,
      version: '1.0.0',
      lastUpdated: new Date().toLocaleDateString('pt-BR'),
      pipelineId: currentSelectedPipeline.id,
      pipelineName: currentSelectedPipeline.name,
      originTeams: [...currentSelectedPipeline.originTeams],
      assignedDestinationTeams: [...currentSelectedPipeline.originTeams],
      selectedTools: toolsSelectedNames
    };

    setPackages([newPkg, ...packages]);
    setPackageView('list');
  };

  const handleExportPackage = (pkg: MetadataPackage) => {
    const manifest = {
      id: pkg.id,
      name: pkg.name,
      slug: pkg.slug,
      lastUpdated: pkg.lastUpdated,
      pipeline: {
        id: pkg.pipelineId,
        name: pkg.pipelineName,
      },
      originTeams: pkg.originTeams || ['Equipe Financeiro'],
      selectedTools: pkg.selectedTools || [],
      exportMode: 'pipeline_centric'
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(manifest, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${pkg.slug}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDeletePackage = () => {
    if (packageToDelete) {
      setPackages(packages.filter(p => p.id !== packageToDelete.id));
      setIsPackageDeleteModalOpen(false);
      setPackageToDelete(null);
    }
  };

  // Filter destination teams for the import modal search
  const filteredDestinationTeams = destinationTenantTeams.filter(t => 
    t.name.toLowerCase().includes(destinationTeamSearch.toLowerCase()) ||
    t.department.toLowerCase().includes(destinationTeamSearch.toLowerCase())
  );

  // FULL SCREEN: CRIAR PACOTE DE METADADOS (Baseado em 1 esteira e suas ferramentas selecionáveis - Sem campo de versão)
  if (activeTab === 'pacotes' && packageView === 'create') {
    return (
      <div className="flex flex-col gap-6 min-h-[calc(100vh-8rem)]">
        {/* Full Screen Top Navigation Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setPackageView('list')}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Voltar para Pacotes"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Voltar</span>
            </button>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Criar Pacote de Metadados</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Gere um pacote baseado em 1 esteira e selecione as ferramentas e dependências que deseja incluir
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPackageView('list')}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleCreatePackage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
            >
              Criar Pacote
            </button>
          </div>
        </div>

        {/* Full Screen Form Body */}
        <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl p-6 shadow-sm space-y-6">
          {/* Identificação: Nome do Pacote */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nome do Pacote
            </label>
            <input 
              type="text" 
              value={newPackageName}
              onChange={(e) => setNewPackageName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-background-dark text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Ex: Pacote Aprovação de Notas Fiscais" 
              autoFocus
            />
          </div>

          {/* Seleção de 1 Esteira Base */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-5">
            <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
              <GitMerge className="w-4 h-4 text-blue-600" />
              Selecione a Esteira Base do Pacote
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              O pacote será estruturado em torno desta esteira, encapsulando seu fluxo de execução e as ferramentas vinculadas a ela.
            </p>

            {/* Seletor com Busca para a Esteira Base */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsPipelineDropdownOpen(!isPipelineDropdownOpen)}
                className="w-full px-3.5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-background-dark text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center justify-between gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="truncate font-semibold text-gray-900 dark:text-gray-100">{currentSelectedPipeline.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 shrink-0">
                    {currentSelectedPipeline.tools.length} ferramentas
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform shrink-0 ${isPipelineDropdownOpen ? 'rotate-180 text-blue-600' : ''}`} />
              </button>

              {isPipelineDropdownOpen && (
                <>
                  {/* Backdrop for closing */}
                  <div 
                    className="fixed inset-0 z-20"
                    onClick={() => setIsPipelineDropdownOpen(false)}
                  />

                  {/* Dropdown Menu com Busca */}
                  <div className="absolute top-full left-0 right-0 mt-1.5 z-30 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                    {/* Campo de Busca de Esteiras */}
                    <div className="p-2.5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40">
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={pipelineSearchQuery}
                          onChange={(e) => setPipelineSearchQuery(e.target.value)}
                          placeholder="Buscar esteira por nome ou times de origem..."
                          className="w-full pl-9 pr-8 py-2 text-xs bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white placeholder:text-gray-400"
                          autoFocus
                        />
                        {pipelineSearchQuery && (
                          <button
                            type="button"
                            onClick={() => setPipelineSearchQuery('')}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-0.5"
                            title="Limpar busca"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Lista Rolável de Esteiras Filtradas */}
                    <div className="max-h-64 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800/60 p-1">
                      {filteredPipelines.map((pipe) => {
                        const isSelected = pipe.id === selectedPipelineId;
                        return (
                          <div
                            key={pipe.id}
                            onClick={() => {
                              handlePipelineSelect(pipe.id);
                              setIsPipelineDropdownOpen(false);
                              setPipelineSearchQuery('');
                            }}
                            className={`p-2.5 rounded-lg cursor-pointer transition-colors flex items-center justify-between gap-3 ${
                              isSelected 
                                ? 'bg-blue-50/80 dark:bg-blue-900/25 text-blue-900 dark:text-blue-100' 
                                : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-800 dark:text-gray-200'
                            }`}
                          >
                            <div className="min-w-0 flex-1 space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-xs text-gray-900 dark:text-gray-100">
                                  {pipe.name}
                                </span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-blue-100/70 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 shrink-0">
                                  {pipe.tools.length} ferramentas
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] text-gray-400 font-medium">Times de Origem:</span>
                                <div className="flex gap-1 flex-wrap">
                                  {pipe.originTeams.map(team => (
                                    <span key={team} className="text-[10px] text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-medium">
                                      {team}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {isSelected && (
                              <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                            )}
                          </div>
                        );
                      })}

                      {filteredPipelines.length === 0 && (
                        <div className="p-6 text-center text-xs text-gray-500 dark:text-gray-400">
                          Nenhuma esteira encontrada para "{pipelineSearchQuery}".
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Selected Pipeline Info Card with Origin Teams */}
            <div className="mt-3 p-3 bg-blue-50/60 dark:bg-blue-900/15 border border-blue-200/80 dark:border-blue-800/40 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-semibold text-blue-900 dark:text-blue-200 truncate">
                  {currentSelectedPipeline.name}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 shrink-0">
                  {currentSelectedPipeline.tools.length} ferramentas
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-gray-500 dark:text-gray-400 font-medium">Times de Origem:</span>
                <div className="flex gap-1.5">
                  {currentSelectedPipeline.originTeams.map((team) => (
                    <span 
                      key={team} 
                      className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 shadow-xs"
                    >
                      {team}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Seleção Granular de Ferramentas que tem naquela Esteira */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-5 space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Ferramentas e Dependências da Esteira
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Selecione quais agentes, conectores e questionários desta esteira farão parte do pacote.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                  {selectedToolIds.size} de {currentSelectedPipeline.tools.length} selecionadas
                </span>
                <button
                  type="button"
                  onClick={selectAllTools}
                  className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium px-2 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  Selecionar Todas
                </button>
                <span className="text-gray-300 dark:text-gray-600">|</span>
                <button
                  type="button"
                  onClick={deselectAllTools}
                  className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 font-medium px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Desmarcar Todas
                </button>
              </div>
            </div>

            {/* Campo de Busca de Ferramentas */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={toolSearchQuery}
                onChange={(e) => setToolSearchQuery(e.target.value)}
                placeholder="Buscar ferramenta ou tipo nesta esteira..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white placeholder:text-gray-400 shadow-2xs"
              />
              {toolSearchQuery && (
                <button
                  type="button"
                  onClick={() => setToolSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-0.5"
                  title="Limpar busca"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Tool Selection Cards Container - Scroll mostrando até 5 linhas */}
            <div className="max-h-[224px] overflow-y-auto pr-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {filteredPipelineTools.map((tool) => {
                  const isSelected = selectedToolIds.has(tool.id);
                  return (
                    <div
                      key={tool.id}
                      onClick={() => toggleToolSelection(tool.id)}
                      className={`px-3 py-2 rounded-lg border cursor-pointer transition-all flex items-center justify-between gap-2.5 ${
                        isSelected 
                          ? 'bg-blue-50/60 dark:bg-blue-900/20 border-blue-400 dark:border-blue-600 shadow-2xs' 
                          : 'bg-white dark:bg-background-dark/40 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <input 
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}} // handled by parent onClick
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                        />
                        <span className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {tool.name}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 shrink-0 border border-gray-200/60 dark:border-gray-700/60">
                        {tool.type}
                      </span>
                    </div>
                  );
                })}

                {filteredPipelineTools.length === 0 && (
                  <div className="col-span-1 md:col-span-2 py-8 text-center text-xs text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-800/30 rounded-lg border border-dashed border-gray-200 dark:border-gray-700">
                    Nenhuma ferramenta encontrada para "{toolSearchQuery}".
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-5 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={() => setPackageView('list')}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleCreatePackage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
            >
              Criar Pacote da Esteira
            </button>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT VIEW: SETTINGS TABS & MAIN TABLE
  return (
    <div className="flex flex-col gap-6 min-h-[calc(100vh-8rem)]">
      {/* Top Tabs */}
      <div className="w-full flex flex-col gap-2">
        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Configurações</h2>
        <nav className="flex items-center gap-2 border-b border-gray-200 dark:border-border-dark overflow-x-auto">
          <button
            onClick={() => { setActiveTab('geral'); setPackageView('list'); }}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors text-sm font-medium whitespace-nowrap ${
              activeTab === 'geral' 
              ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400' 
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-700'
            }`}
          >
            <SettingsIcon className="w-4 h-4" />
            Geral
          </button>
          <button
            onClick={() => { setActiveTab('modelos'); setPackageView('list'); }}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors text-sm font-medium whitespace-nowrap ${
              activeTab === 'modelos' 
              ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400' 
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-700'
            }`}
          >
            <Cpu className="w-4 h-4" />
            Modelos de IA
          </button>
          <button
            onClick={() => { setActiveTab('ocr'); setPackageView('list'); }}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors text-sm font-medium whitespace-nowrap ${
              activeTab === 'ocr' 
              ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400' 
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-700'
            }`}
          >
            <Scan className="w-4 h-4" />
            OCR
          </button>
          <button
            onClick={() => { setActiveTab('chaves'); setPackageView('list'); }}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors text-sm font-medium whitespace-nowrap ${
              activeTab === 'chaves' 
              ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400' 
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-700'
            }`}
          >
            <Key className="w-4 h-4" />
            Chaves
          </button>
          <button
            onClick={() => { setActiveTab('pacotes'); setPackageView('list'); }}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors text-sm font-medium whitespace-nowrap ${
              activeTab === 'pacotes' 
              ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400' 
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-700'
            }`}
          >
            <Package className="w-4 h-4" />
            Pacotes de Metadados
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
                {keys.map((keyItem) => (
                  <div 
                    key={keyItem.id} 
                    className="flex items-center px-4 py-3 group border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
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

        {/* PACOTES DE METADADOS */}
        {activeTab === 'pacotes' && (
          <div className="space-y-6 flex flex-col h-full">
            <div className="flex justify-between items-end border-b border-gray-200 dark:border-gray-800 pb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Pacotes de Metadados
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-2xl">
                  Gerencie pacotes estruturados em esteiras de processamento com dependências selecionáveis, mapeamento de times de origem e destino.
                </p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={handleSimulateImport}
                  className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
                >
                  <Upload className="w-4 h-4" />
                  Importar Pacote
                </button>
                <button 
                  onClick={() => setPackageView('create')}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Criar Pacote
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col overflow-hidden max-h-[600px]">
              {/* Table header - sem versão */}
              <div className="flex items-center px-4 py-4 border-b border-gray-200 dark:border-gray-700 font-medium text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800/50 text-sm">
                <div className="w-2/5 font-semibold">Nome do Pacote</div>
                <div className="w-1/4 font-semibold">Time(s) Associado(s)</div>
                <div className="w-1/5 font-semibold">Ferramentas</div>
                <div className="w-1/6 font-semibold text-right">Ações</div>
              </div>

              {/* Table body - sem versão */}
              <div className="flex-1 overflow-auto">
                {packages.map((pkg) => (
                  <div 
                    key={pkg.id} 
                    className="flex items-center px-4 py-4 group border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                  >
                    <div className="w-2/5">
                      <div className="font-medium text-gray-900 dark:text-gray-100">{pkg.name}</div>
                    </div>
                    
                    <div className="w-1/4">
                      <div className="flex flex-wrap gap-1">
                        {(pkg.assignedDestinationTeams || pkg.originTeams || ['Equipe Financeiro']).map(t => (
                          <span key={t} className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded font-medium border border-blue-200/60 dark:border-blue-800/40">
                            <Users className="w-3 h-3 text-blue-500" />
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="w-1/5 text-xs text-gray-600 dark:text-gray-400">
                      <span className="font-semibold text-gray-800 dark:text-gray-200 block">
                        {pkg.selectedTools ? `${pkg.selectedTools.length} ferramentas` : '4 ferramentas'}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        Atualizado em {pkg.lastUpdated}
                      </span>
                    </div>

                    <div className="w-1/6 flex justify-end gap-2">
                      <button 
                        onClick={() => handleExportPackage(pkg)}
                        className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
                        title="Exportar pacote (Manifest.json)"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => { setPackageToDelete(pkg); setIsPackageDeleteModalOpen(true); }}
                        className="text-gray-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" 
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {packages.length === 0 && (
                  <div className="p-12 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center">
                    <Package className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
                    <p className="font-medium text-gray-900 dark:text-gray-200">Nenhum pacote encontrado.</p>
                    <p className="text-sm mt-1">Crie um novo pacote de metadados para exportar sua esteira.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Key Modal */}
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

      {/* Delete Key Modal */}
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

      {/* Package Delete Confirmation Modal */}
      {isPackageDeleteModalOpen && packageToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark rounded-lg shadow-xl w-full max-w-md p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0 text-red-600 dark:text-red-400 mt-1">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
                  Remover Pacote
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Você está prestes a excluir o pacote "{packageToDelete.name}". 
                  Todo o conteúdo e dependências importadas serão removidas do sistema. Esta ação não poderá ser desfeita.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 w-full mt-2">
              <button
                onClick={() => { setIsPackageDeleteModalOpen(false); setPackageToDelete(null); }}
                className="py-2 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md font-medium text-sm transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeletePackage}
                className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium text-sm transition-colors"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input for real file selection */}
      <input 
        type="file" 
        ref={fileInputRef} 
        accept=".json,application/json" 
        onChange={handleFileChange} 
        className="hidden" 
      />

      {/* IMPORT MODAL: SIMULAÇÃO DE ABERTURA JSON SEGUIDO DO MODAL COM AS OPÇÕES */}
      {isImportModalOpen && packageToImport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-surface-dark rounded-xl shadow-2xl w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            {/* ETAPA 1: SIMULAÇÃO DE ABERTURA DO ARQUIVO JSON */}
            {importStep === 'reading_file' && (
              <>
                {/* Header Simulação */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-border-dark shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <FileCode className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">
                        Abrindo Arquivo do Pacote
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Lendo e validando estrutura do manifesto JSON
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setIsImportModalOpen(false); setPackageToImport(null); }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body Simulação */}
                <div className="p-6 space-y-5">
                  {/* Card do Arquivo */}
                  <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-800/60 bg-blue-50/50 dark:bg-blue-950/20 flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex flex-col items-center justify-center font-bold text-[10px] shadow-sm shrink-0">
                      <FileCode className="w-5 h-5 mb-0.5" />
                      <span>JSON</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                          {importFileName}
                        </span>
                        <span className="text-xs font-mono text-gray-500 dark:text-gray-400 shrink-0">
                          {importFileSize}
                        </span>
                      </div>
                      <p className="text-xs text-blue-700 dark:text-blue-300 mt-0.5">
                        Manifesto de metadados da esteira de processamento
                      </p>
                    </div>
                  </div>

                  {/* Barra de Progresso e Status da Validação */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                        {importProgress < 100 ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                            Lendo e validando estrutura do JSON...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            Arquivo JSON verificado com sucesso!
                          </>
                        )}
                      </span>
                      <span className="font-mono text-blue-600 dark:text-blue-400 font-semibold">
                        {importProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden border border-gray-200/50 dark:border-gray-700">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-200 ease-out"
                        style={{ width: `${importProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Prévia da Estrutura do Manifesto JSON Lido */}
                  <div className="bg-gray-900 rounded-lg p-3 text-[11px] font-mono text-gray-300 border border-gray-800 space-y-1 overflow-x-auto shadow-inner">
                    <div className="text-gray-500 flex items-center justify-between border-b border-gray-800 pb-1.5 mb-1.5">
                      <span>manifest_preview.json</span>
                      <span className="text-emerald-400 text-[10px]">json válido</span>
                    </div>
                    <p><span className="text-purple-400">"package_name"</span>: <span className="text-emerald-300">"{packageToImport.name}"</span>,</p>
                    <p><span className="text-purple-400">"pipeline"</span>: <span className="text-emerald-300">"{packageToImport.pipelineName}"</span>,</p>
                    <p><span className="text-purple-400">"origin_teams"</span>: [<span className="text-amber-300">{packageToImport.originTeams?.map(t => `"${t}"`).join(', ')}</span>],</p>
                    <p><span className="text-purple-400">"tools_count"</span>: <span className="text-cyan-300">{packageToImport.selectedTools?.length || 6}</span></p>
                  </div>
                </div>

                {/* Footer Simulação */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-border-dark shrink-0 bg-gray-50/50 dark:bg-gray-800/20">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium hover:underline flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Escolher outro arquivo .json
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => { setIsImportModalOpen(false); setPackageToImport(null); }}
                      className="py-1.5 px-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => setImportStep('configure')}
                      className="py-1.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Continuar para Opções</span>
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* ETAPA 2: MODAL COM AS OPÇÕES E MAPEAMENTO DE TIMES */}
            {importStep === 'configure' && (
              <>
                {/* Modal Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-border-dark shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Upload className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">
                      Importar Pacote de Metadados
                    </h3>
                  </div>
                  <button 
                    onClick={() => { setIsImportModalOpen(false); setPackageToImport(null); }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Scrollable Body */}
                <div className="p-6 overflow-y-auto space-y-5">
                  {/* Informações da Esteira e Times de Origem quando o pacote foi gerado */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-gray-50/50 dark:bg-gray-800/30 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">Esteira Empacotada:</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {packageToImport.pipelineName || 'Workflow Aprovação de Notas Fiscais'}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700/60">
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1.5">
                        Time(s) de Origem (quando o pacote foi gerado):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {(packageToImport.originTeams || ['Equipe Financeiro', 'Equipe Operações']).map(team => (
                          <span 
                            key={team}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-100/70 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60"
                          >
                            <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                            {team}
                          </span>
                        ))}
                      </div>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                        Estes times tinham permissão de acesso à esteira na origem deste pacote.
                      </p>
                    </div>
                  </div>

                  {/* Associação de Times com Busca */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        Associar a:
                      </label>
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        {selectedDestinationTeams.length} time(s) selecionado(s)
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Escolha quais times terão permissão de operação e acesso a esta esteira importada:
                    </p>

                    {/* Campo de Busca de Times */}
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={destinationTeamSearch}
                        onChange={(e) => setDestinationTeamSearch(e.target.value)}
                        placeholder="Buscar times..."
                        className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                      />
                      {destinationTeamSearch && (
                        <button
                          type="button"
                          onClick={() => setDestinationTeamSearch('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Lista com Seleção de Times do Destino */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden max-h-48 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
                      {filteredDestinationTeams.map((team) => {
                        const isSelected = selectedDestinationTeams.includes(team.name);

                        return (
                          <div
                            key={team.id}
                            onClick={() => toggleDestinationTeam(team.name)}
                            className={`flex items-center justify-between p-2.5 text-xs cursor-pointer transition-colors ${
                              isSelected 
                                ? 'bg-blue-50/70 dark:bg-blue-900/20 font-medium' 
                                : 'hover:bg-gray-50 dark:hover:bg-gray-800/40'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <input 
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {}} // handled by row click
                                className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                              />
                              <span className="font-semibold text-gray-900 dark:text-gray-100">
                                {team.name}
                              </span>
                            </div>
                          </div>
                        );
                      })}

                      {filteredDestinationTeams.length === 0 && (
                        <div className="p-4 text-center text-xs text-gray-400">
                          Nenhum time encontrado para "{destinationTeamSearch}".
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 dark:border-border-dark shrink-0 bg-gray-50/50 dark:bg-gray-800/20">
                  <button
                    type="button"
                    onClick={() => { setIsImportModalOpen(false); setPackageToImport(null); }}
                    className="py-2 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-medium text-xs transition-colors"
                  >
                    Cancelar Importação
                  </button>
                  <button
                    type="button"
                    onClick={confirmImport}
                    className="py-2 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-xs transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Confirmar e Associar ao(s) Time(s)</span>
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
