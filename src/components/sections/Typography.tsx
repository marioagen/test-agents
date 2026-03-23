import React from 'react';

export default function Typography() {
  return (
    <section className="bg-white dark:bg-surface-dark p-8 rounded-lg border border-gray-200 dark:border-border-dark transition-colors">
      <h2 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-100 dark:border-border-dark">Tipografia</h2>
      <div className="space-y-8">
        <div>
          <p className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">Títulos</p>
          <div className="space-y-4">
            <div>
              <h1 className="text-[32px] font-medium leading-tight dark:text-white">Título Principal (H1)</h1>
              <p className="text-[10px] text-gray-400">32px, font-weight: 500, gray-900</p>
            </div>
            <div>
              <h2 className="text-[24px] font-medium leading-tight dark:text-white">Título Secundário (H2)</h2>
              <p className="text-[10px] text-gray-400">24px, font-weight: 500, gray-900</p>
            </div>
            <div>
              <h3 className="text-[20px] font-medium leading-tight dark:text-white">Título Terciário (H3)</h3>
              <p className="text-[10px] text-gray-400">20px, font-weight: 500, gray-900</p>
            </div>
            <div>
              <h4 className="text-[16px] font-medium leading-tight dark:text-white">Título Quaternário (H4)</h4>
              <p className="text-[10px] text-gray-400">16px, font-weight: 500, gray-900</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Corpo de Texto</p>
          <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
            Texto de parágrafo regular usado para descrições e conteúdo geral do sistema. <br/>
            <span className="text-[10px] text-gray-400 italic">14px, font-weight: 400, gray-600</span>
          </p>
        </div>
      </div>
    </section>
  );
}
