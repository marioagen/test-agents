import React from 'react';

export default function Tabs() {
  return (
    <section className="bg-white dark:bg-surface-dark p-8 rounded-lg border border-gray-200 dark:border-border-dark transition-colors">
      <h2 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-100 dark:border-border-dark">Tabs</h2>
      <div className="border-b border-gray-100 dark:border-border-dark mb-6">
        <nav className="flex gap-10">
          <button className="pb-3 text-xs font-bold text-primary border-b-2 border-primary transition-colors">Primeira Aba</button>
          <button className="pb-3 text-xs font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">Segunda Aba</button>
          <button className="pb-3 text-xs font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">Terceira Aba</button>
        </nav>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Conteúdo da primeira aba. Aqui você pode colocar qualquer tipo de conteúdo.
      </div>
    </section>
  );
}
