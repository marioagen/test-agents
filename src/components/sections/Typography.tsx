import React from 'react';

export default function Typography() {
  return (
    <section className="bg-white dark:bg-surface-dark p-8 rounded-lg border border-gray-200 dark:border-border-dark transition-colors">
      <h2 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-100 dark:border-border-dark">Tipografia</h2>
      <div className="space-y-8">
        <div>
          <p className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">Hierarquia de Títulos</p>
          <div className="space-y-4">
            <div>
              <h1>Título Principal (H1)</h1>
              <p className="text-[10px] text-gray-400 mt-1">32px, font-weight: 500, woopi-ai-dark-gray</p>
            </div>
            <div>
              <h2>Título Secundário (H2)</h2>
              <p className="text-[10px] text-gray-400 mt-1">24px, font-weight: 500, woopi-ai-dark-gray</p>
            </div>
            <div>
              <h3>Título Terciário (H3)</h3>
              <p className="text-[10px] text-gray-400 mt-1">20px, font-weight: 500, woopi-ai-dark-gray</p>
            </div>
            <div>
              <h4>Título Quaternário (H4)</h4>
              <p className="text-[10px] text-gray-400 mt-1">16px, font-weight: 500, woopi-ai-dark-gray</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Texto Comum</p>
          <p className="max-w-2xl leading-relaxed">
            Texto de parágrafo regular usado para descrições e conteúdo geral do sistema.
          </p>
          <p className="text-[10px] text-gray-400 italic mt-1">14px, font-weight: 400, woopi-ai-gray</p>
          
          <p className="max-w-2xl leading-relaxed font-medium text-woopi-dark-gray dark:text-gray-200 mt-4">
            Texto de parágrafo com ênfase (Medium).
          </p>
          <p className="text-[10px] text-gray-400 italic mt-1">14px, font-weight: 500, woopi-ai-dark-gray</p>
        </div>
      </div>
    </section>
  );
}
