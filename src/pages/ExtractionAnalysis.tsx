import React, { useState } from 'react';
import { 
  ArrowLeft, History, LayoutPanelLeft, LayoutPanelRight, CheckCircle2, 
  XOctagon, XCircle, Filter, ShieldCheck, MessageCircle, ChevronLeft, ChevronRight, 
  FileText, PenLine, ChevronDown, SplitSquareHorizontal, CheckCircle, HelpCircle, Columns, Sidebar, Square, PanelRight, Link, X,
  Share2, Menu, Maximize2, MoreVertical, AlignRight, Download, Printer, RotateCw, Type, Focus, ZoomIn, ZoomOut, RotateCcw, Pencil, Search, CornerUpLeft, CornerUpRight
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function ExtractionAnalysis() {
  const [activeStep, setActiveStep] = useState(1);
  const [showFieldHistory, setShowFieldHistory] = useState<Record<string, boolean>>({});
  const [selectedVersion, setSelectedVersion] = useState("v3");
  const [showReprocessModal, setShowReprocessModal] = useState(false);
  const totalSteps = 6;
  
  const toggleHistory = (field: string) => {
    setShowFieldHistory(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const versionsData: Record<string, any> = {
    "v3": {
      nf: "NF-2023-7845", nfStatus: "Versão atual v3", nfColor: "blue",
      date: "10/03/2023", dateStatus: "Confirmado", dateColor: "green",
      cnpj: "98.705.432/0001-10", cnpjStatus: "Confirmado", cnpjColor: "green",
      razao: "Empresa ABC S.A.", razaoStatus: "Confirmado", razaoColor: "green",
      valor: "R$ 15.420,00", valorStatus: "Editado", valorColor: "orange"
    },
    "v2": {
      nf: "NF-2023-7840", nfStatus: "Versão v2", nfColor: "gray",
      date: "10/03/2023", dateStatus: "Confirmado", dateColor: "green",
      cnpj: "98.705.432/0001-10", cnpjStatus: "Atenção", cnpjColor: "red",
      razao: "Empresa ABC S.A.", razaoStatus: "Confirmado", razaoColor: "green",
      valor: "R$ 15.420,00", valorStatus: "Confirmado", valorColor: "green"
    },
    "v1": {
      nf: "NF-2023-78", nfStatus: "Versão v1", nfColor: "gray",
      date: "01/03/2023", dateStatus: "IA Extraiu", dateColor: "gray",
      cnpj: "98.705.432/0001", cnpjStatus: "IA Extraiu", cnpjColor: "gray",
      razao: "Empresa ABC", razaoStatus: "IA Extraiu", razaoColor: "gray",
      valor: "15.420,00", valorStatus: "IA Extraiu", valorColor: "gray"
    }
  };
  
  const currentData = versionsData[selectedVersion];

  const getBadgeColor = (color: string) => {
    switch(color) {
      case 'blue': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'green': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'red': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      case 'orange': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400';
    }
  };
  
  return (
    <div className="-m-8 h-[calc(100vh-64px)] flex flex-col bg-gray-50/50 dark:bg-background-dark overflow-hidden">
      {/* Top Header */}
      <header className="bg-white dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-4">
          <NavLink to="/esteiras" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Board de Processamento
          </NavLink>
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-2"></div>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white leading-tight mb-1">
              Análise de Documento
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-none">Revise e confirme os dados extraídos pela IA</p>
          </div>
          <button className="ml-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <History className="w-4 h-4" />
            Histórico de alterações
          </button>
        </div>

        <div className="flex items-center gap-4">
           {/* Layout views toggle */}
           <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden p-0.5 bg-gray-50 dark:bg-gray-800/50">
             <button className="p-1.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-sm">
                <Sidebar className="w-4 h-4 rotate-180" />
             </button>
             <button className="p-1.5 bg-blue-600 text-white shadow rounded-sm">
                <Columns className="w-4 h-4" />
             </button>
             <button className="p-1.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-sm">
                <Square className="w-4 h-4" />
             </button>
           </div>
           
           <button className="flex items-center gap-2 text-[#EA001B] border border-red-200 dark:border-red-800/50 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
             <XCircle className="w-4 h-4" />
             Reprovar
           </button>
        </div>
      </header>

      {/* Main Content Area - Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Column - Document */}
        <div className="flex-1 flex flex-col bg-gray-50/30 dark:bg-gray-900/30 overflow-y-auto border-r border-gray-200 dark:border-gray-800">
           {/* Workflow Context Header */}
           <div className="px-6 pt-4 flex items-center shrink-0">
             <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide uppercase">
               Workflow de Aprovação de Notas Fiscais <span className="font-medium text-gray-400 dark:text-gray-500 normal-case ml-1 tracking-normal">- Documento #8021</span>
             </span>
           </div>

           {/* Left Toolbar */}
           <div className="px-6 py-3 bg-transparent flex items-center justify-between shrink-0">
             <div className="flex items-center gap-1.5 text-xs text-gray-800 dark:text-gray-200 font-medium">
               <Share2 className="w-3.5 h-3.5 text-gray-500" />
               <span>Teste - Múltiplas Saídas</span>
               <span className="text-gray-400 font-light px-1">/</span>
               <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-700 dark:text-gray-300">
                 <FileText className="w-3.5 h-3.5 text-gray-500" />
                 1016384-13.2020.8.26.0554.pdf
               </div>
             </div>

             <div className="flex items-center gap-2">
               <button 
                 onClick={() => setShowReprocessModal(true)}
                 className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 px-2.5 py-1 rounded text-xs font-medium transition-colors"
               >
                 <RotateCw className="w-3.5 h-3.5" />
                 Reprocessar
               </button>
               <button className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 bg-white dark:bg-surface-dark border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-2.5 py-1 rounded text-xs font-medium transition-colors">
                 <ShieldCheck className="w-3.5 h-3.5" />
                 Anonimizar
               </button>
             </div>
           </div>

           {/* Reprocess Modal */}
           {showReprocessModal && (
             <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/70 animate-in fade-in duration-200">
               <div className="bg-white dark:bg-surface-dark w-full max-w-sm rounded-xl shadow-xl flex flex-col overflow-hidden">
                 <div className="p-6">
                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Reprocessar Documento</h3>
                   <p className="text-sm text-gray-600 dark:text-gray-400">
                     Ao reprocessar o documento nessa etapa, esteja ciente de que os dados extraídos se não foram editados podem ser os mesmo, e isto inclui o custo de WTC.
                   </p>
                 </div>
                 <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
                   <button 
                     onClick={() => setShowReprocessModal(false)}
                     className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                   >
                     Cancelar
                   </button>
                   <button 
                     onClick={() => setShowReprocessModal(false)}
                     className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
                   >
                     Confirmar
                   </button>
                 </div>
               </div>
             </div>
           )}
           
           {/* PDF Viewer Header */}
           <div className="px-6 pb-2 pt-2 flex items-center justify-between shrink-0">
             <div className="flex items-center gap-2">
               <h3 className="font-bold text-gray-900 dark:text-white text-[15px] tracking-tight">PDF ORIGINAL</h3>
               <button className="text-blue-500 hover:text-blue-600 transition-colors p-1">
                 <Maximize2 className="w-4 h-4" />
               </button>
             </div>
             
             <button className="text-blue-500 hover:text-blue-600 transition-colors p-1">
               <AlignRight className="w-5 h-5" />
             </button>
           </div>

           {/* PDF Viewer */}
           <div className="flex-1 mx-6 mb-6 flex flex-col bg-[#323639] rounded-t-sm shadow-sm overflow-hidden border border-gray-300 dark:border-gray-700">
             {/* Main Toolbar */}
             <div className="h-12 bg-[#323639] border-b border-[#282a2b] flex items-center justify-between px-4 shrink-0 text-white shadow-sm overflow-x-auto">
               
               {/* Left Section */}
               <div className="flex items-center gap-4 shrink-0">
                 <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-gray-300 hover:text-white">
                   <Menu className="w-5 h-5" />
                 </button>
                 <span className="text-sm font-medium text-gray-100 truncate max-w-[150px]">
                   66ecfcc2-47bf-46...
                 </span>
                 
                 <div className="h-4 w-px bg-white/20 mx-1"></div>
                 
                 {/* Page Controls */}
                 <div className="flex items-center gap-2 text-sm text-gray-300">
                   <div className="bg-[#1f2122] text-center w-8 py-0.5 rounded text-white text-[13px]">1</div>
                   <span>/ 13</span>
                 </div>
                 
                 <div className="h-4 w-px bg-white/20 mx-1"></div>
                 
                 {/* Zoom Controls */}
                 <div className="flex items-center gap-1 text-gray-300">
                   <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
                     <ZoomOut className="w-4 h-4" />
                   </button>
                   <div className="bg-[#1f2122] text-center w-12 py-0.5 rounded text-white text-[13px]">88%</div>
                   <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
                     <ZoomIn className="w-4 h-4" />
                   </button>
                 </div>
               </div>

               {/* Middle Section */}
               <div className="flex items-center gap-1 text-gray-300 shrink-0 ml-4">
                 <button className="p-1.5 hover:bg-white/10 rounded transition-colors" title="Ajustar à largura">
                   <Focus className="w-4 h-4" />
                 </button>
                 <button className="p-1.5 hover:bg-white/10 rounded transition-colors" title="Girar no sentido anti-horário">
                   <RotateCcw className="w-4 h-4" />
                 </button>
                 
                 <div className="h-4 w-px bg-white/20 mx-2"></div>
                 
                 <button className="p-1.5 hover:bg-white/10 rounded transition-colors" title="Desenhar">
                   <Pencil className="w-4 h-4" />
                 </button>
                 <button className="p-1.5 hover:bg-white/10 rounded transition-colors text-white/30" disabled title="Desfazer">
                   <CornerUpLeft className="w-4 h-4" />
                 </button>
                 <button className="p-1.5 hover:bg-white/10 rounded transition-colors text-white/30" disabled title="Refazer">
                   <CornerUpRight className="w-4 h-4" />
                 </button>
               </div>

               {/* Right Section */}
               <div className="flex items-center gap-1 text-gray-300 shrink-0 ml-auto">
                 <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                   <Type className="w-4 h-4" />
                 </button>
                 <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                   <Download className="w-4 h-4" />
                 </button>
                 <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                   <Printer className="w-4 h-4" />
                 </button>
                 <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors ml-1">
                   <MoreVertical className="w-4 h-4" />
                 </button>
               </div>
             </div>

             {/* Canvas Container */}
             <div className="flex-1 bg-[#525659] flex justify-center p-4 overflow-y-auto relative">
               
               <div className="bg-white w-full max-w-[800px] h-[1000px] shadow-lg relative shrink-0">
                  <div className="absolute top-12 left-12 opacity-80 mix-blend-multiply w-48 h-48 rounded-full border border-pink-200 bg-pink-50 flex items-center justify-center">
                    <span className="text-5xl font-serif text-black opacity-90 transform -rotate-12 italic">Volpi</span>
                  </div>
                  <div className="absolute right-8 top-32 transform -rotate-90 origin-right text-xs text-black font-semibold">
                    fls. 1
                  </div>
                  <div className="absolute right-2 top-32 transform -rotate-90 origin-right text-xs text-black tracking-widest whitespace-nowrap opacity-60">
                    208260554.
                  </div>

                  {/* Mock Text Content */}
                  <div className="p-20 pt-32 text-gray-800 relative z-10 font-sans">
                    <div className="text-center mb-8">
                      <h4 className="text-xl font-bold font-serif mb-2 uppercase tracking-widest text-gray-900 border-b-2 border-gray-900 pb-2 inline-block">Nota Fiscal de Serviços Eletrônica</h4>
                      <p className="text-sm font-mono text-gray-500 mt-2">Nº 2023-7845 • Emissão: 10/03/2023</p>
                    </div>

                    <div className="space-y-6 text-sm leading-relaxed">
                      <div className="border border-gray-300 p-4">
                        <h5 className="font-bold text-gray-800 mb-2 border-b border-gray-200 pb-1">PRESTADOR DE SERVIÇOS</h5>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p><span className="font-semibold">Razão Social:</span> Empresa ABC S.A.</p>
                            <p><span className="font-semibold">CNPJ:</span> 12.345.678/0001-90</p>
                            <p><span className="font-semibold">Inscrição Municipal:</span> 123456</p>
                          </div>
                          <div>
                            <p><span className="font-semibold">Endereço:</span> Av. Paulista, 1000 - Bela Vista</p>
                            <p><span className="font-semibold">Município:</span> São Paulo - SP</p>
                            <p><span className="font-semibold">Telefone:</span> (11) 3333-4444</p>
                          </div>
                        </div>
                      </div>

                      <div className="border border-gray-300 p-4 bg-blue-50/10">
                        <h5 className="font-bold text-blue-900 mb-2 border-b border-blue-100 pb-1">TOMADOR DE SERVIÇOS</h5>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p><span className="font-semibold">Razão Social:</span> Indústria XYZ Ltda.</p>
                            <p><span className="font-semibold">CNPJ:</span> 98.705.432/0001-10</p>
                          </div>
                          <div>
                            <p><span className="font-semibold">Endereço:</span> Rua das Indústrias, 500</p>
                            <p><span className="font-semibold">Município:</span> Campinas - SP</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <h5 className="font-bold text-gray-800 mb-2">DISCRIMINAÇÃO DOS SERVIÇOS</h5>
                        <div className="border border-gray-300 p-5 min-h-[160px] text-justify text-gray-700 relative">
                          {/* AI interaction highlight simulation */}
                          <div className="absolute top-22 left-2 right-4 h-16 bg-blue-400/20 mix-blend-multiply border border-blue-400/50 rounded-sm"></div>
                          
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                          </p>
                          <br />
                          <p>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Consulting services integration proident in voluptate velit.
                          </p>
                        </div>
                      </div>

                      <div className="border border-gray-300 relative">
                         {/* AI interaction highlight simulation on Total */}
                        <div className="absolute top-0 bottom-0 left-0 right-0 bg-orange-400/20 mix-blend-multiply border-2 border-orange-400/60 rounded-sm pointer-events-none"></div>
                        
                        <div className="bg-gray-100 p-3 font-bold text-gray-800 text-center border-b border-gray-300 text-base">
                          VALOR TOTAL DA NOTA: R$ 15.420,00
                        </div>
                        <div className="grid grid-cols-4 divide-x divide-gray-300 text-center text-xs">
                          <div className="p-2 bg-white"><span className="block text-gray-500 mb-1">INSS</span>R$ 0,00</div>
                          <div className="p-2 bg-white"><span className="block text-gray-500 mb-1">IRRF</span>R$ 0,00</div>
                          <div className="p-2 bg-white"><span className="block text-gray-500 mb-1">CSLL</span>R$ 0,00</div>
                          <div className="p-2 bg-white"><span className="block text-gray-500 mb-1">COFINS</span>R$ 0,00</div>
                        </div>
                      </div>

                      <div className="text-xs text-gray-400 mt-12 text-justify">
                        <p className="font-semibold mb-1 text-gray-500">Outras Informações / Observações:</p>
                        <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Documento emitido por ME ou EPP optante pelo Simples Nacional.</p>
                      </div>
                    </div>
                  </div>
               </div>

               {/* Scroller Placeholder */}
               <div className="absolute right-1 top-4 bottom-4 w-3 bg-transparent hover:bg-black/10 transition-colors rounded-full overflow-hidden">
                 <div className="w-full h-24 bg-[#7a7d7f] hover:bg-[#9aa0a6] rounded-full mt-2 cursor-pointer transition-colors" />
               </div>
             </div>
           </div>
        </div>

        {/* Resizer Handle (Visual only) */}
        <div className="w-4 flex flex-col items-center bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 pt-[250px] shadow-sm z-10">
           {/* Up arrow */}
           <div className="text-gray-400"><div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[5px] border-b-gray-400"></div></div>
           <div className="h-4 w-1 bg-gray-300 dark:bg-gray-600 rounded-full my-1.5"></div>
           {/* Down arrow */}
           <div className="text-gray-400"><div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-gray-400"></div></div>
        </div>

        {/* Right Column - Analysis */}
        <div className="flex-1 flex flex-col bg-white dark:bg-surface-dark overflow-y-auto">
          <div className="p-6 flex flex-col">
            <div className="flex justify-end mb-6 shrink-0">
              <button className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                <MessageCircle className="w-4 h-4" />
                Pergunte à IA
              </button>
            </div>

            {/* Stepper Card */}
            <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 mb-6 flex flex-col items-center justify-center shrink-0 shadow-sm relative">
              <div className="w-full flex items-center justify-between mb-4">
                <button className="p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="bg-blue-600 text-white rounded-full px-6 py-2 flex items-center gap-2 font-medium text-sm shadow-sm">
                  <FileText className="w-4 h-4" />
                  Etapa 1
                </div>
                <button className="p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="text-xs text-gray-500 font-medium mb-2">1 de 6</div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5, 6].map((step) => (
                  <div key={step} className={`w-2 h-2 rounded-full ${step === 1 ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                ))}
              </div>
            </div>

            {/* Fields Card */}
            <div className="border border-gray-200 dark:border-gray-800 rounded-xl flex flex-col shadow-sm">
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2 shrink-0 bg-transparent">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white text-base">Dados Extraídos - Etapa 1</h3>
                </div>
                <div className="relative flex items-center">
                  <History className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 pointer-events-none" />
                  <select 
                    value={selectedVersion}
                    onChange={(e) => setSelectedVersion(e.target.value)}
                    className="appearance-none bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md pl-8 pr-8 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-full"
                  >
                    <option value="v3">v3 (Atual)</option>
                    <option value="v2">v2 (Ontem, 14:30)</option>
                    <option value="v1">v1 (Segunda, 09:15)</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 pointer-events-none" />
                </div>
              </div>
              
              <div className="p-5 space-y-6 bg-white dark:bg-surface-dark">
                
                {/* Field 1 */}
                <div className={`space-y-1.5 ${selectedVersion === 'v3' ? 'border border-blue-100 dark:border-blue-900/30 bg-blue-50/10 dark:bg-blue-900/5 rounded-lg p-4 -mx-4' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Número da Nota Fiscal</label>
                     <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${getBadgeColor(currentData.nfColor)}`}>{currentData.nfStatus}</span>
                  </div>
                  <div className="relative">
                    <input type="text" value={currentData.nf} readOnly className={`w-full border rounded-md px-3 py-2.5 text-sm text-gray-800 dark:text-gray-200 focus:outline-none ${selectedVersion === 'v3' ? 'border-blue-200 dark:border-blue-800/50 bg-blue-50/30 dark:bg-blue-900/10 ring-1 ring-blue-500/20' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'}`} />
                  </div>
                  
                  {/* Version History Toggle */}
                  <div className="pt-2">
                    <button 
                      onClick={() => toggleHistory('nf')}
                      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 font-medium transition-colors"
                    >
                      <History className="w-3.5 h-3.5" />
                      Ver histórico (2 versões anteriores)
                    </button>
                    
                    {/* History Modal */}
                    {showFieldHistory['nf'] && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/70 animate-in fade-in duration-200">
                        <div className="bg-white dark:bg-surface-dark w-full max-w-md rounded-xl shadow-xl flex flex-col max-h-[90vh]">
                          {/* Modal Header */}
                          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">Histórico de Versões</h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Número da Nota Fiscal</p>
                            </div>
                            <button 
                              onClick={() => toggleHistory('nf')}
                              className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                          
                          {/* Modal Content / Timeline */}
                          <div className="p-6 overflow-y-auto">
                            <div className="pl-3 ml-1.5 border-l-2 border-gray-100 dark:border-gray-800 space-y-6">
                               <div className="relative">
                                 <div className="absolute -left-[17px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white dark:ring-surface-dark"></div>
                                 <div className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 font-medium uppercase tracking-wide">v3 • Atual • Você</div>
                                 <div className="text-sm font-medium text-gray-900 dark:text-white">NF-2023-7845</div>
                                 <div className="text-[11px] text-green-600 dark:text-green-400 mt-1.5 flex items-center gap-1.5 font-medium bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded inline-flex">
                                   <CheckCircle className="w-3.5 h-3.5" />
                                   Aprovado
                                 </div>
                               </div>
                               <div className="relative">
                                 <div className="absolute -left-[17px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600 ring-4 ring-white dark:ring-surface-dark"></div>
                                 <div className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 font-medium uppercase tracking-wide">v2 • Ontem, 14:30 • Sistema IA</div>
                                 <div className="text-sm text-gray-500 dark:text-gray-400 line-through">NF-2023-7840</div>
                               </div>
                               <div className="relative">
                                 <div className="absolute -left-[17px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600 ring-4 ring-white dark:ring-surface-dark"></div>
                                 <div className="text-[11px] text-gray-400 dark:text-gray-500 mb-1 font-medium uppercase tracking-wide">v1 • Segunda, 09:15 • Sistema IA</div>
                                 <div className="text-sm text-gray-500 dark:text-gray-400 line-through">NF-2023-78</div>
                                 <div className="text-[11px] text-[#EA001B] mt-2 flex items-center gap-1.5 font-medium bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded inline-flex">
                                   <XCircle className="w-3.5 h-3.5" />
                                   Corrigido na extração
                                 </div>
                               </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Field 2 */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Data de Emissão</label>
                     <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${getBadgeColor(currentData.dateColor)}`}>{currentData.dateStatus}</span>
                  </div>
                  <div className="relative">
                    <input type="text" value={currentData.date} readOnly className="w-full border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2.5 text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800/50 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-9 hover:border-gray-300 transition-colors" />
                    <PenLine className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Field 3 */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">CNPJ Destinatário</label>
                     <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${getBadgeColor(currentData.cnpjColor)}`}>{currentData.cnpjStatus}</span>
                  </div>
                  <div className="relative">
                    <input type="text" value={currentData.cnpj} readOnly className="w-full border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2.5 text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800/50 focus:outline-none" />
                  </div>
                </div>

                {/* Field 4 */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Razão Social Destinatário</label>
                     <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${getBadgeColor(currentData.razaoColor)}`}>{currentData.razaoStatus}</span>
                  </div>
                  <div className="relative">
                    <input type="text" value={currentData.razao} readOnly className="w-full border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2.5 text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800/50 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-9 hover:border-gray-300 transition-colors" />
                    <PenLine className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Field 5 */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Valor Total</label>
                     <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${getBadgeColor(currentData.valorColor)}`}>{currentData.valorStatus}</span>
                  </div>
                  <div className="relative">
                    <input type="text" value={currentData.valor} readOnly className={`w-full border rounded-md px-3 py-2.5 text-sm text-gray-800 dark:text-gray-200 focus:outline-none pr-9 transition-colors ${selectedVersion === 'v3' ? 'border-orange-300 dark:border-orange-500/50 bg-orange-50/20 dark:bg-orange-900/10 focus:ring-1 focus:ring-orange-500' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'}`} />
                    <PenLine className={`w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${selectedVersion === 'v3' ? 'text-orange-500' : 'text-gray-400'}`} />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
