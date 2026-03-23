import React from 'react';
import { Search, AlertCircle } from 'lucide-react';

export default function Forms() {
  return (
    <section className="bg-white dark:bg-surface-dark p-8 rounded-lg border border-gray-200 dark:border-border-dark transition-colors">
      <h2 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-100 dark:border-border-dark">Elementos de Formulário</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Estados Normais</h3>
          <div>
            <label className="block text-xs font-medium mb-1.5">Input de Texto</label>
            <input className="w-full text-sm border border-gray-200 dark:border-gray-700 bg-transparent rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none transition-shadow" placeholder="Digite algo..." type="text"/>
            <p className="text-[10px] text-gray-400 mt-1">Borda cinza clara padrão</p>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5">Input com Ícone</label>
            <div className="relative">
              <Search className="absolute left-2 top-2 text-gray-400 w-4 h-4" />
              <input className="w-full text-sm border border-gray-200 dark:border-gray-700 bg-transparent rounded pl-9 pr-3 py-2 focus:ring-1 focus:ring-primary outline-none transition-shadow" placeholder="Buscar..." type="text"/>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5">Textarea</label>
            <textarea className="w-full text-sm border border-gray-200 dark:border-gray-700 bg-transparent rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none transition-shadow" placeholder="Digite uma mensagem..." rows={3}></textarea>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5">Select</label>
            <select className="w-full text-sm border border-gray-200 dark:border-gray-700 bg-transparent rounded px-3 py-2 focus:ring-1 focus:ring-primary outline-none transition-shadow">
              <option>Selecione uma opção</option>
            </select>
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Estados de Erro/Obrigatório</h3>
          <div>
            <label className="block text-xs font-medium mb-1.5">Input Obrigatório <span className="text-red-500">*</span></label>
            <input className="w-full text-sm border border-red-500 bg-transparent rounded px-3 py-2 outline-none" placeholder="Campo obrigatório..." type="text"/>
            <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> Este campo é obrigatório
            </p>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5">Email Inválido <span className="text-red-500">*</span></label>
            <input className="w-full text-sm border border-red-500 bg-transparent rounded px-3 py-2 outline-none" type="email" defaultValue="email-invalido"/>
            <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> Por favor, insira um email válido
            </p>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5">Descrição <span className="text-red-500">*</span></label>
            <textarea className="w-full text-sm border border-red-500 bg-transparent rounded px-3 py-2 outline-none" rows={3} defaultValue="Minimo 10 caracteres..."></textarea>
            <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> Descrição deve ter pelo menos 10 caracteres
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase">Checkboxes</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input defaultChecked className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4" type="checkbox"/>
              <span className="text-xs">Opção selecionada</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4" type="checkbox"/>
              <span className="text-xs">Opção não selecionada</span>
            </label>
            <label className="flex items-center gap-2 opacity-50">
              <input className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4" disabled type="checkbox"/>
              <span className="text-xs">Opção desabilitada</span>
            </label>
            <div className="mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input className="rounded border-red-500 text-primary focus:ring-primary w-4 h-4" type="checkbox"/>
                <span className="text-xs">Termos obrigatórios <span className="text-red-500">*</span></span>
              </label>
              <p className="text-[10px] text-red-500 mt-1">Você deve aceitar os termos</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase">Radio Buttons</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input defaultChecked className="border-gray-300 text-primary focus:ring-primary w-4 h-4" name="radio-group" type="radio"/>
              <span className="text-xs">Primeira opção</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input className="border-gray-300 text-primary focus:ring-primary w-4 h-4" name="radio-group" type="radio"/>
              <span className="text-xs">Segunda opção</span>
            </label>
            <div className="mt-4">
              <p className="text-xs font-medium mb-2">Tipo de Contrato <span className="text-red-500">*</span></p>
              <div className="space-y-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="border-red-500 text-primary focus:ring-primary w-4 h-4" name="contract-error" type="radio"/>
                  <span className="text-xs">Permanente</span>
                </label>
                <p className="text-[10px] text-red-500 mt-1">Selecione o tipo de contrato</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-4">Toggle Switch</h3>
          <label className="flex items-center cursor-pointer relative">
            <input className="sr-only peer" type="checkbox"/>
            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary transition-colors"></div>
            <span className="ml-3 text-xs text-gray-700 dark:text-gray-300">Ativar notificações</span>
          </label>
        </div>
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-4">Slider</h3>
          <input className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary" type="range"/>
          <p className="text-[10px] text-gray-400 mt-2">Valor: 50</p>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-xs font-bold text-gray-400 uppercase mb-4">Progress Bar</h3>
        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
          <div className="bg-primary h-1.5 rounded-full" style={{ width: '65%' }}></div>
        </div>
        <p className="text-[10px] text-gray-400 mt-2">65% completo</p>
      </div>
    </section>
  );
}
